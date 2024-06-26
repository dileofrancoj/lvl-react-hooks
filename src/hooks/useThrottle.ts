// @ts-expect-error .d.ts
import { type AnyFunction, throttle } from 'lvlup-js-utils'
import React from 'react'

import { useEvent } from './useEvent'

export function useThrottle<T extends AnyFunction> (fn: T, delay: number): T {
  const event = useEvent(fn)
  return React.useMemo(() => throttle(event, delay), [event, delay]) // throttle(event, delay) -> ¿funcion o un valor?
}
