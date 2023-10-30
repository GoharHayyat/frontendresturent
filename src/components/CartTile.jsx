import React from 'react'
import { decreaseCount, increaseCount, removeFromCart } from '../features/Cart';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


function CartTile({ item }) {
    const dispatch = useDispatch();

    return (
        <div className="flex justify-between items-center py-4 px-0 select-none">
            <div className="grow shrink basis-[35%]">
                <img src={item.imageLinks[0]} alt={item?.name} className="w-28 h-36" />
            </div>

            <div className="flex flex-col justify-center gap-8 grow shrink basis-[65%] overflow-hidden">
                {/* Item name and Close */}
                <div className="flex justify-between items-center mb-1 w-[100%]">
                    <Link className='w-[70%]' to={`product/${item._id}`}>
                        <motion.h2 whileHover={{scale:1.03}} whileTap={{scale:0.95}} className="text-xl font-bold whitespace-nowrap text-ellipsis overflow-hidden hover:text-teal-800 cursor-pointer">{item.name}</motion.h2>
                    </Link>
                    <motion.div whileHover={{scale:1.2}} whileTap={{scale:0.8}} onClick={() => dispatch(removeFromCart({ _id: item._id }))}>
                        <XMarkIcon className="h-6 w-6 text-black hover:text-red-600" />
                    </motion.div>
                </div>
                {/* Item quantity */}
                <div className="flex justify-between items-center my-4 mx-0 ">
                    <div className="flex items-center border-solid border border-slate rounded-md">
                        <motion.div whileHover={{scale:1.2}} whileTap={{scale:0.8}} onClick={() => dispatch(decreaseCount({ _id: item._id }))}>
                            <MinusIcon className="h-6 w-6 text-red-500 hover:text-red-400" />
                        </motion.div>
                        <p className="border-x px-2">{item.count}</p>
                        <motion.div whileHover={{scale:1.2}} whileTap={{scale:0.8}} onClick={() => dispatch(increaseCount({ _id: item._id }))}>
                            <PlusIcon className="h-6 w-6 text-emerald-500 hover:text-emerald-400" />
                        </motion.div>
                    </div>
                    {/* Price */}
                    <h2 className="text-xl font-bold">RS.{item.price}</h2>
                </div>

            </div>

        </div>
    )
}

export default CartTile