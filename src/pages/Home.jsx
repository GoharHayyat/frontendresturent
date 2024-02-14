import React, { useEffect, useState } from "react";
import CategoryTiles from "../components/CategoryTiles";
import ProductList from "../components/ProductList";
import Services from "../components/Services";
import Slider from "../components/Slider";
import { useDispatch } from "react-redux";
import { closeAll } from "../features/Modals";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import GetRecommendations from "../components/getrec";

function Home() {
  const [trending, setTrending] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeAll());
  }, []);

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
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/menuitemsTrending`
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
  // console.log("setMenuItems", menuItems)

  const handleCheckboxChangee = (data) => {
      const products = data.map((item) => ({
        _id: item._id, // Assuming a unique ID for each item
        name: item.title,
        category: item.category, // You can set the category as per your application logic
        price: item.Price, // Define the price as needed
        check: item.check,
        stars: 4.0, // Set the stars or rating based on your system
        imageLinks: [`${process.env.REACT_APP_API_URL}/${item.image}`],
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
  // console.log("api is", process.env.REACT_APP_API_URL)

 

  console.log("trending",trending)

  return (
    <div>
      <Slider />

      {productsLoaded ? (
        <>
          {trending && (
            <ProductList name={"Trending Products"} data={trending} onCheckboxChange={handleCheckboxChange} />
            
          )}
           <CategoryTiles />
          <GetRecommendations/>

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

     
      <Services />
     
    </div>
  );
}

export default Home;
