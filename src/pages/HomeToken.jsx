import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from "react-toastify";

function HomeToken() {
  const { tableToken } = useParams();
  const [tokenData, setTokenData] = useState(null);
  const [istokenavailable, setIstokenavailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate a 5-second delay before fetching data
    const delayTimeout = setTimeout(async () => {
      try {
        const response = await fetch("https://cv81j9kz-4500.inc1.devtunnels.ms/qrcodestokens");
        if (response.ok) {
          const data = await response.json();
          const matchingToken = data.find(item => item.tableId === tableToken);
  
          if (matchingToken) {
            toast("success");
  
            setTokenData(matchingToken);
            setIstokenavailable(true);
  
            const result = { table: matchingToken.table };
  
            // Stringify the object before storing it in localStorage
            localStorage.setItem("user_table", JSON.stringify(result));
  
            // Assuming you want to redirect to a new URL
            window.location.href = '/';
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
        setIsLoading(false);
      }
    }, 3000); // 5 seconds delay
  
    // Cleanup the timeout to prevent unexpected behavior if the component unmounts
    return () => clearTimeout(delayTimeout);
  }, [tableToken]);
  
//   useEffect(() => {
//     // Simulate a 5-second delay before fetching data
//     const delayTimeout = setTimeout(async () => {
//       try {
//         const response = await fetch("https://cv81j9kz-4500.inc1.devtunnels.ms/qrcodestokens");
//         if (response.ok) {
//           const data = await response.json();
//           const matchingToken = data.find(item => item.tableId === tableToken);

//           if (matchingToken) {
//             toast("success")
            
//             setTokenData(matchingToken);
//             setIstokenavailable(true);

//             const result = {table: matchingToken.table }
//             localStorage.setItem("user_table", result);
//             // Assuming you want to redirect to a new URL
//             // window.location.href = '/';
//           } else {
//             setTokenData(null);
//             setIstokenavailable(false);
//           }
//         } else {
//           throw new Error("Failed to fetch data");
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 5000); // 5 seconds delay

//     // Cleanup the timeout to prevent unexpected behavior if the component unmounts
//     return () => clearTimeout(delayTimeout);
//   }, [tableToken]);

  if (isLoading) {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
        <CircularProgress />
        <p className="mt-4 text-gray-600">Authenticating barcode...</p>
      </div>
    );
  }


  return (
    <div>
      {/* Render your content here based on istokenavailable */}
    </div>
  );
}

export default HomeToken;
