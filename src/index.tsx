import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import './index.scss'
const rootElem = document.getElementById("root");


if (rootElem) {
  const theme = localStorage.getItem('theme') || 'light';
  document.body.className = theme;
  const root = createRoot(rootElem);
  root.render(
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
}
