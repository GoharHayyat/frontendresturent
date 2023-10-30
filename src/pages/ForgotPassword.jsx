import React, { useEffect, useState } from 'react'
import FormInput from '../components/FormInput';
import WaveMotion from '../components/WaveMotion'
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { closeAll } from '../features/Modals';
//import { Link } from 'react-router-dom';




function ForgotPassword() {
    const [values, setValues] = useState({
        email: "",
    });
    const [span,setSpan] = useState("");
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(closeAll())
    },[])

    const inputs = [
        
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            required: true,

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: values.email,
        }
    
        const config = {
            header:{
                "Content-Type":"application/json",
            }
        }
        try {
            
            await axios.post(`${process.env.REACT_APP_API_URL}auth/forgotpassword`,user,config);
            setSpan("Email Sent!!");
            setTimeout(()=>{
                setSpan("");
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
                <motion.div variants={variant} initial="initial" animate="animate" className="p-4 w-[90%]  md:w-[35%] h-[40%] md:h-[40%] bg-slate-100 rounded-xl z-40 flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="text-center px-3 md:px-10 h-full w-full overflow-hidden flex flex-col justify-center items-center">
                        <h1 className="text-xl md:text-2xl font-semibold mb-4">Forgot Password</h1>
                        {span && <span className={`mb-4 rounded-lg w-full text-white ${span==="Email Sent!!"?"bg-teal-600":"bg-red-600"}`}>{span}</span>}
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

export default ForgotPassword