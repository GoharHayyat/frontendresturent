// import React, { useState } from 'react';

// function GetRecommendations() {
//   const [userId, setUserId] = useState('');
//   const [recommendations, setRecommendations] = useState([]);




//   const handleGetRecommendations = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/recommendation', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ user_id: userId })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch recommendations');
//       }

//       const data = await response.json();
//       setRecommendations(data.recommendations);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   //testing Recommendations

//   return (
//     <div>
//       <h1>Get Recommendations</h1>
//       <input
//         type="text"
//         placeholder="Enter User ID"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//       />
//       <button onClick={handleGetRecommendations}>Get Recommendations</button>
//       <div>
//         <h2>Recommendations</h2>
//         <ul>
//           {recommendations.map((item, index) => (
//             <li key={index}>{item.title}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default GetRecommendations;


import React, { useState, useEffect } from 'react';

function GetRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  
  useEffect(() => {
    // Fetch recommendations when component mounts
    const fetchRecommendations = async () => {
      try {
        // Get user ID from local storage

        const loginDataString = localStorage.getItem('loginData');
      const loginData = JSON.parse(loginDataString);
      const userId  = loginData.favorites._id;
        // const userId = localStorage.getItem('loginData');
        if (!userId) {
          throw new Error('User ID not found in local storage');
        }

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

    fetchRecommendations();

    // Cleanup function
    return () => {
      setRecommendations([]);
    };
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div>
      
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
