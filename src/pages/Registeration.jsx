import React, { useEffect, useState } from 'react'
import FormInput from '../components/FormInput';
import WaveMotion from '../components/WaveMotion'
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { closeAll } from '../features/Modals';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';




function Registeration() {
    const [values, setValues] = useState({
        fullname: "",
        email: "",
        phonenumber: "",
        address: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [signUp, setSignUp] = useState(null)
    const [span,setSpan] = useState("")
    useEffect(() => {
        dispatch(closeAll())
    }, [])

    const inputs = [
        {
            id: 1,
            name: "fullname",
            type: "text",
            placeholder: "Full Name",
            errorMessage:
                "Should only contain first and last name!",
            label: "Full Name",
            pattern: "^([a-zA-Z'-.]+(?: [a-zA-Z'-.]+)?)$",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            required: true,

        },
        {
            id: 3,
            name: "phonenumber",
            type: "tel",
            placeholder: "Phone#",
            errorMessage: "It should be a valid Pakistani Number!",
            label: "Phone Number",
            required: true,
            pattern: "^((0092)?(92)?(0)?)(3)([0-9]{9})$",

        },
        {
            id: 4,
            name: "address",
            type: "text",
            placeholder: "Address",
            label: "Address",
            required: true,
            errorMessage: "There should be an address",

        },
        {
            id: 5,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "Password should be 6-20 characters and must include a letter, number and a special character!",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{6,20}$`,
            required: true,
            autoComplete: "off",
        },
        {
            id: 6,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords don't match!",
            label: "Confirm Password",
            pattern: values.password,
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
            name: values.fullname,
            email: values.email,
            password: values.password,
            isAdmin: false,
            // isVendor: false,
            // isSeller: false,
            address: values.address,
            phone: values.phonenumber,
        }

        const config = {
            header: {
                "Content-Type": "application/json",
            }
        }
        console.log(user)
        try {

            const {data} = await axios.post(`http://192.168.125.141:4500/register`, user, config);
            localStorage.setItem("auth-token",data.token);
            setSpan("Successfully Signed Up!!");
            setSignUp(true)
            setTimeout(() => {
                setSpan("");
                navigate("/login")
                toast("Sign Up Successfull!")
            }, 3000)

        } catch (error) {
            setSignUp(false)
            setSpan(error.response.data.error);
            setTimeout(() => {
                setSignUp(null)
                setSpan("");
                toast("Sign Up Unsuccessfull!")

            }, 5000)
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="flex items-center justify-center h-[92vh] md:h-[90vh] w-full bg-gradient-to-b from-teal-200 to-teal-700 relative overflow-hidden">
                {signUp === null ? (<motion.div variants={variant} initial="initial" animate="animate" className="px-4 py-8 w-[90%]  md:w-[35%] bg-slate-100 rounded-xl z-40 flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="text-center px-3 md:px-10 h-full w-full overflow-hidden flex flex-col justify-center items-center">
                        <h1 className="text-xl md:text-2xl font-semibold mb-4">Sign Up</h1>
                        {span && <span className={`mb-4 rounded-lg w-full text-white ${span==="Successfully Signed Up!!"?"bg-teal-600":"bg-red-600"}`}>{span}</span>}
                        {inputs.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        ))}
                        <motion.button whileTap={{ scale: 0.9 }} className="mt-4 w-full h-11 p-2 border-none cursor-pointer bg-teal-500 text-white rounded font-bold text-lg hover:bg-teal-600">Submit</motion.button>
                    </form>
                    <p className="text-base  md:text-lg pr-3 relative">If you alredy have an account! <Link to="/login" className="underline hover:text-teal-700 ">Log In</Link></p>

                </motion.div>) : (
                    <motion.div variants={variant} initial="initial" animate="animate" className="px-4 py-8 w-[90%]  md:w-[35%] bg-white rounded-xl z-40 flex flex-col items-center">

                        <motion.div className={`${signUp ? "bg-teal-500" : "bg-red-500"} rounded-full`} initial={{ scale: 0.4, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} transition={{ repeat: Infinity, duration: 1.5, type: 'spring' }}>
                            {signUp ? <CheckCircleIcon className='h-44 w-44 text-white' /> : <XMarkIcon className='h-44 w-44 text-white' />}
                        </motion.div>
                        <h1 className='text-center mt-8 font-semibold text-2xl'>Sign Up {signUp ? "Successfull" : "Unsuccessfull! Try Again"}!!</h1>
                    </motion.div>
                )}
                <WaveMotion />
            </div>
        </>
    )
}

export default Registeration