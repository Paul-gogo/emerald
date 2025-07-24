'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillMail,
  AiFillLock,
  AiOutlineUser,
} from 'react-icons/ai';

const page = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return setError('All fields are required');
    }
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }
    if (!form.agree) {
      return setError('You must agree to the terms and conditions.');
    }

    try {
      const res = await fetch('https://emerald-haven-api.onrender.com//api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to register.');
      }

      // ✅ Handle Verification
      if (data.status === 'pending') {
        localStorage.setItem('userEmail', form.email); // store email
        toast.success('Account created! Please verify your email.');
        router.push(`/verify-email?email=${form.email}`);
      } else {
        toast.success('Account created successfully!');
        router.push('/dashboard');
      }

    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6F2EA] to-white p-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-[#296A50] text-center mb-2">Create Account</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Join the Emerald Haven community</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative mt-1">
              <AiOutlineUser className="absolute left-3 top-3 text-gray-400" />
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#296A50]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative mt-1">
              <AiFillMail className="absolute left-3 top-3 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#296A50]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <AiFillLock className="absolute left-3 top-3 text-gray-400" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#296A50]"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative mt-1">
              <AiFillLock className="absolute left-3 top-3 text-gray-400" />
              <input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#296A50]"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="text-sm text-gray-600">
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1"
              />
              <span>
                I agree to the{' '}
                <details className="inline">
                  <summary className="text-[#296A50] hover:underline cursor-pointer inline">Terms & Conditions</summary>
                  <p className="mt-1 bg-gray-100 p-2 rounded text-sm shadow">
                    By creating an account, you agree to abide by our policies.
                  </p>
                </details>
              </span>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-[#296A50] text-white font-semibold rounded-lg hover:bg-[#1F513D] transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#296A50] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;

