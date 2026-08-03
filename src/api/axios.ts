import * as axios from 'axios'

export const api = axios.create({
  baseURL: 'https://juniorsbootcamp.ru',
  headers: { 'Content-Type': 'application/json' },
})
