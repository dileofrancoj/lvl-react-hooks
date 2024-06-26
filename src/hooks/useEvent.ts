// @ts-expect-error .d.ts
import { type AnyFunction } from 'lvlup-js-utils'
import React from 'react'

export function useEvent<T extends AnyFunction> (callback: T): T {
  const ref = React.useRef<AnyFunction | undefined>(callback)

  React.useEffect(() => {
    ref.current = callback
  }, [callback])

  return React.useCallback<AnyFunction>((...args: AnyFunction) => ref.current(...args), [])
}
