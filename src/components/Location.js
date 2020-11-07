import {Image} from 'react-bootstrap';

function Location({name, imageURL}) {
    return (
        <div className="location">
            <Image src={imageURL} alt="Placeholder">{name}</Image>
            
        </div>
    )
}

export default Location