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
        localStorage.setItem("user_table", result);
        localStorage.removeItem("HTML5_QRCODE_DATA");
        window.location.assign("http://localhost:3000/checkout");
        
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
