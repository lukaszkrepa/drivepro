import React, {useEffect, useState} from 'react';
import FAQQuestion from '../../components/FAQQuestion';
import {fetchFaq} from "../../services/fetchFaq.js";


const FAQQuestions = () => {
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        fetchFaq()
            .then((data) => {
                const sortedQuestions = data.sort((a,b) => a.Id - b.Id);
                setQuestions(sortedQuestions)
            })
            .catch(console.error)
    },[])
    return (
        <div id="faq-questions" className="space-y-6">
            {questions.map((faq) => (
                <FAQQuestion
                    key={faq.Id}
                    id={faq.Id}
                    question={faq.question}
                    answer={faq.answer}
                    list={faq.list}
                />
            ))}
        </div>
    );
};

export default FAQQuestions;