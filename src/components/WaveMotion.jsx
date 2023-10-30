import React from 'react'
import { motion } from 'framer-motion';

const wave1 = {
    hidden: {
        backgroundPositionX: "0px",
        opacity: 0.6,
    },
    visible:{
        backgroundPositionX: "1000px",
        opacity: 0.6,
        zIndex: 10,
        transition:{
            repeat:Infinity,
            ease:"linear",
            duration: 25,
        },
    },
}
const wave2 = {
    hidden: {
        backgroundPositionX: "0px",
        opacity: 0.5,
    },
    visible:{
        backgroundPositionX: "-1000px",
        opacity: 0.5,
        zIndex: 9,
        transition:{
            repeat:Infinity,
            ease:"linear",
            duration: 15,
        },
    },
}
const wave3 = {
    hidden: {
        backgroundPositionX: "0px",
        opacity: 0.3,
    },
    visible:{
        backgroundPositionX: "-1000px",
        opacity: 0.3,
        zIndex: 8,
        transition:{
            repeat:Infinity,
            ease:"linear",
            duration: 10,
        },
    },
}
const wave4 = {
    hidden: {
        backgroundPositionX: "0px",
        opacity: 0.1,
    },
    visible:{
        backgroundPositionX: "1000px",
        opacity: 0.1,
        zIndex: 7,
        transition:{
            repeat:Infinity,
            ease:"linear",
            duration: 5,
        },
    },
}


function WaveMotion() {
  return (
    <>
        <motion.div variants={wave1} initial="hidden" animate="visible" className="bg-[length:1000px_100px] absolute bg-wave-png w-screen h-[100px] bottom-0"></motion.div>
        <motion.div variants={wave2} initial="hidden" animate="visible" className="bg-[length:1000px_100px] absolute bg-wave-png w-screen h-[100px] bottom-0"></motion.div>
        <motion.div variants={wave3} initial="hidden" animate="visible" className="bg-[length:1000px_100px] absolute bg-wave-png w-screen h-[100px] bottom-0"></motion.div>
        <motion.div variants={wave4} initial="hidden" animate="visible" className="bg-[length:1000px_100px] absolute bg-wave-png w-screen h-[100px] bottom-0"></motion.div>

    </>
  )
}

export default WaveMotion