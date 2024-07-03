/*
    PeYa: Hay headers que setea la lib para que el consumer no se preocupe por la implementacion
*/

import { type AxiosInstance } from 'axios'

export const setCommonHeaders = (instance: AxiosInstance): void => {
  instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('authorization') ?? null}`
  instance.defaults.headers.common.Accept = 'application/json'
  // Peya-session-id
  // timestamp
  // region-id
  // Cache-control: no-cache
  // Pragma: cache
}
