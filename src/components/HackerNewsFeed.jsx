import React from 'react';
import { Newspaper, MessageCircle, TrendingUp, Clock, ExternalLink } from 'lucide-react';
import { formatDate, timeAgo } from '../utils/formatters';

export function HackerNewsFeed({ stories }) {
  if (!stories || stories.length === 0) {
    return (
      <div className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl text-center text-gray-500 dark:text-gray-400">
        No stories found.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-3.5 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm sm:text-base">
          <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
          Hacker News
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-auto">
            {stories.length} stories
          </span>
        </h3>
      </div>

      {/* Stories List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700 flex-grow overflow-y-auto custom-scrollbar max-h-[500px] sm:max-h-[600px]">
        {stories.map((story) => (
          <div key={story.id} className="p-3.5 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 leading-snug flex-1 min-w-0 transition-colors">
                {story.title}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                <span className="font-medium">{story.points || 0}</span>
              </div>
              <a
                href={`https://news.ycombinator.com/item?id=${story.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-500 transition-colors touch-target py-0.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {story.comments || 0}
              </a>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{formatDate(story.createdAt)}</span>
                <span className="sm:hidden">{timeAgo(story.createdAt)}</span>
              </div>
            </div>

            {/* Author */}
            {story.author && (
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                by <span className="font-medium">{story.author}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
