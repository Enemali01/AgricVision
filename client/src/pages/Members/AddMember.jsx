import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../utils/api';


function AddMember() {
  const [loading, setLoading] = useState(false)
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');

  const createMember = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/member/member', {
        lastname,
        firstname,
        email,
        phone,
        position
      });

      if (response.data === 'Member with Phone number and Email Address Exist') {
        toast.info('Member with Phone number and Email Address Exist', { position: 'top-right' });
      } else {
        toast.success('Member Created Successfully');
        setLastname('');
        setFirstname('');
        setEmail('');
        setPhone('');
        setPosition('');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      
      <h2 className="text-2xl font-bold text-emerald-700 text-center mb-6">
        Enter Member Details..
      </h2>
      <form onSubmit={createMember} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          autoComplete="off"
          required
        />
        <input
          type="text"
          placeholder="Enter Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          autoComplete="off"
          required
        />
        <input
          type="email"
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          autoComplete="off"
          required
        />
        <input
          type="tel"
          placeholder="234-9123456789"
          value={phone}
          maxLength="11"
          pattern='[0-9]{11}'
          title='Phone Number must be 11 digits'
          onChange={(e) => { 
            const onlyNums = e.target.value.replace(/\D/g, '');
            setPhone(onlyNums);
          }}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          autoComplete="off"
          required
        />
        <input
          type="text"
          placeholder="Enter Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          autoComplete="off"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors"
        >
          {loading ? 'Updating...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
}

export default AddMember;
