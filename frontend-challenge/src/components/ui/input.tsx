import * as React from "react"
import TextField from '@mui/material/TextField'
import type { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField'

export type InputProps = MUITextFieldProps

const Input = React.forwardRef<HTMLInputElement, MUITextFieldProps>((props, ref) => {
  return <TextField inputRef={ref} {...props} />
})
Input.displayName = "Input"

export { Input }
