import { useEffect, useState } from 'react'
import { createTodo, loadTodo, removeTodo, updateTodo } from '../api/tasks'
import { Todo } from '../interfaces/todo'
import TodoCard from './TodoCard'
import { ModalForm } from './ModalForm'
import plus from '../icons/plus.svg'

function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [open, setOpen] = useState(false)
  const [isCreation, setIsCreation] = useState(false)
  const [activeTodo, setActiveTodo] = useState<Todo>()
  const handleOpen = () => setOpen(!open)
  const handleCreation = () => setIsCreation(!isCreation)

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    const data: Todo[] = await loadTodo()
    setTodoList(data)
  }

  const onUpdateTodo = async (payload: Record<string, string | Blob>, id = activeTodo?.id) => {
    const todoData = new FormData()

    for (const key in payload) {
      todoData.append(key, payload[key])
    }

    const updatedTodo = await updateTodo(id as number, todoData)

    setTodoList((value) =>
      value.map((item) => {
        if (item.id === updatedTodo.id) {
          return updatedTodo
        }
        return item
      }),
    )
  }

  const onRemoveTodo = async (id: number) => {
    await removeTodo(id)

    setTodoList((todos) =>
      todos.filter((item) => {
        return item.id !== id
      }),
    )
  }

  const onCreateTodo = async (payload: Record<string, string | Blob>) => {
    const todoData = new FormData()

    for (const key in payload) {
      todoData.append(key, payload[key])
    }

    const newTodo = await createTodo(todoData)
    newTodo.isCompleted = false
    if (!newTodo.error) {
      setTodoList((todos) => [newTodo, ...todos])
    }
  }

  return (
    <>
      <ModalForm handleOpen={handleCreation} open={isCreation} handleSubmit={onCreateTodo}>
        create
      </ModalForm>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">TO DO LIST</h2>
        <button
          className="text-inherit bg-secondary w-9 h-9 flex justify-center items-center rounded-full shadow-button"
          onClick={handleCreation}
        >
          <img src={plus} alt="plus" />
          <span className="sr-only">Add Todo</span>
        </button>
      </div>
      <ModalForm handleOpen={handleOpen} open={open} todo={activeTodo} handleSubmit={onUpdateTodo}>
        update
      </ModalForm>
      <ul className="todos">
        {todoList.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            handleUpdate={onUpdateTodo}
            handleRemove={onRemoveTodo}
            openForm={handleOpen}
            setActiveTodo={setActiveTodo}
          />
        ))}
      </ul>
    </>
  )
}

export default TodoList
