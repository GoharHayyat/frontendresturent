import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { setImageSearch } from "../features/Modals";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const variants = {
  initial: { opacity: 0, scaleY: 0 },
  animate: { opacity: 1, scaleY: 1 },
};

function ImageSearch() {
  const dispatch = useDispatch();
  const { imageSearch } = useSelector((state) => state.modals);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file_upload", selectedImage);
    setLoader(true);

    try {
      const endpoint = "http://127.0.0.1:8000/uploadfile/";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        const prodIDS = data.message.map((prod) => prod.id);
        const res = await axios.post(
          `https://cv81j9kz-4500.inc1.devtunnels.msgetProductsByIds`,
          { products: prodIDS }
        );
        console.log(res.data.products, res.data);
        setLoader(false)
        setSelectedImage(null)
        dispatch(setImageSearch(false))
        navigate("/imageSearch", {
          state: { products: res.data.products, data: data.message },
        });
      } else {
        console.log("Failed to upload file.");
      }
    } catch (error) {
      console.log(error);
    }
    setLoader(false)
    setSelectedImage(null)
    dispatch(setImageSearch(false))
  };

  return (
    // modal screen
    <div
      className={`${
        imageSearch ? "block" : "hidden"
      } bg-black/40 fixed z-[99999] w-full h-full left-0 top-0 overflow-auto scrollbar`}
    >
      {/* <div className='hidden md:block md:w-[70%] md:fixed md:top-0 md:bottom-0 md:left-0' onClick={()=>dispatch(setIsCartOpen({}))}></div> */}
      {/* Cart Sidebar  */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0, x: 150 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
        whileInView={{ opacity: 1, scaleX: 1, x: 0 }}
        viewport={{ once: false }}
        className="fixed right-0 top-0 w-full md:w-[max(400px,30%)] h-full bg-white"
      >
        {/* Header */}
        <div className="p-7 overflow-auto h-full">
          {/* Heading and close button */}
          <div className="flex justify-between items-center mb-4">
            <motion.h3
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-semibold text-teal-600"
            >
              Image Search{" "}
            </motion.h3>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(setImageSearch(false))}
            >
              <XMarkIcon className="h-9 w-9 text-red-500 hover:text-red-400" />
            </motion.div>
          </div>
          <div>
            {selectedImage && (
              <div>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <button onClick={() => setSelectedImage(null)}>Remove</button>
              </div>
            )}

            <br />
            <br />

           {selectedImage===null && <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />}
          </div>
          {selectedImage && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={loader}
              className="bg-teal-400 p-3 text-white rounded-md flex justify-center items-center hover:bg-teal-500 mt-4 disabled:bg-teal-700"
              onClick={handleSubmit}
            >
              {loader ? (
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Submit"
              )}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ImageSearch;
