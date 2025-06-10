import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import axios from 'axios'
import { useAuth } from '../../components/Hooks/authContext'
import { ImSpinner2 } from 'react-icons/im'; // Spinner icon
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Login = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')




  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/users/login', { email, password },{withCredentials: true});
      // console.log(response.data);
      if (response.data.message) {
        login(response.data.user)
        // localStorage.setItem('token', response.data.token)
        if (response.data.user.role === 'admin') {
          navigate('/admin/dashboard')
          toast.success(response.data.message)
        } else {
          navigate('/admin/dashboard')
        }
      }
    } catch (error) {
      setError(error.response?.data.message)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-indigo-200 px-4'>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center text-emerald-600">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm">Login to your account</p>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-sm font-medium transition ${loading
            ? 'bg-emerald-700 cursor-not-allowed'
            : 'bg-emerald-800 hover:bg-teal-500 text-white'
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <ImSpinner2 className="animate-spin text-white text-lg" />
              Logging in...
            </div>
          ) : (
            'Login'
          )}
        </button>

      </form>
    </div>
  )
}

export default Login