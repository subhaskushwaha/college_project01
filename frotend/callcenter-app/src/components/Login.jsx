import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setFormData(prev => ({
                ...prev,
                email: rememberedEmail,
                rememberMe: true
            }));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const newErrors = { email: '', password: '' };

        if (!formData.email) newErrors.email = 'Please enter your email address';
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = 'Please enter a valid email address';

        if (!formData.password) newErrors.password = 'Please enter your password';

        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Login failed!');
                setIsLoading(false);
                return;
            }

            toast.success(data.message || 'Login successful!');

            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));

            if (formData.rememberMe) {
                localStorage.setItem('rememberedEmail', formData.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            setTimeout(() => {
                if (data.user.role === 'admin') navigate('/admin-dashboard');
                else navigate('/agent-dashboard');
            }, 1000);

        } catch (error) {
            console.error('Login error:', error);
            toast.error('Server error. Please try again later.');
            setIsLoading(false);
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
                        <Link to="/login" className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md font-medium transition-colors">Login</Link>
                        <Link to="/register" className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md font-medium transition-colors">Register</Link>
                    </nav>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Sign in to your CallCenter Pro account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                id="login-email"
                                name="email"
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="login-password"
                                    name="password"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    placeholder="Enter your password"
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
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="rememberMe"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <i className="fas fa-sign-in-alt mt-0.5 mr-2"></i> Sign In
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Create one here
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-900 border-t border-gray-800 py-8">
                <div className="container mx-auto px-4 max-w-7xl text-center md:text-left flex justify-between items-center text-gray-400 text-sm">
                   <p>&copy; 2025 CallCenter Pro. All rights reserved.</p>
                   <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/register" className="hover:text-white transition-colors">Register</Link>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                   </div>
                </div>
            </footer>
        </div>
    );
};

export default Login;
