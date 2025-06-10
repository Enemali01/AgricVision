import React from "react";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import Farm1 from '../../assets/cop-img1.jpeg'
import Farm2 from '../../assets/cop-img5.jpeg'
import Farm3 from '../../assets/images (4).jpeg'

export default function About() {
  return (
    <>
      <Header />

      {/* Hero Section with Image and Animation */}
      <section className="relative h-[80vh] overflow-hidden">
        <img
          src="/images/about-hero.jpg" // Replace with your image path
          alt="About AgriVision"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 via-emerald-700/90 to-white/90" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-20 text-center text-white animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md animate-slide-up">
            Empowering the Future of Farming
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl leading-relaxed animate-slide-up delay-200">
            At AgriVision, we merge innovation with tradition to build a sustainable and tech-forward agricultural community.
          </p>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="px-6 md:px-20 py-20 bg-white">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Our Core Beliefs</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Our values and mission are rooted in community, innovation, and sustainability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Vision",
              desc: "A world where every farmer thrives through access to modern tools and community.",
            },
            {
              title: "Our Mission",
              desc: "Empowering the next generation of farmers with accessible, tech-driven solutions.",
            },
            {
              title: "Our Values",
              desc: "Innovation, community, sustainability, and unwavering support for growth.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-green-50 p-6 rounded-xl shadow hover:shadow-xl transition-transform duration-500 hover:scale-105 animate-fade-in-up"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-16 bg-gray-100 px-6 md:px-20">
        <h2 className="text-center text-3xl font-bold text-green-800 mb-10 animate-fade-in">
          Our Impact in Action
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              src: Farm3,
              title: "Empowering Farmers",
              desc: "Hands-on training sessions bringing digital skills to rural communities.",
            },
            {
              src: Farm1,
              title: "Smart Farming in Practice",
              desc: "Using sensors and real-time data to increase productivity.",
            },
            {
              src: Farm2,
              title: "Youth in AgTech",
              desc: "Inspiring the next generation to lead innovation in agriculture.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 animate-fade-in-up"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 md:px-20 bg-white">
        <h2 className="text-center text-3xl font-bold text-green-800 mb-10 animate-fade-in">
          Our Journey
        </h2>
        <div className="max-w-3xl mx-auto border-l-4 border-green-500 space-y-10 pl-6">
          {[
            {
              year: "2018",
              title: "The Vision Was Born",
              desc: "The dream to digitally transform agriculture was initiated.",
            },
            {
              year: "2019",
              title: "First Platform Launch",
              desc: "We launched our MVP to connect farmers and experts.",
            },
            {
              year: "2022",
              title: "Regional Growth",
              desc: "Expanded to more regions, benefiting thousands of farmers.",
            },
            {
              year: "2024",
              title: "AI-Powered Future",
              desc: "We're integrating AI, IoT, and sustainability into everyday farming.",
            },
          ].map((item, i) => (
            <div key={i} className="animate-fade-in-up">
              <h4 className="text-xl font-semibold text-green-700">
                {item.year} - {item.title}
              </h4>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
