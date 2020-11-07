import { useState, useEffect } from "react";
import axios from 'axios';

function Trips({user}) {
    const API_URL = 'http://localhost:4000';
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        try {
            const response = axios.get(API_URL)
        } catch(err) {
            console.error(err);
        }
    });

    return (
        <div>

        </div>
    );
}

export default Trips;