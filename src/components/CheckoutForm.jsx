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

  const handleInputChange = (event) => {
      setInputData(event.target.value);
    
  };
  

  const handleSubmittt = async () => {

    if (inputData.length >= 5) {
      setIsLoading(true);
    setErrormessage(false);
    try {
     console.log(process.env.REACT_APP_API_URL) ;
    //  `${process.env.REACT_APP_API_URL}getProductsByIds
      const response = await fetch(`${process.env.REACT_APP_API_URL}/qrcodestokens`);

      if (response.ok) {
        const data = await response.json();

        // Assuming you have the input data in a state variable named inputData
        const lastFiveDigitsInput = inputData.slice(-5);

        const matchingToken = data.find((item) =>
          item.tableId.endsWith(lastFiveDigitsInput)
        );
        console.log("its a",matchingToken.tableId)
        if (matchingToken) {
          // Print all details of the matching token
          // console.log('Matching Token Details:', matchingToken.table);
          const result = { table: matchingToken.table, tableId: matchingToken.tableId };
          localStorage.setItem("user_table", JSON.stringify(result));
          setUserTable(result);
          setmanually(true);
          setUserTablecheck(true);
          setInputData("");
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        } else {
          setErrormessage(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        }
      } else {
        alert("Failed to fetch API data.");
        setIsLoading(false);
      }
    } catch (error) {
      alert("Error fetching API data:", error);
      setIsLoading(false);
    }
    } else {
      
      toast('Input 5 characters Validation Code');
    }

    
  };

  const handleDelete = () => {
    localStorage.removeItem("user_table");
    localStorage.removeItem("HTML5_QRCODE_DATA");
    localStorage.removeItem("generatedString");
    localStorage.removeItem("timeRemaining");
    setUserTablecheck(false);
    toast("Table Deleted");
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
              <div style={{ color: "red", fontSize: "16px", marginBottom:"5px" }}>
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
              <div style={{ color: "red", fontSize: "16px", marginBottom:"5px" }}>
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
    } else {
      toast.error("login to continue");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items before submitting.");
      return;
    }

    if (usertablecheck===false) {
        toast.error("Please select a table before submitting.");
        return;
    }

    const products = cart.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.count,
    }));
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.count,
      0
    ); // Calculate total price

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, {
        userId: user.favorites._id, // Assuming user object has an id property
        products,
        totalPrice,
        tableNo: usertable,
        // Add delivery address here if needed
      });

      console.log(response.data); // Log the response for debugging
      // dispatch(clearCart());
      // dispatch({ type: 'cart/reset' });
      cart.forEach((item) => dispatch(removeFromCart({ _id: item._id })));

      // Show success toast
      toast.success("Order submitted successfully");
      localStorage.removeItem("user_table");
      localStorage.removeItem("HTML5_QRCODE_DATA");

      // Navigate to home page
      // history.push('/'); // Redirect to home page
      navigate("/success");

      // Handle successful order submission (e.g., redirect to thank you page)
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order. Please try again later.");
    }
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
  );
}

export default CheckoutForm;
