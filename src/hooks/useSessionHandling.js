import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing questionnaire state with persistence
 * @param {string} storageKey - Unique key for this questionnaire in storage
 * @param {object} initialState - Initial state for the questionnaire
 * @returns {object} - State and methods for managing the questionnaire
 */
const useSessionHandling = (storageKey, initialState) => {
  // Initialize state from storage or use default
  const [state, setState] = useState(() => {
    try {
      const savedState = sessionStorage.getItem(storageKey);
      return savedState ? JSON.parse(savedState) : initialState;
    } catch (error) {
      console.error('Error loading state from storage:', error);
      return initialState;
    }
  });

  // Navigation stack for back/forward functionality
  const [navigationStack, setNavigationStack] = useState(() => {
    try {
      const savedStack = sessionStorage.getItem(`${storageKey}_stack`);
      return savedStack ? JSON.parse(savedStack) : [];
    } catch (error) {
      console.error('Error loading navigation stack:', error);
      return [];
    }
  });

  // Save state to storage whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state to storage:', error);
    }
  }, [state, storageKey]);

  // Save navigation stack to storage whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem(`${storageKey}_stack`, JSON.stringify(navigationStack));
    } catch (error) {
      console.error('Error saving navigation stack:', error);
    }
  }, [navigationStack, storageKey]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event) => {
      // Prevent the browser's default back action
      event.stopImmediatePropagation();
      
      if (navigationStack.length > 0) {
        // Call our custom back navigation
        const previousState = navigationStack[navigationStack.length - 1];
        setNavigationStack(prevStack => prevStack.slice(0, -1));
        setState(previousState);
      }
    };
    
    // Use capture phase to intercept the event before other handlers
    window.addEventListener('popstate', handlePopState, { capture: true });
    return () => window.removeEventListener('popstate', handlePopState, { capture: true });
  }, [navigationStack]);

  // Update a specific part of the state
  const updateState = useCallback((updates) => {
    setState(prevState => ({
      ...prevState,
      ...updates
    }));
  }, []);

  // Save current state to navigation stack and update state
  const navigateTo = useCallback((updates) => {
    // Save current state to navigation stack
    setNavigationStack(prevStack => [...prevStack, state]);
    
    // Update state
    setState(prevState => ({
      ...prevState,
      ...updates
    }));
    
    // Push a new state to the browser history - use a unique key to ensure history entries are distinct
    window.history.pushState(
      { stackPosition: Date.now() },
      '',
      window.location.pathname
    );
  }, [state]);

  // Go back to previous state
  const goBack = useCallback(() => {
    if (navigationStack.length === 0) return false;
    
    // Use history.back() to trigger the popstate event
    // Our popstate handler will take care of restoring the previous state
    window.history.back();
    
    return true;
  }, [navigationStack.length]);

  // Reset state to initial values
  const resetState = useCallback(() => {
    setState(initialState);
    setNavigationStack([]);
    
    // Clear storage for this questionnaire
    try {
      sessionStorage.removeItem(storageKey);
      sessionStorage.removeItem(`${storageKey}_stack`);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }, [initialState, storageKey]);

  // Check if we can go back
  const canGoBack = navigationStack.length > 0;

  return {
    state,
    updateState,
    navigateTo,
    goBack,
    resetState,
    canGoBack
  };
};

export default useSessionHandling; 