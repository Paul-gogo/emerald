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
  AiFillFacebook,
} from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { FaHome } from 'react-icons/fa';

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("https://emerald-haven-api.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Removed credentials: 'include' because we are using localStorage for token
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      } else {
        throw new Error('No token received from server');
      }

      toast.success("User logged in successfully");
      setTimeout(() => router.push("/"), 1500); // redirect after 1.5s
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6F2EA] to-white p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <div className="p-3 bg-[#296A50] rounded-xl shadow-lg group-hover:scale-105 transition">
              <FaHome className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#296A50]">Emerald Haven</span>
          </Link>
          <p className="text-gray-500 mt-2">Welcome back to your real estate journey</p>
        </div>

        <div className="bg-white shadow-xl rounded-xl backdrop-blur-md p-6">
          <h2 className="text-2xl font-bold text-[#296A50] text-center mb-2">Sign In</h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative mt-1">
                <AiFillMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#296A50]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <AiFillLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
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

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Remember me</span>
              </label>
              <Link href="/forgot" className="text-[#1F513D] hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-[#296A50] text-white font-semibold rounded-lg hover:bg-[#1F513D] transition"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200" />

          {/* Social login */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-[#F6F2EA] transition">
              <FcGoogle />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-[#F6F2EA] transition">
              <AiFillFacebook className="text-blue-600" />
              Continue with Facebook
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-[#296A50] hover:text-[#1F513D] font-medium">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Footer links */}
        <div className="text-center mt-6 text-sm text-gray-400 space-x-4">
          <Link href="/privacy" className="hover:text-[#296A50]">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-[#296A50]">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;

