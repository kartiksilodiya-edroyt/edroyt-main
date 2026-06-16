'use client';

import { useState } from 'react';
import MatrixLoader from './MatrixLoader';

export default function LoaderGate({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <MatrixLoader onComplete={() => setLoaded(true)} />}
      {children}
    </>
  );
}