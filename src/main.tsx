import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./CSS/index.css";

import UserRegisterPage from "./Component/UserRegisterPage";
import Dashboard from "./Component/Dashboard";
import ResetPasswordVerification from "./Component/ResetPassword/ResetPasswordVerification";
import ResetPasswordPage from "./Component/ResetPassword/ResetPasswordPage";
import UserRegisterLoginPage from "./Component/UserRegisterLoginPage";
import BankToWallet from "./Component/Transaction/BankToWallet";
import EditProfile from "./Component/Profile/Profile";
import UserProfile from "./Component/Profile/UserProfile";

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
  {
    path: "/BankToWallet/:bank_name",
    element: <BankToWallet />,
  },
  {
    path: "/editProfile",
    element: <EditProfile />,
  },
  {
    path: "/viewProfile",
    element: <UserProfile />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
