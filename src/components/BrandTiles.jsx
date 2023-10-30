import { motion } from 'framer-motion'
import React from 'react'
import boss from "../assets/boss.PNG"
import habitt from "../assets/habitt.PNG"
import hoid from "../assets/hoid.PNG"
import interwood from "../assets/interwood.PNG"
import urban from "../assets/urban.PNG"

const imgs = [interwood,habitt,hoid,urban,boss]

function BrandTiles() {
  return (
    <div className='w-full bg-slate-100/90 pt-10 flex flex-col gap-6 items-center justify-center' >
      <motion.h1 whileHover={{scale:1.05}} initial={{y:-50,opacity:0,scale:0.6}} animate={{y:0,opacity:1,scale:1}} transition={{type:"spring", duration:1.5}} className="text-center text-black text-xl md:text-3xl font-bold">Brands</motion.h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-5 justify-between px-5 gap-y-4 font-semibold text-lg md:text-3xl items-center mb-10 md:px-20">
        {imgs.map((img,i)=>(
          <div className={"w-40 md:w-56 bg-white h-28 flex items-center justify-center rounded-lg"} key = {i}>
            <img className="h-16 w-32 object-contain" src={img} alt="brand" />
          </div>
        ))}
      </div>

    </div>
  )
}

export default BrandTiles