import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Reviews() {
    const reviews = [
        {
            id: 'review-1',
            name: 'Anna Nowak',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
            rating: 5,
            text: 'Świetna szkoła! Profesjonalni instruktorzy i przyjazna atmosfera. Zdałam za pierwszym razem!',
        },
        {
            id: 'review-2',
            name: 'Marek Kowalczyk',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
            rating: 5,
            text: 'Bardzo dobra organizacja zajęć, nowoczesne samochody. Polecam!',
        },
        {
            id: 'review-3',
            name: 'Karolina Wiśniewska',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
            rating: 5,
            text: 'Cierpliwi instruktorzy, elastyczne godziny jazd. Super szkoła!',
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Opinie naszych kursantów</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-xl shadow-lg">
                            <div className="flex items-center mb-4">
                                <img
                                    src={review.avatar}
                                    className="w-12 h-12 rounded-full mr-4"
                                    alt="Kursant"
                                />
                                <div>
                                    <h4 className="font-bold">{review.name}</h4>
                                    <div className="text-yellow-400">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <FontAwesomeIcon key={i} icon={faStar} />
                                        ))}
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