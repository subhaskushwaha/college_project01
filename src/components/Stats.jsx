import React from 'react';

const Stats = () => {
    const stats = [
        { number: '98%', label: 'Customer Satisfaction' },
        { number: '3.5x', label: 'Faster Call Resolution' },
        { number: '2,500+', label: 'Active Call Centers' },
        { number: '24/7', label: 'Support Available' }
    ];

    return (
        <section className="py-16 bg-blue-600 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/20">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-4">
                            <div className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">{stat.number}</div>
                            <div className="text-blue-100 font-medium text-center">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;