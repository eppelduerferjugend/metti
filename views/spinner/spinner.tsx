
import IconView from '../icon/icon'
import React from 'react'

export default function SpinnerView (props: {
  value: number
  onChange: (newValue: number) => void
}): JSX.Element {
  const className = 'spinner' + (props.value === 0 ? ' spinner--empty' : '')
  return (
    <div className={className}>
      <button
        className='spinner__decrement'
        onClick={(event) => {
          event.preventDefault()
          const currentValue = props.value
          props.onChange(Math.max(currentValue - 1, 0))
        }}
      >
        <IconView icon='minus' />
      </button>
      <div className='spinner__indicator'>
        {props.value}
      </div>
      <button
        className='spinner__increment'
        onClick={(event) => {
          event.preventDefault()
          const currentValue = props.value
          props.onChange(Math.max(currentValue + 1, 0))
        }}
      >
        <IconView icon='plus' />
      </button>
    </div>
  )
}
