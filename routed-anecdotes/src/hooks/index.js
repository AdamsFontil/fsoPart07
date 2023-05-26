import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    console.log('resetHook')
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}
