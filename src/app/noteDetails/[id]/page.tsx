'use client'

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription
} from '@/components/ui/card'

import { ArrowLeft, RefreshCcw } from 'lucide-react'
import { CardContainer, CardBox, CardTitle2 } from '@/components/card/Card'
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getNote } from '@/requests/note/getNote';
import { Note } from '@/schemas/note';
import { toast } from '@/components/ui/use-toast';
import ModalNote from '@/app/app/components/ModalNote';
import { deleteNote } from '@/requests/note/deleteNote';
import AlertMessage from '@/app/app/components/AlertMessage';

export default function NoteDetails() {
    const router = useRouter()
    const { id } = useParams()

    const [note, setNote] = useState<Note>()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
    const [isUpdatedNote, setIsUpdatedNote] = useState(false)

    useEffect(() => {
        const fetchNote = async() => {
            try {
                const response = await getNote(id as string)

                if (response.data){
                    setNote(response.data)
                }
            } catch (error) {
                toast({
                    title: 'Erro',
                    description: 'Verifique os dados ou tente mais tarde',
                    variant: 'destructive'
                })
            }
        }

        fetchNote()
        setIsUpdatedNote(false)
    }, [isUpdatedNote])

    const handleBack = () => {
        router.push('/app')
    }

    const handleDeleteNote = async (id: string) => {
        try {
            await deleteNote(id)

            toast({
                title: 'Nota excluída',
                description: 'Nota excluída com sucesso',
                variant: 'success'
            })

            router.push('/app')

        } catch(error) {
            toast({
                title: 'Erro',
                description: 'Verifique os dados ou tente mais tarde',
                variant: 'destructive'
            })
        }
    }

    return (
        <CardContainer>
            <Card className="w-full pb-7 gap-10 border border-border h-auto flex-col">
                <CardHeader className="w-full flex-row items-center justify-between">
                    <Button variant="ghost" className="w-10 h-10 p-0" onClick={handleBack}>
                        <ArrowLeft size={20}/>
                    </Button>

                    <CardTitle className="text-xl">Informações</CardTitle>
                    
                    <CardBox>
                        <Button variant="ghost" className="w-10 h-10 p-0">
                            <RefreshCcw size={20} color="yellow" onClick={() => setIsOpenModal(true)} />
                        </Button>
                        
                        <AlertMessage 
                            noteId={id as string}
                            deleteNote={handleDeleteNote}
                        />
                    </CardBox>
                </CardHeader>

                <CardContent>
                    <CardTitle2>{note?.title}</CardTitle2>

                    <CardBox>
                        <CardDescription>
                            {note?.description ? note.description : 'A nota não tem descrição'}
                        </CardDescription>
                    </CardBox>
                </CardContent>
            </Card>

            {
                isOpenModal && (
                    <ModalNote
                        title="Atualizar nota"
                        type="update"
                        buttonText="Atualizar nota"
                        setIsOpenModal={setIsOpenModal}
                        setIsUpdatedNote={setIsUpdatedNote}
                    />
                )
            }
        </CardContainer>
    );
}