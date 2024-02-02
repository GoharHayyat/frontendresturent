import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../features/User';
import { toast } from 'react-toastify';

import { removeFromCart } from '../features/Cart';

const variants = {
    initial: { opacity: 0, scaleY: -1 }, animate: { opacity: 1, scaleY: 1 }
}

function CheckoutForm() {
    // const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
    const cart = useSelector((state) => state.cart.cart);
    console.log("checkoutfinal",cart)
    // const token = useSelector((state) => state.user.user);
    const [user, setUser] = useState();
    const dispatch = useDispatch()
    //  const history = useHistory(); 
      const navigate = useNavigate();

    
    const inputClass = "peer outline-black-600 p-2 rounded-md border-2 border-gray-400 placeholder-transparent"
    const labelClass = "absolute left-2 -top-2.5 bg-white text-black-700 peer-focus:left-2 peer-focus:text-sm peer-focus:-top-2.5 peer-focus:text-black peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-2.5 pointer-events-none transition-all"
    
   useEffect(() => {
    const loginDataString = localStorage.getItem('loginData');

    if (loginDataString) {
        const loginData = JSON.parse(loginDataString);
        setUser(loginData);
        console.log("user", user);
    }
}, []); // Empty dependency array ensures this effect runs only once on mount
//ghghg

   
    // const handleLogout = () => {
    //     localStorage.removeItem("auth-token")
    //     dispatch(logout({}));
    //     // setValues({ ...values, existingaddress: "false" })

    // }
    //new

    const userContactInfo = () => {
        if (user) {
            //setValues({...values,existingaddress:user.address})
            return (
                <div className="flex flex-col my-2 gap-1 justify-center text-base">
                    <p>You are Currently Logged In as <Link to="/profile" className="font-[500] hover:text-teal-600">{user.favorites.name}</Link></p>
                    <p>With <span className="font-[500]">"{user.favorites.email}"</span></p>
                    {/* <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.9}} onClick={handleLogout} className="bg-black/70 text-white text-sm w-16 p-1 rounded hover:bg-black">Logout</motion.button> */}
                </div>
            )
        }
        else {
            return (
                <div className="my-2 text-base">
                    <p>You are Currently not Logged in. Click to <Link to="/login" className="font-semibold hover:text-teal-600">Log In</Link></p>

                </div>
            )
        }
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     // const config = {
    //     //     header:{
    //     //         "Content-Type":"application/json",
    //     //     }
    //     // }
    //     // const products = [];
    //     // console.log(values,(isUserLoggedIn && (values["existingaddress"] !== "false")))
    //     // cart.map((item,i)=> products.push({item:[i,{name:item.name,price:item.price}],quantity:item.count}));
    //     // const deliveryAddress = `${(isUserLoggedIn && (values["existingaddress"] !== "false"))?user.address:values["address"]}, ${values["house"]}, ${values["city"]}, ${values["province"]}, ${values["zip"]}`;
    //     // console.log(deliveryAddress)
    //     // try {
    //     //     const {data} = await axios.post(`https://cv81j9kz-4500.inc1.devtunnels.msorder`,{products,deliveryAddress,user},config);
    //     //     console.log(data)
    //     //     window.location.href = data.url

    //     // } catch (error) {
    //     //     console.log(error)
    //     //     toast("Server Error Try Again later!")

    //     // }

    // }

   const handleSubmit = async (e) => {
        e.preventDefault();

        const products = cart.map(item => ({ name: item.name, price: item.price, quantity: item.count }));
        const totalPrice = cart.reduce((total, item) => total + item.price * item.count, 0); // Calculate total price

        try {
            const response = await axios.post('http://localhost:4500/orders', {
                userId: user.favorites._id, // Assuming user object has an id property
                products,
                totalPrice,
                // Add delivery address here if needed
            });

            console.log(response.data); // Log the response for debugging
            // dispatch(clearCart());
            // dispatch({ type: 'cart/reset' });
            cart.forEach(item => dispatch(removeFromCart({ _id: item._id })));

            // Show success toast
            toast.success('Order submitted successfully');

            // Navigate to home page
            // history.push('/'); // Redirect to home page
            navigate('/')

            // Handle successful order submission (e.g., redirect to thank you page)
        } catch (error) {
            console.error('Error submitting order:', error);
            toast.error('Failed to submit order. Please try again later.');
        }
    };


    return (
        <motion.div initial={{opacity:0.3,scale:0.5}} animate={{opacity:1,scale:1,transition:{type:"spring",duration:1}}} className="flex flex-col p-4 md:p-10 w-full md:w-[55%]">

            <h1 className="text-lg font-semibold">Contact Information</h1>
            {userContactInfo()}
            <motion.form layout onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2 justify-between w-full">
               

            
                <div className="flex md:flex-row flex-col md:justify-between gap-2 items-center">
                    <motion.span whileHover={{scale:1.05}} whileTap={{scale:0.9}}><Link to="/" className="hover:text-teal-500">{'<'} Return to Home Page</Link></motion.span>
                    <motion.button onSubmit={handleSubmit} type='submit' whileHover={{scale:1.05}} whileTap={{scale:0.9}} className="bg-black/70 hover:bg-black rounded p-2 w-full md:w-48 text-white text-base font-semibold">Order Now</motion.button>
                </div>

            </motion.form>
        </motion.div>
    )
}

export default CheckoutForm