'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

const page = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('https://emerald-haven-api.onrender.com//api/v1/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      toast.success('Password changed successfully');
      setTimeout(() => router.push('/'), 1500);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6F2EA] to-white px-4 py-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md">
        {/* Header Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <div className="p-3 bg-[#296A50] rounded-xl shadow-lg group-hover:scale-105 transition">
              <FaHome className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#296A50]">Emerald Haven</span>
          </Link>
          <p className="text-gray-500 mt-2">Change your account password securely</p>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
          <h2 className="text-2xl font-bold text-[#296A50] text-center">Change Password</h2>

          <form onSubmit={handleChangePassword} className="space-y-4">
            {/* Old Password */}
            <div>
              <label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">
                Old Password
              </label>
              <div className="relative mt-1">
                <AiFillLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="oldPassword"
                  type={showPasswords ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#296A50]"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative mt-1">
                <AiFillLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="newPassword"
                  type={showPasswords ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#296A50]"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative mt-1">
                <AiFillLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showPasswords ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#296A50]"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={() => setShowPasswords(!showPasswords)}
                >
                  {showPasswords ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-[#296A50] text-white font-semibold rounded-lg hover:bg-[#1F513D] transition"
            >
              {isLoading ? 'Updating...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
