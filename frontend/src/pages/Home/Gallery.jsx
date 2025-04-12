function Gallery() {
    const images = [
        {
            id: 'gallery-1',
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/8c01977239-a34893d97b978c878df1.png',
            alt: 'driving school student behind wheel learning to drive, candid shot',
        },
        {
            id: 'gallery-2',
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/efe91322a2-9f1b65171ff34a10da94.png',
            alt: 'driving instructor explaining dashboard controls to student',
        },
        {
            id: 'gallery-3',
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/029caad3cf-a120f9500f1acffc3079.png',
            alt: 'modern driving school facility building exterior',
        },
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Galeria</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {images.map((image) => (
                        <div key={image.id} className="aspect-square">
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