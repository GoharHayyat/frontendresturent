import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsCartOpen } from '../features/Cart';
import Search from './Search';
import { useNavigate } from 'react-router-dom';
import { closeAll,setMenuBar, setSearchModal } from '../features/Modals';


function Navbar() {
    const dispatch = useDispatch();
    const {search,menu} = useSelector(state=>state.modals)
    // const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState([]);
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);
    // const navigate = useNavigate();

    const checkitt = ()=>{
        const storedData = localStorage.getItem("loginData");
      
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData && parsedData.token) {
            
            window.location.href = '/profile';
          } else {
            console.log("Invalid stored data structure");
            window.location.href = '/login';
          }
        } else {
          console.log("No stored data found in local storage.");
        //   setIsUserLoggedIn(false);
        window.location.href = '/login';
        }
    }

      const checkit = ()=>{
        checkitt();
      }

    return (
        <>

            <motion.nav initial={{ y: -250 }} animate={{ y: 0 }} transition={{ type: "spring" }} className="shadow-sm px-6 py-4 md:px-8  flex items-center justify-between font-sans relative">
                <Link to="/"><span className="font-bold text-2xl md:text-2xl hover:text-teal-600"> RestaurantHub.</span></Link>


                <motion.div className={`pt-7 md:pt-0 pb-7 absolute z-50 bg-white shadow ${(menu && !isCartOpen) ? "" : "translate-y-[-200%]"} min-h-[40%] right-0 top-20 w-full md:translate-y-0 md:shadow-none md:z-0 md:flex md:bg-transparent md:pb-0 md:static md:min-h-fit md:w-auto transition-all duration-300 ease-in`}>
                    <ul className="flex flex-col gap-12 md:flex-row items-center md:flex md:gap-6 text-lg font-medium">
                        <motion.li whileHover={{ scale: 1.1 }} className="hover:text-sky-600"><a href="/#">About Us</a></motion.li>
                        <motion.li  id="brands"     whileHover={{ scale: 1.1 }} className="hover:text-sky-600 cursor-pointer">
                            Reservation
                        </motion.li>
                        <motion.li  id="category"  whileHover={{ scale: 1.1 }} className="hover:text-sky-600 cursor-pointer">
                            Category
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.1 }} className="hover:text-sky-600"><a href="/#">Contact Us</a></motion.li>


                    </ul>

                </motion.div>

                <div className="flex gap-4">
                    <motion.div whileTap={{ scale: 0.8 }} onClick={() => { menu && dispatch(setMenuBar(false)); dispatch(setSearchModal(!search)); }}>
                        <MagnifyingGlassIcon className="h-6 w-6 hover:text-sky-600 duration-200" />
                    </motion.div>
                    {/* <motion.div whileTap={{ scale: 0.8 }} onClick={() => {  dispatch(setImageSearch(true)); }}>
                        <CameraIcon className="h-6 w-6 hover:text-sky-600 duration-200" />
                    </motion.div> */}
                    <motion.div whileTap={{ scale: 0.8 }} onClick={() => {dispatch(setIsCartOpen({}));dispatch(closeAll())}}>
                        <div className="relative">
                            <ShoppingCartIcon className="h-6 w-6 hover:text-sky-600 duration-200" />
                            <span className="inline-flex absolute left-3 bottom-3 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2">{cart.length}</span>
                        </div>

                    </motion.div>
                    <motion.div whileTap={{ scale: 0.8 }} onClick={() => checkit() }>
                        {/* <Link to={isUserLoggedIn ? "/profile" : "/login"}>
                            <UserIcon className="h-6 w-6 hover:text-sky-600 duration-200" />
                        </Link> */}
                        
                            <UserIcon className="h-6 w-6 hover:text-sky-600 duration-200" />
                       
                    </motion.div>
                    {/* className=" md:hidden" */}
                    {/* <motion.div whileTap={{ scale: 0.8 }}   onClick={() => { search && dispatch(setSearchModal(false)); dispatch(setMenuBar(!menu)); }}>
                        <Bars3Icon className="h-6 w-6 hover:text-sky-100 duration-200" />
                    </motion.div> */}
                    <motion.div whileTap={{ scale: 0.8 }} className=" md:hidden" onClick={() => { search && dispatch(setSearchModal(false)); dispatch(setMenuBar(!menu)); }}>
                        <Bars3Icon className="h-6 w-6 hover:text-sky-600 duration-200" />
                    </motion.div>
                </div>
            </motion.nav>
            {(search && !isCartOpen) && <Search onPressCLose={() => dispatch(setSearchModal(false))} />}

        </>
    )
}

export default Navbar