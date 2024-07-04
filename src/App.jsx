import { useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Categories from "./components/Categories/Categories";
import Orders from "./components/Orders/Orders";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Notfound from "./components/Notfound/Notfound";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./components/CheckOut/CheckOut";
import WishListContextProvider from "./Context/WishListContext";
import WishList from "./components/WishList/WishList";
import VerifyCode from "./components/VerifyCode/VerifyCode";



const query = new QueryClient({
  defaultOptions:{

  }
});

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            
           <Orders/>
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute> 
            <Cart />
           </ProtectedRoute> 
        ),
      },
      {
        path: "checkOut",
        element: (
          <ProtectedRoute> 
            <CheckOut />
           </ProtectedRoute> 
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      { path: "productDetails/:id/:category", element: <ProductDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "forgetpassword",
        element: (
            <ForgetPassword />
        ),
      },
      {
        path: "verifycode",
        element: (
            <VerifyCode />
        ),
      },
      {
        path: "reset-password",
        element: (
            <ResetPassword />
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
          <RouterProvider router={routes}></RouterProvider>
          <ReactQueryDevtools initialIsOpen="false"/>
          <Toaster/>
          </WishListContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
