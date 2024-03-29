import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "./pages/LayoutWrapper";
import CartMenu from "./components/CartMenu";
import Registeration from "./pages/Registeration";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import HomeToken from "./pages/HomeToken";
import ProductsListPage from "./pages/ProductsListPage";
import Checkout from "./pages/Checkout";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./pages/UserProfile";
import AllCategory from "./pages/AllCategory";
import ResetPassword from "./pages/ResetPassword";
import SuccessPage from "./pages/SuccessPage";
import Barcode from "./components/Barcode";
import GetRecommendations from "./components/getrec";
import Reservation from "./components/Reservation";
import SuccessPagecash from "./pages/Successcash";
import ErrorPage from "./pages/ErrorPage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route path="/" element={<Home  />} />{" "}
          <Route path="/:tableToken" element={<HomeToken />} />{" "}
          <Route path="login" element={<Login />} />{" "}
          <Route path="register" element={<Registeration />} />{" "}
          <Route path="menuitems/:category" element={<ProductsListPage />} />{" "}
          <Route path="checkout" element={<Checkout />} />{" "}
          <Route path="forgotpassword" element={<ForgotPassword />} />{" "}
          <Route path="resetpassword/:resetToken" element={<ResetPassword />} />{" "}
          <Route path="profile" element={<UserProfile />} />{" "}
          <Route path="allcategory" element={<AllCategory />} />{" "}
          <Route path="success" element={<SuccessPage />} />{" "}
          <Route path="ordersuccess" element={<SuccessPagecash />} />{" "}
          <Route path="error" element={<ErrorPage />} />{" "}
          <Route
            path="allcategory/menuitems/:category"
            element={<ProductsListPage />}
          />{" "}
          <Route path="barcode" element={<Barcode />} />{" "}
          <Route path="recommendation" element={<GetRecommendations />} />{" "}
          <Route path="Reservation" element={<Reservation />} />{" "}
          <Route path="contactus" element={<ContactUs />} />{" "}
          <Route path="aboutus" element={<AboutUs />} />
        </Route>{" "}
      </Routes>{" "}
      <CartMenu />
      <ToastContainer />
    </>
  );
}

export default App;
