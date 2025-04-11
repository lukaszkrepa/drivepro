function FAQ() {
    const faqs = [
        { id: 'faq-1', question: 'Ile trwa kurs prawa jazdy?' },
        { id: 'faq-2', question: 'Jakie dokumenty są potrzebne do rozpoczęcia kursu?' },
        { id: 'faq-3', question: 'Czy mogę zmienić instruktora w trakcie kursu?' },
        { id: 'faq-4', question: 'Jak wygląda płatność za kurs?' },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Często Zadawane Pytania</h2>
                <div className="max-w-3xl mx-auto space-y-6">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-bold">{faq.question}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;