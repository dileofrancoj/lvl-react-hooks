/*
    Verifica que un elemento este visualmente en el viewport + HoC
    Casos de uso:
        - Infinite Scroll
        - Short Polling
        - Tracking: Entender el comportamiento del usuario en la app -> modelos de data
            quiero disparar un evento de tracking (BANNER.SHOWN, VENDOR.SHOWN) cuando un elemento está en pantalla
            impresión: cuando un elemento aparece en el viewport (al menos el 70%) del usuario y el usuario lo ve por más de 1s

            useOnImpression -> useInInview() + useTimer()

    Intersection Observer API

    Provee una forma asincrona de observar cambios en elementos de la UI
    <img src loading='lazy' src=... alt=.../> -> carga a demanda
    Lazy loading componentes (chunks .js -> url (manifest.json)) -> Intersection Observer

    P90 de un servicio backend 150ms -> 90% de los usuarios que hicieron una request el servicio demoro 150ms O MENOS
    P90 de altura de argentinos es de 1.85 ->
    P75 tiempo en cargar de nuestra webview 1.7s -> al 75% de los usuarios la web le cargó en 1.7s o menos

    P99 del tiempo de sesión del usuario en la web es de 9' 40" -> que el 95% de los usuarios pasa 9' o menos en la vista
    Short poling -> cada 10'

    Implementando una libreria de fetch -> ¿timeout? P99 de mi servicio backend -> 200ms, 250ms de TO

    Intersection Observer API
    - Root: elemento que vamos a utilizar como referencia (ref)
    - Root margin: El margen alredor de elemento
    - Threshold: Un porcentaje o numero y nos habla de a que % de visibilidad se debe disparar el evento
*/

import * as React from 'react'
type Ref = React.RefObject<Element | null>
export function useIsInView (ref: Ref): boolean {
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const observer = new IntersectionObserver((entries) => {
    const [entry] = entries
    setIsIntersecting(entry.isIntersecting)
  })

  React.useEffect(() => {
    const currentRef = ref.current
    if (currentRef !== null) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef !== null) {
        observer.unobserve(currentRef)
      }
    }
  }, [observer, ref])

  return isIntersecting
}
