import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "./pages/LayoutWrapper";
import CartMenu from "./components/CartMenu";
import Registeration from "./pages/Registeration";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import ProductsListPage from "./pages/ProductsListPage";
import Checkout from "./pages/Checkout";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<LayoutWrapper/>} >
      <Route path="/" element={<Home/>} />
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Registeration/>}/>

      <Route path="menuitems/:category" element={<ProductsListPage/>}/>
      <Route path="checkout" element={<Checkout/>}/>
      <Route path="forgotpassword" element={<ForgotPassword/>}/>
      </Route>
      </Routes>
      <CartMenu/>
      <ToastContainer/>
    </>
  );
}

export default App;