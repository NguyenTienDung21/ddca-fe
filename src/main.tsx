import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage/ErrorPage.tsx";
import { AdminPage } from "./components/AdminPage/AdminPage.tsx";
import { LoginPage } from "./components/LoginPage/LoginPage.tsx";
import { SignUpPage } from "./components/SignUpPage/SignUpPage.tsx";
import { AdminFeatures } from "./components/AdminFeatures/AdminFeatures.tsx";
import { SupervisorFeatures } from "./components/SupervisorFeatures/SupervisorFeatures.tsx";
import { OperatorFeatures } from "./components/OperatorFeatures/OperatorFeatures.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import SessionPage from "./components/SessionPage/SessionPage.tsx";
import { OperatorPage } from "./components/OperatorPage/OperatorPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/operator",
    element: <OperatorPage />,
  },
  {
    path: "/supervisor-features",
    element: <SupervisorFeatures />,
  },
  {
    path: "/admin-features",
    element: <AdminFeatures />,
  },
  {
    path: "/operator-features",
    element: <OperatorFeatures />,
  },
  {
    path: "/sessions",
    element: <SessionPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
