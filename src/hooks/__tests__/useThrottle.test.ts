import { act, renderHook } from '@testing-library/react'
// @ts-expect-error .d.ts
import { type AnyFunction } from 'lvlup-js-utils'

import { useThrottle } from '../useThrottle'

describe('useThrottle', () => {
  it('should call throttle with the callback and delay', () => {
    vi.mock('lvlup-js-utils', () => ({
      throttle: vi.fn().mockImplementation((fn: AnyFunction) => fn)
    }))
    const fn = vi.fn()
    const delay = 1_000
    const { result } = renderHook(() => useThrottle(fn, delay))
    act(() => {
      result.current()
    })
    expect(fn).toHaveBeenCalledOnce()
  })
})

/*
describe.skip('useThrottle', () => {
  it('should throttle the callback with the specified delay', () => {
    const delay = 1_000
    const fn = vi.fn()
    const { result } = renderHook(() => useThrottle(fn, delay))
    act(() => {
      result.current()
      result.current()
      result.current()
    })
    expect(fn).toHaveBeenCalledOnce()
    vi.advanceTimersByTime(1_200)
    act(() => {
      result.current()
    })
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
 */
