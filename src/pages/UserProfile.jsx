import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/User";
import { UserIcon } from "@heroicons/react/24/outline";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";

// import ProductCard from '../components/ProductCard';
import ProductCard from "../components/ProductCard";
import ProductCardDetails from "../components/ProductCardDetails";
import { motion } from "framer-motion";
import { closeAll } from "../features/Modals";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(null);

  const [favoritess, setFavorites] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState([]);
  const [isWindowsSize, setIsWindowsSize] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders function
    const fetchOrders = async () => {
      try {
        // Retrieve userId from localStorage
        // const userId = localStorage.getItem('userId');
        const loginDataString = localStorage.getItem("loginData");
      const loginData = JSON.parse(loginDataString);
      const userId = loginData.favorites._id;
      console.log("userid",userId)

        // Fetch orders using userId
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getorder/${userId}`);
        const data = await response.json();

        // Check if orders were successfully retrieved
        if (response.ok) {
          setOrders(data.orders);
        } else {
          console.error('Failed to fetch orders:', data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Call the fetchOrders function to retrieve orders
    fetchOrders();
  }, []);
  console.log("orders",orders)


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
    setIsOutOfStock(!isOutOfStock);
  };
  // useEffect(() => {

  // }, [isOutOfStock]);

  useEffect(() => {
    const storedData = localStorage.getItem("loginData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (parsedData && parsedData.token) {
        console.log("Stored data found:", parsedData);

        if (parsedData.favorites && parsedData.favorites._id) {
          console.log("Fetching user favorites...");

          fetch(
            `${process.env.REACT_APP_API_URL}/userfavorites/${parsedData.favorites._id}`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("Favorites data received:", data);
              setFavorites(data);

              // get datas for each id
              const favoriteIds = data.favorites;

              // Use Promise.all to wait for all API calls to complete
              const fetchPromises = favoriteIds.map((id) => {
                return fetch(
                  `${process.env.REACT_APP_API_URL}/menuitemsgetproductdetails/${id}`
                )
                  .then((res) => res.json())
                  .catch((err) => {
                    console.error("Error fetching item details:", err);
                  });
              });

              Promise.all(fetchPromises)
                .then((itemDataArray) => {
                  setFavoritesData(itemDataArray);
                   setProductsLoaded(true);
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
  }, [isOutOfStock]);
  // console.log("CurrUser",currUser.favorites._id)

  // useEffect(() => {
  //     if (userId) {
  //       const fetchOrders = async () => {
  //         try {
  //           setLoading(true);
  //           const response = await axios.get(`/orders/${userId}`);
  //           setOrders(response.data.orders);
  //           setLoading(false);
  //         } catch (error) {
  //           console.error('Error fetching orders:', error);
  //           setError('Failed to fetch orders');
  //           setLoading(false);
  //         }
  //       };

  //       fetchOrders();
  //     }
  //   }, [userId]);

  const productss = favoritesData.map((item) => ({
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

  // console.log("data after",favoritesData)

  // Redirect if the user is not logged in
  if (!isUserLoggedIn) {
    setIsUserLoggedIn(false);
    navigate("/");
  }

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("favorites");
    localStorage.removeItem("loginData");
    localStorage.removeItem("user_table");
    localStorage.removeItem("HTML5_QRCODE_DATA");
    localStorage.removeItem("page_redirct");

    navigate("/");
    dispatch(logout({}));
  };

  if (currUser === null) {
    return (
      <div className=" h-[70vh] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  if (isWindowsSize) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:h-[45vh] bg-teal-700 py-10 md:py-0">
          <div className="flex-[0.30] flex justify-center items-center">
            <div className="bg-white rounded-full w-40 h-40 md:w-56 md:h-56 border">
              <UserIcon className="p-10" />
            </div>
          </div>
          <div className="flex-[0.50] text-white flex flex-col items-center md:items-start gap-4 font-medium text=lg mt-5 mb-5 md:mb-0 md:mt-10">
            <h1 className="font-bold text-xl md:text-2xl py-3 md:py-10">
              {currUser.name}
            </h1>
            <h1>Email : {currUser.favorites.email}</h1>
            <h1>Phone # {currUser.favorites.phone}</h1>
            <h1>Address: {currUser.favorites.address}</h1>
          </div>
          <div className="flex-[0.20] flex justify-center items-start pt-4 gap-4">
            <button
              className="bg-[#9E9E9E] p-2 w-28 text-white font-semibold rounded hover:bg-black"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button className="bg-[#9E9E9E] p-2 w-28 rounded text-white font-semibold hover:bg-black">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="px-0 md:px-10 bg-slate-100/90 rounded py-3">
          <h1 className="text-2xl font-semibold pl-3 md:pl-0">
            Favorites {">"}
          </h1>
          {productsLoaded ? (
            <>
            {favoritess &&
          favoritess.favorites &&
          favoritess.favorites.length === 0 ? (
            <div>
              <hr />
              <div className="h-24 text-lg font-medium flex justify-center items-center">
                No items in Favorite
              </div>
              <hr />
            </div>
          ) : (
            // <h1>Testing</h1>
            <div className="grid md:grid-rows-1 grid-rows-3 grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 w-full items-center justify-center px-2 md:px-20">
              {productss.map((prod) => (
                <ProductCard
                  product={prod}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))}
              {/* onCheckboxChange={handleCheckboxChange} */}
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
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "80px",
                  marginBottom: "80px",
                }}
              >
                <CircularProgress />
              </Box>
            </>
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
  {orders.length > 0 ? (
    <div>
      {orders.map(order => (
        <div key={order._id} className="mb-4">
          {/* Render order details here */}
          <p>Order ID: {order._id}</p>
          {/* Render other order details as needed */}
        </div>
      ))}
    </div>
  ) : (
    <div className="h-24 text-lg font-medium flex justify-center items-center">
      No Orders Placed Yet
    </div>
  )}
  <hr />
</div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:h-[45vh] bg-teal-700 py-10 md:py-0">
          <div className="flex-[0.30] flex justify-center items-center">
            <div className="bg-white rounded-full w-40 h-40 md:w-56 md:h-56 border">
              <UserIcon className="p-10" />
            </div>
          </div>
          <div className="flex-[0.50] text-white flex flex-col items-center md:items-start gap-4 font-medium text=lg mt-5 mb-5 md:mb-0 md:mt-10">
            <h1 className="font-bold text-xl md:text-2xl py-3 md:py-10">
              {currUser.name}
            </h1>
            <h1>Email : {currUser.favorites.email}</h1>
            <h1>Phone # {currUser.favorites.phone}</h1>
            <h1>Address: {currUser.favorites.address}</h1>
          </div>
          <div className="flex-[0.20] flex justify-center items-start pt-4 gap-4">
            <button
              className="bg-[#9E9E9E] p-2 w-28 text-white font-semibold rounded hover:bg-black"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button className="bg-[#9E9E9E] p-2 w-28 rounded text-white font-semibold hover:bg-black">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="px-0 md:px-10 bg-slate-100/90 rounded py-3">
          <h1 className="text-2xl font-semibold pl-3 md:pl-0">
            Favorites {">"}
          </h1>

          {productsLoaded ? (
            <>
           {favoritess &&
          favoritess.favorites &&
          favoritess.favorites.length === 0 ? (
            <div>
              <hr />
              <div className="h-24 text-lg font-medium flex justify-center items-center">
                No items in Favorite
              </div>
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
                    <ProductCard
                      product={item}
                      onCheckboxChange={handleCheckboxChange}
                    />
                  </motion.div>
                );
              })}
            </section>
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
                  marginBottom: "80px",
                }}
              >
                <CircularProgress />
              </Box>
            </>
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
  {orders.length > 0 ? (
    <div>
      {orders.map(order => (
        <div key={order._id} className="mb-4">
          {/* Render order details here */}
          <p>Order ID: {order._id}</p>
          {/* Render other order details as needed */}
        </div>
      ))}
    </div>
  ) : (
    <div className="h-24 text-lg font-medium flex justify-center items-center">
      No Orders Placed Yet
    </div>
  )}
  <hr />
</div>
      </div>
    );
  }
}


// {favoritess &&
//   favoritess.favorites &&
//   favoritess.favorites.length === 0 ? (
//     <div>
//       <hr />
//       <div className="h-24 text-lg font-medium flex justify-center items-center">
//         No items in Favorite
//       </div>
//       <hr />
//     </div>
//   ) : (
//     // <h1>Testing</h1>
//     <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 p-4 md:py-5 md:px-14 flex-wrap">
//       {productss.map((item, i) => {
//         return (
//           <motion.div
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.9 }}
//             initial={{ opacity: 0, x: 50, scaleZ: 0 }}
//             whileInView={{
//               opacity: 1,
//               x: 0,
//               scaleZ: 1,
//               transition: {
//                 delay: i * 0.1,
//                 opacity: { duration: 1 },
//                 type: "spring",
//                 bounce: 0.4,
//                 stiffness: 60,
//               },
//             }}
//             viewport={{ once: true }}
//             key={item.heading}
//             className={`p-3 md:p-6 w-full h-full flex gap-x-2 md:gap-x-4 items-center cursor-pointer ${item.bg} rounded-lg select-none`}
//             style={{
//               minWidth: "280px",
//               maxWidth: "100%",
//               backgroundColor: "#fcfcfc",
//               border: "1px solid #ccc", // Added 1px solid border
//               borderRadius: "8px",
//               boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
//             }} // Adjust card width
//           >
//             <ProductCard
//               product={item}
//               onCheckboxChange={handleCheckboxChange}
//             />
//           </motion.div>
//         );
//       })}
//     </section>
//   )}
export default UserProfile;
