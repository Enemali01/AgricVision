import React from 'react';

const Testimonial = () => {
  const testimonials = [
    {
      name: 'Jane Doe',
      text: 'AgriVision transformed our farming process. Highly recommended!',
    },
    {
      name: 'John Smith',
      text: 'A reliable and innovative partner for all agricultural needs.',
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-green-100 text-center">
      <h2 className="text-3xl font-bold mb-10 text-green-800">What People Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded shadow">
            <p className="text-gray-700 italic mb-4">“{testimonial.text}”</p>
            <p className="text-green-700 font-bold">— {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;


