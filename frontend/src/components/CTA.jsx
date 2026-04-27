import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-24 bg-blue-600 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-blue-500 opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-indigo-500 opacity-50 blur-3xl"></div>
            
            <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Transform Your Call Center?</h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join thousands of call centers that have improved their operations with CallCenter Pro</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/register" className="bg-white text-blue-600 hover:bg-gray-50 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg">
                        Start Your Free Trial
                    </Link>
                    <Link to="/login" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-lg transition-all duration-300 text-lg">
                        Schedule a Demo
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;