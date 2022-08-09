
import React, { useId } from 'react'

export default function FieldTextView (props: {
  label?: string
  value: string
  onChange: (newValue: string) => void
  placeholder?: string
}): JSX.Element {
  const id = useId()
  return (
    <div className='field-text'>
      {props.label !== undefined && (
        <label className='field-text__label' htmlFor={id}>
          {props.label}
        </label>
      )}
      <input
        className='field-text__input'
        id={id}
        type='text'
        value={props.value}
        onChange={evt => props.onChange(evt.target.value)}
        placeholder={props.placeholder}
      />
    </div>
  )
}
