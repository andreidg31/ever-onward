import React from 'react';

function Home({isAuth, user}) {
  return (
    <div>
      <h2>Welcome Home</h2>
      <p>{user && user.email}</p>
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