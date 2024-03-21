import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./CSS/index.css";

import UserRegisterPage from "./Component/UserRegisterPage";
import Dashboard from "./Component/Dashboard";
import ResetPasswordVerification from "./Component/ResetPasswordVerification";
import ResetPasswordPage from "./Component/ResetPasswordPage";
import UserRegisterLoginPage from "./Component/UserRegisterLoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },

  {
    path: "/register",
    element: <UserRegisterPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/loginRegister",
    element: <UserRegisterLoginPage />,
  },

  {
    path: "/resetPasswordVerification",
    element: <ResetPasswordVerification />,
  },
  {
    path: "/resetPasswordPage",
    element: <ResetPasswordPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
