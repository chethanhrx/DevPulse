import React from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorState } from './ErrorState';

export function ApiStatus({ status, error, onRetry, children }) {
  if (status === 'idle') {
    return null;
  }

  if (status === 'loading') {
    return (
      <div className="animate-fade-in">
        <LoadingSkeleton />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="animate-fade-in">
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="animate-slide-up">
        {children}
      </div>
    );
  }

  return null;
}
