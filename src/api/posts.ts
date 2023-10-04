import axios from 'axios'
import type { AxiosPromise } from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

export const getPosts = async (): Promise<AxiosPromise> => {
  return axios.get(BASE_URL)
}
