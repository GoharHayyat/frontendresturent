import React, { useState, useEffect } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ProductList from "../components/ProductList";

function GetRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const [rec, setRec] = useState(null);

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
    // Fetch recommendations when component mounts
    const fetchRecommendations = async () => {
      try {
        // Get user ID from local storage

        const loginDataString = localStorage.getItem('loginData');
      const loginData = JSON.parse(loginDataString);
      const userId  = loginData.favorites._id;
        // const userId = localStorage.getItem('loginData');
        if (!userId) {
          throw new Error('User ID not found in local storage');
        }

        const response = await fetch('http://127.0.0.1:5000/recommendation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: userId })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        setRecommendations(data.recommendations);
        // handleCheckboxChangee(data);
         handleCheckboxChangee(data.recommendations);
        setProductsLoaded(true);

      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendations();

    // Cleanup function
    return () => {
      setRecommendations([]);
    };
  }, []); // Empty dependency array to run effect only once on mount
  console.log("Recommendation",recommendations)


 const handleCheckboxChangee = (recommendations) => {
    // if (data.length > 0 && !trending) {
      const products = recommendations.map((item) => ({
        _id: item._id, // Assuming a unique ID for each item
        name: item.title,
        category: item.category, // You can set the category as per your application logic
        price: item.Price, // Define the price as needed
        check: item.check,
        stars: 4.0, // Set the stars or rating based on your system
        imageLinks: [`${item.image}`],
        isFavorite: false,
        isAdded: false,
        describtion: item.description,
        calories: item.calories,
        carbohydrates: item.carbohydrates,
        fats: item.fats,
        protein: item.protein,
      }));
      // console.log("inside handlecheck",products)

      setRec(products);
    // }
  };

// console.log("recomen.. prouct",rec)

  return (
    <div>
      {productsLoaded ? (
        <>
          {rec && (
            <ProductList name={"Recommendations"} data={rec} onCheckboxChange={handleCheckboxChange} />
            
          )}
          
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
      
      
    </div>
  );
}

export default GetRecommendations;
