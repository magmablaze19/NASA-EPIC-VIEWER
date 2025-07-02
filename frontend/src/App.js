/**
 * Author:    Alexandre Passin
 * Created:   07.01.2025
 **/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  //Setup "global" variables that are state enabled
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("2019-05-30");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  //Sends date to backend 
  const fetchImages = async () => {
    setLoading(true);
    try {
      //Send request for list of links from backend
      const res = await axios.get(`https://${backendUrl}/earth-image?date=${selectedDate}`);
      const data = await res.data;
      setImageUrls(data.imageLinkArray);
      //Preload all images in array to allow for smooth cycling. 
      //Necessary as images are quite large.
      //Doesnt seem to work well on windows.
      await data.imageLinkArray.forEach(element => {
        const img = new Image();
        img.src = element;
        //Not sure if this helps, read on stack overflow it should
        window[element] = img;
      });
    } catch (err) {
      //Set image array to single exploding earth gif for the lols if erroring out
      setImageUrls(["https://i.makeagif.com/media/3-20-2016/B1R3n8.gif"]);
      console.error('Error fetching image:', err);
      console.log(err);
    }
    setLoading(false);
  };

  //Load Image on webpage start
  useEffect(() => {
    fetchImages();
  }, [])
  
  //Website structure
  return (
   <div className="app-container">
      <div className="overlay">
        <h1 className="header">NASA EPIC Photo Viewer</h1>
        <div className="controls">
          <label htmlFor="date-input">Select a Date:</label>
          <input id="date-input" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min="2015-06-06" max={new Date().toISOString().split('T')[0]}/>
          <button onClick={fetchImages}>Get Images</button>
        </div>
        <div className="image-container"> 
          {loading && <p>Loading...</p>}
          {imageUrls.length !== 0 && (<img src={imageUrls[index]} alt="Earth from NASA" loading="eager" className="image"/>)}
          {imageUrls.length == 0 && !loading && <p>No Photos for Selected Date!</p>}
        </div>
        <div className="controls">
          {imageUrls.length > 1 && (<input type="range" min="0" max={imageUrls.length - 1} value={index} onChange={(e) => setIndex(Number(e.target.value))} className="slider"/>)}
        </div>
      </div>
    </div>
  );
}

export default App;
