import { useReducer, useRef, useCallback } from 'react';
import { fetchGithubData } from '../api/github';
import { fetchStackExchangeData } from '../api/stackexchange';
import { fetchHackerNewsData } from '../api/hackernews';

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
      const data = await fetchFn(query, controller.signal);
      dispatch({ type: 'FETCH_SUCCESS', source, payload: data });
    } catch (error) {
      if (error.name === 'AbortError') return; // Ignore aborts
      
      const errorMessage = error.message || 'An unexpected error occurred';
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
    
    // Using Promise.allSettled as specified to run in parallel
    Promise.allSettled(requests);
  }, [fetchSource]);

  const retry = useCallback((source) => {
    if (!currentQuery.current) return;
    
    switch(source) {
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
