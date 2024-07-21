'use client'

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain
} from '@/layout/dashboard/dashboard'
import {
  CardTitle,
  Card
} from '@/components/ui/card'

import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import ModalNote from './components/ModalNote'
import { getNotes } from '@/requests/note/getNotes'
import { Note } from '@/schemas/note'
import Link from 'next/link'

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
        try {
            const response = await getNotes();

            if (response.data) {
              setNotes(response.data)
            }

        } catch(error) {
            console.error("Erro ao buscar notas")
        }
    }

    fetchNotes();
  }, [isUpdated]) 


  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Notas</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <DashboardPageHeaderNav>
            <Button variant="outline" size="sm" onClick={() => setIsOpenModal(true)}>
              <PlusIcon className="mr-3 h-4 w-4" />
              Criar nota
            </Button>
          </DashboardPageHeaderNav>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        {
          notes.length === 0 ? (
            <div className="flex flex-col items-center gap-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FileText size={60} />
              <p>Nenhuma nota encontrada</p>
            </div>
          ) : (
            notes.map(note => (
              <Link key={note.id} href={`/noteDetails/${note.id}`}>
                <Card className="cursor-pointer hover:bg-slate-50">
                  <CardTitle>{note.title}</CardTitle>
                </Card>
              </Link>
            ))
          )}

          {
            isOpenModal && (
              <ModalNote 
                setIsOpenModal={setIsOpenModal}
                setIsUpdated={setIsUpdated}
              />
            )
          }
      </DashboardPageMain>
    </DashboardPage>
  )
}
