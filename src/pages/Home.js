import React from 'react';
import './Home.css';

function Home({user}) {
  return (
    <div>
    {/* <div className="logo"></div> */}
    <div className="text1"></div>
    <div className="text2"></div>
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