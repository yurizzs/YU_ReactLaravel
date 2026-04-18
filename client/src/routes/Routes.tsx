import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATHS } from "./path";

// Lazy Loading
const Dashboard = React.lazy(() => import("../pages/Dashboard"));

export const Routes = createBrowserRouter([
  // // Public Routes
  // {
  //   index: true,
  //   element: <Navigate to={PATHS.APP.ROOT} replace />,
  // },
  // {
  //   path: PATHS.LOGIN,
  //   element: <div>Login Page</div>, // Replace with your Login component
  // },

  // Authenticated
  {
    path: PATHS.APP.ROOT,
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.APP.DASHBOARD} replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },

]);
