import {Image} from 'react-bootstrap';
import axios from 'axios';
import LocationVisited from '../components/LocationVisited';
import LocationSuggested from '../components/LocationSuggested';
import {useState, useEffect} from 'react';

function Profile({user}) {
    const [visLocations, setVisLocations] = useState([]);
    const [suggestedLocations, setSuggestedLocations] = useState([]);
    const [position, setPosition] = useState({});

    async function requestVisLocations() {
        const response = await axios.post('http://localhost:4000/profile_page', {
            userid: user.userid
        });

        if (response.status === 200) {
            setVisLocations(response.data);
        }
        else {
            console.log(response);
        }
    }

    async function requestSugLocations() {
        if (position !== {} && position.latitude) {
            // console.log(user.userid)
            // console.log(position.longitude)
            // console.log(position.latitude)
            const response = await axios.post('http://localhost:4000/suggestions', {
                userid: user.userid,
                longitude: position.longitude,
                latitude: position.latitude
            });
            // console.log(response);
            if (response.status === 200) {
                setSuggestedLocations(response.data);
            }
            else {
                console.log(response);
            }
        }
    }
    
    function renderVisitedLocations() {
        console.log(visLocations);
        if (visLocations) {
            visLocations.forEach((location, index) => {
                <LocationVisited location={location} key={index}/>
            });
        }
    }
    console.log()
    function renderSuggestedLocations() {
        console.log(suggestedLocations);
        if(suggestedLocations) {
            suggestedLocations.forEach((location, index) => {
                <LocationSuggested location={location} key={index} />
            })
        }
    }

    useEffect(() => {

        const interval = setInterval(() => {
          navigator.geolocation.getCurrentPosition((position) => {
            setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            // requestSugLocations();
          });
        }, 5000);
        if (position) {
            requestSugLocations();
        }
        return () => clearInterval();
    }, []);

    useEffect(() =>{
        requestVisLocations();
    }, []);

    return (
        <div className="Profile">

            <Image src="" alt="Placeholder"/>
            <h1> {user.surname + ' ' + user.lastname} </h1>
            <p> Explorer Level 1 </p>
            <h1>Visited Locations</h1>
            {renderVisitedLocations()}
            {renderSuggestedLocations()}
            {user.email}
        </div>
    );
}

export default Profile;