import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/User";
import { UserIcon } from "@heroicons/react/24/outline";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/joy/AccordionDetails";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/joy/AccordionSummary";

// import ProductCard from '../components/ProductCard';
import ProductCard from "../components/ProductCard";
import ProductCardDetails from "../components/ProductCardDetails";
import { motion } from "framer-motion";
import { closeAll } from "../features/Modals";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(null);

  const [favoritess, setFavorites] = useState({});

  const [favoritesData, setFavoritesData] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState([]);
  const [isWindowsSize, setIsWindowsSize] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);

  const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    console.log("SelectedOrder",selectedOrder)

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };


  useEffect(() => {
    // Fetch orders function
    const fetchOrders = async () => {
      try {
        // Retrieve userId from localStorage
        // const userId = localStorage.getItem('userId');
        const loginDataString = localStorage.getItem("loginData");
        const loginData = JSON.parse(loginDataString);
        const userId = loginData.favorites._id;
        console.log("userid", userId);

        // Fetch orders using userId
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/getorder/${userId}`
        );
        const data = await response.json();

        // Check if orders were successfully retrieved
        if (response.ok) {
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Call the fetchOrders function to retrieve orders
    fetchOrders();
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

  const productss = favoritesData.map((item) => ({
    _id: item._id, // Assuming a unique ID for each item
    name: item.title,
    category: item.category, // You can set the category as per your application logic
    price: item.Price, // Define the price as needed
    check: item.check,
    stars: 4.0, 
    imageLinks: [`${item.image}`],
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
    localStorage.removeItem("Coupon");

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
        <h1 className="text-2xl font-semibold mb-4">Orders &gt;</h1>
        
       
        {orders.length === 0 ? (
    <div className="text-xl font-bold text-black text-center">No order placed yet</div>
) : (
    <div className="px-10 py-6 bg-gray-200 rounded-lg shadow-md">
        <hr className="mb-4" />
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{backgroundColor:"#0f575c",color:"white"}}>Invoice ID</TableCell>
                        <TableCell style={{backgroundColor:"#0f575c",color:"white"}}>Date</TableCell>
                        <TableCell style={{backgroundColor:"#0f575c",color:"white"}}>Order Status</TableCell>
                        <TableCell style={{backgroundColor:"#0f575c",color:"white"}}>Bill</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order._id}
                            onClick={() => handleOrderClick(order)}
                            style={{ cursor: "pointer" }}
                        >
                            <TableCell>{order.invoiceid}</TableCell>
                            <TableCell>{new Date(order.orderDate).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}</TableCell>
                            <TableCell>{order.orderstatus}</TableCell>
                            <TableCell>{order.onlinePayment ? "Paid" : "Not Paid"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Modal
  open={!!selectedOrder}
  onClose={handleCloseModal}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{
    timeout: 500,
  }}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Fade in={!!selectedOrder}>
    <div className="modal" style={{ outline: 'none', maxWidth: 600, width: '90%', maxHeight: 600, overflowY: 'auto', borderRadius: 8 }}>
      <Card variant="outlined" sx={{ maxWidth: 1200 }}>
  <Typography variant="h6" className="text-lg font-semibold">Total Bill: {selectedOrder?.totalPrice}/-Rs</Typography>
  <Typography variant="h6" className="text-lg font-semibold">Table No: {selectedOrder?.tableNo?.table}</Typography>
  {/* <TableCell>
                {selectedOrder?.onlinePayment ? "Paid" : "Not Paid"}
              </TableCell>
  <Typography variant="h6" style={{ fontWeight: 'bold' }}>Table No: {selectedOrder?.tableNo?.table}</Typography> */}


  {selectedOrder?.products && (
    <div>
      <Typography variant="h6" style={{ fontWeight: 'bold' }}>Order Details:</Typography>
      {selectedOrder.products.map((product) => (
        <Accordion key={product._id}>
            {/* <Typography style={{ fontWeight: 'bold' }}>{product.name} - Requested Quantity: {product.quantity}</Typography> */}
            <Typography className="text-lg font-semibold">Item Name({product.name}) Quantity of Item ({product.quantity})</Typography>

        </Accordion>
      ))}
    </div>
  )}
</Card>

    </div>
  </Fade>
</Modal>

    </div>
    
)}

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

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div>
  <h1 className="text-xl font-semibold mb-4">Orders &gt;</h1>
  <hr className="mb-4" />
  {orders && orders.length > 0 ? (
    orders.map((order) => (
      <div key={order._id} onClick={() => handleOrderClick(order)} className="mb-4 bg-white rounded-lg shadow-md p-4 cursor-pointer" style={{ border: "1px solid black", padding: "10px" }}>
        <div className="flex justify-between">
          <div>
            <p className="text-lg font-semibold">Invoice ID: {order.invoiceid}</p>
            <p className="text-sm">Date: {new Date(order.orderDate).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}</p>
          </div>
          <p className="text-sm">{order?.onlinePayment ? "Paid" : "Not Paid"}</p>
        </div>
        <p className="text-sm">Total Bill: {order.totalPrice}/-Rs</p>
        <p className="text-sm mt-2">Order Status: {order.orderstatus}</p>
      </div>
    ))
  ) : (
    <div className="text-xl font-bold text-black text-center">No order placed yet</div>
  )}
</div>
    
      <Modal
  open={!!selectedOrder}
  onClose={handleCloseModal}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{
    timeout: 500,
  }}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Fade in={!!selectedOrder}>
    <div className="modal" style={{ outline: 'none', maxWidth: 600, width: '90%', maxHeight: 600, overflowY: 'auto', borderRadius: 8 }}>
      <Card variant="outlined" sx={{ maxWidth: 1200 }}>
  {/* <Typography variant="h6" style={{ fontWeight: 'bold' }}>Total Bill: {selectedOrder?.totalPrice}/-Rs</Typography> */}
  <Typography variant="h6" style={{ fontWeight: 'bold' }}>Table No: {selectedOrder?.tableNo?.table}</Typography>
  
  {selectedOrder?.products && (
    <div>
      <Typography variant="h6" style={{ fontWeight: 'bold' }}>Order Details:</Typography>
      {selectedOrder.products.map((product) => (
        <Accordion key={product._id}>
          {/* <AccordionSummary> */}
            {/* <Typography style={{ fontWeight: 'bold' }}>Item Name({product.name}) Quantity of Item ({product.quantity})</Typography> */}
            <Typography style={{ fontWeight: 'bold' }}>{product.name} Quantity({product.quantity}).</Typography>

          {/* </AccordionSummary> */}
        </Accordion>
      ))}
    </div>
  )}
</Card>

    </div>
  </Fade>
</Modal>

    </div>

      </div>
    );
  }
}
export default UserProfile;
