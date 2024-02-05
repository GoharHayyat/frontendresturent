import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

function AllCategory() {





  const [isWindowsSize, setIsWindowsSize] = useState(false);
  const [category, setcategory] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowsSize(window.innerWidth > 800); 
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

useEffect(() => {
  fetch("http://localhost:4500/getALLproduct")
    .then((res) => res.json())
    .then((data) => {
      setcategory(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);







const mappedData = category.map((apiItem, index) => ({
    id: apiItem._id,
    name: apiItem.title,
    img: [`http://localhost:4500/${apiItem.image}`],
  }));

  

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
          </div>
          <div className="flex-[0.8] flex flex-col gap-5 items-center md:items-start">
            {/* <div className="w-[95%] md:w-full h-48 md:h-56 relative">
              <img
                src="https://images.unsplash.com/photo-1438012940875-4bf705025a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="chairs"
                className="w-full h-full object-cover rounded-md"
              />
              <p className="text-3xl md:text-5xl bg-black/30 rounded p-2 text-white font-semibold absolute top-5 left-5">
                {category ? category : searchQuery ? searchQuery : brand}
              </p>
            </div> */}
<div className="my-10 grid grid-cols-5 grid-rows-4 md:grid-cols-5 md:grid-rows-2">
  {mappedData.map((item, i) => {
    let linkTo = `menuitems/${item.name}`;
    // if (i === 5) {
    //   linkTo = "/allcategory";
    // }

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0.5, scaleY: 0.2 }}
        whileInView={{
          opacity: 1,
          scaleY: 1,
          transition: {
            type: "spring",
            opacity: { duration: 0.6 },
            delay: i * 0.05,
            duration: 0.2,
            stiffness: 80,
            bounce: 0.3,
          },
        }}
        viewport={{ once: true }}
        className="p-4 w-full h-full same-position-class"
        style={{ width: '200px', height: '300px', margin: '10px' }} // Added margin
      >
          <Link to={linkTo} className="z-10">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="w-full h-full flex justify-center items-center relative overflow-hidden"
              >
              
                <motion.img
                  whileHover={{ scale: 1.3, transition: { duration: 0.6 } }}
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full absolute z-0 object-cover"
                />
                
                  <motion.h1
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-white text-lg md:text-2xl font-semibold p-1 rounded-lg backdrop-blur-[2px]"
                  >
                    {item.name}
                  </motion.h1>
                
              </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
        <div className="py-6 px-3 md:px-0">
          {/* <ToastContainer/> */}
          <div className="flex w-full gap-5 flex-col md:flex-row">
            <div className="flex-[0.15] flex flex-col items-center">
              <button className="bg-black/70 text-white p-2 rounded-lg w-[80%] hover:bg-black ">
                Apply Filters {">"}
              </button>
              <br />
            </div>
            <div className="flex-[0.8] flex flex-col gap-5 items-center md:items-start">
              {/* <div className="w-[95%] md:w-full h-48 md:h-56 relative">
                <img
                  src="https://images.unsplash.com/photo-1438012940875-4bf705025a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="chairs"
                  className="w-full h-full object-cover rounded-md"
                />
                <p className="text-3xl md:text-5xl bg-black/30 rounded p-2 text-white font-semibold absolute top-5 left-5">
                  {category ? category : searchQuery ? searchQuery : brand}
                </p>
              </div> */}
  <div className="my-10 grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2">
    {mappedData.map((item, i) => {
      let linkTo = `menuitems/${item.name}`;
    //   if (i === 5) {
    //     linkTo = "/allcategory";
    //   }
  
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0.5, scaleY: 0.2 }}
          whileInView={{
            opacity: 1,
            scaleY: 1,
            transition: {
              type: "spring",
              opacity: { duration: 0.6 },
              delay: i * 0.05,
              duration: 0.2,
              stiffness: 80,
              bounce: 0.3,
            },
          }}
          viewport={{ once: true }}
          className="p-4 w-full h-full same-position-class"
          style={{ width: '200px', height: '230px', margin: '-8px' }} // Added margin
        >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-full h-full flex justify-center items-center relative overflow-hidden"
                >
                  <motion.img
                    whileHover={{ scale: 1.3, transition: { duration: 0.6 } }}
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full absolute z-0 object-cover"
                  />
                  <Link to={linkTo} className="z-10">
                    <motion.h1
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      className="text-white text-lg md:text-2xl font-semibold p-1 rounded-lg backdrop-blur-[2px]"
                    >
                      {item.name}
                    </motion.h1>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
            </div>
          </div>
        </div>
      );
  }
}

export default AllCategory