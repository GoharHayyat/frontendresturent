import React from 'react'
import { TruckIcon,BuildingStorefrontIcon,ShieldCheckIcon,BanknotesIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'


const serviceData =[
    {
        heading:"Multiple Venders",
        subHeading: "Lorem ipsum dolor sit.",
        bg: "bg-sky-100",
        icon: ()=>{
            return (
                <BuildingStorefrontIcon className='h-7 w-7 md:h-9 md:w-9 p-1 bg-black rounded-[50px] text-white font-semibold'/>
            )
        }
    },
    {
        heading:"Secure Payments",
        subHeading: "Lorem ipsum dolor sit.",
        bg: "bg-cyan-100",
        icon: ()=>{
            return (
                <ShieldCheckIcon className='h-7 w-7 md:h-9 md:w-9 p-1 bg-black rounded-[50px] text-white font-semibold'/>
            )
        }
    },
    {
        heading:"Fast Delivery",
        subHeading: "Lorem ipsum dolor sit.",
        bg: "bg-green-100",

        icon: ()=>{
            return (
                <TruckIcon className='h-7 w-7 md:h-9 md:w-9 p-1 bg-black rounded-[50px] text-white font-semibold'/>
            )
        }
    },
    {
        heading:"Affordable Products",
        subHeading: "Lorem ipsum dolor sit.",
        bg: "bg-indigo-100",
        icon: ()=>{
            return (
                <BanknotesIcon className='h-7 w-7 md:h-9 md:w-9 p-1 bg-black rounded-[50px] text-white font-semibold'/>
            )
        }
    }
]


function Services() {
  return (

//     <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 p-5 md:py-9 md:px-14 flex-wrap">
//   {serviceData.map((item, i) => {
//     return (
//       <motion.div
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         initial={{ opacity: 0, x: 50, scaleZ: 0 }}
//         whileInView={{
//           opacity: 1,
//           x: 0,
//           scaleZ: 1,
//           transition: {
//             delay: i * 0.4 + 0.2,
//             opacity: { duration: 1 },
//             type: "spring",
//             bounce: 0.4,
//             stiffness: 60
//           }
//         }}
//         viewport={{ once: true }}
//         key={item.heading}
//         className={`p-3 md:p-6 w-full h-full flex gap-x-2 md:gap-x-4 items-center cursor-pointer ${item.bg} rounded-lg select-none`}
//         style={{ minWidth: "280px", maxWidth: "100%" }} // Adjust card width
//       >
//         {item.icon()}
//         <div>
//           <h3 className="text-sm md:text-base font-bold">{item.heading}</h3>
//           <p className="text-xs md:text-sm mt-1 text-[#222]">{item.subHeading}</p>
//         </div>
//       </motion.div>
//     );
//   })}
// </section>

    <section  className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 items-center justify-center gap-4 md:gap-10 p-5 md:py-9 md:px-14 flex-wrap ">
        {serviceData.map((item,i)=>{
            return (
                <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}} initial={{opacity:0, x:50,scaleZ:0}} whileInView={{ opacity: 1,x:0,scaleZ:1,transition:{delay:i*0.2,opacity:{duration:1},type:"spring",bounce:0.4,stiffness:60}}} viewport={{ once: true }}  key={item.heading} className={`p-3 md:p-6 w-full h-full flex gap-x-2 md:gap-x-4 items-center cursor-pointer ${item.bg} rounded-lg select-none`}>
                    

                        {item.icon()}
                        <div>
                            <h3 className="text-sm md:text-base font-bold">{item.heading}</h3>
                            <p className="text-xs md:text-sm mt-1 text-[#222]">{item.subHeading}</p>
                        </div>
                    
                </motion.div>
            )
        })}
    </section>
  )
}

export default Services