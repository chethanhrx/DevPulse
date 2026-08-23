import React from 'react';
import { Star, GitFork, AlertCircle, Users, Activity, Code } from 'lucide-react';
import { formatNumber, timeAgo } from '../utils/formatters';

export function RepositoryOverview({ repo }) {
  if (!repo) {
    return (
      <div className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-center text-gray-500">
        No repository found for this query.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">
          <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
            {repo.name}
          </a>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {repo.description || 'No description provided.'}
        </p>
      </div>
      
      <div className="p-5 flex-grow">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">{formatNumber(repo.stars)}</span>
            <span className="text-xs text-gray-500">Stars</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <GitFork className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{formatNumber(repo.forks)}</span>
            <span className="text-xs text-gray-500">Forks</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <AlertCircle className="w-4 h-4 text-green-500" />
            <span className="font-medium">{formatNumber(repo.issues)}</span>
            <span className="text-xs text-gray-500">Issues</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{repo.contributorsCount}</span>
            <span className="text-xs text-gray-500">Contributors</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-1.5">
          <Code className="w-3.5 h-3.5" />
          {repo.language || 'Unknown'}
        </div>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" />
          Updated {timeAgo(repo.lastActivity)}
        </div>
      </div>
    </div>
  );
}
