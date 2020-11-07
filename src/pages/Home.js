import React from 'react';
import './Home.css';

function Home({user}) {
  return (
    <div className="home">
    
      <h2>Welcome Home</h2>
      <h1>Salutare</h1>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
    </div>
  );
}

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  // x.innerHTML = "Latitude: " + position.coords.latitude +
  // "<br>Longitude: " + position.coords.longitude;
<p>${position.coords.latitude}</p>
  console.log(position.coords.latitude, position.coords.longitude)
}

getLocation();

export default Home