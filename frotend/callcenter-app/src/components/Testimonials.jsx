import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            text: "CallCenter Pro has transformed how we manage our call center operations. Our efficiency has increased by 40% since implementation.",
            author: "John Smith",
            position: "Operations Director, TechCorp",
            initials: "JS",
            color: "bg-blue-100 text-blue-700"
        },
        {
            text: "The data allotment features have saved our team hundreds of hours. We can now focus on customer service instead of manual distribution.",
            author: "Sarah Johnson",
            position: "Call Center Manager, SupportPlus",
            initials: "SJ",
            color: "bg-purple-100 text-purple-700"
        },
        {
            text: "Implementation was seamless and the support team was fantastic. Our agents adopted it immediately with minimal training.",
            author: "Michael Davis",
            position: "CEO, CustomerFirst Solutions",
            initials: "MD",
            color: "bg-green-100 text-green-700"
        }
    ];

    return (
        <section className="py-20 bg-gray-50" id="testimonials">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
                    <p className="text-lg text-gray-600">Don't just take our word for it - hear from some of our satisfied customers</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
                            {/* Quote icon */}
                            <div className="absolute top-6 right-8 text-6xl text-gray-100 font-serif leading-none">"</div>
                            
                            <div className="relative z-10">
                                <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">"{testimonial.text}"</p>
                                
                                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${testimonial.color}`}>
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.position}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;