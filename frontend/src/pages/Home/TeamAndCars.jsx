import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

function TeamAndCars() {
    const instructors = [
        {
            name: 'Jan Kowalski',
            experience: '15 lat doświadczenia',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
        },
        {
            name: 'Piotr Nowak',
            experience: '12 lat doświadczenia',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
        },
    ];

    const cars = [
        { name: 'Toyota Yaris', year: 'Rocznik 2024' },
        { name: 'Volkswagen Golf', year: 'Rocznik 2024' },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Nasza Kadra i Samochody</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold mb-6">Instruktorzy</h3>
                        {instructors.map((instructor, index) => (
                            <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg">
                                <img
                                    src={instructor.avatar}
                                    className="w-16 h-16 rounded-full"
                                    alt="Instruktor"
                                />
                                <div>
                                    <h4 className="font-bold">{instructor.name}</h4>
                                    <p className="text-gray-600">{instructor.experience}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold mb-6">Nasze Samochody</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {cars.map((car, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-lg flex items-center space-x-4"
                                >
                                    <FontAwesomeIcon icon={faCar} className="text-4xl text-red-600" />
                                    <div>
                                        <h4 className="font-bold">{car.name}</h4>
                                        <p className="text-gray-600">{car.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TeamAndCars;