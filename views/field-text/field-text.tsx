
import React from 'react'

export default function FieldTextView (props: {
  value: string
  onChange: (newValue: string) => void
  placeholder?: string
}): JSX.Element {
  return (
    <div className='field-text'>
      <input
        className='field-text__input'
        type='text'
        value={props.value}
        onChange={evt => props.onChange(evt.target.value)}
        placeholder={props.placeholder} />
    </div>
  )
}
