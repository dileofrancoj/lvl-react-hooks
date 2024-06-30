/*
    yarn add axios

    Preguntas:
    - ¿Recibimos instancia de axios como prop o lo importamos en el hook? -> Recibimos la prop (inyección de dependencia de axios)
    - Como configuramos nuestras peticiones
        - metodo (enum)
        - url
        - headers
        - timeout?
        - active / enabled: boolean -> si se tiene que ejecutar la acción
    - ¿Como trabajamos una peticion reactiva (que dependa de un evento de un usuario)?
        - fetcher: (config: Conf) => Promise<T> (POST, PUT, DELETE, PATCH) -> Cuando el usuario lo quiera hacer

    - Interceptors
*/
import { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type Method } from 'axios'

interface Config extends AxiosRequestConfig {
  instance: AxiosInstance
  url: string
  method: Method
  timeout?: number // Debemos verificarlo con NUESTRO servicio backend (p>90)
  enabled?: boolean
  onErrorCallback?: () => void
  // interceptors stuff
}

interface UseAxios<T> {
  data: T | null
  error: string | AxiosError
  loading: boolean
  fetcher?: (config: Config) => Promise<T>
}

export const useAxios = <T>(_config: Config): UseAxios<T> => {
  return {
    data: 'a' as T,
    error: 'some error',
    loading: false
  }
}
