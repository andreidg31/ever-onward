
function LocationVisited({location}) {
    return (
        <div className="visLocation">
            <h1>{location.name}</h1>
            <p>{location.description}</p>
            <p>Scor: {location.score}</p>
        </div>
    );
}

export default LocationVisited;