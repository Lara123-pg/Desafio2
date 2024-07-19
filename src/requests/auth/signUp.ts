'use server'

import { api } from '@/services/api'
import { AxiosCustomError, AxiosCustomResponse } from '@/types/api'

interface SignUpRequest {
    name: string;
    email: string;
    password: string;
}

interface SignUpResponse {
    access_token: string;
}

export const signUp = async ({
    name,
    email,
    password
}: SignUpRequest): Promise<AxiosCustomResponse<SignUpResponse>> => {
  try {
    const response = await api.post<SignUpResponse>('/signUp', {
        name,
        email,
        password
    })

    return { data: response.data }
  } catch (err) {
    const error = err as AxiosCustomError

    return {
      error: error.response.data.message || 'Erro, tente novamente mais tarde.'
    }
  }
}
