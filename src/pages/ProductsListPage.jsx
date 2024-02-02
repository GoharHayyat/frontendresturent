import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

import Checkbox from "@mui/joy/Checkbox";

function ProductsListPage() {
  const { category, searchQuery, brand } = useParams();
  const [products, setProducts] = useState([]);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [isLowToHigh, setIsLowToHigh] = useState(false);
  const [isWindowsSize, setIsWindowsSize] = useState(false);
  const [isHighToLow, setIsHighToLow] = useState(false);

  const [showfilters, setShowFilters] = useState(false);

  const handleCheckboxChange = () => {
    setIsOutOfStock(!isOutOfStock);
  };

  const handleshowfilters = () => {
    setShowFilters(!showfilters);
  };

  const handleLowToHighChange = () => {
    setIsHighToLow(false);
    setIsLowToHigh(!isLowToHigh);
  };

  const handleHighToLowChange = () => {
    setIsLowToHigh(false);
    setIsHighToLow(!isHighToLow);
  };

  function checkForChanges() {
    const storedString = localStorage.getItem("randomString");
    if (storedString !== currentRandomString) {
      setIsOutOfStock(!isOutOfStock);
      currentRandomString = storedString;
    }
  }

  let currentRandomString = localStorage.getItem("randomString");

  setInterval(checkForChanges, 1000);

  useEffect(() => {
    fetch(`http://localhost:4500/menuitems/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setProductsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isOutOfStock]);

  const productss = products.map((item) => ({
    _id: item._id,
    name: item.title,
    category: item.category,
    price: item.Price,
    check: item.check,
    stars: 4.0,
    imageLinks: [`http://localhost:4500/${item.image}`],
    isFavorite: false,
    isAdded: false,
    describtion: item.describtion,
    calories: item.calories,
    carbohydrates: item.carbohydrates,
    fats: item.fats,
    protein: item.protein,
  }));

  let filteredData = productss.filter(
    (item) => !isOutOfStock || (isOutOfStock && item.stock > 0)
  );

  if (isLowToHigh) {
    filteredData = filteredData.sort((a, b) => a.price - b.price);
  } else if (isHighToLow) {
    filteredData = filteredData.sort((a, b) => b.price - a.price);
  }

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
      <div className="py-6 px-3 md:px-0">
        {/* <ToastContainer/> */}
        <div className="flex w-full gap-5 flex-col md:flex-row">
          <div className="flex-[0.15] flex flex-col items-center">
            <button
              className={`bg-black text-white p-2 rounded-lg w-[80%] hover:bg-black/70 `}
              onClick={handleshowfilters}
            >
              Apply Filters {">"}
            </button>
            <br />
            {showfilters ? (
              <>
                <motion.h1
                  whileHover={{ scale: 1.05 }}
                  initial={{ y: -50, opacity: 0, scale: 0.6 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 1.5 }}
                  style={{ marginBottom: "5px", color: "rgb(20 184 166)" }}
                  className="text-center text-black text-1xl md:text-4x1 font-bold"
                >
                  By Price
                </motion.h1>
                <Checkbox
                  label="Low to High"
                  color="danger"
                  checked={isLowToHigh}
                  onClick={handleLowToHighChange}
                />
                <br />
                <Checkbox
                  label="High to Low"
                  color="danger"
                  checked={isHighToLow}
                  onClick={handleHighToLowChange}
                />
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="flex-[0.8] flex flex-col gap-5 items-center md:items-start">
            <div className="w-[95%] md:w-full h-48 md:h-56 relative">
              <img
                src="https://www.minazon.net/thumb/1366x560/1/upload/hinhanh/592239959784969.jpg"
                alt="chairs"
                className="w-full h-full object-cover rounded-md"
              />
              <p className="text-3xl md:text-5xl bg-black/30 rounded p-2 text-white font-semibold absolute top-5 left-5">
                {category ? category : searchQuery ? searchQuery : brand}
              </p>
            </div>
            {productsLoaded ? (
              <div className="grid md:grid-rows-1 grid-rows-3 grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 w-full items-center justify-center px-3 md:px-0">
                {productss.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onCheckboxChange={handleCheckboxChange}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 w-full items-center justify-center px-3 md:px-0">
                {Array.from({ length: 5 }, (_, index) => (
                  <LoadingScreen key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="py-6 px-3 md:px-0">
        <div className="flex w-full gap-5 flex-col md:flex-row">
          <div className="flex-[0.15] flex flex-col items-center">
            <button
              className={`bg-black text-white p-2 rounded-lg w-[80%] hover:bg-black/70 `}
              onClick={handleshowfilters}
            >
              Apply Filters {">"}
            </button>
            <br />
            {showfilters ? (
              <>
                <Checkbox
                  label="Low to High"
                  color="danger"
                  checked={isLowToHigh}
                  onClick={handleLowToHighChange}
                />
                <br />
                <Checkbox
                  label="High to Low"
                  color="danger"
                  checked={isHighToLow}
                  onClick={handleHighToLowChange}
                />
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="flex-[0.8] flex flex-col gap-5 items-center md:items-start">
            <div className="w-[95%] md:w-full h-48 md:h-56 relative">
              <img
                src="https://www.minazon.net/thumb/1366x560/1/upload/hinhanh/592239959784969.jpg"
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
              <p className="text-3xl md:text-5xl bg-black/30 rounded p-2 text-white font-semibold absolute top-5 left-5">
                {category ? category : searchQuery ? searchQuery : brand}
              </p>
            </div>
            {productsLoaded ? (
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
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <ProductCard
                        product={item}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    </motion.div>
                  );
                })}
              </section>
            ) : (
              <LoadingScreen />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsListPage;
