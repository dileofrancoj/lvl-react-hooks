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
import { AxiosError, type AxiosInstance, type AxiosRequestConfig, type Method } from 'axios'
import * as React from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect' // no se puede exigir esta lib al cliente (bundle | peerDependencie)

import { setCommonHeaders } from '../utils/headers'

interface Config extends AxiosRequestConfig {
  instance: AxiosInstance
  url: string
  method: Method
  timeout?: number // Debemos verificarlo con NUESTRO servicio backend (p>90)
  enabled?: boolean //
  onErrorCallback?: () => void
  onSucessCallback?: () => void
  onUnauthorizedCallback?: () => void
  // interceptors stuff
}

type Error = string | AxiosError
interface UseAxios<T> {
  data: T | null
  error: Error
  loading: boolean
  fetcher?: (config: Config) => Promise<T | undefined>
}

export const useAxios = <T>(config: Config): UseAxios<T> => {
  if (config === undefined) throw new Error('useAxios must be initialized with config params')
  if (config.instance === undefined) throw new Error('useAxios must be initialized with an instance of axios')
  const configRef = React.useRef(config)
  const { instance } = configRef.current

  setCommonHeaders(instance) // headers mandatorios

  const [response, setResponse] = React.useState<T | null>(null)
  const [error, setError] = React.useState<Error>('')
  const [loading, setLoading] = React.useState<boolean>(config.enabled ?? false)

  React.useEffect(() => {
    // interceptors -> callback que se ejecuta en dos estadios (on request | on response)
    // interceptor code
    const requestInterceptor = instance.interceptors.response.use((response) => {
      if (response.status === 200) { /* onSucessCallback() */ }
      return response
    }, async (error) => {
      if (error.response.status === 500) {
        if ((config?.onErrorCallback) != null) config?.onErrorCallback()
      }
      if (error.response.status === 401) {
        if ((config?.onUnauthorizedCallback) != null) config?.onUnauthorizedCallback()
      }
      return await Promise.reject(error)
    })
    return () => {
      instance.interceptors.response.eject(requestInterceptor)
    }
  }, [])
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function newAbortSignal () {
    const abortController = new AbortController()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    setTimeout(() => abortController.abort, config.timeout ?? 5000)
    return abortController.signal
  }

  const errorHandler = (e: unknown): void => {
    if (e instanceof AxiosError) {
      setError(e.message)
    } else {
      setError('Ocurrió un error')
    }
  }
  const fetch = React.useCallback(async (config: Config) => {
    try {
      const enabled = config.enabled
      if (enabled === false) return
      setLoading(true)
      const res = await instance.request<T>({
        ...config,
        method: config.method.toLowerCase(),
        signal: newAbortSignal(),
        headers: {
          ...config.headers
          // headers custom
        }
      })
      setResponse(res.data)
    } catch (e) {
      errorHandler(e)
      // throw new Error('bla bla') // ¿Qué pasa con React? -> Se desmonta el árbol de componentes + Error Boundary
    } finally {
      setLoading(false)
    }
  }, [instance])

  const fetcher = React.useCallback(async (_config: Config) => {
    try {
      const response = await instance.request<T>({
        ...configRef.current,
        ..._config // pisa la configRef.current
      })
      return response.data
    } catch (e) {
      errorHandler(e)
      return undefined
    }
  }, [instance])

  // OJO
  useDeepCompareEffect(() => {
    void fetch(configRef.current)
  }, [config])

  return {
    data: response,
    error,
    loading,
    fetcher
  }
}
