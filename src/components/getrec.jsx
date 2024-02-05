import React, { useState } from 'react';

function GetRecommendations() {
  const [userId, setUserId] = useState('');
  const [recommendations, setRecommendations] = useState([]);

//   setUserId='65bd64c0b24bb20f181fbde1'
// const response = await fetch('http://localhost:5000/recommendation', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ user_id: userId })
// });


  const handleGetRecommendations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Get Recommendations</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleGetRecommendations}>Get Recommendations</button>
      <div>
        <h2>Recommendations</h2>
        <ul>
          {recommendations.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GetRecommendations;
