import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import LogoutPage from "./pages/LogoutPage.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <p>home</p>,
      },
      {
        path: "search",
        element: <SearchPage/>,
      },
      {
        path: "library",
        element: <p>library</p>,
      },
      {
        path: "friends",
        element: <p>friends</p>,
      },
      {
        path: "login",
        element: <LoginPage/>,
      },
      {
        path: "logout",
        element: <LogoutPage/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
