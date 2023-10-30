import { CheckCircleIcon, CubeIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addToCart } from '../features/Cart'
import { manageFavorite } from '../features/User'
import { motion } from 'framer-motion'
import { closeAll } from '../features/Modals'

function ProductDisplay() {
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const {isUserLoggedIn,favorites,user} = useSelector(state=>state.user)
  const [isFavorite,setIsfavorite] = useState(false);

  const dispatch = useDispatch();
  const [isAdded,setIsAdded] = useState(false);
  const [selectedImage,setSelectedImage] = useState(0);
  const [itemCount,setItemCount] = useState(1)
  
  useEffect(()=>{
    dispatch(closeAll())
  },[])
    const handleAddToCart =()=>{
        if (!isAdded) {
            dispatch(addToCart({item:{...product,count:itemCount}}))
            setItemCount(1)
            setIsAdded(true);
            setTimeout(()=>{
                setIsAdded(false);
            },2500);
        }

    }
    useEffect(()=>{
      if (product) {
        
        if (favorites.length!==0) {
            if (favorites.indexOf(product._id)!==-1) {
                setIsfavorite(true)
            }
        }
      }
  },[product])
    
    const handleFavorite = async ()=>{
      if(!isUserLoggedIn){
          toast("Please Login First!!")
      }
      else{
          let newFavs = []
          if (isFavorite) {
            newFavs = favorites.filter(fav=>{
              return fav!==product._id;
              
          })
          }
          else{
              newFavs = [...favorites]
              newFavs.push(product._id)
          }
          const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${user}`
              }
            }

          axios.post(`${process.env.REACT_APP_API_URL}manageFavorite`,{favorites:newFavs},config).then(val=>{
              console.log("VAL  ",val)
              if (val.data.success) {
                  setIsfavorite(!isFavorite)

                  localStorage.setItem("favorites",JSON.stringify(newFavs))
                  dispatch(manageFavorite(newFavs))
              }
              else{
                toast("Favorite not Added");
              }
            }).catch((error=>{
              console.log(error)
                toast("Favorite not Added");
            }))
      }
  }

  useEffect(() => {
    const config = {
      header: {
        "Content-Type": "application/json",
      }
    }
    if (id !== undefined) {
      axios.post(`${process.env.REACT_APP_API_URL}productById`, { prodId: id }, config).then(res => {
        console.log(res,"PRODUCT")
        if (res.data.success && res.data.product!==null) {
          setProduct(res.data.product)

        }
        else {
          toast("Server Error,Please Try again Later.")

        }
      }).catch(err => {
        toast("Server Error,Please Try again Later.")
      })
    }
    else{
      toast("Server Error,Please Try again Later.")

    }
  }, [id])

  if (product === null) {
    return <div className='w-[90vw] h-[70vh] flex justify-center items-center'>
      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  }

  return (
    <div id='product' className="py-5 px-6 md:px-12">
      <div id='upper' className="flex flex-col md:flex-row gap-6 md:gap-12">
        <div id='imgDisplay' className="flex-[1] flex flex-col-reverse md:flex-row  gap-5 md:max-h-[600px]">
          {product.imageLinks.length>1 && <div id='imagesAll' className="flex-[0.8] rounded-md flex md:block gap-2 md:flex-col md:max-h-[550px] scrollbar overflow-auto">
            {/* <img src={images[1]} alt="chair" className="w-full h-36 object-cover cursor-pointer mb-2" />
            <img src={images[2]} alt="chair" className="w-full h-36 object-cover cursor-pointer mb-2" /> */}
            {product.imageLinks.map((image,i)=>{
              if (i!==selectedImage) {
                return <motion.img key={`${i}-${image}`} whileHover={{scale:1.1}} whileTap={{scale:0.9}} src={image} alt="chair" className="w-full h-16 md:h-36 object-cover md:mb-4 cursor-pointer" onClick={()=>setSelectedImage(i)} />
                
              }
              return <></>
            })}

          </div>}
          <div id='imageMain' className="flex-[3]">
            <img src={product.imageLinks[selectedImage]} alt="chair" className="w-full max-h-[600px] object-cover" />
          </div>

        </div>


        <div id='details' className="flex-[1] flex flex-col gap-7">
          <h1 className="text-3xl font-bold w-full md:w-[80%]">{product.name}</h1>
          <span className="text-2xl text-teal-700 font-medium">RS. {product.price}</span>
          <p className="text-base font-light text-justify line-clamp-[10]">{product.desc}</p>
          <div className="flex items-center gap-2 font-bold">
            <motion.button  whileTap={{scale:0.9}} onClick={()=>setItemCount(itemCount+1)} className="bg-green-400 flex justify-center items-center py-1 px-2 text-white">+</motion.button>
            {itemCount}
            <motion.button whileTap={{scale:0.9}} onClick={()=>setItemCount(itemCount!==1?itemCount-1:itemCount)} className="bg-red-400 flex justify-center items-center py-1 px-2 text-white">-</motion.button>
          </div>
          <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={handleAddToCart} className="bg-teal-500 flex p-3 px-6 text-white font-semibold gap-2 rounded w-44 hover:bg-teal-400">{isAdded?<CheckCircleIcon className='h-5 w-5'/>:<ShoppingCartIcon className='h-5 w-5' />}{isAdded?"Product Added":" Add to Cart"}</motion.button>
          <div className="flex gap-6">
            <motion.button onClick={handleFavorite} whileHover={{scale:1.1}} whileInView={{scale:0.9}} className="text-red-500 font-semibold flex items-center gap-2 tracking-wide hover:bg-slate-200 p-2 rounded-lg">
              <HeartIcon className={`h-7 w-7` } fill= {`${isFavorite?"red":"white"}`}/>
              {isFavorite?"In Favorites":"Add to favorites"}
            </motion.button>
            <div className="text-blue-500 font-semibold flex gap-2 tracking-wide items-center">
              <CubeIcon className='h-7 w-7' />
              View In 3D
            </div>

          </div>
          <div className="flex flex-col text-gray-500/80 text-sm mt-5">
            <span>Vendor: {product.vendor}</span>
            <span>Category: {product.category}</span>
            <span>Tags: {product.vendor}, {product.category} </span>

          </div>
          <hr />
          <div id='details' className="flex flex-col text-gray-500/80 text-sm gap-1">
            <span>Description</span>
            <hr className="w-[200px]" />
            <span>Reviews</span>
            <hr className="w-[200px]" />
            <span>Additional Info</span>
            <hr className="w-[200px]" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductDisplay