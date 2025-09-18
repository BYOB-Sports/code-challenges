import React, { createContext, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

// 1. Create a context to hold the theme mode and toggle function
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// 2. A custom provider component to wrap your app
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  // Memoize the toggle function to prevent unnecessary re-renders
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  // Memoize the theme creation to avoid re-creating it on every render
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#ff9800",
          },
          background: {
            default: mode === "light" ? "#f9f9f9" : "#121212",
            paper: mode === "light" ? "#fff" : "#1e1e1e",
          },
        },
        typography: {
          fontFamily: "Roboto, Arial, sans-serif",
          button: {
            textTransform: "none",
          },
        },
        shape: { borderRadius: 8 },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

// 3. A custom hook to make it easier to use the context
export const useColorMode = () => useContext(ColorModeContext);