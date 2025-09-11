import * as React from "react"
import TextField from '@mui/material/TextField'
import type { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField'

export type TextareaProps = MUITextFieldProps

const Textarea = React.forwardRef<HTMLDivElement, MUITextFieldProps>((props, ref) => (
  <TextField inputRef={ref as any} multiline {...props} />
))
Textarea.displayName = "Textarea"

export { Textarea }
