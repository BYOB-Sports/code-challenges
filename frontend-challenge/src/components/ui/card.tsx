import * as React from "react"
import MUICard from '@mui/material/Card'
import type { CardProps as MUICardProps } from '@mui/material/Card'

const Card = React.forwardRef<HTMLDivElement, MUICardProps>((props, ref) => (
  <MUICard ref={ref} {...props} />
))
Card.displayName = "Card"

export { Card }
