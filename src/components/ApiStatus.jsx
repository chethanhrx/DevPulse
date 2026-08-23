import React from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorState } from './ErrorState';

export function ApiStatus({ status, error, onRetry, children }) {
  if (status === 'idle') {
    return null; // Or some idle state, but usually handled by parent
  }

  if (status === 'loading') {
    return <LoadingSkeleton />;
  }

  if (status === 'error') {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (status === 'success') {
    return children;
  }

  return null;
}
