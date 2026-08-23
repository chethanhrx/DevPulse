import { useReducer, useRef, useCallback } from 'react';
import { fetchGithubData } from '../api/github';
import { fetchStackExchangeData } from '../api/stackexchange';
import { fetchHackerNewsData } from '../api/hackernews';

const REQUEST_TIMEOUT = 15000; // 15 seconds

const initialState = {
  github: { status: 'idle', data: null, error: null },
  stackOverflow: { status: 'idle', data: null, error: null },
  hackerNews: { status: 'idle', data: null, error: null },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        [action.source]: { status: 'loading', data: null, error: null }
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        [action.source]: { status: 'success', data: action.payload, error: null }
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        [action.source]: { status: 'error', data: null, error: action.payload }
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function withTimeout(promise, signal, timeoutMs = REQUEST_TIMEOUT) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request timed out. Please try again.'));
    }, timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timeoutId);
        if (signal.aborted) {
          reject(new DOMException('Aborted', 'AbortError'));
        } else {
          resolve(result);
        }
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

export function useDevPulse() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const abortControllers = useRef({
    github: null,
    stackOverflow: null,
    hackerNews: null,
  });
  const currentQuery = useRef('');

  const fetchSource = useCallback(async (source, query, fetchFn) => {
    // Cancel any previous requests for this source
    if (abortControllers.current[source]) {
      abortControllers.current[source].abort();
    }

    const controller = new AbortController();
    abortControllers.current[source] = controller;

    dispatch({ type: 'FETCH_START', source });

    try {
      const data = await withTimeout(
        fetchFn(query, controller.signal),
        controller.signal
      );
      dispatch({ type: 'FETCH_SUCCESS', source, payload: data });
    } catch (error) {
      if (error.name === 'AbortError') return; // Ignore aborts

      let errorMessage = 'An unexpected error occurred';

      if (error.message === 'Request timed out. Please try again.') {
        errorMessage = error.message;
      } else if (error.status === 403 || error.status === 429) {
        errorMessage = error.message || 'API rate limit exceeded. Please wait and try again.';
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      dispatch({ type: 'FETCH_ERROR', source, payload: errorMessage });
    }
  }, []);

  const search = useCallback((query) => {
    if (!query.trim()) return;
    currentQuery.current = query;

    const requests = [
      fetchSource('github', query, fetchGithubData),
      fetchSource('stackOverflow', query, fetchStackExchangeData),
      fetchSource('hackerNews', query, fetchHackerNewsData)
    ];

    // Using Promise.allSettled to run in parallel - no single failure stops others
    Promise.allSettled(requests);
  }, [fetchSource]);

  const retry = useCallback((source) => {
    if (!currentQuery.current) return;

    switch (source) {
      case 'github':
        fetchSource('github', currentQuery.current, fetchGithubData);
        break;
      case 'stackOverflow':
        fetchSource('stackOverflow', currentQuery.current, fetchStackExchangeData);
        break;
      case 'hackerNews':
        fetchSource('hackerNews', currentQuery.current, fetchHackerNewsData);
        break;
    }
  }, [fetchSource]);

  return {
    github: state.github,
    stackOverflow: state.stackOverflow,
    hackerNews: state.hackerNews,
    search,
    retry
  };
}
