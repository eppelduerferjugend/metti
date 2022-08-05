
import React from 'react'

export default function SegmentedControlView (props: {
  segments: string[]
  selectedIndex: number
  onChange: (newIndex: number) => void
}): JSX.Element {
  return (
    <div className='segmented-control'>
      {props.segments.map((segment, index) => {
        const isActive = index === props.selectedIndex
        const className = 'segmented-control__segment' +
          (isActive ? ' segmented-control__segment--selected' : '')
        return (
          <button
            className={className}
            onClick={event => {
              event.preventDefault()
              props.onChange(index)
            }}
            key={index}
          >
            {segment}
          </button>
        )
      })}
    </div>
  )
}
