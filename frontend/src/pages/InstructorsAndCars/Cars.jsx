import React, {useEffect, useState} from 'react';
import CarCard from '../../components/CarCard';
import {fetchCars} from "../../services/fetchCars.js";
const Cars = () => {
    const [cars,setCars] = useState([])

    useEffect(() => {
        fetchCars()
            .then(setCars)
            .catch(console.error);
    }, []);
    return (
        <section id="samochody" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Nasza Flota</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <CarCard
                            key={car.Id}
                            id={car.Id}
                            name={car.name}
                            imageSrc={car.imageSrc}
                            details={car.details}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cars;