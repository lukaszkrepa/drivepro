import React, {useEffect, useState} from "react";
import {fetchFaq} from "../../services/Faq/fetchFaq.js";
import FAQQuestion from "../../components/FAQQuestion.jsx";

function FAQ() {
    const [faqs, setFaqs] = useState([])
    useEffect(() => {
        fetchFaq()
            .then((res) => {
                setFaqs(res.sort((a,b) => a.Id - b.Id));
            })
            .catch(console.error)
    },[])

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Często Zadawane Pytania</h2>
                <div className="max-w-3xl mx-auto space-y-6">
                    {faqs.map((faq) => (
                        <FAQQuestion
                            key={faq.Id}
                            id={faq.Id}
                            question={faq.question}
                            answer={faq.answer}
                            list={faq.list}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;