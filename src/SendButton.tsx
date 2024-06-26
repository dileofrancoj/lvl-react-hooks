import * as React from 'react'

interface SendButtonProps {
  onClick: () => void
}

export const Component: React.FC<SendButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}> enviar </button>
  )
}

export const SendButton = React.memo(Component)
