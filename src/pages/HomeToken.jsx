import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import Barcode from "../components/Barcode";
import { AnimatePresence, motion } from "framer-motion";
const generateKey = () => {
  return Math.random().toString(36).substr(2, 9);
};

function HomeToken() {
  const keyForChild = generateKey();
  const { tableToken } = useParams();
  const [tokenData, setTokenData] = useState(null);
  const [istokenavailable, setIstokenavailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const delayTimeout = setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:4500/qrcodestokens");
        if (response.ok) {
          const data = await response.json();
          const matchingToken = data.find(
            (item) => item.tableId === tableToken
          );

          if (matchingToken) {
            toast("success");
            setTokenData(matchingToken);
            setIstokenavailable(true);

            const result = { table: matchingToken.table };
            localStorage.setItem("user_table", JSON.stringify(result));

            var pageRedirectValue = localStorage.getItem("page_redirct");

            if (pageRedirectValue !== null && pageRedirectValue === "true") {
              localStorage.removeItem("HTML5_QRCODE_DATA");
              localStorage.removeItem("page_redirct");
              window.location.href = "/checkout";
            } else {
              localStorage.removeItem("HTML5_QRCODE_DATA");
              localStorage.removeItem("page_redirct");
              window.location.href = "/";
            }
          } else {
            setTokenData(null);
            setIstokenavailable(false);
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      } finally {
        localStorage.removeItem("HTML5_QRCODE_DATA");
        setIsLoading(false);
      }
    }, 3000);

    return () => clearTimeout(delayTimeout);
  }, [tableToken]);

  const handleOnClick = () => {
    localStorage.removeItem("HTML5_QRCODE_DATA");
    localStorage.removeItem("page_redirct");
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <CircularProgress />
        <p className="mt-4 text-gray-600">Authenticating barcode...</p>
      </div>
    );
  }

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {istokenavailable ? (
          <>
            <div style={{ height: "100%" }}></div>
          </>
        ) : (
          <>
            <div className="flex md:flex-row flex-col md:justify-between gap-2 items-center">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleOnClick}
                style={{ marginLeft: "15px", cursor: "pointer" }} // Add this to indicate the element is clickable
              >
                {"<"} Return to Home Page
              </motion.span>
            </div>
            <p style={{ color: "red", fontSize: "18px" }}>
              Sorry, you don't have access to the valid Token. Kindly reattempt
              the scan using a valid barcode.
            </p>
            <div
              style={{ width: "80%", marginBottom: "10px", marginLeft: "10%" }}
            >
              <Barcode key={keyForChild} redirect={false} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomeToken;
