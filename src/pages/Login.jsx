import React, { useEffect, useState } from 'react'
import FormInput from '../components/FormInput';
import WaveMotion from '../components/WaveMotion'
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { login, manageFavorite } from '../features/User';
import { toast } from 'react-toastify';
import { closeAll } from '../features/Modals';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';




function Login() {
    const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [span,setSpan] = useState("");
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [loginSuccessfull, setLoginSuccessFull] = useState(null)
    useEffect(() => {
        if (isUserLoggedIn) {
            navigate("/")
        }
    });
    useEffect(() => {
        dispatch(closeAll())
    }, [dispatch])

    const inputs = [

        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            required: true,

        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            required: true,
            autoComplete: "off",
        },

    ];

    const variant = {
        initial: {
            scale: 0.5,
            opacity: 0.3,
        },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: values.email,
            password: values.password,
        }

        const config = {
            header: {
                "Content-Type": "application/json",
            }
        }

        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`, user, config);
            localStorage.setItem("auth-token", data.token);
            localStorage.setItem("favorites", JSON.stringify(data.favorites))
            // setSpan("Successfully Logged Up!!");
            setLoginSuccessFull(true)
            setTimeout(() => {
                // setSpan("");
                dispatch(login(data.token))
                dispatch(manageFavorite(data.favorites))
                toast("Login Successfull!")
            }, 3000)

        } catch (error) {

            // setSpan(error.response.data.error);
            setLoginSuccessFull(false)

            setTimeout(() => {
                // setSpan("");
                setLoginSuccessFull(null)
                toast("Login unsuccessfull!")

            }, 2000)
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div  className="flex items-center justify-center h-[92vh] md:h-[90vh] w-full bg-gradient-to-b from-sky-300 to-sky-300 relative overflow-hidden">
                {loginSuccessfull === null ? (<motion.div variants={variant} initial="initial" animate="animate" className="px-4 py-8 w-[90%]  md:w-[35%] bg-slate-100 rounded-xl z-40 flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="text-center px-3 md:px-10 h-full w-full overflow-hidden flex flex-col justify-center items-center">
                        <h1 className="text-xl md:text-2xl font-semibold mb-4">Login</h1>
                        {/* {span && <span className={`mb-4 rounded-lg w-full text-white ${span==="Successfully Logged Up!!"?"bg-teal-600":"bg-red-600"}`}>{span}</span>} */}

                        {inputs.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        ))}
                        <motion.button whileTap={{ scale: 0.9 }} className="mt-4 w-full h-11 p-2 border-none cursor-pointer bg-teal-500 text-white rounded font-bold text-lg hover:bg-teal-600">Log in</motion.button>
                    </form>
                    <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-base md:text-lg pr-3 relative underline hover:text-teal-700"><Link to="/forgotpassword" >Forgot Password?</Link></motion.span>
                    <p className="text-base  md:text-lg pr-3 relative">If you don't have an account! <Link to="/register" className="underline hover:text-teal-700 ">Sign Up</Link></p>
                </motion.div>) : (
                    <motion.div variants={variant} initial="initial" animate="animate" className="px-4 py-8 w-[90%]  md:w-[35%] bg-white rounded-xl z-40 flex flex-col items-center">

                        <motion.div className={`${loginSuccessfull ? "bg-teal-500" : "bg-red-500"} rounded-full`} initial={{ scale: 0.4, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} transition={{ repeat: Infinity, duration: 1.5, type: 'spring' }}>
                            {loginSuccessfull ? <CheckCircleIcon className='h-44 w-44 text-white' /> : <XMarkIcon className='h-44 w-44 text-white' />}
                        </motion.div>
                        <h1 className='text-center mt-8 font-semibold text-2xl'>Login {loginSuccessfull ? "Successfull" : "Unsuccessfull! Try Again"}!!</h1>
                    </motion.div>
                )}
                <WaveMotion />
            </div>
        </>
    )
}

export default Login