import React from 'react';

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4 w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
      <div className="pt-4 flex gap-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  );
}
