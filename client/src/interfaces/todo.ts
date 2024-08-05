export interface Todo {
  id: number
  title: string
  description?: string
  isCompleted: boolean
  filePath?: string
}

export interface TodoDto extends Omit<Partial<Todo>, 'filePath' | 'id'> {
  file?: File
}
