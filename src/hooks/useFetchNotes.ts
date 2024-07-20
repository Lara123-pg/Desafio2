'use client'

import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast";
import { getNotes } from "@/requests/note/getNotes";
import { Note } from "@/schemas/note";

function useFetchNotes() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await getNotes();

                if (response.data?.notes) {
                    setNotes(response.data?.notes)
                }

            } catch(error) {
                if(error != 'undefined') {
                    toast({
                    title: 'Erro ao buscar notas',
                    description: 'Verifique se os dados estão sendo enviados corretamente',
                    variant: 'destructive'
                    })
                }
            }
        }

        fetchNotes();
    }, []) 

    return { notes }
}

export default useFetchNotes;