import React from 'react';

const Features = () => {
    const features = [
        {
            icon: 'fas fa-chart-line',
            title: 'Advanced Analytics',
            description: 'Gain insights into your call center performance with detailed reports and visual dashboards.',
            color: 'bg-blue-100 text-blue-600'
        },
        {
            icon: 'fas fa-robot',
            title: 'AI-Powered Data Allotment',
            description: 'Automatically distribute calls and leads based on agent performance and availability.',
            color: 'bg-green-100 text-green-600'
        },
        {
            icon: 'fas fa-users',
            title: 'Agent Performance Tracking',
            description: 'Monitor individual agent metrics and identify areas for improvement with real-time data.',
            color: 'bg-purple-100 text-purple-600'
        },
        {
            icon: 'fas fa-mobile-alt',
            title: 'Mobile Ready',
            description: 'Access your call center analytics on any device with our fully responsive applications.',
            color: 'bg-yellow-100 text-yellow-600'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'Enterprise Security',
            description: 'Your data is protected with bank-level security, encryption, and regular backups.',
            color: 'bg-red-100 text-red-600'
        },
        {
            icon: 'fas fa-plug',
            title: 'Third-Party Integrations',
            description: 'Connect with your existing CRM, telephony systems, and other business tools.',
            color: 'bg-indigo-100 text-indigo-600'
        }
    ];

    return (
        <section className="py-20 bg-white" id="features">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Powerful Features</h2>
                    <p className="text-lg text-gray-600">Everything you need to optimize your call center operations and data allotment</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group">
                            <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                <i className={feature.icon}></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;