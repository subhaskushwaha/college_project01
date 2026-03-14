import React from 'react';
import { useNavigate } from 'react-router-dom';

const AgentHeader = ({ currentPage, setCurrentPage, currentUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-xl font-bold text-blue-600 mb-4 md:mb-0">CallCenter Pro</div>
                <nav className="mb-4 md:mb-0">
                    <ul className="flex space-x-4">
                        <li>
                            <button 
                                className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
                                    currentPage === 'dashboard' 
                                        ? 'bg-blue-100 text-blue-700' 
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                onClick={() => setCurrentPage('dashboard')}
                            >
                                <i className="fas fa-tachometer-alt"></i> <span>Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
                                    currentPage === 'leads' 
                                        ? 'bg-blue-100 text-blue-700' 
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                onClick={() => setCurrentPage('leads')}
                            >
                                <i className="fas fa-users"></i> <span>My Leads</span>
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">{currentUser?.name}</span>
                    <button 
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors" 
                        onClick={handleLogout}
                    >
                        <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AgentHeader;
