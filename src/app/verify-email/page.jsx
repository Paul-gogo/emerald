import React, { Suspense } from 'react';
import VerifyEmailClient from './VerifyEmailClient';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading verification page...</div>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
