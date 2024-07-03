import { renderHook } from '@testing-library/react'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter' // return new Promise((resolve, reject) => {})

import { useAxios } from '../useAxios'

describe('useAxios', () => {
  it('throw error if config is undefined', () => {
    try {
      const config = undefined
      // @ts-expect-error i want to test undefined conf
      renderHook(() => useAxios(config))
    } catch (error) {
      if (error instanceof Error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('useAxios must be initialized with config params')
      }
    }
  })

  it('throw error if instace is undefined', () => {
    try {
      const config = { url: '/some-endpoint', method: 'get', enabled: true }
      // @ts-expect-error i want to test undefined conf
      renderHook(() => useAxios(config))
    } catch (error) {
      if (error instanceof Error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('useAxios must be initialized with an instance of axios')
      }
    }
  })
  it('useAxios throw an error when HTTP request fails', async () => {
    const mock = new AxiosMockAdapter(axios)
    mock.onGet('/some-endpoint').reply(500, { message: 'error' })
    const config = { instance: axios, url: '/some-endpoint', method: 'get', enabled: true, onErrorCallback: vi.fn() }
    // @ts-expect-error missing enum in method
    const { result } = renderHook(() => useAxios(config))
    await vi.waitFor(() => {
      expect(result.current.error).toBe('Ocurrió un error')
      expect(result.current.loading).toBe(false)
      expect(config.onErrorCallback).toHaveBeenCalledOnce()
    })
  })
  it('useAxios fetch data and update state', async () => {
    const mock = new AxiosMockAdapter(axios) // mock de axios solo valido para test
    mock.onGet('/some-endpoint').reply(200, { data: 'fran' })
    const config = { instance: axios, url: '/some-endpoint', method: 'get', enabled: true }
    // @ts-expect-error missing enum in method
    const { result } = renderHook(() => useAxios(config))

    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.data).toStrictEqual({ data: 'fran' })
      expect(result.current.error).toBe('')
    })
  })
})
