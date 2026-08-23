import React from 'react';
import { MessageSquare, ThumbsUp, Eye, CheckCircle2, ExternalLink } from 'lucide-react';
import { formatNumber } from '../utils/formatters';

// Safely decode HTML entities from Stack Exchange titles
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export function CommunityQuestions({ questions }) {
  if (!questions || questions.length === 0) {
    return (
      <div className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl text-center text-gray-500 dark:text-gray-400">
        No questions found.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-3.5 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm sm:text-base">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
          Stack Exchange
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-auto">
            {questions.length} results
          </span>
        </h3>
      </div>

      {/* Questions List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700 flex-grow overflow-y-auto custom-scrollbar max-h-[500px] sm:max-h-[600px]">
        {questions.map((q) => (
          <div key={q.id} className="p-3.5 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <a
              href={q.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2"
            >
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline line-clamp-2 leading-snug flex-1 min-w-0">
                {decodeHtml(q.title)}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span className={q.score > 0 ? 'text-green-600 dark:text-green-400 font-medium' : ''}>
                  {formatNumber(q.score)}
                </span>
              </div>
              <div className={`flex items-center gap-1 ${q.isAnswered ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}>
                {q.isAnswered ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <MessageSquare className="w-3.5 h-3.5" />
                )}
                {formatNumber(q.answerCount)}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {formatNumber(q.viewCount)}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {q.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-[10px] sm:text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
              {q.tags.length > 4 && (
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md text-[10px] sm:text-xs">
                  +{q.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
