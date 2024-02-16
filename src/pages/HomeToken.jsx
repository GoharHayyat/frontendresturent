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
  const [status, setStatus] = useState("Activated");
  

  const [istokenavailable, setIstokenavailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const delayTimeout = setTimeout(async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/qrcodestokens`);
        if (response.ok) {
          const data = await response.json();
          const matchingToken = data.find(
            (item) => item.tableId === tableToken
          );

          if (matchingToken) {
            // toast("success");

            if(matchingToken.status=='Not Active')
            {
              setTokenData(matchingToken);
            setIstokenavailable(true);
            const tt= matchingToken.table;
            const result = { table: matchingToken.table, tableId: matchingToken.tableId };
            try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/updatestatus`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ table: result.table, status })
              });
          
              if (response.ok) {
                // const result = { table: matchingToken.table, tableId: matchingToken.tableId };
                localStorage.setItem("user_table", JSON.stringify(result));
    
                var pageRedirectValue = localStorage.getItem("page_redirct");
    
                if (pageRedirectValue !== null && pageRedirectValue === "true") {
                  localStorage.removeItem("HTML5_QRCODE_DATA");
                  localStorage.removeItem("page_redirct");
                  window.location.href = "/checkout";
                } else if(pageRedirectValue !== null && pageRedirectValue === "redirecthome"){
                  localStorage.removeItem("HTML5_QRCODE_DATA");
                  localStorage.removeItem("page_redirct");
                  window.location.href = "/allcategory";
                }
                else {
                  localStorage.removeItem("HTML5_QRCODE_DATA");
                  localStorage.removeItem("page_redirct");
                  window.location.href = "/";
                }
              }
          
              const data = await response.json();
              console.log(data.message); // Assuming your server responds with a message
            } catch (error) {
              console.error('Error updating status:', error);
            }

            }
            else{
              toast.error("token already in Use")
              setTokenData(null);
              setIstokenavailable(false);
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




