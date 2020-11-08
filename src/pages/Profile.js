import {Col, Row, Container, Image} from 'react-bootstrap';
import axios from 'axios';
import LocationVisited from '../components/LocationVisited';
import LocationSuggested from '../components/LocationSuggested';
import './Profile.css'
import {useState, useEffect} from 'react';

function Profile({user}) {
    const [visLocations, setVisLocations] = useState([]);
    const [suggestedLocations, setSuggestedLocations] = useState([]);
    const [position, setPosition] = useState({});
    let title,
        level;

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

    return (
        <div className="Profile">

            <Image src="" alt="Placeholder"/>
            <h2>
                {user.surname + ' ' + user.lastname}
                {set_info()}
                {/* {parse_achievements()} */}
            </h2>
            <h3>
                {'Title ' + title}
            </h3>
            <p>
                Explorer Level {level}
            </p>
            <div className="abouts"></div>
            <Container>
            <div className="tables">
                <Row className="rw">
                    <Col>
                        <div className="c">
                            <h3>Badges</h3> 
                        {return_achievements()}
                        </div>
                    </Col>
                </Row>

                <Row className="rw">
                    <Col>
                        <div className="c">
                        <h1>Visited</h1>
                        {renderVisitedLocations()}
                        </div>
                        <div className="c">
                        <h1>Suggestions</h1>
                        {renderSuggestedLocations()}
                    </div>
                    </Col>
                </Row>
                
                {/* <div class="c">hey</div>
                <div class="c">hey</div> */
                }
            </div>
            </Container>
        </div>
    );

    function return_achievements() {
        let list_of_ach = ['Prima calatorie', '5 calatorii', '15 calatorii']
        let arr=[];
        if (user.nocc > 0){
            arr.push(list_of_ach[0]);
        }
        if (user.nocc > 4){
            arr.push(list_of_ach[1]);
        }
        if (user.nocc > 14){
            arr.push(list_of_ach[2]);
        }
        return arr;
    }

    function calc_level(score) {
        // returneaza un obiect cu nr nivelului (1,2,100) si cu titlul nivelului
        let list_of_levels = ['Level1', 'Level2', 'Level3', 'Level4', 'Mr. Worldwide'];
        let level = Math.floor(score / 100 + 1);
        let index = level <= 5
            ? level
            : 5;
        return {level: level, title: list_of_levels[index]};

    }

    function set_info(data) {
        console.log(user);
        level = calc_level(user.total_score);
        title = level.title;
        level = level.level;
    }
}

export default Profile;