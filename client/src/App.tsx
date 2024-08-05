import TodoList from './components/TodoList'

function App() {
  return (
    <div className="app-container bg-gradient-to-r from-green-400 to-blue-500 flex min-h-screen">
      <div className="m-auto bg-primary-600 white p-6 rounded-lg text-white max-w-md w-full">
        <TodoList />
      </div>
    </div>
  )
}

export default App
