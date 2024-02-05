import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { sliderItems } from '../demidata';
import './Slider.css';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Barcode from './Barcode';


const arrowClasses =
  'z-[2] w-12 h-12 bg-gray-400/20 flex items-center justify-center rounded-3xl absolute top-0 bottom-0 m-auto cursor-pointer opacity-50';

  const generateKey = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  
    

function Slider() {
  const keyForChild = generateKey();
  const [slideIndex, setSlideIndex] = useState(0);
  const [variant, setVariant] = React.useState(undefined);

  const handleordernow = () => {
    var pageRedirectValue = localStorage.getItem("user_table");

    if (pageRedirectValue !== null){
      window.location.href = "/allcategory";
    }
    else{
      setVariant('solid');
    }


    
  };

  function handleClick(direction) {
    if (direction === 'left') {
      setSlideIndex((slideIndex > 0 ? slideIndex - 1 : 2));
    } else {
      setSlideIndex((slideIndex < 2 ? slideIndex + 1 : 0));
    }
  }

  useEffect(() => {
    let intervalId;
  
    if (!!variant) {
      // Handle logic when variant is truthy
    } else {
      localStorage.removeItem("HTML5_QRCODE_DATA");
      localStorage.removeItem("page_redirct");
      intervalId = setInterval(() => {
        handleClick('right');
      }, 10000);
    }
  
    return () => clearInterval(intervalId);
  }, [slideIndex, variant]);
  

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
              {/* onClick={() => {
            setVariant('solid');
          }} */}
              <h1 className="text-6xl font-bold md:text-6xl">{item.title}</h1>
              <p className="my-12 mx-0 text-lg md:text-xl font-medium tracking-[3px]">{item.desc}</p>
              <button onClick={handleordernow}   className="p-3 text-xl bg-transparent border-2 border-black self-center md:static md:self-start hover:text-sky-600 duration-200">
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
      <React.Fragment>
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <Button
          variant="solid"
          color="neutral"
          onClick={() => {
            setVariant('solid');
          }}
        >
          Solid
        </Button> */}
      </Stack>
      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog variant={variant}>
          <ModalClose />
          <DialogTitle>Scan Now</DialogTitle>
          <Barcode key={keyForChild} redirect={false} redirecthome={true}/>
          {/* <DialogContent>This is a `{variant}` modal dialog.</DialogContent> */}
        </ModalDialog>
      </Modal>
    </React.Fragment>
    </div>
  );
}

export default Slider;
