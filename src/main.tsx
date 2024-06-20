import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TokenProvider } from "@/context/token-provider";
import { UserProvider } from "./context/user-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <UserProvider>
        <React.StrictMode>
          <App />
          <Toaster />
        </React.StrictMode>
      </UserProvider>
    </ThemeProvider>
  </TokenProvider>,
);
