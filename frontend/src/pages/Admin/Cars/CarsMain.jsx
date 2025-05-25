import React, { useEffect, useState } from "react";
import CarsCard from "./CarsCard.jsx";
import CarEditModal from "./CarEditModal.jsx";
import { fetchCars } from "../../../services/fetchCars.js";
import { addCar } from "../../../services/addCar.js";
import { updateCar } from "../../../services/updateCar.js";
import { deleteCar } from "../../../services/deleteCar.js";

const CarsMain = () => {
    const [cars, setCars] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        fetchCars()
            .then(setCars)
            .catch(console.error);
    }, []);

    const handleAdd = () => {
        setSelectedItem({
            Id: Date.now(),
            name: "",
            details: [],
        });
        setIsNew(true);
    };

    const handleEdit = (car) => {
        setSelectedItem(car);
        setIsNew(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Czy na pewno chcesz usunąć ten samochód?")) return;
        await deleteCar(id);
        setCars((prev) => prev.filter((c) => c.Id !== id));
    };

    const handleSave = async (item) => {
        if (isNew) {
            await addCar(item);
            setCars((prev) => [...prev, item]);
        } else {
            await updateCar(item);
            setCars((prev) =>
                prev.map((c) => (c.Id === item.Id ? item : c))
            );
        }
        setSelectedItem(null);
        setIsNew(false);
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-blue-700">Edytuj Samochody</h2>
                    <button
                        onClick={handleAdd}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>Dodaj samochód
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car) => (
                        <CarsCard
                            key={car.Id}
                            {...car}
                            onEdit={() => handleEdit(car)}
                            onDelete={() => handleDelete(car.Id)}
                        />
                    ))}
                </div>
            </div>

            {selectedItem && (
                <CarEditModal
                    item={selectedItem}
                    onSave={handleSave}
                    onClose={() => {
                        setSelectedItem(null);
                        setIsNew(false);
                    }}
                />
            )}
        </section>
    );
};

export default CarsMain;
