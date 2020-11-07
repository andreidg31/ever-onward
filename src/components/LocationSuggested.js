
function LocationSuggested({location}) {
    return (
        <div className="suggestedLocation">
            <h1>{location.name}</h1>
            <p>{location.description}</p>
            <p>Scor: {location.score}</p>
            <button >Mark as visited</button>
        </div>
    );
}

export default LocationSuggested;