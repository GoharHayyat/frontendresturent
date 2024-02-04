import React, { useEffect, useState } from "react";
import CategoryTiles from "../components/CategoryTiles";
import ProductList from "../components/ProductList";
import Services from "../components/Services";
import Slider from "../components/Slider";
import { useDispatch } from "react-redux";
import { closeAll } from "../features/Modals";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import 'react-toastify/dist/ReactToastify.css';

function Home() {
  // const [products,setProducts] = useState(null);
  const [trending, setTrending] = useState(null);
  // const [featured, setFeatured] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  // const [trendingSet, setTrendingSet] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeAll());
  }, []);

  // console.log("fvd", process.env.REACT_APP_API_URL);
  function checkForChanges() {
    const storedString = localStorage.getItem("randomString");
    if (storedString !== currentRandomString) {
      setIsOutOfStock(!isOutOfStock);
      currentRandomString = storedString;
    }
  }

  let currentRandomString = localStorage.getItem("randomString");

  setInterval(checkForChanges, 1000);

  const handleCheckboxChange = () => {
    setIsOutOfStock(!isOutOfStock);
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Updated API endpoint without specifying an ID
        const response = await fetch(
          "https://cv81j9kz-4500.inc1.devtunnels.ms/menuitemsTrending"
        );
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
          handleCheckboxChangee(data);
          setProductsLoaded(true);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenuItems();
  }, [isOutOfStock]);
  console.log("setMenuItems", menuItems)

  const handleCheckboxChangee = (data) => {
    // if (data.length > 0 && !trending) {
      const products = data.map((item) => ({
        _id: item._id, // Assuming a unique ID for each item
        name: item.title,
        category: item.category, // You can set the category as per your application logic
        price: item.Price, // Define the price as needed
        check: item.check,
        stars: 4.0, // Set the stars or rating based on your system
        imageLinks: [`https://cv81j9kz-4500.inc1.devtunnels.ms/${item.image}`],
        isFavorite: false,
        isAdded: false,
        describtion: item.describtion,
        calories: item.calories,
        carbohydrates: item.carbohydrates,
        fats: item.fats,
        protein: item.protein,
      }));

      setTrending(products.slice(0, 5));
    // }
  };
  // console.log("trending", trending)

  // useEffect(() => {
  //   if (menuItems.length > 0 && !trending) {
  //     const products = menuItems.map((item) => ({
  //       _id: item._id, // Assuming a unique ID for each item
  //       name: item.title,
  //       category: item.category, // You can set the category as per your application logic
  //       price: item.Price, // Define the price as needed
  //       check: item.check,
  //       stars: 4.0, // Set the stars or rating based on your system
  //       imageLinks: [`https://cv81j9kz-4500.inc1.devtunnels.ms/${item.image}`],
  //       isFavorite: false,
  //       isAdded: false,
  //       describtion: item.describtion,
  //       calories: item.calories,
  //       carbohydrates: item.carbohydrates,
  //       fats: item.fats,
  //       protein: item.protein,
  //     }));

  //     setTrending(products.slice(0, 5));
  //   }
  // }, [menuItems, trending]);

  console.log("trending",trending)

  return (
    <div>
      <Slider />

      {/* <ProductList name={"Trending Products"} data={products}></ProductList> */}
      {productsLoaded ? (
        <>
          {trending && (
            <ProductList name={"Trending Products"} data={trending} onCheckboxChange={handleCheckboxChange} />
            
          )}
          {/* //Categories */}
           <CategoryTiles />
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "80px",
              marginBottom:"80px"
            }}
          >
            <CircularProgress />
          </Box>
        </>
      )}

      {/* {trending && <ProductCard  data={trending} />} */}
     
      <Services />
     
    </div>
  );
}

export default Home;
