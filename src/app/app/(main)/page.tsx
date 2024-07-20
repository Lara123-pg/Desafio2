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
import useFetchNotes from '@/hooks/useFetchNotes'
import { useState } from 'react'
import ModalNote from './components/ModalNote'

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { notes } = useFetchNotes();

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Notas</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <DashboardPageHeaderNav>
            <Button variant="outline" size="sm" onClick={() => setIsOpenModal(true)}>
              <PlusIcon className="mr-3 h-4 w-4" />
              Criar notas
            </Button>
          </DashboardPageHeaderNav>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        {
          notes.length == 0 ? (
            <div className="flex flex-col items-center gap-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FileText size={60} />
              <p>Nenhuma nota encontrada</p>
            </div>
          ) : (
            notes.map(note => (
              <Card key={note.id}>
                  <CardTitle>{note.title}</CardTitle>
              </Card>
            ))
          )}

          {
            isOpenModal && (
              <ModalNote />
            )
          }
      </DashboardPageMain>
    </DashboardPage>
  )
}
