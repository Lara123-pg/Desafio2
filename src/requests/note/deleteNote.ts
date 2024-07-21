'use server'

import { api } from '@/services/api'
import { AxiosCustomError, AxiosCustomResponse } from '@/types/api'

export const deleteNote = async (id: string): Promise<AxiosCustomResponse<void>> => {
  try {
    await api.delete(`/notes/${id}`)

    return {
      data: undefined
    }

  } catch (err) {
    const error = err as AxiosCustomError

    return {
      error: error.response.data.message || 'Erro, tente novamente mais tarde.'
    }
  }
}