'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const page = () => {
  const [step, setStep] = useState('forgot');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    token: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      toast.success('Verification code sent to your email. Please check your inbox.');
      setStep('reset');
    } catch (err) {
      toast.error(err.message || 'Error sending reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      toast.success('Password reset successful! Redirecting...');
      setTimeout(() => router.push('/'), 2000); // Redirect after 2s
    } catch (err) {
      toast.error(err.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F2EA]">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-[#1F513D] text-center">
          {step === 'forgot' ? 'Forgot Password' : 'Reset Password'}
        </h2>

        {step === 'forgot' ? (
          <form onSubmit={handleForgot} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border px-4 py-2 rounded w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <button
              type="submit"
              className="bg-[#296A50] hover:bg-[#1F513D] text-white px-4 py-2 rounded w-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="text"
              placeholder="Enter verification code"
              className="border px-4 py-2 rounded w-full"
              value={form.token}
              onChange={(e) => setForm({ ...form, token: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="New password"
              className="border px-4 py-2 rounded w-full"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="border px-4 py-2 rounded w-full"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
            <button
              type="submit"
              className="bg-[#296A50] hover:bg-[#1F513D] text-white px-4 py-2 rounded w-full"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default page;
