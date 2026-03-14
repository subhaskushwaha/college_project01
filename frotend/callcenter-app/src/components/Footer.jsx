import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-2xl font-bold text-white">CallCenter Pro</h3>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            The modern call center platform designed to help businesses optimize operations and data allotment.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-300">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-300">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-300">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-300">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Product</h3>
                        <ul className="space-y-4">
                            <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Updates</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Download</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Webinars</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; 2025 CallCenter Pro. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;