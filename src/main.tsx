import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { ErrorBoundary } from "react-error-boundary";

import { ThemeProvider } from "@/context/themeprovider";
// import { MainErrorFallback } from "./components/errors/main";
import { Toaster } from "@/components/ui/toaster"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <React.StrictMode>
      {/* <ErrorBoundary FallbackComponent={MainErrorFallback}> */}
        <App />
        <Toaster />
      {/* </ErrorBoundary> */}
    </React.StrictMode>
  </ThemeProvider>,
);
