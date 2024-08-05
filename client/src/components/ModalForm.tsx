import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Textarea,
} from '@material-tailwind/react'
import { Todo } from '../interfaces/todo'
import { useEffect, useState } from 'react'

type ModalProps = {
  handleOpen: () => void
  open: boolean
  todo?: Todo
  children: string
  handleSubmit: (payload: Record<string, string | Blob>) => Promise<void>
}

export function ModalForm({ handleOpen, open, todo, children, handleSubmit }: ModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>()

  useEffect(() => {
    setTitle(todo?.title ?? '')
    setDescription(todo?.description ?? '')
  }, [open])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    } else {
      setFile(undefined)
    }
  }

  const onSubmit = async () => {
    const todoData: Record<string, string | Blob> = {
      title,
      description,
    }
    file && (todoData.file = file as Blob)

    await handleSubmit(todoData)
    handleOpen()
  }

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Todo modal window</DialogHeader>
      <DialogBody className="">
        <Input
          label="Title"
          size="md"
          className="mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Typography className="mb-4" children={''}></Typography>
        <Textarea
          label="Description"
          size="lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Typography className="mb-4" children={''}></Typography>
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={onSubmit}>
          <span>{children}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
