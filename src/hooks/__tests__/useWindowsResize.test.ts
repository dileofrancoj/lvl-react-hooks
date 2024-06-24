/*
    0. Que nuestro hook se inicialice con el estado inicial de forma correcta
    1. Se cambia el tamaño de la pantalla y se debería actualiar el state
*/
/*
    Cualquier acción que haga un usuario -> fireEvent
*/

import { fireEvent, renderHook } from '@testing-library/react'

import { useWindowsResize } from '../useWindowsResize'

describe('useWindowsResize', () => {
  /*
     global-> window
  */
  beforeEach(() => {
    global.innerWidth = 1024
    global.innerHeight = 600
  })

  it('should instance window object', () => {
    const { result } = renderHook(() => useWindowsResize())
    /*
    expect(result.current.height).toBe(600)
    expect(result.current.width).toBe(1200)
    */
    expect(result.current).toStrictEqual({ width: 1024, height: 600 })
  })
  it('Should update on windows resize', () => {
    const { result } = renderHook(() => useWindowsResize())
    expect(result.current).toStrictEqual({ width: 1024, height: 600 })

    global.innerWidth = 520
    global.innerHeight = 610
    fireEvent(window, new Event('resize'))
    expect(result.current).toStrictEqual({ width: 520, height: 610 })
  })
})
