import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorState({ message, onRetry }) {
  const errorMessage = typeof message === 'object' ? message.message : message;

  return (
    <div className="flex flex-col items-center justify-center p-5 sm:p-6 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 rounded-xl text-center">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mb-3">
        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
      </div>
      <p className="text-sm sm:text-base text-red-700 dark:text-red-400 mb-4 px-2 leading-relaxed max-w-xs">
        {errorMessage || 'An unexpected error occurred'}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-[0.98] transition-all shadow-sm touch-target"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
