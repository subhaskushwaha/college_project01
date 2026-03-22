import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ currentPage, setCurrentPage, currentUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-xl font-bold text-blue-600 mb-4 md:mb-0">CallCenter Pro Admin</div>
                <nav className="mb-4 md:mb-0">
                    <ul className="flex flex-wrap space-x-4">
                        <li>
                            <button
                                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                                    currentPage === 'dashboard' 
                                        ? 'bg-blue-100 text-blue-700' 
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                                onClick={() => setCurrentPage('dashboard')}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                                    currentPage === 'agents' 
                                        ? 'bg-blue-100 text-blue-700' 
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                                onClick={() => setCurrentPage('agents')}
                            >
                                Agents
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                                    currentPage === 'leads-upload' 
                                        ? 'bg-blue-100 text-blue-700' 
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                                onClick={() => setCurrentPage('leads-upload')}
                            >
                                Upload Leads
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                                    currentPage === 'manage-leads' 
                                        ? 'bg-blue-100 text-blue-700' 
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                                onClick={() => setCurrentPage('manage-leads')}
                            >
                                Manage Leads
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                                    currentPage === 'reports' 
                                        ? 'bg-blue-100 text-blue-700' 
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                                onClick={() => setCurrentPage('reports')}
                            >
                                Reports
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">{currentUser?.name}</span>
                    <button 
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
