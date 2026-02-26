import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";
import { createBrowserRouter } from "react-router";
import FoodsWrapper from "./components/Foodwrapper";
import { RouterProvider } from "react-router/dom";

import Instruction from "./components/instruction";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "foods",
        element: <FoodsWrapper />,
        children: [{ path: "instruction", element: <Instruction /> }],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);
