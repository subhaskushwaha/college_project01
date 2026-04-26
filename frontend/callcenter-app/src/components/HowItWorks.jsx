import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            number: '1',
            title: 'Sign Up & Configure',
            description: 'Create your account and configure your call center settings in minutes.'
        },
        {
            number: '2',
            title: 'Integrate Your Systems',
            description: 'Connect your existing telephony systems and data sources seamlessly.'
        },
        {
            number: '3',
            title: 'Analyze & Optimize',
            description: 'Use our analytics to identify bottlenecks and optimize your operations.'
        },
        {
            number: '4',
            title: 'Scale Your Success',
            description: 'Grow your call center with data-driven decisions and automated workflows.'
        }
    ];

    return (
        <section className="py-20 bg-white" id="how-it-works">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
                    <p className="text-lg text-gray-600">Get started with CallCenter Pro in just a few simple steps</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0"></div>
                    
                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-200 transition-all duration-300">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;