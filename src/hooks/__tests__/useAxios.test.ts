import { renderHook } from '@testing-library/react'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter' // return new Promise((resolve, reject) => {})

import { useAxios } from '../useAxios'

describe('useAxios', () => {
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
