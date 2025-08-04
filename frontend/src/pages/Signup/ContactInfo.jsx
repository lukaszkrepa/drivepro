import React from 'react';
import ContactCard from '../../components/ContactCard';

const contactData = [
    {
        id: 'contact-phone',
        icon: 'phone',
        title: 'Zadzwoń do nas',
        info: '+48 724 755 755',
    },
    {
        id: 'contact-email',
        icon: 'envelope',
        title: 'Napisz do nas',
        info: 'biuro@drivepro.pl',
    },
];

const ContactInfo = () => {
    return (
        <section id="contact-info" className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Masz pytania?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {contactData.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                id={contact.id}
                                icon={contact.icon}
                                title={contact.title}
                                info={contact.info}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactInfo;