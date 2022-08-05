
type SVGProps = React.ComponentPropsWithoutRef<'svg'>

const iconSVGMap = {
  checkCircle: (props: SVGProps): JSX.Element => (
    <svg {...props} width='512' height='512' viewBox='0 0 512 512'>
      <path fill='currentColor' d='M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z' />
    </svg>
  ),
  errorCircle: (props: SVGProps): JSX.Element => (
    <svg {...props} width='512' height='512' viewBox='0 0 512 512'>
      <path fill='currentColor' d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z' />
    </svg>
  ),
  /** Icon by Iconic (https://iconic.app/minus/) */
  minus: (props: SVGProps): JSX.Element => (
    <svg {...props} width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M18.25 12.25L5.75 12.25' />
    </svg>
  ),
  /** Icon by Iconic (https://iconic.app/plus/) */
  plus: (props: SVGProps): JSX.Element => (
    <svg {...props} width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M12 5.75V18.25' />
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M18.25 12L5.75 12' />
    </svg>
  ),
  spinner: (props: SVGProps): JSX.Element => (
    <svg {...props} width='512' height='512' viewBox='0 0 512 512'>
      <path fill='currentColor' d='M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z' />
    </svg>
  )
}

export type Icon = keyof (typeof iconSVGMap)

type IconViewProps = SVGProps & {
  icon: Icon
}

export default function IconView (props: IconViewProps): JSX.Element {
  const { icon, ...viewProps } = props
  const renderSVG = iconSVGMap[icon]
  return renderSVG({ ...viewProps })
}
