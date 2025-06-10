import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';



const EditMember = () => {
 const members = {
    lastname: '',
    firstname: '',
    email: '',
    phone: '',
    position: '',
  }

  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState(members);
  const {id} = useParams();

const inputHandler = (e) => {
  const {name,value} = e.target;
  setMember({...member, [name]: value});
}

useEffect(()=>{
  api.get(`/api/member/member/${id}`)
  .then((response)=>{
    setMember(response.data)
  })
  .catch((error)=>{
    console.error(error || 'Error fetching record')
  })
},[])

const handleSubmit = async (e) =>{
  e.preventDefault();
  try {
      setLoading(true);
      const response = await api.put(`/member/update/${id}`,member,
      {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setMember(response.data)
       toast.success("Member details updated!"); 
  } catch (error) {
    console.error(error || 'Error updating records')
  }finally{
    setLoading(false)
  }
}
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      
      <h2 className="text-2xl font-bold text-emerald-700 text-center mb-6">
        Enter Member Details..
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="lastname"
          value={member.lastname}
          onChange={inputHandler}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="text"
          name="firstname"
          value={member.firstname}
          onChange={inputHandler}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="email"
          name="email"
          value={member.email}
          onChange={inputHandler}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="tel"
          name="phone"
          value={member.phone}
          maxLength="11"
          pattern='[0-9]{11}'
          title='Phone Number must be 11 digits'
          onChange={inputHandler}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="text"
          name="position"
          value={member.position}
          onChange={inputHandler}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors"
        >
          {loading ? 'Updating...' : 'Update Member'}
        </button>
      </form>
    </div>
  )
}

export default EditMember