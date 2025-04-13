import React, { useState } from 'react';
import FAQCategoryButton from '../../components/FAQCategoryButton';

const categoriesData = [
    { id: 'category-course', icon: 'car-side', label: 'Kurs' },
    { id: 'category-payments', icon: 'money-bill', label: 'Płatności' },
    { id: 'category-exams', icon: 'clipboard-list', label: 'Egzaminy' },
    { id: 'category-theory', icon: 'book', label: 'Teoria' },
];

const FAQCategories = () => {
    const [activeCategory, setActiveCategory] = useState('category-course');

    return (
        <div id="faq-categories" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categoriesData.map((category) => (
                <FAQCategoryButton
                    key={category.id}
                    id={category.id}
                    icon={category.icon}
                    label={category.label}
                    isActive={activeCategory === category.id}
                    onClick={() => setActiveCategory(category.id)}
                />
            ))}
        </div>
    );
};

export default FAQCategories;