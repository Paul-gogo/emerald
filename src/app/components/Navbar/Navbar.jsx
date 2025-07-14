'use client'
import React, { useState } from 'react'
import Logo from '../Logo/Logo'
import Link from 'next/link'
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="w-full sticky top-0 z-50 bg-white/90 shadow-sm">
      <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="group text-[#296A50] text-sm">
            <span className="transition-all duration-200 px-2 py-1 rounded group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">Home</span>
          </Link>
          <Link href="/properties" className="group text-[#296A50] text-sm">
            <span className="transition-all duration-200 px-2 py-1 rounded group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">Properties</span>
          </Link>
          <Link href="/search" className="group text-[#296A50] text-sm">
            <span className="transition-all duration-200 px-2 py-1 rounded group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">Search</span>
          </Link>
          <Link href="/about" className="group text-[#296A50] text-sm">
            <span className="transition-all duration-200 px-2 py-1 rounded group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">About</span>
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-[#296A50] text-sm hover:text-[#1F513D]">Login</Link>
          <Link href="/sign-up" className="text-[#296A50] text-sm hover:text-[#1F513D]">Register</Link>
          <Link href="/profile" className="text-[#296A50] text-lg hover:text-[#1F513D]">
            <CgProfile className="w-6 h-6" />
          </Link>
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

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 px-5 pb-5 space-y-4 shadow-md">
          <Link href="/" className="block text-[#296A50] text-sm">Home</Link>
          <Link href="/Properties" className="block text-[#296A50] text-sm">Properties</Link>
          <Link href="/search" className="block text-[#296A50] text-sm">Search</Link>
          <Link href="/about" className="block text-[#296A50] text-sm">About</Link>
          <hr />
          <Link href="/login" className="block text-[#296A50] text-sm">Login</Link>
          <Link href="/sign-up" className="block h-7 pl-[40%] text-white rounded-[8px] bg-[#296A50] text-sm">Sign-Up</Link>
          <Link href="/profile" className="block text-[#296A50] text-sm flex items-center gap-2">
            <CgProfile className="text-lg" /> Profile
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar;

