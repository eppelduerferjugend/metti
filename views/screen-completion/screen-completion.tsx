
import ButtonView from '../button/button'
import HeaderView from '../header/header'
import IconView from '../icon/icon'
import React from 'react'
import { CreateOrderResponse } from '../../types/types'

export default function ScreenCompletionView (props: {
  state: 'loading' | 'error' | 'success'
  createOrderResult?: CreateOrderResponse
  onBackClick?: React.MouseEventHandler
  onDoneClick?: React.MouseEventHandler
  onRetryClick?: React.MouseEventHandler
}): JSX.Element {
  return (
    <div className='screen screen-completion'>
      <HeaderView
        title='Metti'
        backEnabled={props.state === 'error'}
        onBackClick={props.onBackClick}
      />
      <div className='screen__content screen__content--centered'>

        {props.state === 'loading' ? (
          <IconView
            icon='spinner'
            className={
              'screen-completion__icon ' +
              'screen-completion__icon--spinning'
            }
          />
        ) : null}

        {props.state === 'success' ? (
          <div className='screen-completion__alert'>
            <IconView
              icon='checkCircle'
              className='screen-completion__icon'
            />
            {!Array.isArray(props.createOrderResult) && (
              <p className='screen-completion__message'>
                Bestellung ass opginn.
              </p>
            )}
            {Array.isArray(props.createOrderResult) && (
              <p className='screen-completion__message'>
                {props.createOrderResult.length === 1 && (
                  `D'Bestellung ${props.createOrderResult[0].number} ass opginn.`
                )}
                {props.createOrderResult.length !== 1 && (
                  `D'Bestellungen ${props.createOrderResult.map(order => order.number).join(', ')} sinn opginn.`
                )}
              </p>
            )}
            <ButtonView
              label='Fäerdeg'
              onClick={props.onDoneClick}
            />
          </div>
        ) : null}

        {props.state === 'error' ? (
          <div className='screen-completion__alert'>
            <IconView
              icon='errorCircle'
              className='screen-completion__icon'
            />
            <p className='screen-completion__message'>
              Et gouf e Problem beim Bestellen.
              Iwwerpréif deng Internetverbindung.
            </p>
            <ButtonView
              label='Wiederhuelen'
              onClick={props.onRetryClick}
            />
          </div>
        ) : null}

      </div>
    </div>
  )
}
