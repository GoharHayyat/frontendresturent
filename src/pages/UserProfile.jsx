import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/User';
import { UserIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { closeAll } from '../features/Modals';


function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isUserLoggedIn,user} = useSelector((state)=> state.user);
  const [currUser,setCurrUser] = useState(null)
  const [favorites,setFavorites] = useState([])
  

  useEffect(()=>{
    dispatch(closeAll())
  },[])
  useEffect(()=>{
    if (!isUserLoggedIn) {
      navigate("/")
    }
  })
  useEffect(()=>{
    if (!isUserLoggedIn) {
      navigate("/")
    }else{
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${user}`
        }
      }
      console.log(user, "THIS THE USER")
      axios.get(`${process.env.REACT_APP_API_URL}profile`, config).then((val)=>{
        console.log("VAL  ",val)
        if (val.data.success) {
          setCurrUser(val.data.msg)
          setFavorites(val.data.favorites)
        }
        else{
          toast("User Auth Failed. Login Again");
          handleLogout()
        }
      }).catch((error=>{
        console.log(error)
          toast("User Auth Failed. Login Again");
          handleLogout()
      }))
    }
  },[])
  const handleLogout = ()=>{
    localStorage.removeItem("auth-token")
    localStorage.removeItem("favorites")
    
    dispatch(logout({}));
    
  }
  if (currUser === null) {
    return <div className='w-[90vw] h-[70vh] flex justify-center items-center'>
      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:h-[45vh] bg-teal-700 py-10 md:py-0">
        <div className="flex-[0.30] flex justify-center items-center">
          <div className="bg-white rounded-full w-40 h-40 md:w-56 md:h-56 border">
            <UserIcon className="p-10"/>
          </div>
        </div>
        <div className="flex-[0.50] text-white flex flex-col items-center md:items-start gap-4 font-medium text=lg mt-5 mb-5 md:mb-0 md:mt-10">
          <h1 className="font-bold text-xl md:text-2xl py-3 md:py-10">{currUser.name}</h1>
          <h1>Email : {currUser.email}</h1>
          <h1>Phone # {currUser.phone}</h1>
          <h1>Address: {currUser.address}</h1>

        </div>
        <div className="flex-[0.20] flex justify-center items-start pt-4 gap-4">
          <button className="bg-[#9E9E9E] p-2 w-28 text-white font-semibold rounded hover:bg-black" onClick={handleLogout}>Logout</button>
          <button className="bg-[#9E9E9E] p-2 w-28 rounded text-white font-semibold hover:bg-black" >Edit Profile</button>

        </div>
      </div>
      <div className="px-0 md:px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold pl-3 md:pl-0">Favorites {">"}</h1>
        {favorites.length===0?(<div>
          <hr />
          <div className="h-24 text-lg font-medium flex justify-center items-center">No items in Favorite</div>
          <hr />

        </div>):(
          <div className='grid md:grid-rows-1 grid-rows-3 grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 w-full items-center justify-center px-2 md:px-20'>
              {favorites.map((item,i)=>{
                    return <motion.div initial={{opacity:0, x:50,scale:0.5}} transition={{type:"spring", delay:i*0.4,bounce:0.4,stiffness:60,mass:1.5}} whileInView={{ opacity: 1,x:0,scale:1}} viewport={{ once: true }} key={`${item._id}`} className={` flex justify-center items-center p-3`}>
                    <ProductCard product = {item} />
                    
                    </motion.div>
                })}

          </div>
        )}
      </div>
      <div className="px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold">Your Products {">"}</h1>
        <hr />
        <div className="h-24 text-lg font-medium flex justify-center items-center">No Items to sell</div>
        <hr />
      </div>
      <div className="px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold">Orders {">"}</h1>
        <hr />
        <div className="h-24 text-lg font-medium flex justify-center items-center">No Orders Placed Yet</div>
        <hr />
      </div>
    </div>
  )
}

export default UserProfile