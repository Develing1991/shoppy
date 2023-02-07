import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

import AllProducts from "../pages/AllProducts";
import Home from "../pages/Home";
import MyCart from "../pages/MyCart";
import NewProduct from "../pages/NewProduct";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";
import ProtectedRoute from "../pages/ProtectedRoute";

export default function index({ children }) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <AllProducts />,
        },
        {
          path: "/products/new",
          loader: () => ({ auth: true }), //나중에 loader사용 해보기
          element: (
            <NewProduct />
            // <ProtectedRoute requireAdmin>
            //   <NewProduct />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/products/:id",
          element: <ProductDetail />,
        },
        {
          path: "/carts",
          loader: () => ({ auth: true }),
          element: (
            <ProtectedRoute>
              <MyCart />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router}>{children}</RouterProvider>;
}
