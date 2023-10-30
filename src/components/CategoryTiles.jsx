import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom';
import { categoryData } from '../demidata';




function CategoryTiles() {
  return (
    <>
    
    <motion.h1 whileHover={{scale:1.05}} initial={{y:-50,opacity:0,scale:0.6}} animate={{y:0,opacity:1,scale:1}} transition={{type:"spring", duration:1.5}} style={{marginTop:"4%", marginBottom:"-20px"}} className="text-center text-black text-xl md:text-4xl font-bold">Catogeries</motion.h1>
    
    <div className="my-10 h-[75vh] grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2">

        
        {/* {categoryData.map((item,i)=>{
            return (
                <motion.div initial={{opacity:0.5,scaleY:0.2}}  whileInView={{ opacity: 1,scaleY:1,transition:{type:"spring",opacity:{duration:0.6}, delay:i*0.2,duration:0.2,stiffness:80,bounce:0.3}}} viewport={{ once: true }} key={item.id} className={`${item.gridLoc} p-1 w-full h-full`}>
                    <motion.div whileTap={{scale:0.9}} className="w-full h-full flex justify-center items-center relative overflow-hidden">
                        <motion.img whileHover={{scale:1.3,transition:{duration:0.6}}}  src={item.img} alt={item.name} className="w-full h-full absolute z-0 object-cover "/>
                        <Link to={`menuitems/${item.name}`} className='z-10'>

                            <motion.h1 whileTap={{scale:0.9}} whileHover={{scale:1.1}} className="text-white text-lg md:text-2xl font-semibold p-1 rounded-lg backdrop-blur-[2px]">{item.name}</motion.h1>
                        </Link>
                    </motion.div>

                </motion.div>
            )
        })} */}

{categoryData.map((item, i) => {
    let linkTo = `menuitems/${item.name}`; // Default link

    // Check if it's the 6th item (index 5 since index starts at 0)
    if (i === 5) {
        // Change the link for the 6th item
        linkTo = '/login'; // Replace this with your desired link
    }

    return (
        <motion.div key={item.id} initial={{opacity:0.5,scaleY:0.2}} 
            whileInView={{ opacity: 1, scaleY:1, transition: {
                type: "spring",
                opacity: { duration: 0.6 },
                delay: i * 0.150,
                duration: 0.2,
                stiffness: 80,
                bounce: 0.3
            }}}
            viewport={{ once: true }}
            className={`${item.gridLoc} p-1 w-full h-full`}
        >
            <motion.div whileTap={{scale:0.9}} className="w-full h-full flex justify-center items-center relative overflow-hidden">
                <motion.img whileHover={{scale:1.3,transition:{duration:0.6}}}  src={item.img} alt={item.name} className="w-full h-full absolute z-0 object-cover" />
                <Link to={linkTo} className='z-10'>
                    <motion.h1 whileTap={{scale:0.9}} whileHover={{scale:1.1}} className="text-white text-lg md:text-2xl font-semibold p-1 rounded-lg backdrop-blur-[2px]">{item.name}</motion.h1>
                </Link>
            </motion.div>
        </motion.div>
    );
})}


    </div>
    </>
  )
}

export default CategoryTiles