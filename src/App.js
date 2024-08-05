import './assets/tailwind.css'
import CardImage from './components/CardImage'
import SearchImage from './components/SearchImage'
import {useEffect, useState} from "react";

function App() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [term, setTerm] = useState('');

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`)
            .then(res => res.json())
            .then(data => {
                setImages(data.hits);
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }, [term]);

    return (
        <div className="container mx-auto">
            <SearchImage searchText={(text) => setTerm(text)}/>

            {!isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto my-auto">Not Found</h1>}

            {isLoading ? <h1 className="text-6xl text-center mx-auto my-auto">Loading...</h1> :
                <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) =>
                        (<CardImage key={image.id} image={image}/>
                        ))}
                </div>}

        </div>
    );
}

export default App;
