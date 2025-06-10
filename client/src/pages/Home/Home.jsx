import React from "react";
import Header from "../../components/Header/Header";
import { FaLeaf, FaPhoneAlt, FaVideo } from "react-icons/fa";
import Testimonial from "../../components/Testimonial/Testimonial";
import { Footer } from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import LatestBlog from "../Blog/LatestBlog";
import GalleryPreview from "../../components/Gallary";
import Farm1  from '../../assets/cop-img6.jpeg'

const Home = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-screen  bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage:
            `url(${Farm1})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4 bg-gradient-to-b from-green-900/50 via-emerald-700/90 to-white/90">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
            Welcome to AgriVision
          </h1>
          <p className="text-xl mb-6 animate-fade-in-up">
            Empowering Agriculture Through Innovation
          </p>
          <a
            href="/contact"
            className="bg-green-600 hover:bg-green-700 text-white px-9 py-2 rounded-full transition animate-bounce"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-20 text-center bg-green-50">
        <h2 className="text-3xl font-bold mb-10 text-green-800">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: (
                <FaLeaf className="text-green-600 text-4xl mb-4 mx-auto" />
              ),
              title: "Sustainable Farming",
              text: "Modern techniques to boost crop yield and protect the environment.",
            },
            {
              icon: (
                <FaVideo className="text-green-600 text-4xl mb-4 mx-auto" />
              ),
              title: "Training Videos",
              text: "Watch farming tips and success stories from real farmers.",
            },
            {
              icon: (
                <FaPhoneAlt className="text-green-600 text-4xl mb-4 mx-auto" />
              ),
              title: "24/7 Support",
              text: "Reach out to our expert team for help anytime.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8 text-green-800">
          Our Commitment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At AgriVision, we believe in a future where technology meets
              tradition to create more sustainable and profitable farming.
              We're not just providing tools — we're building a movement.
            </p>
            <ul className="list-disc list-inside text-left text-gray-600">
              <li>Practical, hands-on farmer training</li>
              <li>Agri-tech innovation at the grassroots</li>
              <li>Responsive support teams</li>
              <li>Knowledge sharing community</li>
            </ul>
          </div>
          <img
            src={Farm1}
            alt="Farmers"
            className="rounded-lg shadow-lg w-full object-contain"
          />
        </div>
      </section>

      <GalleryPreview />
      <LatestBlog />
      <Testimonial />

      {/* Call to Action */}
      <section className="bg-green-700 py-16 px-6 md:px-20 text-white text-center">
        <h2 className="text-3xl font-bold mb-6 animate-fade-in-down">
          Ready to transform your farm?
        </h2>
        <p className="text-lg mb-6 animate-fade-in-up">
          Let’s work together to bring innovation, sustainability, and growth to
          your agricultural journey.
        </p>
        <Link
          to="/about"
          className="inline-block bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Learn More About Us
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Home;



// HeroSection.jsx
// import React from 'react';

// const HeroSection = () => {
//   return (
//     <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563245372-f1f8a7d6fba0?auto=format&fit=crop&w=1650&q=80')" }}>
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
//         <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">Welcome to AgriVision</h1>
//         <p className="text-xl mb-6 animate-fade-in-up">Empowering Agriculture Through Innovation</p>
//         <a href="#contact" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition animate-bounce">Contact Us</a>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// AboutSection.jsx
// import React from 'react';

// const AboutSection = () => {
//   return (
//     <section className="py-16 px-6 md:px-20 bg-white text-center">
//       <h2 className="text-3xl font-bold mb-6 text-green-800">About AgriVision</h2>
//       <p className="text-lg text-gray-700 max-w-3xl mx-auto">
//         AgriVision is a forward-thinking agricultural platform dedicated to empowering farmers and agribusinesses with tools, training, and technologies that maximize productivity and sustainability. We believe in a future where agriculture is smart, efficient, and rewarding.
//       </p>
//     </section>
//   );
// };

// export default AboutSection;

// GallerySection.jsx
// import React from 'react';

// const GallerySection = () => {
//   return (
//     <section id="gallery" className="py-16 px-6 md:px-20 bg-green-50 text-center">
//       <h2 className="text-3xl font-bold mb-10 text-green-800">Our Gallery</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {[1, 2, 3, 4].map((i) => (
//           <img
//             key={i}
//             src={`https://source.unsplash.com/300x300/?farm,agriculture,${i}`}
//             alt={`Gallery ${i}`}
//             className="rounded-lg hover:scale-105 transition duration-300"
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default GallerySection;

// ContactSection.jsx
// import React from 'react';

// const ContactSection = () => {
//   return (
//     <section id="contact" className="py-16 px-6 md:px-20 text-center bg-white">
//       <h2 className="text-3xl font-bold mb-10 text-green-800">Get in Touch</h2>
//       <form className="max-w-xl mx-auto space-y-4">
//         <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border rounded-md" />
//         <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border rounded-md" />
//         <textarea placeholder="Your Message" className="w-full px-4 py-3 border rounded-md" rows="4"></textarea>
//         <button className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition">Send Message</button>
//       </form>
//     </section>
//   );
// };

// export default ContactSection;



// import React from 'react';
// import Header from '../../components/Header';
// import HeroSection from '../../components/HeroSection';
// import AboutSection from '../../components/AboutSection';
// import ServicesSection from '../../components/ServicesSection';
// import GallerySection from '../../components/GallerySection';
// import VideoSection from '../../components/VideoSection';
// import TestimonialsSection from '../../components/TestimonialsSection';
// import ContactSection from '../../components/ContactSection';
// import Footer from '../../components/Footer';

// const Home = () => {
//   return (
//     <>
//       <Header />
//       <HeroSection />
//       <AboutSection />
//       <ServicesSection />
//       <GallerySection />
//       <VideoSection />
//       <TestimonialsSection />
//       <ContactSection />
//       <Footer />
//     </>
//   );
// };

// export default Home;
