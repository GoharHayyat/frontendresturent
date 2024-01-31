import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom';
// import karahi from "..assets/karahi.jpg"
import a from "../assets/a.jpeg"
import { useState, useEffect } from "react";

function CategoryTiles() {


const [category, setcategory] = useState([]);

useEffect(() => {
  fetch("http://192.168.18.18:4500/getALLproduct")
    .then((res) => res.json())
    .then((data) => {
      setcategory(data.slice(0, 6));
      // setcategory(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

const gridLocations = [
    "row-span-1 row-start-1",
    "row-span-1 row-start-2",
    "row-span-2 col-start-2",
    "col-span-2 row-start-3 md:row-start-1 md:col-start-3",
    "col-start-1 row-start-4 md:col-start-3 md:row-start-2",
    "col-start-2 row-start-4 md:col-start-4 md:row-start-2",
  ];


const mappedData = category.map((apiItem, index) => ({
    
    id: apiItem._id,
    name: index === 5 ? "Other Items" : apiItem.title,
    img: index === 5 ? a : [`http://192.168.18.18:4500/${apiItem.image}`], 
    // gridLoc: dummyGridLoc,
    gridLoc: gridLocations[index % gridLocations.length],

  }));

  return (
    <>
      <motion.h1
        whileHover={{ scale: 1.05 }}
        initial={{ y: -50, opacity: 0, scale: 0.6 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 1.5 }}
        style={{ marginTop: "4%", marginBottom: "-20px" }}
        className="text-center text-black text-xl md:text-4xl font-bold"
      >
        Catogeries
      </motion.h1>

      <div className="my-10 h-[75vh] grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2">

        {mappedData.map((item, i) => {
          let linkTo = `menuitems/${item.name}`; 

          if (i === 5) {
            linkTo = "/allcategory"; 
          }

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
                  delay: i * 0.15,
                  duration: 0.2,
                  stiffness: 80,
                  bounce: 0.3,
                },
              }}
              viewport={{ once: true }}
              className={`${item.gridLoc} p-1 w-full h-full`}
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
    </>
  );
}

export default CategoryTiles