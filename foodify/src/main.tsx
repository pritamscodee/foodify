import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";
import { createBrowserRouter } from "react-router";
import FoodsWrapper from "./components/Foodwrapper";
import { RouterProvider } from "react-router/dom";
import Cart from "./components/Cart";
import Instruction from "./components/instruction";

import "./index.css";
import Wishlists from "./components/Wishlists";
import Call from "./components/Call";

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
      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "wishlist",
        element: <Wishlists />,
      },
      {
        path: "call",
        element: <Call />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
