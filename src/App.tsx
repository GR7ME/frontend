import "./App.css";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import { router } from "./route";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
