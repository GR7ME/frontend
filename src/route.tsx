import LogPage from "@/features/Log/Log";
import SettingPage from "@/features/Setting/Setting";
import DashboardPage from "@/features/Dashboard/Dashboard";
import ProtectedLayout from "./layout/ProtectedLayout";
import Login from "@/features/Login";
import SignUp from "@/features/SignUp";
import LoginLayout from "./layout/AuthLayout/LoginLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import {
    createBrowserRouter,
    Navigate,
  } from "react-router-dom";

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