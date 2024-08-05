import axios from 'axios'
import { BASE_URL } from '.'

export const downloadFile = async (fileName: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/download/${fileName}`)

    return response.data
  } catch {
    return { error: 'Failed to upload file' }
  }
}
