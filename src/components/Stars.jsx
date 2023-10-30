import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function Stars({ rating }) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <motion.svg
        key={index}
        whileHover={{ scale: 1.3 }}
        aria-hidden="true"
        className="w-5 h-5 text-yellow-300"
        fill="currentColor"
        stroke="#fde047"
        strokeWidth="1"
        fillOpacity={rating ? rating : 5 >= index + 1 ? 1 : rating - index}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{rating}</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </motion.svg>
    );
  });

  return (
    <div className="flex items-center mt-2.5 md:mb-5">
      {stars}
      <span className="bg-sky-100 text-sky-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
        {rating}
      </span>
    </div>
  );
}

Stars.propTyopes = {
  rating: PropTypes.number,
};

export default Stars;
