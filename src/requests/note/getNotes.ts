'use server'

import { Note } from '@/schemas/note';
import { api } from '@/services/api'
import { AxiosCustomError, AxiosCustomResponse } from '@/types/api'

export const getNotes = async (): Promise<AxiosCustomResponse<Note[]>> => {
  try {
    const response = await api.get<Note[]>('/notes')

    return { data: response.data }
  } catch (err) {
    const error = err as AxiosCustomError

    return {
      error: error.response.data.message || 'Erro, tente novamente mais tarde.'
    }
  }
}