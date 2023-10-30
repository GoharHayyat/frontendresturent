import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/User';
import { toast } from 'react-toastify';

const variants = {
    initial: { opacity: 0, scaleY: -1 }, animate: { opacity: 1, scaleY: 1 }
}

function CheckoutForm() {
    const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
    const cart = useSelector((state) => state.cart.cart);
    const token = useSelector((state) => state.user.user);
    const [user, setUser] = useState();
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        existingaddress: "false",
        fname: "",
        lname: "",
        country: "Pakistan",
        address: "",
        house: "",
        city: "",
        zip: "",
        province: ""
    })
    const inputClass = "peer outline-black-600 p-2 rounded-md border-2 border-gray-400 placeholder-transparent"
    const labelClass = "absolute left-2 -top-2.5 bg-white text-black-700 peer-focus:left-2 peer-focus:text-sm peer-focus:-top-2.5 peer-focus:text-black peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-2.5 pointer-events-none transition-all"
    const onChange = (e) => {
        console.log( [e.target.name], e.target.value)
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (isUserLoggedIn) {

            const getUser = async () => {
                if (token !== {} && token !== undefined && token !== null) {

                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
                        }
                    }
                    try {
                        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}profile`, config)
                        return data.msg

                    } catch (error) {
                        //console.log(error)
                        toast("Server Error Try Again later!")
                    }
                }
            }
            getUser().then((data) => setUser(data)).catch((err) => console.log(err));
        }

    }, [token, isUserLoggedIn])
    const handleLogout = () => {
        localStorage.removeItem("auth-token")
        dispatch(logout({}));
        setValues({ ...values, existingaddress: "false" })

    }


    const userContactInfo = () => {
        if (isUserLoggedIn && user) {
            //setValues({...values,existingaddress:user.address})
            return (
                <div className="flex flex-col my-2 gap-1 justify-center text-base">
                    <p>You are Currently Logged In as <Link to="/profile" className="font-[500] hover:text-teal-600">{user.name}</Link></p>
                    <p>With <span className="font-[500]">"{user.email}"</span></p>
                    <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.9}} onClick={handleLogout} className="bg-black/70 text-white text-sm w-16 p-1 rounded hover:bg-black">Logout</motion.button>
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const config = {
            header:{
                "Content-Type":"application/json",
            }
        }
        const products = [];
        console.log(values,(isUserLoggedIn && (values["existingaddress"] !== "false")))
        cart.map((item,i)=> products.push({item:[i,{name:item.name,price:item.price}],quantity:item.count}));
        const deliveryAddress = `${(isUserLoggedIn && (values["existingaddress"] !== "false"))?user.address:values["address"]}, ${values["house"]}, ${values["city"]}, ${values["province"]}, ${values["zip"]}`;
        console.log(deliveryAddress)
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}order`,{products,deliveryAddress,user},config);
            console.log(data)
            window.location.href = data.url

        } catch (error) {
            console.log(error)
            toast("Server Error Try Again later!")

        }

    }

    return (
        <motion.div initial={{opacity:0.3,scale:0.5}} animate={{opacity:1,scale:1,transition:{type:"spring",duration:1}}} className="flex flex-col p-4 md:p-10 w-full md:w-[55%]">

            <h1 className="text-lg font-semibold">Contact Information</h1>
            {userContactInfo()}
            <motion.form layout onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2 justify-between w-full">
                <h1 className="text-lg font-semibold">Shipping Information</h1>
                <AnimatePresence>

                    {isUserLoggedIn && <motion.div layout variants={variants} initial="initial" animate="animate" exit="initial" transition={{ duration: 0.7, type: "spring" }}
                        className="flex flex-col relative">
                        <select onChange={onChange} name="existingaddress" id="existing" className="w-full peer outline-black-600 p-2 rounded-md border-2 border-gray-400">
                            <option value="false">Select a Different Address</option>
                            <option value={user ? user.address : ""}>Existing Address ({user ? user.address : ""})</option>

                        </select>
                        <label className="absolute text-sm left-2 -top-2.5 bg-white text-black peer-actuve:left-2 peer-active:-top-2.5 peer-active:text-black  pointer-events-none transition-all">Saved Address</label>
                    </motion.div>}
                </AnimatePresence>

                <AnimatePresence>

                    {!isUserLoggedIn && <motion.div layout variants={variants} initial="initial" animate="animate" exit="initial" transition={{ duration: 0.7, type: "spring" }}
                        className="flex w-full gap-4">
                        <div className="flex flex-col w-[47%] relative md:flex-1">
                            <input type="text" name="fname" className={inputClass} placeholder="First Name" onChange={onChange} required />
                            <label className={labelClass}>First Name</label>
                        </div>
                        <div className="flex flex-col w-[47%] relative md:flex-1">
                            <input value={values[2]} type="text" name="lname" className={inputClass} placeholder="Last Name" onChange={onChange} required />
                            <label className={labelClass}>Last Name</label>
                        </div>
                    </motion.div>}
                </AnimatePresence>
                <div className="flex flex-col relative">
                    <select onChange={onChange} name="country" className="w-full peer outline-black-600 p-2 rounded-md border-2 border-gray-400">
                        <option value="Pakistan">Pakistan</option>

                    </select>
                    <label className="absolute left-2 -top-2.5 bg-white text-sm text-black peer-actuve:left-2 peer-active:-top-2.5 peer-active:text-black  pointer-events-none transition-all">Country/Region</label>
                </div>
                <AnimatePresence>

                    {(values["existingaddress"] === "false") && <motion.div layout variants={variants} initial="initial" animate="animate" exit="initial" transition={{ duration: 0.7, type: "spring" }}
                        className="flex flex-col relative flex-1">
                        <input type="text" name="address" className={inputClass} placeholder="Address" onChange={onChange} required />
                        <label className={labelClass}>Address</label>
                    </motion.div>}
                </AnimatePresence>


                <motion.div layout transition={{ duration: 0.7, type: "spring" }} className="flex flex-col relative flex-1">
                    <input type="text" name="house" className={inputClass} placeholder="house" onChange={onChange} />
                    <label className={labelClass}>House, Apartment, Suite etc(optional)</label>
                </motion.div>
                <motion.div layout transition={{ duration: 0.7, type: "spring" }} className="flex w-full gap-3">
                    <div className="flex flex-col w-[32%] relative md:flex-1">
                        <input type="text" name="city" className={inputClass} placeholder="City" onChange={onChange} required />
                        <label className={labelClass}>City</label>
                    </div>
                    <div className="flex flex-col relative">
                        <select onChange={onChange} name="province" className="w-full peer outline-black-600 p-2 rounded-md border-2 border-gray-400">
                            <option value="">Choose a Province</option>
                            <option value="punjab">Punjab</option>
                            <option value="sindh">Sindh</option>
                            <option value="kpk">Khyber Pakhtunkhwa</option>
                            <option value="balochistan">Balochistan</option>
                            <option value="gilgit-baltistan">Gilgit-Baltistan</option>
                            <option value="isb">Islamabad Capital</option>
                        </select>
                        <label className="absolute left-2 -top-2.5 bg-white text-sm text-black peer-actuve:left-2 peer-active:-top-2.5 peer-active:text-black  pointer-events-none transition-all">Province</label>
                    </div>
                    <div className="flex flex-col w-[32%] relative md:flex-1">
                        <input type="text" name="zip" className={inputClass} placeholder="Zip" onChange={onChange} pattern="\d{5}" required />
                        <label className={labelClass}>Zip Code</label>
                    </div>


                </motion.div>
                <div className="flex md:flex-row flex-col md:justify-between gap-2 items-center">
                    <motion.span whileHover={{scale:1.05}} whileTap={{scale:0.9}}><Link to="/" className="hover:text-teal-500">{'<'} Return to Home Page</Link></motion.span>
                    <motion.button onSubmit={handleSubmit} type='submit' whileHover={{scale:1.05}} whileTap={{scale:0.9}} className="bg-black/70 hover:bg-black rounded p-2 w-full md:w-48 text-white text-base font-semibold">Continue to Payment</motion.button>
                </div>

            </motion.form>
        </motion.div>
    )
}

export default CheckoutForm