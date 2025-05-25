const Sidebar = ({ activeTab, onChangeTab }) => {
    const tabs = [
        { id: 'kursy', label: 'Kursy', icon: 'car-side' },
        { id: 'kadra', label: 'Kadra', icon: 'users-rectangle' },
        { id: 'galeria', label: 'Galeria', icon: 'image' },
        { id: 'faq', label: 'FAQ', icon: 'circle-question' },
        { id: 'testimonials', label: 'Opinie', icon: 'circle-question'},
        { id: 'cars', label: 'Auta', icon: 'car-side'}
    ];

    return (
        <aside className="w-60 pr-8 pt-8">
            <nav className="flex flex-col space-y-2 sticky top-32">
                {tabs.map(({ id, label, icon }) => (
                    <button
                        key={id}
                        onClick={() => onChangeTab(id)}
                        className={`flex items-center space-x-3 px-5 py-3 rounded-lg text-lg font-semibold text-gray-700 hover:bg-blue-100 transition ${
                            activeTab === id ? 'bg-blue-100' : ''
                        }`}
                    >
                        <i className={`fa-solid fa-${icon} text-blue-600`}></i>
                        <span>{label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};
export default Sidebar;
