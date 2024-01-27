import React, { useEffect, useState } from 'react'
// import BrandTiles from '../components/BrandTiles';
import CategoryTiles from '../components/CategoryTiles';
import ProductList from '../components/ProductList';
// import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import Slider from "../components/Slider";
// import axios from 'axios';
// import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { closeAll } from '../features/Modals';
import ProductCard from '../components/ProductCard';
// import food1 from "../assets/food1.png"
// import food11 from "../assets/food1.jpg"
// import food2 from "../assets/food2.png"



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



  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Updated API endpoint without specifying an ID
        const response = await fetch("http://192.168.125.141:4500/menuitemsTrending");
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
  //   imageLinks: [`http://192.168.125.141:4500/${item.image}`],
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
        imageLinks: [`http://192.168.125.141:4500/${item.image}`],
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