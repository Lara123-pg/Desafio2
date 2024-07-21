'use server'

import { api } from '@/services/api'
import { AxiosCustomError, AxiosCustomResponse } from '@/types/api'

interface CreateNoteRequest {
  title: string;
  description?: string;
  userId: string;
}

interface CreateNoteResponse {
  noteId: string;
}

export const createNote = async ({
  title,
  description,
  userId
}: CreateNoteRequest): Promise<AxiosCustomResponse<CreateNoteResponse>> => {

  try {
    const response = await api.post<CreateNoteResponse>('/notes', {
      title,
      description,
      userId
    })
    
    return { data: response.data }
  } catch (err) {
    const error = err as AxiosCustomError

    return {
      error: error.response.data.message || 'Erro, tente novamente mais tarde.'
    }
  }
}
