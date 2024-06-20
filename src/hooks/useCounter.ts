import * as React from 'react'

interface UseCounterProps {
  initialValue?: number
}

interface UseCounter {
  increment: (num?: number) => void
  decrement: (num?: number) => void
  reset: () => void
  value: number
}

export const useCounter = ({ initialValue = 0 }: UseCounterProps): UseCounter => {
  const [value, setValue] = React.useState<number>(initialValue)

  const increment = (num = 1): void => {
    setValue((prev) => prev + num)
  }

  const decrement = (num = 1): void => {
    setValue((prev) => prev - num)
  }

  const reset = (): void => { setValue(initialValue) }

  return {
    value,
    increment,
    decrement,
    reset
  }
}
