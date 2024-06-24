import * as React from 'react'

import { useEvent } from './hooks/useEvent'
import { useThrottle } from './hooks/useThrottle'
import { SendButton } from './SendButton'

function App (): JSX.Element {
  const [text, setText] = React.useState('')
  console.log('text', text)
  // wrappear -> envolver algo
  const onClick = useEvent(() => {
    console.info('input value: ', text)
    // const response = sendToApi(text)
    // .... mostramos un modal con un resultado, redirigimos ....
  })
  const onButtonClick = useThrottle(() => {
    // sendTracking
    // deeplink()
    console.log('click sobre el boton')
    //
  }, 1_000)
  return (
    <>
      <h2>Lib de hooks</h2>
      <hr />
      <h2>Input</h2>
      <input type="text" onChange={(e) => { setText(e.target.value) }} />
      <SendButton onClick={onClick} />
      <br />
      <button onClick={onButtonClick}>Apretame</button>
    </>
  )
}

export default App
