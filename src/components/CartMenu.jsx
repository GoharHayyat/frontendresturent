import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {  setCart, setIsCartOpen } from '../features/Cart';
import { AnimatePresence, motion } from 'framer-motion';
import CartTile from './CartTile';
import { useEffect } from 'react';

const variants = {
    initial:{opacity:0,scaleY:0},
    animate:{opacity:1,scaleY:1}
}

function CartMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart.cart);
    const isCartOpen = useSelector((state)=>state.cart.isCartOpen);

    useEffect(()=>{
        const storedCart = localStorage.getItem('cart');
        if (storedCart!==null && storedCart!== undefined && storedCart !==[]) {
            dispatch(setCart(JSON.parse(storedCart)));
        }
    },[dispatch])

    const totalPrice = cart.reduce((total,item)=>{
        return total + item.count * item.price;
    },0)

  return (
    // modal screen
    <div className={`${isCartOpen?"block":"hidden"} bg-black/40 fixed z-[99999] w-full h-full left-0 top-0 overflow-auto scrollbar`}>
        {/* <div className='hidden md:block md:w-[70%] md:fixed md:top-0 md:bottom-0 md:left-0' onClick={()=>dispatch(setIsCartOpen({}))}></div> */}
        {/* Cart Sidebar  */}
        <motion.div initial={{opacity:0,scaleX:0,x:150}} transition={{type:"spring",duration:0.8,bounce:0.4}} whileInView={{opacity:1,scaleX:1,x:0}} viewport={{ once: false }}  className="fixed right-0 top-0 w-full md:w-[max(400px,30%)] h-full bg-white">
            {/* Header */}
            <div className="p-7 overflow-auto h-full">
                {/* Heading and close button */}
                <div className="flex justify-between items-center mb-4">
                    <motion.h3 whileHover={{scale:1.1}} className="text-2xl font-semibold text-teal-600">Cart ({cart.length})</motion.h3>
                    <motion.div whileHover={{scale:1.2}} whileTap={{scale:0.9}} onClick={()=>dispatch(setIsCartOpen({}))}>
                        <XMarkIcon className="h-9 w-9 text-red-500 hover:text-red-400"/>

                    </motion.div>
                </div>

                
                {/* Items */}
                <div>
                    <AnimatePresence>
                    {cart.map((item,i)=>(
                        <motion.div key={`${item.name}-${item._id}`} variants={variants} initial="initial" exit="initial" animate={isCartOpen?"animate":""} transition={{type:"spring",delay:i*0.2+0.3,duration:0.3}}>

                            <motion.div whileHover={{scale:1.05}} transition={{delay:0}} >
                                <CartTile item={item}/>
                                
                                <hr />
                            </motion.div>
                            
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>

                {/* Actions (total etc) */}
                <div className="my-5 mx-0">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-2xl  text-teal-600">SUBTOTAL:</h1>
                        <h1 className="font-bold text-2xl">RS.{totalPrice}</h1>
                    </div>
                    <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} className="bg-teal-500 hover:bg-teal-600 text-white rounded min-w-full py-4 px-10 my-4 mx-0" onClick={()=>{
                        navigate('/checkout');
                        dispatch(setIsCartOpen({}));
                    }}>CheckOut</motion.button>
                </div>
            </div>


        </motion.div>


    </div>
  )
}

export default CartMenu