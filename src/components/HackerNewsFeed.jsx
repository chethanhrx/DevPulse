import React from 'react';
import { Newspaper, MessageCircle, TrendingUp, Clock } from 'lucide-react';
import { formatDate } from '../utils/formatters';

export function HackerNewsFeed({ stories }) {
  if (!stories || stories.length === 0) {
    return (
      <div className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-center text-gray-500">
        No stories found.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-orange-600" />
          Hacker News
        </h3>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-700 flex-grow">
        {stories.map((story) => (
          <div key={story.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <a 
              href={story.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2 mb-2"
            >
              {story.title}
            </a>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                <span className="font-medium">{story.points || 0}</span>
              </div>
              <a 
                href={`https://news.ycombinator.com/item?id=${story.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-500"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {story.comments || 0}
              </a>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(story.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
