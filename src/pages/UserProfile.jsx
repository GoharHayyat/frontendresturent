import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/User';
import { UserIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-toastify';
// import ProductCard from '../components/ProductCard';
import ProductCard from '../components/ProductCard';
import ProductCardDetails from '../components/ProductCardDetails';
import { motion } from 'framer-motion';
import { closeAll } from '../features/Modals';


function UserProfile() {
  const dispatch = useDispatch();
const navigate = useNavigate();
const [currUser, setCurrUser] = useState(null);
const [favoritess, setFavorites] = useState([]);
const [favoritesData, setFavoritesData] = useState([]);
const [isUserLoggedIn, setIsUserLoggedIn] = useState([]);
const [isWindowsSize, setIsWindowsSize] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsWindowsSize(window.innerWidth > 500); 
  };
  handleResize();

  window.addEventListener("resize", handleResize);

  // Remove the event listener when the component unmounts
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

const handleCheckboxChange = () => {
  // setIsOutOfStock(!isOutOfStock);
};
// useEffect(() => {
  
// }, [isOutOfStock]);

useEffect(() => {
  dispatch(closeAll());
}, []);

useEffect(() => {
  const storedData = localStorage.getItem("loginData");

  if (storedData) {
    const parsedData = JSON.parse(storedData);

    if (parsedData && parsedData.token) {
      console.log("Stored data found:", parsedData);

      if (parsedData.favorites && parsedData.favorites._id) {
        console.log("Fetching user favorites...");

        fetch(`https://cv81j9kz-4500.inc1.devtunnels.ms/userfavorites/${parsedData.favorites._id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Favorites data received:", data);
            setFavorites(data);

            // get datas for each id
            const favoriteIds = data.favorites;

            // Use Promise.all to wait for all API calls to complete
            const fetchPromises = favoriteIds.map((id) => {
              return fetch(`https://cv81j9kz-4500.inc1.devtunnels.ms/menuitemsgetproductdetails/${id}`)
                .then((res) => res.json())
                .catch((err) => {
                  console.error("Error fetching item details:", err);
                });
            });

            Promise.all(fetchPromises)
              .then((itemDataArray) => {
                setFavoritesData(itemDataArray);
              })
              .catch((err) => {
                console.error("Error fetching item details:", err);
              });

            setCurrUser(parsedData);
            setIsUserLoggedIn(true);
          })
          .catch((err) => {
            console.error("Error fetching favorites:", err);
          });
      } else {
        console.log("Invalid favorites structure in stored data.");
      }
    } else {
      console.log("Invalid stored data structure.");
    }
  } else {
    console.log("No stored data found in local storage.");
    setIsUserLoggedIn(false);
  }
}, []); 

const productss = favoritesData.map((item) => ({
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
  calories:item.calories,
  carbohydrates:item.carbohydrates,
  fats:item.fats,
  protein:item.protein

}));

// console.log("data after",favoritesData)

// Redirect if the user is not logged in
if (!isUserLoggedIn) {
  setIsUserLoggedIn(false);
  navigate("/");
}

  const handleLogout = ()=>{
    localStorage.removeItem("auth-token")
    localStorage.removeItem("favorites")
    localStorage.removeItem("loginData")
    
    navigate("/")
    dispatch(logout({}));
    
  }
  
  if (currUser === null) {
    return <div className='w-[90vw] h-[70vh] flex justify-center items-center'>
      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  }
  if (isWindowsSize) {
    return (
      <div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:h-[45vh] bg-teal-700 py-10 md:py-0">
        <div className="flex-[0.30] flex justify-center items-center">
          <div className="bg-white rounded-full w-40 h-40 md:w-56 md:h-56 border">
            <UserIcon className="p-10"/>
          </div>
        </div>
        <div className="flex-[0.50] text-white flex flex-col items-center md:items-start gap-4 font-medium text=lg mt-5 mb-5 md:mb-0 md:mt-10">
          <h1 className="font-bold text-xl md:text-2xl py-3 md:py-10">{currUser.name}</h1>
          <h1>Email : {currUser.favorites.email}</h1>
          <h1>Phone # {currUser.favorites.phone}</h1>
          <h1>Address: {currUser.favorites.address}</h1>

        </div>
        <div className="flex-[0.20] flex justify-center items-start pt-4 gap-4">
          <button className="bg-[#9E9E9E] p-2 w-28 text-white font-semibold rounded hover:bg-black" onClick={handleLogout}>Logout</button>
          <button className="bg-[#9E9E9E] p-2 w-28 rounded text-white font-semibold hover:bg-black" >Edit Profile</button>

        </div>
      </div>
      <div className="px-0 md:px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold pl-3 md:pl-0">Favorites {">"}</h1>
        {favoritess && favoritess.favorites && favoritess.favorites.length === 0 ? (
          <div>
            <hr />
            <div className="h-24 text-lg font-medium flex justify-center items-center">No items in Favorite</div>
            <hr />
          </div>
        ) : (
          // <h1>Testing</h1>
         <div className='grid md:grid-rows-1 grid-rows-3 grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 w-full items-center justify-center px-2 md:px-20'>
            {productss.map((prod) => (
                <ProductCard  product={prod} onCheckboxChange={handleCheckboxChange}/>
              ))}
            {/* { favoritesData.map((item, i) => (

              <motion.div
                key={`${item._id}`}
                initial={{ opacity: 0, x: 50, scale: 0.5 }}
                transition={{ type: "spring", delay: i * 0.4, bounce: 0.4, stiffness: 60, mass: 1.5 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                className={`flex justify-center items-center p-3`}
              >
                <ProductCard product={item} />
              </motion.div>
            ))} */}
          </div>
        )}
      </div>
      {/* <div className="px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold">Your Products {">"}</h1>
        <hr />
        <div className="h-24 text-lg font-medium flex justify-center items-center">No Items to sell</div>
        <hr />
      </div> */}
      <div className="px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold">Orders {">"}</h1>
        <hr />
        <div className="h-24 text-lg font-medium flex justify-center items-center">No Orders Placed Yet</div>
        <hr />
      </div>
    </div>
    )
    } else {
      return (
<div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:h-[45vh] bg-teal-700 py-10 md:py-0">
        <div className="flex-[0.30] flex justify-center items-center">
          <div className="bg-white rounded-full w-40 h-40 md:w-56 md:h-56 border">
            <UserIcon className="p-10"/>
          </div>
        </div>
        <div className="flex-[0.50] text-white flex flex-col items-center md:items-start gap-4 font-medium text=lg mt-5 mb-5 md:mb-0 md:mt-10">
          <h1 className="font-bold text-xl md:text-2xl py-3 md:py-10">{currUser.name}</h1>
          <h1>Email : {currUser.favorites.email}</h1>
          <h1>Phone # {currUser.favorites.phone}</h1>
          <h1>Address: {currUser.favorites.address}</h1>

        </div>
        <div className="flex-[0.20] flex justify-center items-start pt-4 gap-4">
          <button className="bg-[#9E9E9E] p-2 w-28 text-white font-semibold rounded hover:bg-black" onClick={handleLogout}>Logout</button>
          <button className="bg-[#9E9E9E] p-2 w-28 rounded text-white font-semibold hover:bg-black" >Edit Profile</button>

        </div>
      </div>
      <div className="px-0 md:px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold pl-3 md:pl-0">Favorites {">"}</h1>
        {favoritess && favoritess.favorites && favoritess.favorites.length === 0 ? (
          <div>
            <hr />
            <div className="h-24 text-lg font-medium flex justify-center items-center">No items in Favorite</div>
            <hr />
          </div>
        ) : (
          // <h1>Testing</h1>
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
                      border: "1px solid #ccc", // Added 1px solid border
                      borderRadius: "8px",
                      boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
                    }} // Adjust card width
                  >
                    <ProductCard  product={item} onCheckboxChange={handleCheckboxChange}/>
                  </motion.div>
                );
              })}
            </section>
        )}
      </div>
      {/* <div className="px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold">Your Products {">"}</h1>
        <hr />
        <div className="h-24 text-lg font-medium flex justify-center items-center">No Items to sell</div>
        <hr />
      </div> */}
      <div className="px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold">Orders {">"}</h1>
        <hr />
        <div className="h-24 text-lg font-medium flex justify-center items-center">No Orders Placed Yet</div>
        <hr />
      </div>
    </div>
      )
    }
  }
  // return (
  //   <div className="flex flex-col">
  //     <div className="flex flex-col md:flex-row md:h-[45vh] bg-teal-700 py-10 md:py-0">
  //       <div className="flex-[0.30] flex justify-center items-center">
  //         <div className="bg-white rounded-full w-40 h-40 md:w-56 md:h-56 border">
  //           <UserIcon className="p-10"/>
  //         </div>
  //       </div>
  //       <div className="flex-[0.50] text-white flex flex-col items-center md:items-start gap-4 font-medium text=lg mt-5 mb-5 md:mb-0 md:mt-10">
  //         <h1 className="font-bold text-xl md:text-2xl py-3 md:py-10">{currUser.name}</h1>
  //         <h1>Email : {currUser.favorites.email}</h1>
  //         <h1>Phone # {currUser.favorites.phone}</h1>
  //         <h1>Address: {currUser.favorites.address}</h1>

  //       </div>
  //       <div className="flex-[0.20] flex justify-center items-start pt-4 gap-4">
  //         <button className="bg-[#9E9E9E] p-2 w-28 text-white font-semibold rounded hover:bg-black" onClick={handleLogout}>Logout</button>
  //         <button className="bg-[#9E9E9E] p-2 w-28 rounded text-white font-semibold hover:bg-black" >Edit Profile</button>

  //       </div>
  //     </div>
  //     <div className="px-0 md:px-10 bg-slate-100/90 rounded py-3">
  //       <h1 className="text-2xl font-semibold pl-3 md:pl-0">Favorites {">"}</h1>
  //       {favoritess && favoritess.favorites && favoritess.favorites.length === 0 ? (
  //         <div>
  //           <hr />
  //           <div className="h-24 text-lg font-medium flex justify-center items-center">No items in Favorite</div>
  //           <hr />
  //         </div>
  //       ) : (
  //         // <h1>Testing</h1>
  //        <div className='grid md:grid-rows-1 grid-rows-3 grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 w-full items-center justify-center px-2 md:px-20'>
  //           {productss.map((prod) => (
  //               <ProductCard  product={prod} onCheckboxChange={handleCheckboxChange}/>
  //             ))}
  //           {/* { favoritesData.map((item, i) => (

  //             <motion.div
  //               key={`${item._id}`}
  //               initial={{ opacity: 0, x: 50, scale: 0.5 }}
  //               transition={{ type: "spring", delay: i * 0.4, bounce: 0.4, stiffness: 60, mass: 1.5 }}
  //               whileInView={{ opacity: 1, x: 0, scale: 1 }}
  //               viewport={{ once: true }}
  //               className={`flex justify-center items-center p-3`}
  //             >
  //               <ProductCard product={item} />
  //             </motion.div>
  //           ))} */}
  //         </div>
  //       )}
  //     </div>
  //     {/* <div className="px-10 bg-slate-100/90 rounded py-3">
  //       <h1 className="text-2xl font-semibold">Your Products {">"}</h1>
  //       <hr />
  //       <div className="h-24 text-lg font-medium flex justify-center items-center">No Items to sell</div>
  //       <hr />
  //     </div> */}
  //     <div className="px-10 bg-slate-100/90 rounded py-3">
  //       <h1 className="text-2xl font-semibold">Orders {">"}</h1>
  //       <hr />
  //       <div className="h-24 text-lg font-medium flex justify-center items-center">No Orders Placed Yet</div>
  //       <hr />
  //     </div>
  //   </div>
  // )


export default UserProfile