'use server'

import { Note } from '@/schemas/note';
import { api } from '@/services/api'
import { AxiosCustomError, AxiosCustomResponse } from '@/types/api'

interface UpdateNoteRequest {
    idNote: string;
    title?: string;
    description?: string;
    userId: string;
}

interface UpdateNoteResponse {
    note: Note;
}

export const updateNote = async (id: string, {
    idNote,
    title,
    description,
    userId
}: UpdateNoteRequest): Promise<AxiosCustomResponse<UpdateNoteResponse>> => {
  try {
    const response = await api.put<UpdateNoteResponse>(`/notes/${id}`, {
        idNote,
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
