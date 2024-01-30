import React, { useEffect, useState } from 'react'
import CategoryTiles from '../components/CategoryTiles';
import ProductList from '../components/ProductList';
import Services from '../components/Services';
import Slider from "../components/Slider";
import { useDispatch } from 'react-redux';
import { closeAll } from '../features/Modals';
import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';



function Home() {
  // const [products,setProducts] = useState(null);
  const [trending, setTrending] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const [trendingSet, setTrendingSet] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeAll());
  }, []);

  console.log("fvd",process.env.REACT_APP_API_URL)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Updated API endpoint without specifying an ID
        const response = await fetch("http://localhost:4500/menuitemsTrending");
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenuItems();
  }, []);

  // const productss = products.map((item) => ({
  //   _id: item._id, // Assuming a unique ID for each item
  //   name: item.title,
  //   category: item.category, // You can set the category as per your application logic
  //   price: item.Price, // Define the price as needed
  //   check: item.check,
  //   stars: 4.0, // Set the stars or rating based on your system
  //   imageLinks: [`http://localhost:4500/${item.image}`],
  //   isFavorite: false,
  //   isAdded: false,
  //   describtion: item.describtion
  // }));

  useEffect(() => {
    if (menuItems.length > 0 && !trending) {
      const products = menuItems.map((item) => ({
        _id: item._id,
        name: item.title,
        category: item.category,
        price: item.Price,
        check: item.check,
        stars: 4.0,
        imageLinks: [`http://localhost:4500/${item.image}`],
        isFavorite: false,
        isAdded: false,
        describtion: item.describtion
      }));

      setTrending(products.slice(0, 5));
    }
  }, [menuItems, trending]);

  return (
    <div>
      <Slider />

      {/* <ProductList name={"Trending Products"} data={products}></ProductList> */}
      {trending && <ProductList name={"Trending Products"} data={trending} />}
      
      {/* {trending && <ProductCard  data={trending} />} */}
      <CategoryTiles />
      <Services />
      {/* {featured && <ProductList name={"Featured Products"} data={featured}/>} */}
      {/* <BrandTiles/> */}
      {/* <Newsletter/> */}
    </div>
  );
}

export default Home