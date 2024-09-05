import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.jsx";
import "./index.css";

import { SnackbarProvider } from "./components/contexts/SnackbarContext.jsx";
import { ModalProvider } from "./components/contexts/ModalContext.jsx";
import { StatusProvider } from "./components/contexts/StatusContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StatusProvider>
        <ModalProvider>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </ModalProvider>
      </StatusProvider>
    </BrowserRouter>
  </React.StrictMode>
);
