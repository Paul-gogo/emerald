'use client';
import React, { Suspense } from 'react';
import VerifyEmailClient from './verifyEmailClient';

export default function verifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading verification page...</div>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
