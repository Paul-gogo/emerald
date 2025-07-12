import React from 'react'
import Logo from '../Logo/Logo'
import Link from 'next/link'
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-5 sticky top-0 bg-white/90 z-50'>
      <Logo />
      <nav>
        <ul className="flex sans space-x-4">
          <li>
        <Link href="/" className="group text-[#296A50] text-[14px]">
          <span className="transition-all duration-200 px-2 py-1 rounded-[3px] group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">Home</span>
        </Link>
          </li>
          <li>
        <Link href="/Properties" className="group text-[#296A50] text-[14px]">
          <span className="transition-all duration-200 px-2 py-1 rounded-[3px] group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">Properties</span>
        </Link>
          </li>
          <li>
        <Link href="/search" className="group text-[#296A50] text-[14px]">
          <span className="transition-all duration-200 px-2 py-1 rounded-[3px] group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">Search</span>
        </Link>
          </li>
          <li>
        <Link href="/about" className="group text-[#296A50] text-[14px]">
          <span className="transition-all duration-200 px-2 py-1 rounded-[3px] group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">About</span>
        </Link>
          </li>
        </ul>
      </nav>
      <div className="flex sans items-center space-x-4">
        <Link href="/login" className="group text-[#296A50] text-[14px]">
          <span className="transition-all duration-200 px-2 py-1 rounded-[3px] group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">Login</span>
        </Link>
        <Link href="/sign-up" className="group text-[#296A50] text-[14px]">
          <span className="transition-all duration-200 px-2 py-1 rounded-[3px] group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">Register</span>
        </Link>
        <Link href="/profile" className="group text-[#296A50] text-lg">
          <span className="flex items-center justify-center p-2 rounded-full transition-all duration-200 group-hover:bg-[#F6F2EA] group-hover:text-[#1F513D]">
            <CgProfile />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
