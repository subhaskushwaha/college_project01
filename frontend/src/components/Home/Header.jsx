import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    // Check if link is active
    const isActive = (path) => {
        return location.pathname === path ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600";
    };

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 max-w-7xl h-20 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    CallCenter Pro
                </Link>
                
                <nav className="hidden md:flex items-center space-x-1">
                    <Link to="/" className={`px-4 py-2 rounded-md font-medium transition-colors ${isActive('/')}`}>
                        Home
                    </Link>
                    <Link to="/admin-dashboard" className={`px-4 py-2 rounded-md font-medium transition-colors ${isActive('/admin-dashboard')}`}>
                        Admin
                    </Link>
                    <Link to="/agent-dashboard" className={`px-4 py-2 rounded-md font-medium transition-colors ${isActive('/agent-dashboard')}`}>
                        Agent
                    </Link>
                    <Link to="/reports" className={`px-4 py-2 rounded-md font-medium transition-colors ${isActive('/reports')}`}>
                        Reports
                    </Link>
                </nav>
                
                <div className="flex items-center space-x-3">
                    <Link to="/login" className="hidden sm:block px-5 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors">
                        Login
                    </Link>
                    <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md shadow-sm transition-colors">
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;