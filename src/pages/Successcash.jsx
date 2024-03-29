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

function SuccessPagecash() {
  const dispatch = useDispatch();
  const [usertable, setUserTable] = useState([null]);

  const processAnotherAP = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/updatestatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table: usertable.table, status: "Not Active" })
      });

      if (response.ok) {
        localStorage.removeItem("user_table");
      }

      const data = await response.json();
      console.log(data.message); // Assuming your server responds with a message
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getDataFromLocalStoragee = async () => {
    try {
      const storedData = localStorage.getItem("user_table");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserTable(parsedData);
        await processAnotherAP();
      }
    } catch (error) {
      console.error('Error getting data from local storage:', error);
    }
  };

  useEffect(() => {
    const clearCartAndLocalStorage = () => {
      dispatch(setCart([]));
      localStorage.removeItem('cart');
      localStorage.removeItem("HTML5_QRCODE_DATA");
    };

    clearCartAndLocalStorage();
    getDataFromLocalStoragee();
  }, [dispatch, usertable]);


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

export default SuccessPagecash;
