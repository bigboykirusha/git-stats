import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElem = document.getElementById("root");

if (rootElem) {
  const root = createRoot(rootElem);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
