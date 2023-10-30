import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
  }

  return (
    <motion.div
      initial={{ opacity: 0.3,scaleY:0.3 }}
      whileInView={{ opacity: 1,scaleY:1 }}
      viewport={{once:true}}
      transition={{ duration: 0.8, type:"spring" }}
      className="bg-teal-900/80 px-8 py-12 md:py-20 md:px-24 text-white w-full flex flex-col items-center justify-center gap-6"
    >
      <h1 className="text-3xl md:text-5xl font-semibold select-none text-center">Newsletter</h1>
      <h3 className=" text-center tracking-wider text-base md:text-xl select-none">Get Timely Updates about your favorites</h3>
      <div className="flex md:flex-row flex-col items-center justify-center w-full md:w-[70%] gap-4 md:gap-2">
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full md:flex-[8] bg-white text-center md:text-start p-3 rounded-lg border-none outline-none text-black"
        />
        <motion.button
          type="submit"
          className="md:flex-[1] bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-500/70 "
          onClick={handleSubmit}
          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
        >
          Subscribe
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Newsletter;
