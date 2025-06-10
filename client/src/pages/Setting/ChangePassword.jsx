import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const { currentPassword, newPassword, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirmation do not match.");
    }

    if (!validatePassword(newPassword)) {
      return toast.error(
        "Password must be at least 8 characters long and contain at least a Capital letter and one number."
      );
    }

    try {
      setLoading(true);
      const res = await api.put('/users/change-password', {
        currentPassword,
        newPassword,
        confirmPassword
      });

      toast.success(res.data.message);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Change Password</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters and contain letters and numbers.</p>
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors"
        >
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

