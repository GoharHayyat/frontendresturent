import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useState } from 'react';
import QRCode from 'qrcode.react';

function Barcode(props) {
  const [scanResult, setScanResult] = useState(null);
  const [generatedLink, setGeneratedLink] = useState('https://example.com'); // Replace with your link

  useEffect(() => {
    let scanner;

    const initializeScanner = async () => {
      scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      scanner.render(success, error);
    };

    const cleanupScanner = () => {
      if (scanner) {
        scanner.clear();
        
        // Add any other cleanup logic if needed
      }
    };

    const success = (result) => {
      setScanResult(result);
      setScanResult(null);
      scanner.clear();
       
      // Avoid redirecting if the URL is already the scanned result
      if (window.location.href !== result) {
        // Redirect to the scanned link
        // localStorage.setItem("user_table", result);
        localStorage.removeItem("HTML5_QRCODE_DATA");
        window.location.assign(result);
        
        scanner.stop();
      }
      scanner.stop();
    };
    

    const error = (err) => {
      console.error('Error scanning: ', err);
      // Display an error message to the user
    };

    initializeScanner();

    return () => {
      cleanupScanner();
    };
  }, []);

  return (
    <div key={props.key}>
      {scanResult ? (
        <div>
          <p>Scan Result: {scanResult}</p>
        </div>
      ) : (
        <div>
          <div id="reader"></div>
          {/* Render the QR code for the generated link */}
          {/* <QRCode value={generatedLink} /> */}
        </div>
      )}
    </div>
  );
}

export default Barcode;



// import React, { useState, useEffect } from 'react';
// import QRCode from 'qrcode.react';

// function Barcode() {
//   const generateRandomString = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let randomString = '';

//     for (let i = 0; i < 20; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       randomString += characters.charAt(randomIndex);
//     }

//     return randomString;
//   };

//   const initialGeneratedString = generateRandomString();

//   const [generatedLink, setGeneratedLink] = useState(`http://192.168.86.141:3000/${initialGeneratedString}`);
//   const [timeRemaining, setTimeRemaining] = useState(3600); // Initial time remaining in seconds
//   const [generatedString, setGeneratedString] = useState(initialGeneratedString);

//   const [apiCallMade, setApiCallMade] = useState(false);

//   let isSending = false;

//   const sendQRCodeInfo = (info) => {
//     // Check if already sending, ignore the request if true
//     if (isSending) {
//       console.log("Ignoring duplicate request");
//       return;
//     }
  
//     // Set the lock to true to prevent sending another request
//     isSending = true;
  
//     // Replace this with your logic to send the object to your desired endpoint
//     console.log('QR Code Information:', info);
  
//     // Example: You can use fetch or any other method to send data to your server
//     fetch('https://cv81j9kz-4500.inc1.devtunnels.ms/qrstore', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(info),
//     })
//       .then(response => response.json())
//       .then(data => console.log('Response:', data))
//       .catch(error => console.error('Error:', error))
//       .finally(() => {
//         // Release the lock, allowing the next request to be sent
//         isSending = false;
//       });
//   };
  

//   // Send QR code information only once before setting up intervals
//   useEffect(() => {
//     if (!apiCallMade) {
//       const initialQRCodeInfo = { table: 6, tableid: initialGeneratedString };
//       sendQRCodeInfo(initialQRCodeInfo);
//       setApiCallMade(true);
//     }
//   }, [apiCallMade, initialGeneratedString]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const newGeneratedString = generateRandomString();
//       setGeneratedString(newGeneratedString);
//       setGeneratedLink(`http://192.168.86.141:3000/${newGeneratedString}`);
//       setTimeRemaining(3600); // Reset time remaining to 60 seconds after generating a new QR code
//       sendQRCodeInfo({ table: 6, tableid: newGeneratedString }); // Call the function to send the object
//     }, 3600000); // 1 minute interval

//     const timeIntervalId = setInterval(() => {
//       setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));
//     }, 1000); // 1 second interval for updating time remaining

//     return () => {
//       clearInterval(intervalId);
//       clearInterval(timeIntervalId);
//     };
//   }, []);

//   return (
//     <div>
//       <div>
//         {generatedLink}
//         {/* Render the QR code for the generated link */}
//         <QRCode value={generatedLink} />
//       </div>
//       <div>
//         {/* Display the time remaining until the next QR code generation */}
//         <p>Time Remaining: {formatTime(timeRemaining)}</p>
//       </div>
//     </div>
//   );
// }
// function formatTime(seconds) {
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = seconds % 60;

//   const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
//   return formattedTime;
// }

// // Function to pad single digits with a leading zero
// function padZero(value) {
//   return value < 10 ? `0${value}` : value;
// }

// export default Barcode;




