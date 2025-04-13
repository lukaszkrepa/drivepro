import homeImage from './home.png';
function Hero() {
    return (
        <section className="pt-32 h-[800px] bg-gradient-to-r from-red-600 to-red-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Zdobądź prawo jazdy z Drive Pro!
                        </h1>
                        <p className="text-xl mb-8">Profesjonalna szkoła nauki jazdy w Twojej okolicy</p>
                        <div className="flex space-x-4">
                            <a
                                href="#kursy"
                                className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors shadow-md"
                            >
                                Zobacz kursy
                            </a>
                            <a
                                href="https://superpawojazdy.pl"
                                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-red-600 transition-colors"
                            >
                                Teoria Online
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <div className="relative h-[500px] w-full">
                            <img
                                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
                                src={homeImage}
                                alt="modern driving school car with instructor and student, professional photography"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;