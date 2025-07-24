// components/NavbarWrapper.tsx or .js
'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../Navbar/Navbar';

const HIDDEN_PATHS = ['/login', '/sign-up','/forgot', '/verify-email', '/profile'];

const NavbarWrapper = () => {
  const pathname = usePathname();

  // Check if current path is in the hidden list
  const shouldHide = HIDDEN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (shouldHide) return null;

  return <Navbar />;
};

export default NavbarWrapper;
