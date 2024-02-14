import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout } from "../features/User";
import { toast } from "react-toastify";
import Barcode from "./Barcode";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { KeyboardArrowRight } from "@mui/icons-material";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Buttonn from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { removeFromCart } from "../features/Cart";
import Backdrop from '@mui/material/Backdrop';
import React from "react";
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import LaptopIcon from '@mui/icons-material/Laptop';
import TvIcon from '@mui/icons-material/Tv';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const variants = {
  initial: { opacity: 0, scaleY: -1 },
  animate: { opacity: 1, scaleY: 1 },
};
const generateKey = () => {
  return Math.random().toString(36).substr(2, 9);
};

function CheckoutForm() {
  const keyForChild = generateKey();
  const cart = useSelector((state) => state.cart.cart);
  console.log("checkoutfinal", cart);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usertable, setUserTable] = useState({});
  const [usertablecheck, setUserTablecheck] = useState(false);
  const [manually, setmanually] = useState(true);
  // const [manuallyData, setmanuallyData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errormessage, setErrormessage] = useState(false);
  const [inputData, setInputData] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponn, setCouponn] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Cash'); // Set 'Mobile' as the default selected value
  const [status, setStatus] = useState("Not Active");

  // const [statusrev, setStatusrev] = useState("Activated");

  const handleChange = (selectedValue) => {
    setValue(selectedValue);
  };
  

  useEffect(() => {
    const getDataFromLocalStorage = () => {
      const storedData = localStorage.getItem("Coupon");
      if (storedData) {
        setCoupon(storedData);
        setCouponn(true);
      }
    };
    getDataFromLocalStorage();
  }, [inputData]);

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleSubmittt = async () => {

    if (inputData.length >= 5) {
      setStatus("Activated");
      setIsLoading(true);
      setErrormessage(false);
      try {
        console.log(process.env.REACT_APP_API_URL);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/qrcodestokens`
        );

        if (response.ok) {
          const data = await response.json();
          const lastFiveDigitsInput = inputData.slice(-5);

          const matchingToken = data.find(
            (item) => item.tableId && item.tableId.endsWith(lastFiveDigitsInput)
          );

          if (matchingToken) {
            const result = {
              table: matchingToken.table,
              tableId: matchingToken.tableId,
            };

            if(matchingToken.status=='Not Active'){

            try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/updatestatus`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ table: result.table, status:"Activated" })
              });
            
              if (response.ok) {

                setStatus('Not Active');
                localStorage.setItem("user_table", JSON.stringify(result));
                setUserTable(result);
                setmanually(true);
                setUserTablecheck(true);
                setInputData("");
                setTimeout(() => {
                  setIsLoading(false);
                }, 3000);
           
              }
            
              const data = await response.json();
              console.log(data.message); // Assuming your server responds with a message
            } catch (error) {
              console.error('Error updating status:', error);
            }
          }else{
            
            setErrormessage(true);
            setTimeout(() => {
              toast.error("token already in Use")
              setIsLoading(false);
            }, 3000);

          }

           
          } else {
            setErrormessage(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 3000);
          }
        } else {
          console.error("Failed to fetch API data:", response.statusText);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching API data:", error);
        toast("Error fetching API data: " + error.message);
        setIsLoading(false);
      }
    } else {
      toast("Input 5 characters Validation Code");
    }
  };


  const handleDelete = async () => {
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/updatestatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table: usertable.table, status })
      });
    
      if (response.ok) {
        localStorage.removeItem("user_table");
        localStorage.removeItem("HTML5_QRCODE_DATA");
        localStorage.removeItem("generatedString");
        localStorage.removeItem("timeRemaining");
        setUserTablecheck(false);
        toast("Table Deleted");
      }
    
      const data = await response.json();
      console.log(data.message); // Assuming your server responds with a message
    } catch (error) {
      console.error('Error updating status:', error);
    }

   
  };

  const handlecontinuemanually = () => {
    setmanually(false);
    setUserTablecheck(true);
  };
  const handlecancel = () => {
    setmanually(true);
    setUserTablecheck(false);
  };

  useEffect(() => {
    localStorage.removeItem("HTML5_QRCODE_DATA");
    const getDataFromLocalStorage = () => {
      const storedData = localStorage.getItem("user_table");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserTablecheck(true);
        setUserTable(parsedData);
      }
    };
    getDataFromLocalStorage();
  }, []);

  const inputClass =
    "peer outline-black-600 p-2 rounded-md border-2 border-gray-400 placeholder-transparent";
  const labelClass =
    "absolute left-2 -top-2.5 bg-white text-black-700 peer-focus:left-2 peer-focus:text-sm peer-focus:-top-2.5 peer-focus:text-black peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-2.5 pointer-events-none transition-all";

  useEffect(() => {
    const loginDataString = localStorage.getItem("loginData");

    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      setUser(loginData);
      // console.log("user", user);
    }
  }, []);

  const userContactInfo = () => {
    if (user) {
      //setValues({...values,existingaddress:user.address})
      return (
        <>
        

          <div className="flex flex-col my-2 gap-1 justify-center text-base">
            <p>
              You are Currently Logged In as{" "}
              <Link to="/profile" className="font-[500] hover:text-teal-600">
                {user.favorites.name}
              </Link>
            </p>
            <p>
              With <span className="font-[500]">"{user.favorites.email}"</span>
            </p>
            {/* <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.9}} onClick={handleLogout} className="bg-black/70 text-white text-sm w-16 p-1 rounded hover:bg-black">Logout</motion.button> */}
          </div>
          <div style={{ marginTop: "20px", marginBottom: "8px" }}>
            {errormessage ? (
              <div
                style={{ color: "red", fontSize: "16px", marginBottom: "5px" }}
              >
                Invalid Code!
              </div>
            ) : (
              <></>
            )}

            {!manually ? (
              <>
                <Box
                  sx={{
                    width: 400,
                    maxWidth: "80%",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Enter Code"
                    id="fullWidth"
                    value={inputData}
                    onChange={handleInputChange}
                  />
                </Box>
                <br />
                <Stack direction="row" spacing={2}>
                  <Buttonn
                    variant="contained"
                    color="success"
                    onClick={handleSubmittt}
                  >
                    Submit
                  </Buttonn>
                  <Buttonn
                    onClick={handlecancel}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Buttonn>
                </Stack>
              </>
            ) : (
              <></>
            )}
            {usertablecheck && manually ? (
              <>
                <Stack direction="row" spacing={1}>
                  <h1
                    style={{
                      fontStyle: "bold",
                      fontSize: "20px",
                      color: "green",
                    }}
                  >
                    User is on table no: {usertable.table}
                  </h1>
                  <Chip
                    label="Delete"
                    variant="filled"
                    color="error"
                    // onClick={handleClick}
                    onDelete={handleDelete}
                  />
                </Stack>
              </>
            ) : (
              <></>
            )}
          </div>
          {usertablecheck ? (
            <>{/* <h1>user is on table no: {usertable.table}</h1> */}</>
          ) : (
            <>
              <div
                style={{
                  width: "80%",
                  marginBottom: "10px",
                  marginLeft: "10%",
                }}
              >
                <Barcode key={keyForChild} redirect={true} />
              </div>
              <p style={{ fontSize: "12px" }}>Having trouble Scaning?</p>
              <div
                style={{ width: "80%", marginBottom: "5px", marginTop: "10px" }}
              >
                <Button
                  onClick={handlecontinuemanually}
                  endDecorator={<KeyboardArrowRight />}
                  color="success"
                >
                  Enter Code Manually
                </Button>
              </div>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          <div className="my-2 text-base">
            <p>
              You are Currently not Logged in. Click to{" "}
              <Link to="/login" className="font-semibold hover:text-teal-600">
                Log In
              </Link>
            </p>
          </div>
          <div style={{ marginTop: "20px", marginBottom: "8px" }}>
            {errormessage ? (
              <div
                style={{ color: "red", fontSize: "16px", marginBottom: "5px" }}
              >
                Invalid Code!
              </div>
            ) : (
              <></>
            )}
            {!manually ? (
              <>
                <Box
                  sx={{
                    width: 400,
                    maxWidth: "80%",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Enter Code"
                    id="fullWidth"
                    value={inputData}
                    onChange={handleInputChange}
                  />
                </Box>
                <br />
                <Stack direction="row" spacing={2}>
                  <Buttonn
                    variant="contained"
                    color="success"
                    onClick={handleSubmittt}
                  >
                    Submit
                  </Buttonn>
                  <Buttonn
                    onClick={handlecancel}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Buttonn>
                </Stack>
              </>
            ) : (
              <></>
            )}
            {usertablecheck && manually ? (
              <>
                <Stack direction="row" spacing={1}>
                  <h1
                    style={{
                      fontStyle: "bold",
                      fontSize: "20px",
                      color: "green",
                    }}
                  >
                    User is on table no: {usertable.table}
                  </h1>
                  <Chip
                    label="Delete"
                    variant="filled"
                    color="error"
                    // onClick={handleClick}
                    onDelete={handleDelete}
                  />
                </Stack>
              </>
            ) : (
              <></>
            )}
          </div>
          {usertablecheck ? (
            <>{/* <h1>user is on table no: {usertable.table}</h1> */}</>
          ) : (
            <>
              <div
                style={{
                  width: "80%",
                  marginBottom: "10px",
                  marginLeft: "10%",
                }}
              >
                <Barcode key={keyForChild} redirect={true} />
              </div>
              <p style={{ fontSize: "12px" }}>Having trouble Scaning?</p>
              <div
                style={{ width: "80%", marginBottom: "5px", marginTop: "10px" }}
              >
                <Button
                  onClick={handlecontinuemanually}
                  endDecorator={<KeyboardArrowRight />}
                  color="success"
                >
                  Enter Code Manually
                </Button>
              </div>
            </>
          )}
        </>
      );
    }
  };

  // const handleSubmit = async (e) => {
  const processAnotherAPI = async () => {

    if (user) {
    } else {
      toast.error("login to continue");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items before submitting.");
      return;
    }

    if (usertablecheck === false) {
      toast.error("Please select a table before submitting.");
      return;
    }
    setOpen(true)

    const products = cart.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.count,
    }));

    const updateproducts = cart.map((item) => ({
      describtion: item.describtion,
      quantity: item.count,
    }));

    var ingredientsToUpdate = [];

    updateproducts.forEach((product) => {
      var productDescription = product.describtion;
      var productObj = JSON.parse(productDescription);

      for (var key in productObj) {
        if (productObj.hasOwnProperty(key)) {
          var name = key;
          var quantity = productObj[key];

          if (quantity !== -99) {
            var quantityy = productObj[key] * product.quantity;
            // Store name and quantity in the array
            ingredientsToUpdate.push({ name, quantityy });
          }
        }
      }
    });

    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.count,
      0
    );

    const purchaseData = cart.map((item) => ({
      name: item.name,
      quantity: item.count,
    }));

    try {
      const orderResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        {
          userId: user.favorites._id,
          products,
          onlinePayment: false,
          totalPrice,
          tableNo: usertable,
        }
      );

      if (orderResponse.status >= 200 && orderResponse.status < 300) {
        if (couponn) {
          console.log("Inside couponn block");
          try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const couponResponse = await axios.post(
              `${process.env.REACT_APP_API_URL}/verifycouponupdate`,
              { coupon }
            );

            if (couponResponse.status === 200) {
              setCoupon("");
              setCouponn(false);
              localStorage.removeItem("Coupon");
            } else {
              // Handle non-successful coupon verification
              throw new Error("Failed to verify coupon");
            }
          } catch (couponError) {
            console.error("Error verifying coupon:", couponError);
            // Handle coupon verification error
            // You might want to provide feedback to the user or take other actions
          }
        }

        const stockUpdateResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/ingredients/updateorignalstock`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ingredientsToUpdate),
          }
        );

        if (stockUpdateResponse.ok) {
          try {
            const purchaseResponse = await axios.post(
              `${process.env.REACT_APP_API_URL}/updateTotalPurchases`,
              purchaseData
            );

            cart.forEach((item) => dispatch(removeFromCart({ _id: item._id })));
            // Order and stock update were successful
            // toast.success("Order submitted successfully");
            localStorage.removeItem("user_table");
            localStorage.removeItem("HTML5_QRCODE_DATA");
            setOpen(false);
            // Redirect to success page or any desired page
            window.location.href = "/ordersuccess";

            console.log("Items purchased successfully:", purchaseResponse.data);
            // Handle success as needed
          } catch (error) {
            console.error("There was a problem with the API request:", error);
            // Handle errors as needed
          }
        } else {
          // Handle non-successful stock update
          throw new Error("Failed to update stock");
        }
      } else {
        // Handle non-successful order submission
        throw new Error("Failed to submit order");
      }
    } catch (orderError) {
      setOpen(false);
      window.location.href = "/error";
      console.error("Error submitting order:", orderError);
      // toast.error("Failed to submit order. Please try again later.");
    }
  };



const processStripePayment = async (products, user) => {
  const config = {
      headers: {
          'Content-Type': 'application/json',
      },
  };

  try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/stripe`, { products, user }, config);
      const { data } = response;
      console.log("data",data);
      window.location.href = data.url;
  } catch (error) {
      console.error('Error submitting to server:', error);

      if (error.response) {
          console.error('Server responded with:', error.response.data);
          toast('Server Error. Please check your input and try again.');
      } else if (error.request) {
          console.error('No response received from the server:', error.request);
          toast('No response from the server. Please try again later.');
      } else {
          console.error('Error setting up the request:', error.message);
          toast('Error setting up the request. Please try again later.');
      }
  }
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const products = [];
    cart.map((item, i) => products.push({ item: [i, { name: item.name, price: item.price }], quantity: item.count }));

    if (user) {
    } else {
      toast.error("login to continue");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items before submitting.");
      return;
    }

    if (usertablecheck === false) {
      toast.error("Please select a table before submitting.");
      return;
    }
   

    if(value=="Card")
    {
      await processStripePayment(products, user);
    }
    else{
      await processAnotherAPI();
    }

    // if (!cart || !Array.isArray(cart)) {
    //     // Handle the case where cart is undefined or not an array
    //     console.error('Invalid cart:', cart);
    //     toast('Invalid cart. Please try again.');
    //     return;
    // }

    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };

    // const products = [];
    //     cart.map((item,i)=> products.push({item:[i,{name:item.name,price:item.price}],quantity:item.count}));
    // try {
    //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/stripe`, { products, user }, config);
    //     const { data } = response;
    //     console.log(data);
    //     window.location.href = data.url;
    // } catch (error) {
    //     console.error('Error submitting to server:', error);

    //     if (error.response) {
    //         console.error('Server responded with:', error.response.data);
    //         toast('Server Error. Please check your input and try again.');
    //     } else if (error.request) {
    //         console.error('No response received from the server:', error.request);
    //         toast('No response from the server. Please try again later.');
    //     } else {
    //         console.error('Error setting up the request:', error.message);
    //         toast('Error setting up the request. Please try again later.');
    //     }
    // }
};



  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh", // Adjust this based on your layout
          marginLeft: "10%", // Center the container horizontally
        }}
      >
        <CircularProgress />
        <p style={{ marginTop: "10px" }}>Authenticating Code...</p>
      </div>
    );
  }

  return (
<>
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
    <motion.div
      initial={{ opacity: 0.3, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { type: "spring", duration: 1 },
      }}
      className="flex flex-col p-4 md:p-10 w-full md:w-[55%]"
    >
      <h1 className="text-lg font-semibold">Contact Information</h1>
      {userContactInfo()}
      <hr/>
      <br/>
      <br/>
      <h1 className="text-lg font-semibold">Payment Method</h1>
       <List
      variant="outlined"
      aria-label="Screens"
      role="group"
      orientation="horizontal"
      sx={{
        maxWidth:"203px",
        flexGrow: 0,
        '--List-gap': '8px',
        '--List-padding': '8px',
        '--List-radius': '8px',
      }}
    >
      {['Cash', 'Card'].map((item) => (
        <ListItem key={item}>
          <ListItemDecorator
            sx={{
              zIndex: 2,
              pointerEvents: 'none',
              ...(value === item && { color: '#228B22	' }),
            }}
          >
            {
              {
                Cash: <PaymentsIcon />,
                Card: <CreditScoreIcon />,
              }[item]
            }
          </ListItemDecorator>
          <Checkbox
            disableIcon
            overlay
            label={item}
            checked={value === item}
            color="neutral"
            variant={value === item ? 'outlined' : 'plain'}
            onChange={() => handleChange(item)}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  bgcolor: checked ? 'background.level1' : 'transparent',
                  boxShadow: checked ? 'sm' : 'none',
                },
              }),
            }}
          />
        </ListItem>
      ))}
    </List>
      <motion.form
        layout
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mt-2 justify-between w-full"
      >
        <div className="flex md:flex-row flex-col md:justify-between gap-2 items-center">
          <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
            <Link to="/" className="hover:text-teal-500">
              {"<"} Return to Home Page
            </Link>
          </motion.span>
          <motion.button
            onSubmit={handleSubmit}
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black/70 hover:bg-black rounded p-2 w-full md:w-48 text-white text-base font-semibold"
          >
            Order Now
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
    </>
  );
}

export default CheckoutForm;

// try {
//   const response = await axios.post(
//     `${process.env.REACT_APP_API_URL}/orders`,
//     {
//       userId: user.favorites._id,
//       products,
//       totalPrice,
//       tableNo: usertable,
//       // Add delivery address here if needed
//     }
//   );

//   if (response.ok) {

//     if (couponn) {
//       alert("added");

//       // Uncomment and complete the following code block if needed
//       // try {
//       //   const response = await axios.post(
//       //     `${process.env.REACT_APP_API_URL}/verifycouponupdate`,
//       //     { coupon }
//       //   );
//       //   if (response.data.success) {
//       //     // Add your code here
//       //   }
//       // } catch (error) {
//       //   // Handle error if necessary
//       // }
//     } else {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/ingredients/updateorignalstock`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(ingredientsToUpdate),
//         }
//       );

//       // Handle the API response
//       if (response.ok) {
//         toast.success("Order submitted successfully");
//         localStorage.removeItem("user_table");
//         localStorage.removeItem("HTML5_QRCODE_DATA");
//         localStorage.removeItem("Coupon");
//         // setCoupon(""); // Uncomment if needed

//         navigate("/success");
//       }
//     }

//   }

// } catch (error) {
//   console.error("Error submitting order:", error);
//   toast.error("Failed to submit order. Please try again later.");
// }
