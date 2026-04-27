import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 lg:py-32 relative overflow-hidden">
            {/* Decorative blurs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-indigo-400 opacity-20 blur-3xl"></div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 text-center lg:text-left space-y-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        Transform Your Call Center <span className="text-blue-600">Operations</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                        CallCenter Pro is the all-in-one platform to optimize data allotment, track agent performance, and boost your call center efficiency with powerful analytics and automation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center text-lg">
                            Start Free Trial
                        </Link>
                        <a href="#features" className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 font-semibold px-8 py-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center text-lg">
                            Learn More
                        </a>
                    </div>
                </div>

                <div className="lg:w-1/2 w-full mt-10 lg:mt-0">
                    <div className="relative mx-auto w-full max-w-lg shadow-2xl rounded-xl overflow-hidden bg-white border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        {/* Mock window header */}
                        <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        {/* Mock dashboard content */}
                        <div className="p-6 bg-gray-50 space-y-6">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="bg-white rounded p-4 shadow-sm border border-gray-100 h-24">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 mb-2"></div>
                                        <div className="w-16 h-4 bg-gray-200 rounded"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white rounded p-4 shadow-sm border border-gray-100 h-40">
                                <div className="w-32 h-4 bg-gray-200 rounded mb-4"></div>
                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                            <div className="w-24 h-3 bg-gray-300 rounded"></div>
                                            <div className="w-12 h-3 bg-green-200 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;