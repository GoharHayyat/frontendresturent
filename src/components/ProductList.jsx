import React from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";

function ProductList({ name, data }) {
  // return (

  const [isWindowsSize, setIsWindowsSize] = useState(false);
  console.log("data", data);

  const handleCheckboxChange = () => {
    // setIsOutOfStock(!isOutOfStock);
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
      // Windows-specific JSX
      <div className="flex flex-col gap-5">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          initial={{ y: -50, opacity: 0, scale: 0.6 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 1.5 }}
          className="text-center text-xl md:text-2xl font-bold"
        >
          {name}
        </motion.h1>
        <div className="grid md:grid-rows-1 grid-rows-3 grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 w-full items-center justify-center px-5 md:px-20">
          {data.map((item, i) => {
            return (
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.5 }}
                transition={{
                  type: "spring",
                  delay: i * 0.1,
                  bounce: 0.4,
                  stiffness: 60,
                  mass: 1.5,
                }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                key={`${item._id}`}
                className={`${
                  i === 4 ? "col-span-2 md:col-span-1" : ""
                } flex justify-center items-center`}
              >
                <ProductCard key={item.category} product={item} onCheckboxChange={handleCheckboxChange} />
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      // Mobile-specific JSX
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 p-4 md:py-5 md:px-14 flex-wrap">
        {data.map((item, i) => {
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
              <ProductCard product={item} />
            </motion.div>
          );
        })}
      </section>
    );
  }

  //     <section  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 p-4 md:py-5 md:px-14 flex-wrap">
  //     {data.map((item, i) => {
  //       return (
  //         <motion.div
  //           whileHover={{ scale: 1.1 }}
  //           whileTap={{ scale: 0.9 }}
  //           initial={{ opacity: 0, x: 50, scaleZ: 0 }}
  //           whileInView={{
  //             opacity: 1,
  //             x: 0,
  //             scaleZ: 1,
  //             transition: {
  //               delay: i * 0.4 + 0.2,
  //               opacity: { duration: 1 },
  //               type: "spring",
  //               bounce: 0.4,
  //               stiffness: 60
  //             }
  //           }}
  //           viewport={{ once: true }}
  //           key={item.heading}
  //           className={`p-3 md:p-6 w-full h-full flex gap-x-2 md:gap-x-4 items-center cursor-pointer ${item.bg} rounded-lg select-none`}
  //           style={{ minWidth: "280px", maxWidth: "100%" , backgroundColor:"#fcfcfc",border: "1px solid #ccc", // Added 1px solid border
  //           borderRadius: "8px", boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)"  }} // Adjust card width
  //         >
  //           <ProductCard product = {item} />
  //         </motion.div>
  //       );
  //     })}
  //   </section>
  // )
}

export default ProductList;
