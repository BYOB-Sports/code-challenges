import * as React from "react"
import MUISelect from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import type { SelectProps as MUISelectProps } from '@mui/material/Select'

export type SelectProps = MUISelectProps

const Select = React.forwardRef<HTMLDivElement, MUISelectProps>((props, ref) => (
  <MUISelect ref={ref} {...props} />
))
Select.displayName = "Select"

export { Select, MenuItem, FormControl, InputLabel }
