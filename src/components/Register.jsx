import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRoleSelect = (role) => {
        setFormData(prevState => ({
            ...prevState,
            role: role
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.role) {
            toast.warn('⚠️ Please fill all fields and select a role');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success(`🎉 ${data.message} (User ID: ${data.user_id})`);
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(`❌ Registration failed: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('🚨 An error occurred while registering. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 max-w-7xl h-20 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        CallCenter Pro
                    </Link>
                    <nav className="hidden md:flex items-center space-x-1">
                        <Link to="/" className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md font-medium transition-colors">Home</Link>
                        <Link to="/login" className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md font-medium transition-colors">Login</Link>
                        <Link to="/register" className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md font-medium transition-colors">Register</Link>
                    </nav>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create Your Account</h2>
                        <p className="text-gray-500">Join CallCenter Pro and transform your operations</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    id="register-name" 
                                    name="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    id="register-email" 
                                    name="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="register-password" 
                                    name="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <button 
                                    type="button" 
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600 focus:outline-none" 
                                    onClick={togglePasswordVisibility}
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Select Your Role</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div 
                                    className={`relative rounded-lg border-2 p-4 cursor-pointer flex flex-col items-center text-center transition-all ${formData.role === 'admin' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                                    onClick={() => handleRoleSelect('admin')}
                                >
                                    {formData.role === 'admin' && (
                                        <div className="absolute top-2 right-2 text-blue-600">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                    )}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3 ${formData.role === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                        <i className="fas fa-user-shield"></i>
                                    </div>
                                    <h3 className={`font-semibold text-lg mb-1 ${formData.role === 'admin' ? 'text-blue-900' : 'text-gray-900'}`}>Admin</h3>
                                    <p className={`text-sm ${formData.role === 'admin' ? 'text-blue-700' : 'text-gray-500'}`}>Full system access and configuration</p>
                                </div>
                                
                                <div 
                                    className={`relative rounded-lg border-2 p-4 cursor-pointer flex flex-col items-center text-center transition-all ${formData.role === 'agent' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                                    onClick={() => handleRoleSelect('agent')}
                                >
                                    {formData.role === 'agent' && (
                                        <div className="absolute top-2 right-2 text-blue-600">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                    )}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3 ${formData.role === 'agent' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                        <i className="fas fa-headset"></i>
                                    </div>
                                    <h3 className={`font-semibold text-lg mb-1 ${formData.role === 'agent' ? 'text-blue-900' : 'text-gray-900'}`}>Agent</h3>
                                    <p className={`text-sm ${formData.role === 'agent' ? 'text-blue-700' : 'text-gray-500'}`}>Call center operations and leads</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registering...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <i className="fas fa-user-plus mt-0.5 mr-2"></i> Create Account
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in here
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-900 border-t border-gray-800 py-8">
                <div className="container mx-auto px-4 max-w-7xl text-center md:text-left flex justify-between items-center text-gray-400 text-sm">
                   <p>&copy; 2025 CallCenter Pro. All rights reserved.</p>
                   <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/login" className="hover:text-white transition-colors">Login</Link>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                   </div>
                </div>
            </footer>
        </div>
    );
};

export default Register;
