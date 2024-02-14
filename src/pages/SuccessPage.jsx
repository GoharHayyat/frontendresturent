import React, { useEffect, useState } from "react";
import WaveMotion from "../components/WaveMotion";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { setCart } from "../features/Cart";
import { removeFromCart } from "../features/Cart";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

function SuccessPage() {
  const cart = useSelector((state) => state.cart.cart);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const [span, setSpan] = useState("");
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [usertable, setUserTable] = useState({});
  const [usertablecheck, setUserTablecheck] = useState(false);
  const [manually, setmanually] = useState(true);
  // const [manuallyData, setmanuallyData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errormessage, setErrormessage] = useState(true);
  const [inputData, setInputData] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponn, setCouponn] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const loginDataString = localStorage.getItem("loginData");

    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      setUser(loginData);
      // console.log("user", user);
    }
    const storedData = localStorage.getItem("Coupon");
    if (storedData) {
      setCoupon(storedData);
      setCouponn(true);
    }
    localStorage.removeItem("HTML5_QRCODE_DATA");
    const getDataFromLocalStoragee = () => {
      const storedData = localStorage.getItem("user_table");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserTablecheck(true);
        setUserTable(parsedData);
        setInputData("cgh")
      }
    };
    getDataFromLocalStoragee();
  }, []);

  console.log("dtgfhf", user);

  useEffect(() => {
    const processAnotherAPI = async () => {
      const products = cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.count,
      }));

      const updateproducts = cart.map((item) => ({
        describtion: item.describtion,
        quantity: item.count,
      }));

      var ingredientsToUpdate = [];

      updateproducts.forEach((product) => {
        var productDescription = product.describtion;
        var productObj = JSON.parse(productDescription);

        for (var key in productObj) {
          if (productObj.hasOwnProperty(key)) {
            var name = key;
            var quantity = productObj[key];

            if (quantity !== -99) {
              var quantityy = productObj[key] * product.quantity;
              // Store name and quantity in the array
              ingredientsToUpdate.push({ name, quantityy });
            }
          }
        }
      });

      const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.count,
        0
      );

      const purchaseData = cart.map((item) => ({
        name: item.name,
        quantity: item.count,
      }));

      try {
        const orderResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/orders`,
          {
            userId: user && user.favorites && user.favorites._id,
            products,
            onlinePayment: true,
            totalPrice,
            tableNo: usertable,
          }
        );

        if (orderResponse.status >= 200 && orderResponse.status < 300) {
          if (couponn) {
            console.log("Inside couponn block");
            try {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              const couponResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/verifycouponupdate`,
                { coupon }
              );

              if (couponResponse.status === 200) {
                setCoupon("");
                setCouponn(false);
                localStorage.removeItem("Coupon");
              } else {
                // Handle non-successful coupon verification
                throw new Error("Failed to verify coupon");
              }
            } catch (couponError) {
              console.error("Error verifying coupon:", couponError);
              // Handle coupon verification error
              // You might want to provide feedback to the user or take other actions
            }
          }

          const stockUpdateResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/ingredients/updateorignalstock`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ingredientsToUpdate),
            }
          );

          if (stockUpdateResponse.ok) {
            try {
              const purchaseResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/updateTotalPurchases`,
                purchaseData
              );

              cart.forEach((item) =>
                dispatch(removeFromCart({ _id: item._id }))
              );
              // Order and stock update were successful
              // toast.success("Order submitted successfully");
              localStorage.removeItem("user_table");
              localStorage.removeItem("HTML5_QRCODE_DATA");
              setOpen(false);
              setErrormessage(false)
              // Redirect to success page or any desired page
            //   window.location.href = "/success";

              console.log(
                "Items purchased successfully:",
                purchaseResponse.data
              );
              // Handle success as needed
            } catch (error) {
            //   console.error("There was a problem with the API request:", error);
              // Handle errors as needed
            }
          } else {
            // Handle non-successful stock update
            throw new Error("Failed to update stock");
          }
        } else {
          // Handle non-successful order submission
          throw new Error("Failed to submit order");
        }
      } catch (orderError) {
        console.error("Error submitting order:", orderError);
        // toast.error("Failed to submit order. Please try again later.");
      }
    };
    processAnotherAPI();
  }, [inputData]);

  // useEffect(()=>{
  //     dispatch(setCart([]))
  //     localStorage.removeItem('cart')
  // })

  const variant = {
    initial: {
      scale: 0.5,
      opacity: 0.3,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
      },
    },
  };

  if (errormessage) {
    return (
      <div className=" h-[70vh] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center h-[92vh] md:h-[90vh] w-full bg-gradient-to-b from-teal-200 to-teal-700 relative overflow-hidden">
        <motion.div
          variants={variant}
          initial="initial"
          animate="animate"
          className="px-4 py-8 w-[90%]  md:w-[35%] bg-white rounded-xl z-40 flex flex-col items-center"
        >
          <motion.div
            className="bg-teal-500 rounded-full"
            initial={{ scale: 0.4, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, type: "spring" }}
          >
            <CheckCircleIcon className="h-44 w-44 text-white" />
          </motion.div>
          <h1 className="text-center mt-8 font-semibold text-2xl">
            Your have Order Successfully
          </h1>
        </motion.div>
        <WaveMotion />
      </div>
    </>
  );
}

export default SuccessPage;
