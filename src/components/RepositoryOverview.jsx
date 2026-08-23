import React from 'react';
import { Star, GitFork, AlertCircle, Users, Activity, Code, ExternalLink } from 'lucide-react';
import { formatNumber, timeAgo } from '../utils/formatters';

export function RepositoryOverview({ repo }) {
  if (!repo) {
    return (
      <div className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl text-center text-gray-500 dark:text-gray-400">
        No repository found for this query.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm card-hover">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="text-base sm:text-xl font-semibold min-w-0 flex-1">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5 min-w-0"
            >
              <span className="truncate">{repo.name}</span>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
            </a>
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
          {repo.description || 'No description provided.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="p-4 sm:p-5 flex-grow">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <StatItem
            icon={<Star className="w-4 h-4 text-yellow-500" />}
            value={formatNumber(repo.stars)}
            label="Stars"
          />
          <StatItem
            icon={<GitFork className="w-4 h-4 text-gray-400" />}
            value={formatNumber(repo.forks)}
            label="Forks"
          />
          <StatItem
            icon={<AlertCircle className="w-4 h-4 text-green-500" />}
            value={formatNumber(repo.issues)}
            label="Issues"
          />
          <StatItem
            icon={<Users className="w-4 h-4 text-blue-500" />}
            value={repo.contributorsCount}
            label="Contributors"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-5 py-3 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-1.5 min-w-0">
          <Code className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{repo.language || 'Unknown'}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Activity className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Updated </span>{timeAgo(repo.lastActivity)}
        </div>
      </div>
    </div>
  );
}

function StatItem({ icon, value, label }) {
  return (
    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
      {icon}
      <span className="font-semibold text-sm sm:text-base">{value}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}
