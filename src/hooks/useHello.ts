import * as React from 'react'

export const useHello = (): unknown => {
  const [state, setState] = React.useState('')
  return {
    state,
    setState
  }
}
