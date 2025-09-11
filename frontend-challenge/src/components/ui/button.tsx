import * as React from "react"
import MUIButton from '@mui/material/Button'
import type { ButtonProps as MUIButtonProps } from '@mui/material/Button'

export type ButtonProps = MUIButtonProps

const Button = React.forwardRef<HTMLButtonElement, MUIButtonProps>((props, ref) => (
  <MUIButton ref={ref} {...props} />
))
Button.displayName = "Button"

export { Button }
