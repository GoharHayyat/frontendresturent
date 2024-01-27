import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Stars from "./Stars";
import {
  HeartIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/Cart";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { manageFavorite } from "../features/User";
import axios from "axios";
// import "./ProductCard.css";
import ProductCardDetails from "./ProductCardDetails";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
// import Chip from '@mui/material/Chip';
import Chip from "@mui/joy/Chip";
// import { toast } from "react-toastify";
import { FaTimes } from 'react-icons/fa';

function ProductCard({ product  ,onCheckboxChange }) {
  const dispatch = useDispatch();
  // const [menuItems, setMenuItems] = useState([]);
  const { isUserLoggedIn, favorites, user } = useSelector(
    (state) => state.user
  );
  const [isFavorite, setIsfavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedd, setIsAddedd] = useState(false);

  const [isWindowsSize, setIsWindowsSize] = useState(false);

  const [open, setOpen] = useState(false);
  // console.log("sd",isOutOfStock)

  useEffect(() => {
    if (favorites.length !== 0) {
      if (favorites.indexOf(product._id) !== -1) {
        setIsfavorite(true);
      }
    }
  }, []);

  let x= false;

  const handleCheckboxChange = () => {
    onCheckboxChange();
  };

 
  
  
  
  // function checkAndLogStringChanges() {
  //   // Function to retrieve the stored random string from localStorage
  //   function getStoredRandomString() {
  //     return localStorage.getItem('randomString') || ''; // Return an empty string if the key is not present
  //   }
  
  //   // Function to log the current random string
  //   function logCurrentRandomString() {
  //     const currentRandomString = getStoredRandomString();
  //     console.log('Current random string:', currentRandomString);
  //   }
  
  //   // Initial log of the random string
  //   logCurrentRandomString();
  
  //   // Set up a setInterval to periodically check for changes in the stored string
  //   setInterval(function () {
  //     const storedRandomString = getStoredRandomString();
  
  //     // Check if the stored string has changed
  //     if (storedRandomString !== checkAndLogStringChanges.lastStoredString) {
  //       // 
  //       console.log('String changed! New value:', storedRandomString);
  //       checkAndLogStringChanges.lastStoredString = storedRandomString; // Update the last stored string
        
  //     }
  //   }, 1000); 
  // }
  
  
  // // Call the function to start checking and logging string changes
  // checkAndLogStringChanges();
  
  
  

  const handleAddToCart = async () => {
    if (!isAdded || !isAddedd) {
      if (product && product.describtion) {
        var productDescription = product.describtion;
        var productObj = JSON.parse(productDescription);

        var ingredientsToUpdate = [];

        for (var key in productObj) {
          if (productObj.hasOwnProperty(key)) {
            var name = key;
            var quantity = productObj[key];

            // Store name and quantity in the array
            ingredientsToUpdate.push({ name, quantity });
          }
        }

        const response = await fetch(
          "http://localhost:4500/ingredients/updatetempstock",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ingredientsToUpdate),
          }
        );

        // Handle the API response
        if (response.ok) {
          const responseData = await response.json();

          // Additional logic to execute when the response is successful
          console.log("API call successful:", responseData);

          // Dispatch the addToCart action and update the state

          dispatch(addToCart({ item: { ...product, count: 1 } }));
          setIsAdded(true);
          setTimeout(() => {
            setIsAdded(false);
          }, 2500);
          // onCheckboxChange();
          handleCheckboxChange();
        } else {
          // Handle the case when the response status is not OK
          console.error("API call failed. Status:", response.status);
          // alert("ds")
          // onCheckboxChange();
          setIsAddedd(true);
          setTimeout(() => {
            setIsAddedd(false);
          }, 2500);
          handleCheckboxChange();
        }
      } else {
        console.error("Product or product description is undefined");
      }
    }
  };

  const handleFavorite = async () => {
    // if (!isUserLoggedIn) {
    //   alert("Please Login First!!");
    // } else {
    let newFavs = [];
    if (isFavorite) {
      newFavs = favorites.filter((fav) => {
        return fav !== product._id;
      });
    } else {
      newFavs = [...favorites];
      newFavs.push(product._id);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}manageFavorite`,
        { favorites: newFavs },
        config
      )
      .then((val) => {
        console.log("VAL  ", val);
        if (val.data.success) {
          setIsfavorite(!isFavorite);

          localStorage.setItem("favorites", JSON.stringify(newFavs));
          dispatch(manageFavorite(newFavs));
        } else {
          alert("Favorite not Added");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsfavorite(!isFavorite);
        // alert("Favorite not Added");
      });
    // }
  };

  useEffect(() => {
    const handleResize = () => {
      // Check the window width here, adjust the value as needed
      setIsWindowsSize(window.innerWidth > 500); // Change 768 to the desired width threshold
    };

    // Initial check on mount
    handleResize();

    // Add event listener to track window size changes
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isWindowsSize) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-full max-w-[11rem] md:max-w-[14rem] bg-white/95 rounded-lg shadow-lg"
      >
        {/* <ToastContainer/> */}
        <motion.img
          onClick={() => setOpen(true)}
          whileHover={{ scale: 0.95 }}
          className="p-3 w-full h-30 md:h-52 rounded-t-lg"
          src={product.imageLinks[0]}
          alt={product.name}
        />

        <div className="px-5 pb-5">
          <motion.h5
            onClick={() => setOpen(true)}
            whileHover={{ scale: 0.95 }}
            className="text-base whitespace-nowrap text-ellipsis overflow-hidden md:text-xl font-semibold tracking-tight text-gray-900"
          >
            {product.name}
          </motion.h5>

          <Link to={`/category/${product.category}`}>
            <motion.p
              whileHover={{ scale: 0.98 }}
              className="text-xs hover:text-teal-600"
            >
              {product.category}
            </motion.p>
          </Link>
          {/* {product.check ? (
            <motion.span
              className="text-base text-red-500"
              whileHover={{ scale: 0.98 }}
            >
              Out of Stock
            </motion.span>
          ) : (
            <> */}
          <Stars rating={product.stars} />
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <span className="text-lg md:text-lg font-bold text-gray-900">
              Rs.{product.price}
            </span>
            <div className="flex gap-3 self-end md:self-auto">
              {/* Remove the HeartIcon component */}
              {/* <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleFavorite}
              >
                <HeartIcon
                  className={`h-7 w-7 text-red-500 hover:text-red-700 ${
                    isFavorite ? "fill-red-500" : ""
                  }`}
                />
              </motion.div> */}
              <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleAddToCart}
              >
              
                 {product.check ? (
                  <Chip size="lg" variant="solid" color="danger">
                    Out of stock
                  </Chip>
                ) : isAdded ? (
                  <CheckCircleIcon className="h-7 w-7 text-green-700 fill-green-400" />
                ) : isAddedd ? (
                  <FaTimes className="h-7 w-7 text-red-700 fill-red-400" />
                ) : (
                  <ShoppingCartIcon className="h-7 w-7 text-green-700 hover:fill-green-400" />
                )}
              </motion.div>
            </div>
          </div>
          {/* </>
          )} */}
        </div>
        <React.Fragment>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                Product Details:
              </Typography>
              {/* <ProductCardDetails product/> */}
              <ProductCardDetails product={product} />

              <Typography
                id="modal-desc"
                textColor="text.tertiary"
              ></Typography>
            </Sheet>
          </Modal>
        </React.Fragment>
      </motion.div>
    );
  } else {
    return (
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            display: "inline-block",
            width: "65%",
            fontSize: "25px",
            fontWeight: "700",
            marginLeft: "10px",
          }}
        >
          <div onClick={() => setOpen(true)}>{product.name}</div>

          <div>
            <Stars rating={product.stars} />
          </div>
          <div>
            <span className="text-lg md:text-lg font-bold text-gray-900">
              Rs.{product.price}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <motion.p
              whileHover={{ scale: 0.98 }}
              className="text-xs hover:text-teal-500"
              style={{ color: "grey", marginRight: "5px" }}
            >
              {product.category}
            </motion.p>
            <motion.div
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              onClick={handleFavorite}
              style={{ marginLeft: "6%" }}
            >
              <HeartIcon
                className={`h-7 w-7 text-red-500 hover:text-red-700 ${
                  isFavorite ? "fill-red-500" : ""
                }`}
              />
            </motion.div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "inline-block", marginRight: "10px" }}>
            <img
              onClick={() => setOpen(true)}
              // whileHover={{ scale: 0.95 }}
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "30px", // Adjust the border radius to achieve the desired roundness
              }}
              className="p-3" // Remove the rounded-t-lg class if not needed
              src={product.imageLinks[0]}
              alt={product.name}
            />
          </div>
          <div style={{ display: "inline-block" }}>
            <div>
              <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleAddToCart}
              >
                {product.check ? null : isAdded ? ( // </Chip> //   Out of stock // <Chip size="lg" variant="solid" color="danger">
                  <CheckCircleIcon className="h-7 w-7 text-green-700 fill-green-400" />
                  // <CheckCircleIcon className="h-7 w-7 text-red-700 fill-red-400" />
                ) : (
                  <ShoppingCartIcon className="h-7 w-7 text-green-700 hover:fill-green-400" />
                )}

               
              </motion.div>
            </div>
          </div>
        </div>
        <React.Fragment>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              // variant="outlined"
              sx={{
                maxWidth: 400,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                Product Details
              </Typography>
              <ProductCardDetails product={product} />
              <Typography id="modal-desc" textColor="text.tertiary">
                {/* <ProductCardDetails product/> */}
              </Typography>
            </Sheet>
          </Modal>
        </React.Fragment>
      </div>

      // <div>
      //   <div>hi</div>
      //   <div>
      //     <img
      //       // whileHover={{ scale: 0.95 }}
      //       style={{ width: "125px", height: "125px" }} // Adjust width and height here
      //       className="p-3 rounded-t-lg"
      //       src={product.imageLinks[0]}
      //       alt={product.name}
      //     />
      //   </div>
      // </div>
    );
  }

  // return (

  //     <motion.div whileHover={{scale:1.02}} className=" w-full max-w-[11rem] md:max-w-[14rem] bg-white/95 rounded-lg shadow-lg">

  //         <Link to={`/product/${product._id}`}>
  //             <motion.img whileHover={{scale:0.95}}  className="p-3 w-full h-30 md:h-52 rounded-t-lg" src={product.imageLinks[0]} alt={product.name} />
  //         </Link>
  //         <div className="px-5 pb-5">
  //             <Link to={`/product/${product._id}`}>
  //                 <motion.h5 whileHover={{scale:0.95}} className="text-base whitespace-nowrap text-ellipsis overflow-hidden md:text-xl font-semibold tracking-tight text-gray-900">{product.name}</motion.h5>
  //             </Link>
  //             <Link to={`/category/${product.category}`}>
  //                 <motion.p whileHover={{scale:0.98}} className="text-xs hover:text-teal-600">{product.category}</motion.p>
  //             </Link>
  //             <Stars rating={product.stars}/>
  //             <div className="flex flex-col md:flex-row md:items-center justify-between">
  //                 <span className="text-lg md:text-lg font-bold text-gray-900">Rs.{product.price}</span>
  //                 <div className="flex gap-3 self-end md:self-auto">
  //                     <motion.div whileTap={{scale:0.8}} whileHover={{scale:1.1}} onClick={handleFavorite}>
  //                         <HeartIcon className={`h-7 w-7 text-red-500 hover:text-red-700 ${isFavorite?"fill-red-500":""}`}/>
  //                     </motion.div>
  //                     <motion.div whileTap={{scale:0.8}} whileHover={{scale:1.1}} onClick={handleAddToCart}>
  //                         {isAdded?<CheckCircleIcon className="h-7 w-7 text-green-700 fill-green-400"/> :<ShoppingCartIcon className="h-7 w-7 text-green-700 hover:fill-green-400" />}

  //                     </motion.div>
  //                 </div>

  //             </div>
  //       </div>
  //     </motion.div>

  // );
}

export default ProductCard;

{
  /* <motion.img
  whileHover={{ scale: 0.95 }}
  style={{ width: '125px', height: '125px' }} // Adjust width and height here
  className="p-3 rounded-t-lg"
  src={product.imageLinks[0]}
  alt={product.name}
/> */
}
