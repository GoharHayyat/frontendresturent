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

  // useEffect(()=>{

  //   const config = {
  //     header: {
  //       "Content-Type": "application/json",
  //     }
  //   }
  //   axios.get(`${process.env.REACT_APP_API_URL}random`, config).then(res => {
  //     console.log(res,"GETTINF RANDOM")
  //       if(res.data.products){

  //         setProducts(res.data.products)
  //       }else{
  //         toast("Please Try again Later.")

  //       }
  //     }).catch(err=>{
  //       toast("Please Try again Later.")
  //     })
  // },[])

  // useEffect(() => {
  //   // Fetch the menu items from the server
  //   fetch("http://localhost:4500/getALLproduct")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMenuItems(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);
  // useEffect(() => {
  //   const fetchMenuItems = async () => {
  //     try {
  //       const response = await fetch("http://localhost:4500/getALLproduct");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setMenuItems(data);
  //       } else {
  //         throw new Error("Failed to fetch data");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchMenuItems();
  // }, []);

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

  useEffect(() => {
    if (menuItems.length > 0 && !trending) {
      const products = menuItems.map((item) => ({
        _id: item._id,
        name: item.title,
        category: item.category,
        price: item.Price,
        stars: 4.0,
        imageLinks: [`http://localhost:4500/${item.image}`],
        isFavorite: false,
        isAdded: false,
      }));

      setTrending(products.slice(0, 5));
    }
  }, [menuItems, trending]);

  // Log the products to verify
  // console.log(products);

  // const products = [
  //   {
  //     _id: 1,
  //     name: 'Just Gourmet Beef Burger',
  //     category: 'Burgers',
  //     price: 730,
  //     stars: 4.5,
  //     imageLinks: [food11],
  //     isFavorite: false,
  //     isAdded: false,
  //   },
  //   {
  //     _id: 2,
  //     name: 'Chicken Karahi',
  //     category: 'Karahi',
  //     price: 1280,
  //     stars: 3.5,
  //     imageLinks: ["https://images.deliveryhero.io/image/fd-pk/Products/31881258.jpg"],
  //     isFavorite: true,
  //     isAdded: true,
  //   },
  //   {
  //   _id: 3,
  //     name: 'Egg Lentiger Burger',
  //     category: 'Burgers',
  //     price:550,
  //     stars: 4,
  //     imageLinks: ["https://images.deliveryhero.io/image/fd-pk/Products/40942194.jpg"],
  //     isFavorite: false,
  //     isAdded: false,
  //   },
  //   {
  //     _id: 4,
  //     name: 'Chicken Chapli Pizza',
  //     category: 'Pizza',
  //     price: 525,
  //     stars: 3.5,
  //     imageLinks: ["https://images.deliveryhero.io/image/fd-pk/Products/40942261.jpg"],
  //     isFavorite: true,
  //     isAdded: true,
  //   },
  //   {
  //     _id: 5,
  //     name: 'Crispy Bite Sandwich',
  //     category: 'Sandwiches',
  //     price: 315,
  //     stars: 4.5,
  //     imageLinks: ["https://images.deliveryhero.io/image/fd-pk/Products/40942210.jpg"],
  //     isFavorite: false,
  //     isAdded: false,
  //   },
  //   {
  //     _id: 6,
  //     name: 'Product 6',
  //     category: 'Category 6',
  //     price: 29.99,
  //     stars: 3.5,
  //     imageLinks: [food2],
  //     isFavorite: true,
  //     isAdded: true,
  //   },
  //   // Add more dummy data items as needed
  // ];

  // useEffect(()=>{
  //   if (products) {
  //     setTrending(products.slice(0,5));
  //     // setFeatured(products.slice(5));
  //   }
  // },[products])

  return (
    <div>
      <Slider />

      {/* <ProductList name={"Trending Products"} data={products}></ProductList> */}
      {trending && <ProductList name={"Trending Products"} data={trending} />}
      <CategoryTiles />
      <Services />
      {/* {featured && <ProductList name={"Featured Products"} data={featured}/>} */}
      {/* <BrandTiles/> */}
      {/* <Newsletter/> */}
    </div>
  );
}

export default Home