import React, { useState, useEffect } from 'react';

function Reservation() {
  const [slot, setSlot] = useState('');
  const [date, setDate] = useState('');
  const [noOfPersons, setNoOfPersons] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingStatus, setBookingStatus] = useState('');

  const slotTimes = [
    { id: 1, startTime: '3:00 PM', endTime: '4:30 PM' },
    { id: 2, startTime: '4:30 PM', endTime: '6:00 PM' },
    { id: 3, startTime: '6:00 PM', endTime: '7:30 PM' },
    { id: 4, startTime: '7:30 PM', endTime: '9:00 PM' },
    { id: 5, startTime: '9:00 PM', endTime: '10:30 PM' },
    { id: 6, startTime: '10:30 PM', endTime: '11:59 PM' },
  ];

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/availability?date=${date}`);
        const data = await response.json();
        setAvailableSlots(data.availableSlots);
      } catch (error) {
        console.error('Error fetching available slots:', error);
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
      const loginDataString = localStorage.getItem('loginData');
      const loginData = JSON.parse(loginDataString);
      const { email, name, phone } = loginData.favorites;

      // Send booking request along with user data and number of persons
      const response = await fetch(`${process.env.REACT_APP_API_URL}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slot, date, email, name, phone, noOfPersons }) // Include user data and number of persons
      });

      if (!response.ok) {
        throw new Error('This slot is not available');
      }

      setBookingStatus('Booking successful');
    } catch (error) {
      console.error(error.message);
      setBookingStatus('This slot is not available');
    }
  };

  return (
    <div className="App">
      <h1>Restaurant Booking</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Select a date:</label>
        <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <label htmlFor="slot">Select a slot:</label>
        <select id="slot" name="slot" value={slot} onChange={(e) => setSlot(e.target.value)} required>
          <option value="">Select a slot</option>
          {availableSlots.length === 0 ? (
            <option disabled>No slot available</option>
          ) : (
            availableSlots.map(slotId => {
              const slotInfo = slotTimes.find(slotTime => slotTime.id === slotId);
              return (
                <option key={slotId} value={slotId}>
                  {slotInfo ? `From ${slotInfo.startTime} to ${slotInfo.endTime}` : `Slot ${slotId}`}
                </option>
              );
            })
          )}
        </select>
        <label htmlFor="noOfPersons">Number of persons:</label>
        <input type="number" id="noOfPersons" name="noOfPersons" value={noOfPersons} onChange={(e) => setNoOfPersons(e.target.value)} required />
        <button type="submit">Book</button>
      </form>
      {bookingStatus && <p>{bookingStatus}</p>}
    </div>
  );
}

export default Reservation;
