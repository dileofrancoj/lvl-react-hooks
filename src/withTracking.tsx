// HoC -> High Order Component (Funciones de orden superior)

/*
    Recibe un componente y devuelve un componente con atirbutos trackeables
    Se encarga de disparar 1 vez el evento SHOWN -> Cuando el componente está en el viewport
*/

import * as React from 'react'

import { useEvent } from './hooks/useEvent'
import { useIsInView } from './hooks/useIsInView'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const withTracking = <P extends Props>(BaseComponent: React.FC<P>) => {
  return function Component (props: P) {
    // do stuff
    const ref = React.useRef<HTMLDivElement>(null)
    const isInView = useIsInView(ref)
    // SINGLETON: Patron creacional -> garantiza es que haya una instancia de un elemento
    const seen = React.useRef(false)

    const event = useEvent(() => {
      console.info('element has been seen')
    })

    React.useEffect(() => {
      if (isInView && !seen.current) {
        event()
        seen.current = true
      }
    }, [isInView, event])

    return (
            <div ref={ref}>
                <BaseComponent {...props} />
            </div>
    )
  }
}
