import React from 'react';
import GalleryItem from './GalleryItem';

const galleryItems = [
    {
        id: 'gallery-item-1',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/34951702e7-96a205f95c4f45072875.png',
        alt: 'Kursant podczas jazdy',
        title: 'Praktyczna nauka jazdy',
        description: 'Kurs kategorii B',
    },
    {
        id: 'gallery-item-2',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/029caad3cf-8b32dc90541b634b8be9.png',
        alt: 'Budynek szkoły',
        title: 'Nasz ośrodek',
        description: 'Nowoczesna infrastruktura',
    },
    {
        id: 'gallery-item-3',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f0cf1f75d8-45c734657ca8e73a15eb.png',
        alt: 'Grupa kursantów',
        title: 'Wręczenie certyfikatów',
        description: 'Zakończenie kursu 2025',
    },
    {
        id: 'gallery-item-4',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/29af71e4bb-3269a282bbc1f29b3197.png',
        alt: 'Symulator jazdy',
        title: 'Symulator jazdy',
        description: 'Szkolenie praktyczne',
    },
    {
        id: 'gallery-item-5',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/9a39288e36-d45ea0ff9b417ac6d3f9.png',
        alt: 'Zajęcia teoretyczne',
        title: 'Zajęcia teoretyczne',
        description: 'Wykład z przepisów',
    },
    {
        id: 'gallery-item-6',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/088bdcb9bb-f8b17ed7445d72fca3e0.png',
        alt: 'Flota samochodów',
        title: 'Nasza flota',
        description: 'Nowoczesne samochody',
    },
];

const GalleryGrid = () => {
    return (
        <section id="gallery-grid" className="py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleryItems.map((item) => (
                        <GalleryItem
                            key={item.id}
                            id={item.id}
                            src={item.src}
                            alt={item.alt}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GalleryGrid;