"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/utils/theme";

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
