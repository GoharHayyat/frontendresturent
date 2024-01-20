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
import { toast } from "react-toastify";
import { manageFavorite } from "../features/User";
import axios from "axios";
// import "./ProductCard.css";

import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  // const [menuItems, setMenuItems] = useState([]);
  const { isUserLoggedIn, favorites, user } = useSelector(
    (state) => state.user
  );
  const [isFavorite, setIsfavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const [isWindowsSize, setIsWindowsSize] = useState(false);

  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const fetchMenuItems = async () => {
  //     try {
  //       // Updated API endpoint without specifying an ID
  //       const response = await fetch("http://localhost:4500/menuitemsTrending");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setMenuItems(data);
  //       } else {
  //         throw new Error("Failed to fetch data");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchMenuItems();
  // }, []);

  useEffect(() => {
    if (favorites.length !== 0) {
      if (favorites.indexOf(product._id) !== -1) {
        setIsfavorite(true);
      }
    }
  }, []);
  const handleAddToCart = () => {
    if (!isAdded) {
      dispatch(addToCart({ item: { ...product, count: 1 } }));
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2500);
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
        className=" w-full max-w-[11rem] md:max-w-[14rem] bg-white/95 rounded-lg shadow-lg"
      >
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
          <Stars rating={product.stars} />
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <span className="text-lg md:text-lg font-bold text-gray-900">
              Rs.{product.price}
            </span>
            <div className="flex gap-3 self-end md:self-auto">
              <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleFavorite}
              >
                <HeartIcon
                  className={`h-7 w-7 text-red-500 hover:text-red-700 ${
                    isFavorite ? "fill-red-500" : ""
                  }`}
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <CheckCircleIcon className="h-7 w-7 text-green-700 fill-green-400" />
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
              <Typography id="modal-desc" textColor="text.tertiary">
                menuItems.caloies <code>aria-labelledby</code> on the modal
                dialog with an optional <code>aria-describedby</code> attribute.
              </Typography>
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
                {isAdded ? (
                  <CheckCircleIcon className="h-7 w-7 text-green-700 fill-green-400" />
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
              <Typography id="modal-desc" textColor="text.tertiary">
                Make sure to use <code>aria-labelledby</code> on the modal
                dialog with an optional <code>aria-describedby</code> attribute.
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
