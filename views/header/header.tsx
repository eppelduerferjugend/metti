
import React from 'react'

export default function HeaderView (props: {
  title?: string
  backEnabled?: boolean
  backLabel?: string
  doneEnabled?: boolean
  doneLabel?: string
  onBackClick?: React.MouseEventHandler
  onDoneClick?: React.MouseEventHandler
}): JSX.Element {
  return (
    <header className='header'>
      <div className='header__item'>
        {props.onBackClick ? (
          <button
            className='header__button'
            onClick={event => {
              window.scrollTo(0, 0)
              props.onBackClick?.(event)
            }}
            disabled={props.backEnabled === false}>
            {props.backLabel ?? 'Zeréck'}
          </button>
        ) : null}
      </div>
      <div className='header__item'>
        <h2 className='header__title'>{props.title}</h2>
      </div>
      <div className='header__item'>
        {props.onDoneClick ? (
          <button
            className='header__button'
            onClick={event => {
              window.scrollTo(0, 0)
              props.onDoneClick?.(event)
            }}
            disabled={props.doneEnabled === false}>
            {props.doneLabel ?? 'Fäerdeg'}
          </button>
        ) : null}
      </div>
    </header>
  )
}
