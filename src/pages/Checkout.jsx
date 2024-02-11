import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { closeAll } from '../features/Modals';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Buttonn from "@mui/material/Button";
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';


const variants = {
  initial: { opacity: 0, scaleY: 0 },
  animate: { opacity: 1, scaleY: 1 }
}

function Checkout() {
  const cart = useSelector((state) => state.cart.cart);
  const [coupon, setCoupon] = useState('');
  const [discountedTotalPrice, setDiscountedTotalPrice] = useState(null);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeAll());
  }, []);

  const subtotal = totalPrice;
  const gspTaxRate = 0; // 7.5% tax rate
  const gspTax = subtotal * gspTaxRate;
  const totalPriceWithTax = subtotal + gspTax;



const handleCouponVerification = async () => {
  try {
    // verifycouponupdate
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/verifycoupon`,
      { coupon }
    );
    if (response.data.success) {
      // Fetch the coupon details
      const couponDetailsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/coupon-details?coupon=${coupon}`
      );
      if (couponDetailsResponse.data.success) {
        const couponDetails = couponDetailsResponse.data.coupon;
        
          // The coupon is active, apply discount
          const discountPercentage = couponDetails.discountPercentage;
          const discountAmount = totalPriceWithTax * (discountPercentage / 100);
          const discountedPrice = totalPriceWithTax - discountAmount;
          setDiscountedTotalPrice(discountedPrice);
          toast("Discount added");
          localStorage.setItem("Coupon", coupon );
          setCoupon('');
        
      }
    }
    
  } catch (error) {
    // console.error('Error verifying coupon:', error);
    // toast.error("Invalid coupon");
     if (error.response && error.response.status === 400) {
        // Coupon verification failed due to coupon already used
        toast.error("Token expired");
    } else {
        // Other errors, such as network issues or server errors
        toast.error("Invalid coupon");
    }
    setCoupon('');
  }
};


  return (
    <div className="md:h-[115vh]">
      <div className='px-4 pt-10 md:px-10 md:w-[55%]'>

        <h1 className="text-2xl font-semibold">Checkout Information</h1>
        <nav className="bg-grey-light rounded-md w-full text-sm mt-2">
          <ol className="list-reset flex">
            <motion.li whileHover={{scale:1.05}} whileTap={{scale:0.9}}><Link to="/" className="text-black hover:text-teal-400">Cart</Link></motion.li>
            <li><span className="text-black mx-2">{">"}</span></li>
            <motion.li whileHover={{scale:1.05}} whileTap={{scale:0.9}}><Link to="/" className="text-teal-400 hover:text-black">Checkout</Link></motion.li>
            <li><span className="text-gray-500 mx-2">{">"}</span></li>
            <li className="text-gray-500">Payment</li>
          </ol>
        </nav>
      </div>
      <div  className="flex w-full md:flex-row flex-col-reverse">
        <CheckoutForm />
        <div className="w-full md:w-[45%] bg-slate-50/70 md:absolute md:right-0 md:top-[72px] p-4 md:p-10 h-full">
          <h1 className="text-2xl font-semibold ">Cart</h1>
          <div className="flex flex-col w-full mt-3 pt-1 overflow-y-auto overflow-x-hidden h-[65%] scrollbar">
            {cart.map((item, i) => (
              <motion.div key={i} className="flex m-2 pr-2 w-full justify-between" variants={variants} initial="initial" exit="initial" animate="animate" transition={{type:"spring",delay:i*0.2+0.3,duration:0.3}}>
                <div className="flex gap-3 w-[85%]">
                  <div className="relative flex-shrink-0">
                    <motion.img whileHover={{scale:1.05}} whileTap={{scale:0.9}} src={item.imageLinks[0]} alt={item?.name} className="w-20 h-20 md:w-24 md:h-24 object-cover " />
                    <motion.span whileHover={{scale:1.05}} whileTap={{scale:0.9}} className="inline-flex justify-center items-center font-semibold md:font-bold text-white hover:bg-green-600 bg-black/70 p-1 w-4 h-4 md:w-6 md:h-6 text-xs md:text-sm rounded-full absolute -top-3 -right-2">{item.count}</motion.span>
                  </div>
                  <div className="flex flex-col justify-start gap-1 md:w-[70%]">
                    <motion.p whileHover={{scale:1.01}} whileTap={{scale:0.99}} className="text-base md:text-lg font-bold whitespace-nowrap text-ellipsis overflow-hidden hover:text-teal-600 cursor-pointer">{item.name}</motion.p>
                    <motion.p whileHover={{scale:1.01}} whileTap={{scale:0.99}} className="text-black/60 text-sm font-medium cursor-pointer hover:text-black">{item.category}</motion.p>
                  </div>
                </div>
                <motion.p whileHover={{scale:1.05}} whileTap={{scale:0.9}} className="font-medium text-base md:text-lg ">Rs.{item.price}</motion.p>
              </motion.div>

            ))}
          </div>
          <hr />
          <br/>
          <div style={{ display:"flex" ,justifyContent:"center" , alignItems:"center" }}>
          <Box
              sx={{
                width: 330,
                marginRight:"28px"
              }}
            >
            <div>
              <TextField
                fullWidth
                label="Discount Coupon"
                id="fullWidth"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              </div>
              </Box>
              <div style={{ display:"flex"}}>
              <Buttonn
                variant="contained"
                color="success"
                onClick={handleCouponVerification}
                sx={{
                  width: 50,
                  maxWidth: "80%",
                  justifyContent: 'center'
                }}
              >
                Add
              </Buttonn>
              </div>
           
          </div>
          <br/>
          <hr />
          <div className='p-4 text-lg md:text-xl font-[500] flex flex-col gap-3'>
        
            <div className="flex justify-between items-center">
              <h1>Subtotal:</h1>
              <h1>Rs.{totalPrice}</h1>
            </div>
            <div className="flex justify-between items-center">
              <h1>Including Tax</h1>
              <h1>Rs.{gspTax.toFixed(2)}</h1>
            </div>
            <hr />
            <div className="flex justify-between text-lg items-center p-4 md:text-xl font-bold">
              <h1>Total Price (Incl. Tax):</h1>
              {discountedTotalPrice !== null ? (
                <h1>Rs.{discountedTotalPrice.toFixed(2)}</h1>
              ) : (
                <h1>Rs.{totalPriceWithTax.toFixed(2)}</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
