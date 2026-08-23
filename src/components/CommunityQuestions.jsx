import React from 'react';
import { MessageSquare, ThumbsUp, Eye, CheckCircle2 } from 'lucide-react';
import { formatNumber } from '../utils/formatters';

export function CommunityQuestions({ questions }) {
  if (!questions || questions.length === 0) {
    return (
      <div className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-center text-gray-500">
        No questions found.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-orange-500" />
          Stack Exchange
        </h3>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-700 flex-grow">
        {questions.map((q) => (
          <div key={q.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <a 
              href={q.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline line-clamp-2 mb-2"
              dangerouslySetInnerHTML={{ __html: q.title }}
            />
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span className={q.score > 0 ? 'text-green-600 dark:text-green-400 font-medium' : ''}>
                  {formatNumber(q.score)}
                </span>
              </div>
              <div className={`flex items-center gap-1 ${q.isAnswered ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}>
                {q.isAnswered ? <CheckCircle2 className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
                {formatNumber(q.answerCount)}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {formatNumber(q.viewCount)}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {q.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-[10px]">
                  {tag}
                </span>
              ))}
              {q.tags.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-[10px]">
                  +{q.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
