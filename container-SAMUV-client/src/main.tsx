import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.js";
import "./index.css";

import { SnackbarProvider } from "./components/contexts/SnackbarContext";
import { ModalProvider } from "./components/contexts/ModalContext";
import { StatusProvider } from "./components/contexts/StatusContext";
import { simplePathPrefix } from "./routing/BackendRoutes";
import { Toaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={simplePathPrefix}>
    <StatusProvider>
      <SnackbarProvider>
        <ModalProvider>
          <App />
          <Toaster position="top-center" richColors />
        </ModalProvider>
      </SnackbarProvider>
    </StatusProvider>
  </BrowserRouter>
);
