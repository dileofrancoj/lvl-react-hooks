import * as React from 'react'

export const useHello = (): unknown => {
  const [state, setState] = React.useState('')
  console.log('in useHello hook')
  return {
    state,
    setState
  }
}
