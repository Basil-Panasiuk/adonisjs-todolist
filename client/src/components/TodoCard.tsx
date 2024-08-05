import trashcan from '../icons/trashcan.svg'
import edit from '../icons/edit.svg'
import { Todo } from '../interfaces/todo'
import { downloadFile } from '../api/download'
import { BASE_URL } from '../api'

type TodoProps = {
  todo: Todo
  handleUpdate: (payload: Record<string, string>, id: number) => void
  handleRemove: (id: number) => void
  openForm: () => void
  setActiveTodo: (value: Todo) => void
}

function TodoCard({ todo, handleUpdate, handleRemove, openForm, setActiveTodo }: TodoProps) {
  const handleEdit = () => {
    setActiveTodo(todo)
    openForm()
  }

  return (
    <li className="relative flex items-center text-white bg-primary-400 mb-3 p-2">
      <div className="group">
        <input
          checked={todo.isCompleted}
          onChange={() => handleUpdate({ isCompleted: String(!todo.isCompleted) }, todo.id)}
          className="cursor-pointer appearance-none w-3.5 h-3.5 mr-2 border rounded-full ease-linear duration-400 hover:shadow-checkbox hover:border-secondary checked:border-secondary checked:bg-secondary"
          type="checkbox"
        />
        <div className={todo.isCompleted ? 'line-through text-light text-xl' : 'text-xl'}>
          {todo.title}
        </div>
        <div className="text-sm text-slate-400">{todo.description}</div>
        <div
          v-if={todo.filePath}
          className="cursor-pointer"
          onClick={() => downloadFile(todo.filePath as string)}
        >
          <a href={`${BASE_URL}/download/${todo.filePath}`} download>
            {todo.filePath}
          </a>
        </div>
      </div>

      <button className="ml-auto text-white" onClick={handleEdit}>
        <img src={edit} alt="edit" />
      </button>
      <button className="ml-2 text-white" onClick={() => handleRemove(todo.id)}>
        <img src={trashcan} alt="delete" />
      </button>
    </li>
  )
}

export default TodoCard
