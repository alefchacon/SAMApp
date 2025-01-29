import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.jsx";
import "./index.css";

import { SnackbarProvider } from "./components/contexts/SnackbarContext.jsx";
import { ModalProvider } from "./components/contexts/ModalContext.jsx";
import { StatusProvider } from "./components/contexts/StatusContext.jsx";
import { simplePathPrefix } from "./routing/backendRoutes.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={simplePathPrefix}>
    <StatusProvider>
      <SnackbarProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SnackbarProvider>
    </StatusProvider>
  </BrowserRouter>
);
