// @ts-expect-error d.ts
import { type AnyFunction } from 'lvlup-js-utils'
import * as React from 'react'

interface UseWindowsResize {
  width: number
  height: number
}

interface WindowsResizeProps {
  callback?: AnyFunction
}

export function useWindowsResize (callback?: WindowsResizeProps): UseWindowsResize {
  const [windowsSize, setWindowsSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const onResize = (): void => {
    // callback()
    setWindowsSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  React.useEffect(() => {
    window.addEventListener('resize', onResize)
    // ¿cleanup?
    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  return windowsSize
}
