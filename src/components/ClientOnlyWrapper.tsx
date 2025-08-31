"use client";

import { useState, useEffect, ReactNode } from 'react';

interface ClientOnlyWrapperProps {
  children: ReactNode;
}

export default function ClientOnlyWrapper({ children }: ClientOnlyWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}
