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
import ProductCardDetails from "./ProductCardDetails";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
// import Chip from '@mui/material/Chip';
import Chip from "@mui/joy/Chip";
// import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function ProductCard({ product, onCheckboxChange }) {
  const dispatch = useDispatch();
  const { favorites, user } = useSelector((state) => state.user);

  const [isFavorite, setIsFavorite] = useState(false);

  const truncatedName = product.name.length > 7 ? `${product.name.slice(0, 7)}...` : product.name;


  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(product));
  }, []);
  
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedd, setIsAddedd] = useState(false);

  const [isWindowsSize, setIsWindowsSize] = useState(false);

  const [open, setOpen] = useState(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState([]);


  useEffect(() => {
    const storedData = localStorage.getItem("loginData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (parsedData && parsedData.token) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
        console.log("Invalid stored data structure");
      }
    } else {
      console.log("No stored data found in local storage.");
      setIsUserLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const loginDataStringg = localStorage.getItem("loginData");
    const loginDataa = JSON.parse(loginDataStringg);
    if (!loginDataa || !loginDataa.favorites || !loginDataa.favorites._id) {
      console.error(
        "No data available in localStorage or missing required fields."
      );
    } else {
      const apiUrl = `${process.env.REACT_APP_API_URL}/checkisliked/${loginDataa.favorites._id}/${product._id}`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.available === true) {
            setIsFavorite(!isFavorite);
            console.log("available");
          } else {
            console.log("not available");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const handleCheckboxChange = () => {
    onCheckboxChange();
  };

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
          `${process.env.REACT_APP_API_URL}/ingredients/updatetempstock`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ingredientsToUpdate),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("API call successful:", responseData);
          dispatch(addToCart({ item: { ...product, count: 1 } }));
          setIsAdded(true);
          setTimeout(() => {
            setIsAdded(false);
          }, 2500);
          handleCheckboxChange();
        } else {
          console.error("API call failed. Status:", response.status);
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
    if (!isUserLoggedIn) {
      toast("Please Login First!!");
    } else {
      const loginDataString = localStorage.getItem("loginData");

      const loginData = JSON.parse(loginDataString);

      const userId = loginData.favorites._id;

      console.log("User ID", userId);

      setIsFavorite(!isFavorite);

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (isFavorite) {
        favorites = favorites.filter((fav) => fav !== product._id);
      } else {
        favorites.push(product._id);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      };

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/manageFavorite`,
          { userId, favorites },
          config
        )
        .then((val) => {
          if (!val.data.success) {
            
            setIsFavorite(!isFavorite);
            alert("Favorite not Added");
          }
          handleCheckboxChange();
        })
        .catch((error) => {
          console.log(error);
          setIsFavorite(!isFavorite);
          alert("Favorite not Added");
        });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWindowsSize(window.innerWidth > 500); 
    };

    handleResize();

    window.addEventListener("resize", handleResize);

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
        {/* <motion.img
          onClick={() => setOpen(true)}
          whileHover={{ scale: 0.95 }}
          className="p-3 w-full h-30 md:h-52 rounded-t-lg"
          src={product.imageLinks[0]}
          alt={product.name}
        /> */}
        <div>
      {product.check ? (
        <div style={{ position: 'relative' }}>
          <motion.img
            onClick={() => setOpen(true)}
            whileHover={{ scale: 0.95 }}
            className="p-3 w-full h-30 md:h-52 rounded-t-lg"
            src={product.imageLinks[0]}
            alt={product.name}
            style={{ filter: 'blur(5px)' }} // Apply blur style when out of stock
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              // backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
             <Chip size="lg" variant="solid" color="danger">
                    Out of stock
                  </Chip>
          </div>
        </div>
      ) : (
        <motion.img
          onClick={() => setOpen(true)}
          whileHover={{ scale: 0.95 }}
          className="p-3 w-full h-30 md:h-52 rounded-t-lg"
          src={product.imageLinks[0]}
          alt={product.name}
        />
      )}
    </div>

        <div className="px-5 pb-5">
          <motion.h5
            onClick={() => setOpen(true)}
            whileHover={{ scale: 0.95 }}
            className="text-base whitespace-nowrap text-ellipsis overflow-hidden md:text-xl font-semibold tracking-tight text-gray-900"
          >
            {product.name}
          </motion.h5>

          
            <motion.p
              whileHover={{ scale: 0.98 }}
              className="text-xs hover:text-teal-600"
            >
              {product.category}
            </motion.p>
          
          
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
                {isFavorite ? (
                  <HeartIcon className="h-7 w-7 text-red-500 hover:text-red-700 fill-red-500" />
                ) : (
                  <HeartIcon className="h-7 w-7 text-red-500 hover:text-red-700" />
                )}
              </motion.div>
              {/* <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleAddToCart}
              >

                {isAdded ? (
                  <CheckCircleIcon className="h-7 w-7 text-green-700 fill-green-400" />
                ) : isAddedd ? (
                  <FaTimes className="h-7 w-7 text-red-700 fill-red-400" />
                ) : (
                  <ShoppingCartIcon className="h-7 w-7 text-green-700 hover:fill-green-400" />
                )}
              </motion.div> */}
              {product.check === false && (
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
    )}
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
          <div onClick={() => setOpen(true)}>{truncatedName}</div>

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
            >
              {isFavorite ? (
                <HeartIcon className="h-7 w-7 text-red-500 hover:text-red-700 fill-red-500" />
              ) : (
                <HeartIcon className="h-7 w-7 text-red-500 hover:text-red-700" />
              )}
            </motion.div>
            <div style={{marginLeft:"20%", display: "inline-block" }}>
            <div>
              {/* <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <CheckCircleIcon className="h-7 w-7 text-green-700 fill-green-400" />
                ) : isAddedd ? (
                  <FaTimes className="h-7 w-7 text-red-700 fill-red-400" />
                ) : (
                  <ShoppingCartIcon className="h-7 w-7 text-green-700 hover:fill-green-400" />
                )}
              </motion.div> */}
              {product.check === false && (
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
    )}
            </div>
          </div>
          </div>
          
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "inline-block", marginRight: "10px" }}>
          <div>
      {product.check ? (
        <div style={{ position: 'relative' }}>
          <img
              onClick={() => setOpen(true)}
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "30px",
                filter: 'blur(5px)',
              }}
              className="p-3" 
              src={product.imageLinks[0]}
              alt={product.name}
            />
          {/* <motion.img
            onClick={() => setOpen(true)}
            whileHover={{ scale: 0.95 }}
            className="p-3 w-full h-30 md:h-52 rounded-t-lg"
            src={product.imageLinks[0]}
            alt={product.name}
            style={{ filter: 'blur(5px)' }} // Apply blur style when out of stock
          /> */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              // backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
             <Chip size="lg" variant="solid" color="danger">
                    Out of stock
                  </Chip>
          </div>
        </div>
      ) : (
        <img
        onClick={() => setOpen(true)}
        style={{
          width: "130px",
          height: "130px",
          borderRadius: "30px",
        }}
        className="p-3" 
        src={product.imageLinks[0]}
        alt={product.name}
      />
      )}
    </div>
            {/* <img
              onClick={() => setOpen(true)}
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "30px",
              }}
              className="p-3" 
              src={product.imageLinks[0]}
              alt={product.name}
            /> */}
          </div>
          {/* <div style={{ display: "inline-block" }}>
            <div>
              <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <CheckCircleIcon className="h-7 w-7 text-green-700 fill-green-400" />
                ) : isAddedd ? (
                  <FaTimes className="h-7 w-7 text-red-700 fill-red-400" />
                ) : (
                  <ShoppingCartIcon className="h-7 w-7 text-green-700 hover:fill-green-400" />
                )}
              </motion.div>
            </div>
          </div> */}
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
    );
  }

}

export default ProductCard;

