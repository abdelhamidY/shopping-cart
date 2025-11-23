import { type RouteObject } from "react-router-dom";
import { AppRoutes } from "../utils/constants/appRoutes.constant";
import React from "react";

const Home = React.lazy(() => import("../app/home"));
const ProductDetails = React.lazy(() => import("../app/product-details"));
const Cart = React.lazy(() => import("../app/cart"));

export const routes: RouteObject[] = [
  {
    path: AppRoutes.home,
    element: <Home />,
  },
  {
    path: AppRoutes.productDetails(":id"),
    element: <ProductDetails />,
  },
  {
    path: AppRoutes.cart,
    element: <Cart />,
  },
];
