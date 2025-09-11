import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { PropsWithChildren } from 'react'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

export function AppThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default theme
