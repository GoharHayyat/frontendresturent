import React, { useState } from 'react'
import FormInput from '../components/FormInput';
import WaveMotion from '../components/WaveMotion'
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import { Link } from 'react-router-dom';




function ResetPassword({match}) {
    const [values, setValues] = useState({
        password: "",
        confirmPassword: "",
    });
    const [span,setSpan] = useState("");
    const navigate = useNavigate();
    const {resetToken}  =useParams()

    const inputs = [
        
        {
            id: 5,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:"Password should be 6-20 characters and must include a letter, number and a special character!",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{6,20}$`,
            required: true,
            autoComplete:"off",
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
            autoComplete:"off",
        },
       
    ];

    const variant = {
        initial:{
            scale:0.5,
            opacity:0.3,
        },
        animate:{
            scale:1,
            opacity:1,
            transition:{
                type:"spring",
            }
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = {
            password: values.password,
        }
    
        const config = {
            header:{
                "Content-Type":"application/json",
            }
        }

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}auth/resetpassword/${resetToken}`,user,config);
            setSpan("Password Changed");
            setTimeout(()=>{
                setSpan("");
                navigate("/")
            },5000)
            
        } catch (error) {
            
            setSpan(error.response.data.error);
            setTimeout(()=>{
                setSpan("");
            },5000)
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="flex items-center justify-center h-[92vh] md:h-[90vh] w-full bg-gradient-to-b from-teal-200 to-teal-700 relative overflow-hidden">
                <motion.div variants={variant} initial="initial" animate="animate" className="p-4 w-[90%]  md:w-[35%] h-[45%] md:h-[50%] bg-slate-100 rounded-xl z-40 flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="text-center px-3 md:px-10 h-full w-full overflow-hidden flex flex-col justify-center items-center">
                        <h1 className="text-xl md:text-2xl font-semibold mb-4">Reset Password</h1>
                        {span && <span className={`mb-4 rounded-lg w-full text-white ${span==="Password Changed"?"bg-teal-600":"bg-red-600"}`}>{span}</span>}

                        {inputs.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        ))}
                        <motion.button whileTap={{ scale: 0.9}} className="mt-4 w-full h-11 p-2 border-none cursor-pointer bg-teal-500 text-white rounded font-bold text-lg hover:bg-teal-600">Reset Password</motion.button>
                    </form>
                </motion.div>
                <WaveMotion />
            </div>
        </>
    )
}

export default ResetPassword