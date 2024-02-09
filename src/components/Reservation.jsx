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

      // Find the slot time based on the selected slot id
      const selectedSlot = slotTimes.find(slotTime => slotTime.id === parseInt(slot));
      const slotTime = selectedSlot ? `${selectedSlot.startTime} - ${selectedSlot.endTime}` : '';

      // Send booking request along with user data, number of persons, and slot time
      const response = await fetch(`${process.env.REACT_APP_API_URL}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slotTime, date, email, name, phone, noOfPersons }) // Include user data, number of persons, and slot time
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
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center' }}>Restaurant Booking</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="date" style={{ marginBottom: '8px' }}>Select a date:</label>
        <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required style={{ marginBottom: '16px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <label htmlFor="slot" style={{ marginBottom: '8px' }}>Select a slot:</label>
        <select id="slot" name="slot" value={slot} onChange={(e) => setSlot(e.target.value)} required style={{ marginBottom: '16px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="">Select a slot</option>
          {availableSlots.length === 0 ? (
            <option disabled>No slot available</option>
          ) : (
            availableSlots.map(slotId => {
              const slotInfo = slotTimes.find(slotTime => slotTime.id === slotId);
              return (
                <option key={slotId} value={slotId}>
                  {slotInfo ? `${slotInfo.startTime} - ${slotInfo.endTime}` : `Slot ${slotId}`}
                </option>
              );
            })
          )}
        </select>
        <label htmlFor="noOfPersons" style={{ marginBottom: '8px' }}>Number of persons:</label>
        <input type="number" id="noOfPersons" name="noOfPersons" value={noOfPersons} onChange={(e) => setNoOfPersons(e.target.value)} required style={{ marginBottom: '16px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Book</button>
      </form>
      {bookingStatus && <p>{bookingStatus}</p>}
    </div>
  );
}

export default Reservation;
