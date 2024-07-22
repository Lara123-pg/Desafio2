'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormContainer,
  FormContent,
  FormFooter,
  FormHeader,
  FormInput,
  FormInputs,
  FormTitle
} from '@/components/form/FormPage'
import { useState } from 'react'
import { signUp } from '@/requests/auth/signUp'

const formSchema = z.object({
  name: z.string().transform(value => value.trim()).refine(value => {
    const regex = /^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/
    return regex.test(value)
  }, {
    message: "Nome inválido"
  }),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres')
})

type FormValues = z.infer<typeof formSchema>

export default function Home() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema)
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true)
    const response = await signUp({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    if (response.data) {
      toast({
        title: 'Uusário criado com sucesso',
        description: 'Agora você pode fazer login',
        variant: 'success'
      })
      router.replace('/signIn')
      return
    }

    if (response.error) {
      toast({
        title: 'Erro interno',
        description: 'Ocorreu um erro interno, tente novamente mais tarde'
      })
    } else {
      toast({
        title: 'Erro',
        description: 'E-mail ou senha inválidos',
        variant: 'destructive'
      })
    }
  })

  return (
    <FormContainer>
      <Form {...form}>
        <FormHeader>
          <FormTitle>Criar conta</FormTitle>
          <FormDescription>
            Bem vindo! Por favor, insira seu nome, e-mail e senha para criar a conta.
          </FormDescription>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormContent>
            <FormInputs>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Ana Silva"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="mail@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="4H8I2Y#5"
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
              {isLoading ? 'Verificando...' : 'Cadastrar'}
            </Button>

            <FormFooter>
              Já tem uma conta?{' '}
              <a href="/signIn" className="text-muted-foreground hover:underline">
                Fazer login
              </a>
            </FormFooter>
          </FormContent>
        </form>
      </Form>
    </FormContainer>
  )
}