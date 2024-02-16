import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any field is empty
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all fields');
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contactus`, formData);
      console.log(response.data);
      // Reset form fields after successful submission
      setFormData({ name: '', email: '', message: '' });
      toast.success('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again later');
    }
  };
  return (
    <div className="contact-us-container p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Contact Us</h2>
      <div className="contact-info mb-4">
        <p>Avenue 1, Khayaban-e-Jinnah، Road, Johar Town, Lahore, Punjab</p>
        <p>Phone: +92 300 0000000</p>
        <p>Email: info.restaurantshub@gmail.com</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded px-3 py-2 mb-2 w-full"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="border rounded px-3 py-2 mb-2 w-full"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Submit
        </button>
      </form>
         <div className="map-container mt-4 w-full sm:max-w-md mx-auto">
      <iframe
        title="Google Maps Directions"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dYOUR_LATITUDE!2dYOUR_LONGITUDE!3dYOUR_ZOOM_LEVEL!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3AYOUR_PLACE_NAME!2sYOUR_PLACE_NAME!5e0!3m2!1sen!2sus!4vYOUR_VERSION"
        width="100%"
        height="300"
        allowFullScreen=""
        loading="lazy"
        className="border border-gray-400 rounded-md"
      ></iframe>
    </div>
    </div>
  );
}

export default ContactUs;
