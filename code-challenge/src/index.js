import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./theme"; // This custom provider is a key improvement for managing app-wide theming.
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Wrapping the app in a custom ThemeProvider from "./theme.js" makes theming clean and scalable. */}
    <ThemeProvider>
      {/* CssBaseline resets default browser styles for a consistent look. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

