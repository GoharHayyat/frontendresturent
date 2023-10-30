import WaveMotion from '../components/WaveMotion'
import { motion } from 'framer-motion';
import {  useDispatch } from 'react-redux';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';



function ErrorPage() {



    const variant = {
        initial: {
            scale: 0.5,
            opacity: 0.3,
        },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
            }
        }
    }


    return (
        <>
            <div className="flex items-center justify-center h-[92vh] md:h-[90vh] w-full bg-gradient-to-b from-teal-200 to-teal-700 relative overflow-hidden">
                <motion.div variants={variant} initial="initial" animate="animate" className="px-4 py-8 w-[90%]  md:w-[35%] bg-white rounded-xl z-40 flex flex-col items-center">
                    <motion.div className='bg-red-500 rounded-full' initial={{scale:0.4,opacity:0.6}} animate={{scale:1,opacity:1}} transition={{repeat:Infinity,duration:1.5,type:'spring'}}>
                        <XMarkIcon className='h-44 w-44 text-white'/>
                    </motion.div>
                    <h1 className='text-center mt-8 font-semibold text-2xl'>There has been an error.</h1>
                </motion.div>
                <WaveMotion />
            </div>
        </>
    )
}

export default ErrorPage