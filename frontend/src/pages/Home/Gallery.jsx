import {fetchGallery} from "../../services/Gallery/fetchGallery.js";
import {useEffect, useState} from "react";

function Gallery() {
    const [images, setImages] = useState([])

    useEffect(() => {
        fetchGallery()
            .then(setImages)
            .catch(console.error);
    }, []);
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Galeria</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {images.slice(0, 6).map((image) => (
                        <div key={image.Id} className="aspect-square">
                            <img
                                className="w-full h-full object-cover rounded-lg"
                                src={image.src}
                                alt={image.alt}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Gallery;