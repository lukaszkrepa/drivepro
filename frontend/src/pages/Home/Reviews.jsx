import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from "react";
import {fetchSteps} from "../../services/fetchSteps.js";
import {fetchTestimonials} from "../../services/Testimonials/fetchTestimonials.js";

function Reviews() {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetchTestimonials()
            .then((res) =>{
                setReviews(res.filter(x => x.type === "featured").slice(0,6))
            })
            .catch(console.error);
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Opinie naszych kursantów</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.Id} className="bg-white p-6 rounded-xl shadow-lg">
                            <div className="flex items-center mb-4">
                                <div>
                                    <h4 className="font-bold">{review.name}</h4>
                                    <div className="text-yellow-400 flex">
                                        {(() => {
                                            const fullStars = Math.floor(review.rating);
                                            const hasHalfStar = review.rating % 1 >= 0.5;
                                            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                                            return (
                                                <>
                                                    {[...Array(fullStars)].map((_, i) => (
                                                        <FontAwesomeIcon key={`full-${i}`} icon={faStar}/>
                                                    ))}
                                                    {hasHalfStar && <FontAwesomeIcon key="half" icon={faStarHalfAlt}/>}
                                                    {[...Array(emptyStars)].map((_, i) => (
                                                        <FontAwesomeIcon key={`empty-${i}`} icon={farStar}/>
                                                    ))}
                                                </>
                                            );
                                        })()}
                                    </div>

                                </div>
                            </div>
                            <p className="text-gray-600">{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Reviews;