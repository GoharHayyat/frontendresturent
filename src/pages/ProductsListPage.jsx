import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import {  useLocation, useParams } from 'react-router-dom'
// import axios from 'axios'
// import { ToastContainer, toast } from "react-toastify";

import { useDispatch } from 'react-redux'
// import { closeAll } from '../features/Modals'

// import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

// import Checkbox from '@mui/joy/Checkbox';
// import Stars from './Stars';
// import { HeartIcon,ShoppingCartIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function ProductsListPage() {
  const { category, searchQuery,brand } = useParams()
  const [products, setProducts] = useState([])
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const handleCheckboxChange = () => {
    setIsOutOfStock(!isOutOfStock);
  };

  const [menuItems, setMenuItems] = useState([]);
  const dispatch = useDispatch()
  const location = useLocation()

  function checkForChanges() {
    const storedString = localStorage.getItem('randomString');
    if (storedString !== currentRandomString) {
      // handleCheckboxChange()
      // console.log('Random string changed:', storedString);
      setIsOutOfStock(!isOutOfStock);
      currentRandomString = storedString;
    }
  }
  
  // Initialize currentRandomString with the initially generated random string
  let currentRandomString = localStorage.getItem('randomString');
  
  // Set up a polling mechanism to check for changes every 100 milliseconds
  setInterval(checkForChanges, 1000);

  useEffect(() => {
    fetch(`http://localhost:4500/menuitems/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isOutOfStock]);

  console.log("ProductListPage", products);

  

  const productss = products.map((item) => ({
    _id: item._id, // Assuming a unique ID for each item
    name: item.title,
    category: item.category, // You can set the category as per your application logic
    price: item.Price, // Define the price as needed
    check: item.check,
    stars: 4.0, // Set the stars or rating based on your system
    imageLinks: [`http://localhost:4500/${item.image}`],
    isFavorite: false,
    isAdded: false,
    describtion: item.describtion,
    calories:item.calories,
    carbohydrates:item.carbohydrates,
    fats:item.fats,
    protein:item.protein

  }));

  console.log("Product details that send from Productlistpage to card",productss)



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
      <div className="py-6 px-3 md:px-0">
        {/* <ToastContainer/> */}
        <div className="flex w-full gap-5 flex-col md:flex-row">
          <div className="flex-[0.15] flex flex-col items-center">
            <button className="bg-black/70 text-white p-2 rounded-lg w-[80%] hover:bg-black ">
              Apply Filters {">"}
            </button>
            <br />
       
            {/* <Checkbox label="Out of Stock" color="danger" checked={isOutOfStock}
          onChange={handleCheckboxChange} /> */}
          </div>
          <div className="flex-[0.8] flex flex-col gap-5 items-center md:items-start">
            <div className="w-[95%] md:w-full h-48 md:h-56 relative">
              <img
                src="https://images.unsplash.com/photo-1438012940875-4bf705025a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="chairs"
                className="w-full h-full object-cover rounded-md"
              />
              <p className="text-3xl md:text-5xl bg-black/30 rounded p-2 text-white font-semibold absolute top-5 left-5">
                {category ? category : searchQuery ? searchQuery : brand}
              </p>
            </div>
            <div className="grid md:grid-rows-1 grid-rows-3 grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 w-full items-center justify-center px-3 md:px-0">
              {productss.map((prod) => (
                <ProductCard  product={prod} onCheckboxChange={handleCheckboxChange}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      // Mobile-specific JSX
      <div className="py-6 px-3 md:px-0">
        <div className="flex w-full gap-5 flex-col md:flex-row">
          <div className="flex-[0.15] flex flex-col items-center">
            <button className="bg-black/70 text-white p-2 rounded-lg w-[80%] hover:bg-black ">
              Apply Filters {">"}
            </button>
          </div>
          <div className="flex-[0.8] flex flex-col gap-5 items-center md:items-start">
            <div className="w-[95%] md:w-full h-48 md:h-56 relative">
              <img
                src="https://images.unsplash.com/photo-1438012940875-4bf705025a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="chairs"
                className="w-full h-full object-cover rounded-md"
              />
              <p className="text-3xl md:text-5xl bg-black/30 rounded p-2 text-white font-semibold absolute top-5 left-5">
                {category ? category : searchQuery ? searchQuery : brand}
              </p>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 p-4 md:py-5 md:px-14 flex-wrap">
              {productss.map((item, i) => {
                return (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: 50, scaleZ: 0 }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      scaleZ: 1,
                      transition: {
                        delay: i * 0.1,
                        opacity: { duration: 1 },
                        type: "spring",
                        bounce: 0.4,
                        stiffness: 60,
                      },
                    }}
                    viewport={{ once: true }}
                    key={item.heading}
                    className={`p-3 md:p-6 w-full h-full flex gap-x-2 md:gap-x-4 items-center cursor-pointer ${item.bg} rounded-lg select-none`}
                    style={{
                      minWidth: "280px",
                      maxWidth: "100%",
                      backgroundColor: "#fcfcfc",
                      border: "1px solid #ccc", // Added 1px solid border
                      borderRadius: "8px",
                      boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
                    }} // Adjust card width
                  >
                    <ProductCard  product={item} onCheckboxChange={handleCheckboxChange}/>
                  </motion.div>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsListPage