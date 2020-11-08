import {Image} from 'react-bootstrap';
import axios from 'axios';
import LocationVisited from '../components/LocationVisited';
import LocationSuggested from '../components/LocationSuggested';
import './Profile.css'
import {useState, useEffect} from 'react';

function Profile({user}) {
    const [visLocations, setVisLocations] = useState([]);
    const [suggestedLocations, setSuggestedLocations] = useState([]);
    const [position, setPosition] = useState({});
    let level, achievement_list, title;

    async function requestVisLocations() {
        const response = await axios.post(
            'http://localhost:4000/profile_page',
            {userid: user.userid}
        );

        if (response.status === 200) {
            setVisLocations(response.data);
        } else {
            console.log(response);
        }
    }

    async function requestAchievements() {
        const response = await axios.post(
            'http://localhost:4000/achievements',
            {userid: user.userid}
        );

        if (response.status === 200) {
            set_info(parse_achievements(response.data));
        } else {
            console.log(response);
        }
    }

    function parse_achievements(data){
        let userach = user.achievements;
        let ach = return_achievements(userach);
        if (data.length >= 1){
            userach = add_achievement(userach,0);
            if (data.length >= 5){
                userach = add_achievement(userach,6);
            }
            for (let x in data){
                if (x.achievements){
                    userach = add_achievement(userach,x.achievements);
                }
            }
        }
        return return_achievements(userach);
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
            } else {
                console.log(response);
            }
        }
    }

    function renderVisitedLocations() {
        console.log(visLocations);
        if (visLocations) {
            let itemArr = [];
            visLocations.forEach((location, index) => {
                itemArr.push(<LocationVisited location={location} key={index}/>);
            });
            return itemArr;
        }
    }

    function renderSuggestedLocations() {
        console.log(suggestedLocations);
        if (suggestedLocations) {
            let itemArr = [];
            suggestedLocations.forEach((location, index) => {
                itemArr.push(<LocationSuggested location={location} key={index}/>);
            });
            return itemArr;
        }
    }

    useEffect(() => {

        navigator
            .geolocation
            .getCurrentPosition((position) => {
                requestSugLocations(position);
                setPosition(
                    {latitude: position.coords.latitude, longitude: position.coords.longitude}
                );
            });
        // requestSugLocations();
    }, []);

    useEffect(() => {
        requestVisLocations();

    }, []);

    useEffect(() => {
        requestAchievements();

    }, []);

    return (
        <div className="Profile">

            <Image src="" alt="Placeholder"/>
            <h2>
                {user.surname + ' ' + user.lastname}
            </h2>
            <p>
                Explorer Level 1
            </p>
            {/* <h1> Visited Locations </h1>

            <h1> Suggested Locations </h1> */
            }
            {/* {user.email} */}
            <div class="abouts">
                {return_achievements(user.achievements)}
            </div>
            <div class="tables">
                <div class="c">
                        Visited {renderVisitedLocations()}
                </div>
                <div class="c">Badges</div>
                <div class="c">
                        Suggestions {renderSuggestedLocations()}
                </div>
                {/* <div class="c">hey</div>
                <div class="c">hey</div> */}
            </div>
        </div>
    );

    function return_achievements(ach) {
        //primeste un numar returneaza un vector de stringuri
        let list_of_ach = [
            'Prima calatorie',
            'Radioactive',
            'The Beginning',
            'Vizita muzeu de arta',
            'Vizita castel',
            'Vizita Franta',
            '5 calatorii'
        ]
        let arr = [];
        for (let i = 0; ach > 0; ach >> 1, i++) {
            if (ach % 2) {
                arr.push(list_of_ach[i]);
            }
        }
        return arr;
    }
    
    function add_achievement(number, ach) {
        //primeste un numar si indicele achievementu-ului returneaza numarul
        number |= 1 << ach;
        return number;
    }
    
    function calc_level(score) {
        // returneaza un obiect cu nr nivelului (1,2,100) si cu titlul nivelului
        let list_of_levels = ['Level1', 'Level2', 'Level3', 'Level4', 'Mr. Worldwide'];
        let level = score / 100 + 1;
        let index = level <= 5
            ? level
            : 5;
        return {level: level, title: list_of_levels[index]};
    
    }
    
    function set_info(data){
        level = calc_level(user.total_score);
        achievement_list = data;
        title = level.title;
        level = level.level;
    
    }
    
    function show_info(){
            let itemArr = [title,level];
            achievement_list.forEach((location, index) => {
                itemArr.push(<LocationVisited location={location} key={index}/>);
            });
            return itemArr;
    }
}



export default Profile;