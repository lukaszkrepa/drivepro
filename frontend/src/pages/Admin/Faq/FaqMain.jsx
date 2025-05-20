import React, { useEffect, useState } from "react";
import FaqCard from "./FaqCard.jsx";
import { fetchFaq } from "../../../services/fetchFaq.js";

const FaqMain = () => {
    const [faq, setFaq] = useState([]);

    useEffect(() => {
        fetchFaq()
            .then(setFaq)
            .catch(console.error);
    }, []);

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-blue-700">Edytuj FAQ</h2>
                    <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg">
                        <i className="fa-solid fa-plus mr-2"></i>Dodaj pytanie
                    </button>
                </div>

                <div className="space-y-5">
                    {faq.map((item) => (
                        <FaqCard
                            key={item.Id}
                            id={item.Id}
                            question={item.question}
                            answer={item.answer}
                            list={item.list}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqMain;
