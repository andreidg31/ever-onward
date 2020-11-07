import {Image} from 'react-bootstrap';
import axios from 'axios';
import LocationVisited from '../components/LocationVisited';
import LocationSuggested from '../components/LocationSuggested';
import {useState, useEffect} from 'react';

function Profile({user}) {
    const [visLocations, setVisLocations] = useState([]);
    const [suggestedLocations, setSuggestedLocations] = useState([]);
    const [position, setPosition] = useState({
    });

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

    async function requestSugLocations(positionx) {
        console.log("hello");
        // console.log(positionx);
        if (positionx !== {}) {
            // console.log(user.userid)
            console.log(positionx.coords.longitude)
            console.log(positionx.coords.latitude)
            const response = await axios.post('http://localhost:4000/suggestions', {
                userid: user.userid,
                longitude: positionx.coords.longitude,
                latitude: positionx.coords.latitude
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
            let itemArr =[];
            visLocations.forEach((location, index) => {
                itemArr.push(<LocationVisited location={location} key={index}/>);
            });
            return itemArr;
        }
    }

    function renderSuggestedLocations() {
        console.log(suggestedLocations);
        if(suggestedLocations) {
            let itemArr =[];
            suggestedLocations.forEach((location, index) => {
                itemArr.push(<LocationSuggested location={location} key={index} />);
            });
            return itemArr;
        }
    }

    useEffect(() => {

        navigator.geolocation.getCurrentPosition((position) => {
            requestSugLocations(position);
            setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
        // requestSugLocations();
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