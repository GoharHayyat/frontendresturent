import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { sliderItems } from '../demidata';
import './Slider.css';

const arrowClasses =
  'z-[2] w-12 h-12 bg-gray-400/20 flex items-center justify-center rounded-3xl absolute top-0 bottom-0 m-auto cursor-pointer opacity-50';

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);

  function handleClick(direction) {
    if (direction === 'left') {
      setSlideIndex((slideIndex > 0 ? slideIndex - 1 : 2));
    } else {
      setSlideIndex((slideIndex < 2 ? slideIndex + 1 : 0));
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleClick('right');
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [slideIndex]);

  return (
    <div id="slider" className="w-full h-screen relative flex overflow-hidden">
      <motion.div
        whileTap={{ scale: 0.5 }}
        className={`${arrowClasses} left-2`}
        onClick={() => handleClick('left')}
      >
        <ArrowLeftIcon className="h-6 w-6 hover:text-sky-600 duration-200" />
      </motion.div>

      <div
        id="container"
        className={`translate-x-[${slideIndex * -100}vw] flex h-full transition-all duration-1000 ease-in-out`}
      >
        {sliderItems.map((item) => (
          <div
            id="slide"
            key={item.title}
            className={`relative flex flex-col md:flex-row justify-center items-center w-screen h-screen bg-[#${item.bg}]`}
          >
            <motion.div
              initial={{ x: -300, opacity: 0, scale: 0.5 }}
              animate={{ x: 0, opacity: 1, delay: 0.5, duration: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 1, delay: 0.2 }}
              id="info"
              className="flex-1 h-full flex justify-center flex-col pl-4 md:pl-20"
            >
              <h1 className="text-6xl font-bold md:text-6xl">{item.title}</h1>
              <p className="my-12 mx-0 text-lg md:text-xl font-medium tracking-[3px]">{item.desc}</p>
              <button className="p-3 text-xl bg-transparent border-2 border-black self-center md:static md:self-start hover:text-sky-600 duration-200">
                ORDER NOW
              </button>
            </motion.div>

            <div id="img" className="pb-24 md:pb-0 flex-1 h-full flex items-center justify-center relative">
              <motion.img
                style={{ height: '70%' }}
                initial={{ y: -200, scale: 0.7, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1, delay: 0.5, duration: 1 }}
                transition={{ type: 'spring', duration: 1, delay: 0.3 }}
                src={item.img}
                alt="food"
                className={`md:h-[55%] z-10 object-fill rotate`}
              />
            </div>
          </div>
        ))}
      </div>

      <motion.div
        whileTap={{ scale: 0.5 }}
        className={`${arrowClasses} right-2 z-30`}
        onClick={() => handleClick('right')}
      >
        <ArrowRightIcon className="h-6 w-6 hover:text-sky-600 duration-200" />
      </motion.div>
    </div>
  );
}

export default Slider;
