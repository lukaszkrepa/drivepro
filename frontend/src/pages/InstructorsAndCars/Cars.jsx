import React from 'react';
import CarCard from '../../components/CarCard';

const carsData = [
    {
        id: 'car-1',
        name: 'Toyota Yaris',
        details: [
            { type: 'year', text: 'Rocznik 2025' },
            { type: 'transmission', text: 'Manualna skrzynia biegów' },
            { type: 'steering', text: 'Wspomaganie kierownicy' },
            { type: 'safety', text: 'System ABS i ESP' },
        ],
    },
    {
        id: 'car-2',
        name: 'Volkswagen Golf',
        details: [
            { type: 'year', text: 'Rocznik 2025' },
            { type: 'transmission', text: 'Manualna skrzynia biegów' },
            { type: 'steering', text: 'Wspomaganie kierownicy' },
            { type: 'safety', text: 'System ABS i ESP' },
        ],
    },
    {
        id: 'car-3',
        name: 'Skoda Fabia',
        details: [
            { type: 'year', text: 'Rocznik 2025' },
            { type: 'transmission', text: 'Manualna skrzynia biegów' },
            { type: 'steering', text: 'Wspomaganie kierownicy' },
            { type: 'safety', text: 'System ABS i ESP' },
        ],
    },
];

const Cars = () => {
    return (
        <section id="samochody" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Nasza Flota</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {carsData.map((car) => (
                        <CarCard
                            key={car.id}
                            id={car.id}
                            name={car.name}
                            details={car.details}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cars;