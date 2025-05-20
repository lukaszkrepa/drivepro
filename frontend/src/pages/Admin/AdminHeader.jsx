const AdminHeader = () => (
    <header className="bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-24">
                <div className="flex items-center">
                    <span className="text-5xl font-bold text-red-600 tracking-tight cursor-pointer">DrivePro.pl</span>
                    <span className="ml-3 px-4 py-1 bg-red-100 text-red-700 rounded-full text-base font-semibold hidden sm:inline-block">
            Admin Panel
          </span>
                </div>
                <div className="flex items-center space-x-5 ml-8">
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                            className="w-10 h-10 rounded-full border-2 border-red-200"
                            alt="Admin Avatar"
                        />
                        <span className="font-semibold text-gray-800 text-lg">Admin</span>
                    </div>
                    <button className="px-4 py-2 text-gray-400 hover:text-red-500 rounded-lg transition">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>
);

export default AdminHeader;
