/*
    1. que se ejecute correctamente el callback
    2. debería memoizar el manejador
*/

import { act, renderHook } from '@testing-library/react'

import { useEvent } from '../useEvent'

describe('useEvent', () => {
  it('should execute the main callback', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useEvent(fn))
    act(() => {
      result.current()
    })
    expect(fn).toHaveBeenCalledOnce()
  })

  it('should memoize the handler', () => {
    const fn = vi.fn()
    const { result, rerender } = renderHook(() => useEvent(fn))
    const eventHandlerOne = result.current
    rerender() // emulamos un cambio de estado
    const eventHandlerTwo = result.current
    expect(eventHandlerOne).toStrictEqual(eventHandlerTwo)
  })
})
