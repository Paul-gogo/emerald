'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AiOutlineMail } from 'react-icons/ai';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailQuery = searchParams.get('email');

  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);

  // ✅ Load email from localStorage or query param
  useEffect(() => {
    const stored = localStorage.getItem('userEmail');
    if (emailQuery) {
      setEmail(emailQuery);
      localStorage.setItem('userEmail', emailQuery); // Save it
    } else if (stored) {
      setEmail(stored);
    } else {
      toast.error('No email found. Please sign up again.');
    }
  }, [emailQuery]);

  // ✅ Start resend timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (!email) {
      toast.error('Missing email. Please sign up again.');
      return;
    }

    if (code.length !== 6) {
      toast.error('Enter the full 6-digit code');
      return;
    }

    setIsVerifying(true);

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, token: code }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Invalid code');

      toast.success('Email verified! Redirecting...');
      localStorage.removeItem('userEmail'); // ✅ Clean up
      setTimeout(() => router.push('/'), 2000);
    } catch (err) {
      toast.error(err.message || 'Failed to verify email');
    } finally {
      setIsVerifying(false);
    }
  };

  const resendCode = async () => {
    if (!canResend || !email) return;

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to resend code');

      toast.success('Verification code resent!');
      setTimer(45);
      setCanResend(false);
    } catch (err) {
      toast.error(err.message || 'Failed to resend code');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6F2EA] to-white p-6">
      <Toaster />
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <AiOutlineMail className="text-[#296A50]" size={48} />
        </div>
        <h1 className="text-2xl font-bold text-[#296A50] mb-2">Verify Your Email</h1>
        <p className="text-gray-600 mb-4">
          Enter the 6-digit code sent to <strong>{email || '[your email]'}</strong>.
        </p>

        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          className="w-full mb-4 text-center text-lg tracking-widest border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-[#296A50]"
        />

        <button
          onClick={handleVerify}
          disabled={isVerifying || code.length !== 6}
          className="w-full py-2 bg-[#296A50] text-white font-semibold rounded-lg hover:bg-[#1F513D] transition"
        >
          {isVerifying ? 'Verifying...' : 'Verify Code'}
        </button>

        <p className="text-sm text-gray-500 mt-6">
          Didn’t get the code?{' '}
          <button
            onClick={resendCode}
            disabled={!canResend}
            className={`font-medium hover:underline ${canResend ? 'text-[#296A50]' : 'text-gray-400 cursor-not-allowed'}`}
          >
            Resend code { !canResend && `(${timer}s)` }
          </button>
        </p>

        <p className="text-xs text-gray-400 mt-6">
          Already verified?{' '}
          <Link href="/login" className="text-[#296A50] hover:text-[#1F513D] underline font-medium">
            Go to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;



