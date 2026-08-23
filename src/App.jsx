import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { RepositoryOverview } from './components/RepositoryOverview';
import { CommunityQuestions } from './components/CommunityQuestions';
import { HackerNewsFeed } from './components/HackerNewsFeed';
import { ApiStatus } from './components/ApiStatus';
import { useDevPulse } from './hooks/useDevPulse';
import { Activity, Moon, Sun, Github, Heart } from 'lucide-react';

function App() {
  const { github, stackOverflow, hackerNews, search, retry } = useDevPulse();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const hasSearched = github.status !== 'idle' || stackOverflow.status !== 'idle' || hackerNews.status !== 'idle';

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 safe-area-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-2.5 text-blue-600 dark:text-blue-400">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">DevPulse</h1>
            </div>
            <button
              onClick={toggleTheme}
              className="touch-target flex items-center justify-center p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
            Developer Intelligence
          </h2>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            Search once. Get unified insights from GitHub, Stack Exchange, and Hacker News instantly.
          </p>
          <SearchBar onSearch={search} />
        </div>

        {/* Results Section */}
        {!hasSearched ? (
          <div className="text-center py-12 sm:py-16 lg:py-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-white/50 dark:bg-gray-900/50 animate-fade-in">
            <Activity className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base px-4">
              Enter a technology, library, or language above to get started.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 px-4">
              {['react', 'fastapi', 'tensorflow', 'nextjs'].map((term) => (
                <button
                  key={term}
                  onClick={() => search(term)}
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full transition-colors touch-target"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-start animate-fade-in">
            {/* GitHub Panel */}
            <div className="flex flex-col gap-3 sm:gap-4 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold px-1 flex items-center gap-2">
                <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                Repository
              </h3>
              <ApiStatus
                status={github.status}
                error={github.error}
                onRetry={() => retry('github')}
              >
                <RepositoryOverview repo={github.data} />
              </ApiStatus>
            </div>

            {/* Stack Exchange Panel */}
            <div className="flex flex-col gap-3 sm:gap-4 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold px-1 flex items-center gap-2">
                <span className="text-orange-500 text-lg">💬</span>
                Community
              </h3>
              <ApiStatus
                status={stackOverflow.status}
                error={stackOverflow.error}
                onRetry={() => retry('stackOverflow')}
              >
                <CommunityQuestions questions={stackOverflow.data} />
              </ApiStatus>
            </div>

            {/* Hacker News Panel */}
            <div className="flex flex-col gap-3 sm:gap-4 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold px-1 flex items-center gap-2">
                <span className="text-orange-600 text-lg">📰</span>
                Discussions
              </h3>
              <ApiStatus
                status={hackerNews.status}
                error={hackerNews.error}
                onRetry={() => retry('hackerNews')}
              >
                <HackerNewsFeed stories={hackerNews.data} />
              </ApiStatus>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 mt-auto safe-area-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>DevPulse — Developer Intelligence</span>
            </div>
            <div className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> using React & 3 Public APIs
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
