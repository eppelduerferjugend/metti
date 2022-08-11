
type SVGProps = React.ComponentPropsWithoutRef<'svg'>

const iconSVGMap = {
  /** Icon by Iconic (https://iconic.app/check-circle/) */
  checkCircle: (props: SVGProps): JSX.Element => (
    <svg {...props} width='24' height='24' fill='none' viewBox='0 0 24 24'>
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75V4.75C16.0041 4.75 19.25 7.99594 19.25 12V12C19.25 16.0041 16.0041 19.25 12 19.25V19.25C7.99594 19.25 4.75 16.0041 4.75 12V12Z' />
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75' />
    </svg>
  ),
  /** Icon by Iconic (https://iconic.app/close-circle/) */
  errorCircle: (props: SVGProps): JSX.Element => (
    <svg {...props} width='24' height='24' fill='none' viewBox='0 0 24 24'>
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75V4.75C16.0041 4.75 19.25 7.99594 19.25 12V12C19.25 16.0041 16.0041 19.25 12 19.25V19.25C7.99594 19.25 4.75 16.0041 4.75 12V12Z' />
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M9.75 9.75L14.25 14.25' />
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M14.25 9.75L9.75 14.25' />
    </svg>
  ),
  /** Icon by Iconic (https://iconic.app/refresh/) */
  refresh: (props: SVGProps): JSX.Element => (
    <svg {...props} width='24' height='24' fill='none' viewBox='0 0 24 24'>
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M11.25 4.75L8.75 7L11.25 9.25' />
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M12.75 19.25L15.25 17L12.75 14.75' />
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M9.75 7H13.25C16.5637 7 19.25 9.68629 19.25 13V13.25' />
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M14.25 17H10.75C7.43629 17 4.75 14.3137 4.75 11V10.75' />
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
  /** Icon by Iconic Pro (https://iconic.app/hourglass/) */
  hourglass: (props: SVGProps): JSX.Element => (
    <svg {...props} width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path d='M5.75 4.75H18.25M6.75 4.75H17.25V6C17.25 8.89949 14.8995 11.25 12 11.25C9.10051 11.25 6.75 8.8995 6.75 6V4.75Z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M9 10H15' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M5.75 19.25H18.25M6.75 19.25H17.25V17.5C17.25 14.6005 14.8995 12.25 12 12.25C9.10051 12.25 6.75 14.6005 6.75 17.5V19.25Z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
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
