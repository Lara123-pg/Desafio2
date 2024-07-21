import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface AlertMessageProps {
    noteId: string;
    deleteNote: (id: string) => void;
}

export default function AlertMessage({ noteId, deleteNote }: AlertMessageProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="ghost" className="w-10 h-10 p-0">
                    <Trash2 size={20} color="red" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deletar Nota</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja deletar esta nota?
                    </AlertDialogDescription>
                </AlertDialogHeader>
        
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => deleteNote(noteId)}>Continuar</AlertDialogAction>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}