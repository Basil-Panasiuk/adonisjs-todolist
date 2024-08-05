import axios from 'axios'
import { BASE_URL } from '.'

export const loadTodo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`)
    return response.data
  } catch (e) {
    return { error: 'Failed to load todo' }
  }
}

export const updateTodo = async (id: number, payload: FormData) => {
  try {
    const response = await axios.put(`${BASE_URL}/tasks/${id}`, payload)

    return response.data
  } catch {
    return { error: 'Failed to update todo' }
  }
}

export const removeTodo = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/tasks/${id}`)

    return response.data
  } catch {
    return { error: 'Failed to delete todo' }
  }
}

export const createTodo = async (payload: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, payload)

    return response.data
  } catch {
    return { error: 'Failed to create todo' }
  }
}
