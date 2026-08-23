import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { RepositoryOverview } from './components/RepositoryOverview';
import { CommunityQuestions } from './components/CommunityQuestions';
import { HackerNewsFeed } from './components/HackerNewsFeed';
import { ApiStatus } from './components/ApiStatus';
import { useDevPulse } from './hooks/useDevPulse';
import { Activity, Moon, Sun } from 'lucide-react';

function App() {
  const { github, stackOverflow, hackerNews, search, retry } = useDevPulse();
  const [darkMode, setDarkMode] = useState(false);
  const hasSearched = github.status !== 'idle' || stackOverflow.status !== 'idle' || hackerNews.status !== 'idle';

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
            <Activity className="w-6 h-6" />
            <h1 className="text-xl font-bold tracking-tight">DevPulse</h1>
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
            Developer Intelligence
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Search once. Get unified insights from GitHub, Stack Exchange, and Hacker News instantly.
          </p>
          <SearchBar onSearch={search} />
        </div>

        {!hasSearched ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-white/50 dark:bg-gray-900/50">
            <Activity className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Enter a technology, library, or language above to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {/* GitHub Panel */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold px-1">Repository</h3>
              <ApiStatus 
                status={github.status} 
                error={github.error} 
                onRetry={() => retry('github')}
              >
                <RepositoryOverview repo={github.data} />
              </ApiStatus>
            </div>

            {/* Stack Exchange Panel */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold px-1">Community</h3>
              <ApiStatus 
                status={stackOverflow.status} 
                error={stackOverflow.error} 
                onRetry={() => retry('stackOverflow')}
              >
                <CommunityQuestions questions={stackOverflow.data} />
              </ApiStatus>
            </div>

            {/* Hacker News Panel */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold px-1">Discussions</h3>
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
    </div>
  );
}

export default App;
