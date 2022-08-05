
import React from 'react'

export default function ButtonView (props: {
  enabled?: boolean
  onClick?: React.MouseEventHandler
  label?: string
}): JSX.Element {
  return (
    <button
      className='button'
      disabled={props.enabled === false}
      onClick={props.onClick}>
      {props.label}
    </button>
  )
}
