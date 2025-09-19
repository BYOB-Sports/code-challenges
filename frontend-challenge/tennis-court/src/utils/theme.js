import { createTheme } from "@mui/material";
import { Geist, Geist_Mono } from "next/font/google";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
  typography: {
    fontFamily: `"${geistSans.style.fontFamily}", "${geistMono.style.fontFamily}", sans-serif`,
  },
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});