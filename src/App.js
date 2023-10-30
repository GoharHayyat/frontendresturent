import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "./pages/LayoutWrapper";
import CartMenu from "./components/CartMenu";
import Registeration from "./pages/Registeration";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import ProductsListPage from "./pages/ProductsListPage";
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<LayoutWrapper/>} >
      <Route path="/" element={<Home/>} />
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Registeration/>}/>

      <Route path="menuitems/:category" element={<ProductsListPage/>}/>
      </Route>
      </Routes>
      <CartMenu/>
      {/* <ToastContainer/> */}
    </>
  );
}

export default App;