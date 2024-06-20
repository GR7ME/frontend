import LogPage from "@/features/log";
import SettingPage from "@/features/setting";
import DashboardPage from "@/features/dashboard";
import ProtectedLayout from "./components/layout/protected-layout";
import Login from "@/features/login";
import SignUp from "@/features/signup";
import LoginLayout from "./components/layout/auth-layout";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" />,
  },
  {
    path: "/auth",
    element: <LoginLayout />,
    children: [
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "signup/",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedLayout>
        <DashboardLayout />
      </ProtectedLayout>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "logs/",
        element: <LogPage />,
      },
      {
        path: "settings/",
        element: <SettingPage />,
      },
    ],
  },
]);
