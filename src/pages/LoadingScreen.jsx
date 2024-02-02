// import * as React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

// const LoadingScreen = () => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh', // Set the height of the loading screen to cover the entire viewport
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         background: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
//         zIndex: 999, // Ensure the loading screen appears on top of other elements
//       }}
//     >
//       <CircularProgress />
//     </Box>
//   );
// };

// export default LoadingScreen;
import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Variants() {
  const [isWindowsSize, setIsWindowsSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowsSize(window.innerWidth > 500);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isWindowsSize) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="rectangular" height="100%" width="90%">
          <div style={{ paddingTop: "88%" }} />
        </Skeleton>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" width="50%" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width="65%" sx={{ fontSize: "1rem" }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Skeleton
            variant="text"
            width="30%"
            sx={{ fontSize: "1rem", marginRight: "10px" }}
          />
          <div
            style={{ marginLeft: "28%", display: "flex", alignItems: "center" }}
          >
            <Skeleton
              variant="circular"
              width={30}
              height={30}
            //   style={{ marginRight: "10px" }}
            />
            {/* <Skeleton variant="circular" width={30} height={30} /> */}
          </div>
        </div>
      </Stack>
    );
  } else {
    return (
        <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:"50px",
              }}
            >
              <CircularProgress />
            </Box>
    );
  }

  //   return (

  //   );
}
