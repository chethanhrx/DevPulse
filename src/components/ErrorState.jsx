import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 rounded-lg text-center">
      <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
      <p className="text-sm text-red-700 dark:text-red-400 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
