import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "./pages/LayoutWrapper";
import CartMenu from "./components/CartMenu";
import Registeration from "./pages/Registeration";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import HomeToken from "./pages/HomeToken";
import ProductsListPage from "./pages/ProductsListPage";
import Checkout from "./pages/Checkout";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./pages/UserProfile"
import AllCategory from "./pages/AllCategory";
import ResetPassword from "./pages/ResetPassword";
import SuccessPage from "./pages/SuccessPage";
import Barcode from "./components/Barcode";
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<LayoutWrapper/>} >
      <Route path="/" element={<Home/>} />
      <Route path="/:tableToken" element={<HomeToken/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Registeration/>}/>


      <Route path="menuitems/:category" element={<ProductsListPage/>}/>
      <Route path="checkout" element={<Checkout/>}/>
      <Route path="forgotpassword" element={<ForgotPassword/>}/>
      <Route path="resetpassword/:resetToken" element={<ResetPassword/>}/>
      <Route path="profile" element={<UserProfile/>}/>
      <Route path="allcategory" element={<AllCategory/>}/>
      <Route path="success" element={<SuccessPage/>}/>
      <Route path="allcategory/menuitems/:category" element={<ProductsListPage/>}/>
      <Route path="barcode" element={<Barcode/>}/>
      
      </Route>
      </Routes>
      <CartMenu/>
      <ToastContainer/>
    </>
  );
}

export default App;