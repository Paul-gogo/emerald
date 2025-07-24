'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from '../Logo/Logo';

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Logout failed");
      }

      toast.success("Logged out successfully");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white/90 shadow-sm">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="group text-[#296A50] text-sm">
            <span className="transition px-2 py-1 rounded group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">Home</span>
          </Link>
          <Link href="/properties" className="group text-[#296A50] text-sm">
            <span className="transition px-2 py-1 rounded group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">Properties</span>
          </Link>
          <Link href="/workspace" className="group text-[#296A50] text-sm">
            <span className="transition px-2 py-1 rounded group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">Workspace</span>
          </Link>
          <Link href="/about" className="group text-[#296A50] text-sm">
            <span className="transition px-2 py-1 rounded group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">About</span>
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-[#296A50] text-sm hover:text-[#1F513D]">Login</Link>
          <Link href="/sign-up" className="text-[#296A50] text-sm hover:text-[#1F513D]">Register</Link>
          <Link href="/profile" className="text-[#296A50] text-lg hover:text-[#1F513D]">
            <CgProfile className="w-6 h-6" />
          </Link>
          <Link href="/change-password">
            <button className="text-sm px-3 py-1 bg-[#296A50] text-white rounded-md hover:bg-[#1F513D] transition">
              Change Password
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#296A50] text-2xl focus:outline-none"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 px-5 pb-5 space-y-4 shadow-md">
          <Link href="/" className="block text-[#296A50] text-sm">Home</Link>
          <Link href="/properties" className="block text-[#296A50] text-sm">Properties</Link>
          <Link href="/workspace" className="block text-[#296A50] text-sm">Workspace</Link>
          <Link href="/about" className="block text-[#296A50] text-sm">About</Link>
          <hr />
          <Link href="/login" className="block text-[#296A50] text-sm">Login</Link>
          <Link href="/sign-up" className="block text-white text-center py-1 rounded-[8px] bg-[#296A50] text-sm">Sign-Up</Link>
          <Link href="/profile" className="block text-[#296A50] text-sm flex items-center gap-2">
            <CgProfile className="text-lg" /> Profile
          </Link>
          <Link href="/change-password" className="block text-[#296A50] text-sm">
            Change Password
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-sm text-white bg-red-500 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;