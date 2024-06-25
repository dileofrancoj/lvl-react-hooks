import * as React from 'react'

interface UseWindowsResize {
  width: number
  height: number
}

export function useWindowsResize (): UseWindowsResize {
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
