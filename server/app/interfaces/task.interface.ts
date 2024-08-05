import { MultipartFile } from '@adonisjs/core/bodyparser'

interface Params {
  id: number
}

export interface CreateTask {
  title: string
  description?: string
  file?: MultipartFile
}

export interface UpdateTask extends Partial<CreateTask> {
  isCompleted?: boolean
  params: Params
}
