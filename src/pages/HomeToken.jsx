import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import Barcode from "../components/Barcode";
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
        localStorage.removeItem("page_redirct");
        setIsLoading(false);
      }
    }, 3000);

    return () => clearTimeout(delayTimeout);
  }, [tableToken]);

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
          <div style={{height:"100%"}}>

          </div>

          </>
        ) : (
          // Render content when token is not available
          <p style={{ color: "red", fontSize: "18px" }}>
            Sorry, you don't have access to the valid Token. Kindly reattempt
            the scan using a valid barcode.
          </p>
        )}
      </div>
      <div style={{ width:"80%" ,marginBottom:"10px", marginLeft:"10%"}}>
            <Barcode key={keyForChild} redirect={false}   />
            </div>

    </>
  );
}

export default HomeToken;
