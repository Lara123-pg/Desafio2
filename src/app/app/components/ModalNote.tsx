import {  
    ModalPage,
    ModalContainer,
    ModalHeader,
    ModalTitle
} from '@/components/modal/ModalPage'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import {
    FormContent,
    FormInputs,
} from '@/components/form/FormPage'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

import { X } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createNote } from '@/requests/note/createNote';
import { useUser } from '@/hooks/useUser'
import { updateNote } from '@/requests/note/updateNote';
import { useParams } from 'next/navigation';

const createNoteSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"), 
    description: z.string().optional()
})

const updateNoteSchema = z.object({
    title: z.string().optional(), 
    description: z.string().optional()
})
  
type FormValuesCreate = z.infer<typeof createNoteSchema>
type FormValuesUpdate = z.infer<typeof updateNoteSchema>

interface ModalNoteProps {
    title: string;
    type: string;
    buttonText: string;
    setIsOpenModal: (value: boolean) => void;
    setIsUpdatedNote?: (value: boolean) => void;
    setIsUpdated?: (value: boolean) => void;
}
  
function ModalNote({ title, type, buttonText, setIsOpenModal, setIsUpdatedNote, setIsUpdated }: ModalNoteProps) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const { id } = useParams()

    const formSchema = type === 'create' ? createNoteSchema : updateNoteSchema;

    const form = useForm<FormValuesCreate | FormValuesUpdate>({
        defaultValues: {
            title: '',
            description: '',
        },
        reValidateMode: 'onChange',
        resolver: zodResolver(formSchema)
    })

    const user = useUser()

    
    const handleSubmit = form.handleSubmit(async (data) => {
        const typeMode = `${type}`

        setIsLoading(true)

        if(!user) {
          return {
            error: "Usuário não autenticado"
          }
        }


        if (typeMode == "create") {
            const response = await createNote({
                title: data.title as string,
                description: data.description,
                userId: user.id
            })

            if (response.data) {
                toast({
                    title: "Nota criada com sucesso!",
                    description: "A nota está pronta para ser visualizada",
                    variant: 'success'
                })
    
                setIsOpenModal(false)
                if (setIsUpdated) setIsUpdated(true)
    
            } else {
                toast({
                    title: 'Erro',
                    description: 'Ocorreu um erro interno, tente novamente mais tarde',
                    variant: 'destructive'
                })
            }
            
        } else {
            const response = await updateNote(id as string, {
                idNote: id as string,
                title: data.title,
                description: data.description,
                userId: user.id
            })

            if(response.data) {
                toast({
                    title: "Nota atualizada com sucesso!",
                    description: "A nota está pronta para ser visualizada",
                    variant: 'success'
                })
    
                setIsOpenModal(false)
                if (setIsUpdated) setIsUpdated(true)
                if (setIsUpdatedNote) setIsUpdatedNote(true)

            } else {
                toast({
                    title: 'Erro',
                    description: 'Ocorreu um erro interno, tente novamente mais tarde',
                    variant: 'destructive'
                })
            }
        }
    })

    return(
        <ModalPage>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle className="pl-6">{title}</ModalTitle>

                    <Button variant="outline" className="border-none" onClick={() => setIsOpenModal(false)}>
                        <X size="20" />
                    </Button>
                </ModalHeader>

                <Form { ...form }>
                    <form onSubmit={handleSubmit}>
                        <FormContent className="border-none">
                            <FormInputs>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="title">Título</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="title"
                                                placeholder="Nota x"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">Descrição</FormLabel>
                                    <FormControl>
                                    <Input
                                        id="description"
                                        type="text"
                                        placeholder="Descrição da nota x"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            </FormInputs>

                            <Button
                                className="w-full"
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                {isLoading ? 'Verificando...' : `${buttonText}`}
                            </Button>
                        </FormContent>
                    </form>
                </Form>
            </ModalContainer>
        </ModalPage>
    )
}

export default ModalNote;