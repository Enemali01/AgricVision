import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../utils/api'
import Header from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import ContactImg  from '../../assets/caim.gif'
import { FaTelegramPlane } from 'react-icons/fa';


export default function Contact() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      firstname,
      lastname,
      phone,
      email,
      message,
    };

    try {
      const response = await api.post('/mail', dataToSend);
       if(response.data){
        toast.success('Mail Sent');
       }
      setFirstname('');
      setLastname('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.log(error);
      toast.error(error || 'Failed to send message');
    }
  };

  return (
    <>
      <Header />
      <section className="bg-white py-20 px-4 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="bg-green-50 p-8 rounded-xl shadow-md">
              <h2 className="text-4xl font-extrabold text-green-800 mb-6 animate-fade-in-up">Let's Connect & Grow</h2>
              <p className="text-gray-700 text-lg leading-relaxed animate-fade-in delay-200">
                At <span className="font-semibold text-green-700">AgriVision</span>, we believe in growing together. Whether you’re a farmer, investor, student, or enthusiast, our team is ready to answer your questions and walk with you on your agricultural journey. 🌾
              </p>
              <div className="mt-6">
                <img
                  src={ContactImg}
                  alt="Tech in Agriculture"
                  className="rounded-lg shadow-md w-full object-cover max-h-64"
                />


              </div>
            </div>

            <div className="bg-gray-100 rounded-xl shadow-md p-8">
              <h3 className="text-center text-xl font-semibold text-green-700 mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    className="p-3 rounded-lg border border-gray-300"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    className="p-3 rounded-lg border border-gray-300"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  placeholder="Enter your message"
                  required
                  rows={4}
                  className="w-full p-3 rounded-lg border border-gray-300"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
                >
                   Submit <FaTelegramPlane />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
