import React, { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Reservation() {
  const [slot, setSlot] = useState("");
  const [date, setDate] = useState("");
  const [noOfPersons, setNoOfPersons] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [user, setUser] = useState();
  // const [bookingStatus, setBookingStatus] = useState("");

  const slotTimes = [
    { id: 1, startTime: "3:00 PM", endTime: "4:30 PM" },
    { id: 2, startTime: "4:30 PM", endTime: "6:00 PM" },
    { id: 3, startTime: "6:00 PM", endTime: "7:30 PM" },
    { id: 4, startTime: "7:30 PM", endTime: "9:00 PM" },
    { id: 5, startTime: "9:00 PM", endTime: "10:30 PM" },
    { id: 6, startTime: "10:30 PM", endTime: "11:59 PM" },
  ];
function getDates() {
  const today = new Date();
  const endDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()); // Set the end date to one year from now
  const dates = [];

  for (let date = today; date <= endDate; date.setDate(date.getDate() + 1)) {
    if (date >= today) {
      const formattedDate = date.toLocaleDateString();
      dates.push(formattedDate);
    }
  }

  return dates;
}



  useEffect(() => {
    const loginDataString = localStorage.getItem("loginData");

    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      setUser(loginData);
      console.log("user", user);
    }
  }, []);


useEffect(() => {
    const fetchAvailableSlots = async() => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/availability?date=${date}`
            );
            const data = await response.json();
            console.log('Available slots from API:', data.availableSlots); // Log the available slots from the API
            setAvailableSlots(data.availableSlots);
        } catch (error) {
            console.error("Error fetching available slots:", error);
        }
    };

    if (date) {
        fetchAvailableSlots();
    }
}, [date]);





  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Retrieve user data from localStorage
      const loginDataString = localStorage.getItem("loginData");
      const loginData = JSON.parse(loginDataString);
      const { email, name, phone } = loginData.favorites;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slot,
          date,
          email,
          name,
          phone,
          noOfPersons,
        }), // Include user data, number of persons, and slot time
      });

      if (!response.ok) {
        throw new Error("This slot is not available");
      }

      toast("Booking successful");
      setSlot("");
      setDate("");
      setNoOfPersons("");

    } catch (error) {
      console.error(error.message);
      toast("This slot is not available");
    }
  };


  const userContactInfo = () => {
    if (user) {
      //setValues({...values,existingaddress:user.address})
      return (
        <>
          <div className="flex flex-col my-2 gap-1 justify-center text-base">
            <p>
              You are Currently Logged In as{" "}
              <Link to="/profile" className="font-[500] hover:text-teal-600">
                {user.favorites.name}
              </Link>
            </p>
            <p>
              With <span className="font-[500]">"{user.favorites.email}"</span>
            </p>
            {/* <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.9}} onClick={handleLogout} className="bg-black/70 text-white text-sm w-16 p-1 rounded hover:bg-black">Logout</motion.button> */}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="my-2 text-base">
            <p>
              You are Currently not Logged in. Click to{" "}
              <Link to="/login" className="font-semibold hover:text-teal-600">
                Log In
              </Link>
            </p>
          </div>
         
        </>
      );
    }
  };




  return (
    <div className="md:h-[100vh]">
      <div className="px-4 pt-10 md:px-10 md:w-[55%]">
        <h1 className="text-2xl font-semibold">Reservation</h1>
      </div>
      <div className="px-4 md:px-10 md:w-[55%]">
      { userContactInfo()}
      </div>
      <div className="flex w-full md:flex-row flex-col-reverse">
        {/* <CheckoutForm /> */}
      
        <div
          className="App"
          style={{
            fontFamily: "Arial, sans-serif",
            width: "360px",
            maxWidth: "360px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
            marginLeft: "8%",
          }}
        >
          {/* <h1 style={{ textAlign: "center" }}>Restaurant Booking</h1> */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* <label htmlFor="date" style={{ marginBottom: "8px" }}>
              Select a date:
            </label>
             */}
           <label htmlFor="date" style={{ marginBottom: "8px" }}>
  Select a date:
</label>
<select id="date" name="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{
                marginBottom: "16px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}>
  {getDates().map((dateString, index) => (
    <option key={index} value={dateString}>{dateString}</option>
  ))}
</select>


            {/* <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{
                marginBottom: "16px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            /> */}
            <label htmlFor="slot" style={{ marginBottom: "8px" }}>
              Select a slot:
            </label>
            <select
              id="slot"
              name="slot"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              required
              style={{
                marginBottom: "16px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select a slot</option>
              {availableSlots.length === 0 ? (
                <option disabled>No slot available</option>
              ) : (
                availableSlots.map((slotId) => {
                  const slotInfo = slotTimes.find(
                    (slotTime) => slotTime.id === slotId
                  );
                  return (
                    <option key={slotId} value={slotId}>
                      {slotInfo
                        ? `${slotInfo.startTime} - ${slotInfo.endTime}`
                        : `Slot ${slotId}`}
                    </option>
                  );
                })
              )}
            </select>
            <label htmlFor="noOfPersons" style={{ marginBottom: "8px" }}>
              Number of persons:
            </label>
            <input
              type="number"
              id="noOfPersons"
              name="noOfPersons"
              value={noOfPersons}
              onChange={(e) => setNoOfPersons(e.target.value)}
              required
              style={{
                marginBottom: "16px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <Button disabled={!user} type="submit" endDecorator={<KeyboardArrowRight />} color="success">
              MAKE RESERVATION
            </Button>
          </form>
          {/* {bookingStatus && <p style={{marginTop:"8px", fontSize:"18px", fontWeight:"" }} >{bookingStatus}</p>} */}
        </div>

        <div className="relative w-full md:w-[45%] bg-slate-50/70 md:absolute md:right-0 md:top-[72px] p-4 md:p-10 h-full">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("https://blog.addpointment.com/wp-content/uploads/2020/12/a-fine-dining-restaurant-table-that-is-reserved-scaled.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(3px)",
              width: "100%",
              height: "100%",
            }}
          ></div>
          <div
            className="relative z-10 bg-white bg-opacity-70"
            style={{
              borderRadius: "10px",
              padding: "20px",
              width: "100%",
              height: "70%",
            }}
          >
            <br />
            <hr />
            <div className="booking-cta">
              <h1
                style={{
                  fontSize: "52px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Make your reservation
              </h1>
              <p style={{ fontSize: "16px" }}>
                Simply navigate to our website, select your desired dates and
                preferences, and let us take care of the rest. Our commitment to
                providing exceptional service means that your reservation is not
                just a transaction but the beginning of an extraordinary
                experience.
              </p>
            </div>
           
            <hr />
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Reservation;

