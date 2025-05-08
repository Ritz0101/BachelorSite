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

  // Enhanced popstate handler with improved debugging
  useEffect(() => {
    const handlePopState = (event) => {
      // Log debugging information
      console.log('Popstate event triggered:', {
        hasStack: navigationStack.length > 0,
        stackSize: navigationStack.length,
        eventState: event.state,
        currentState: {
          showReport: state.showReport,
          hasQuestions: Boolean(state.currentQuestions),
          currentSequenceIndex: state.currentSequenceIndex,
          currentlyLoadingModule: state.currentlyLoadingModule,
          questionIndex: state.currentQuestionIndex,
          hasSelectedCategories: Boolean(state.selectedCategories?.length),
          currentQuestionsId: state.currentQuestions?.id,
          isCurrentMultiSelect: state.currentQuestions?.multiSelect,
        }
      });
      
      // Prevent the browser's default back action to use our custom handling
      event.stopImmediatePropagation();
      
      if (navigationStack.length > 0) {
        // Get the previous state from the navigation stack
        const previousState = navigationStack[navigationStack.length - 1];
        
        // Log the properties of the previous state for debugging
        console.log('Previous state details:', {
          hasQuestions: Boolean(previousState.currentQuestions),
          isMultiSelect: Boolean(previousState.currentQuestions?.multiSelect),
          questionsId: previousState.currentQuestions?.id,
          selectedCategoriesCount: previousState.selectedCategories?.length || 0,
        });
        
        // Special handling for navigation from the first question of a question set
        // back to the category selection screen, particularly for access control questions
        if (state.currentQuestions && 
            (state.currentQuestions.id === 'access1' || 
             state.currentQuestionIndex === 0) && 
            previousState.currentQuestions) {
          
          // Check if we're going back to the categories screen
          const isGoingToCategories = previousState.currentQuestions.id === 'categories' || 
                                     previousState.currentQuestions.multiSelect === true;
          
          console.log('Special case: Going back from first question to previous screen', {
            isGoingToCategories,
            currentQuestionId: state.currentQuestions.id,
            previousQuestionsId: previousState.currentQuestions.id,
          });
          
          // Ensure the multiSelect property is preserved for the categories screen
          if (isGoingToCategories && previousState.currentQuestions.id === 'categories') {
            // Make sure multiSelect is set correctly
            previousState.currentQuestions.multiSelect = true;
          }
        }
        
        // Special handling for report screen: we want to go back to the last question
        if (state.showReport) {
          console.log('Back from report screen to previous questions');
        }
        
        // Special handling for transitions between question sets
        if (state.currentlyLoadingModule && !previousState.currentlyLoadingModule) {
          console.log('Back from loading module to previous state');
        }
        
        // Log what we're going back to
        console.log('Going back to previous state:', {
          fromScreen: state.showReport ? 'report' : 
                     state.currentlyLoadingModule ? 'loading' :
                     state.currentQuestions?.multiSelect ? 'categories' :
                     state.currentQuestions ? `question (${state.currentQuestions.id})` : 'welcome',
          toScreen: previousState.showReport ? 'report' : 
                   previousState.currentlyLoadingModule ? 'loading' :
                   previousState.currentQuestions?.multiSelect ? 'categories' :
                   previousState.currentQuestions ? `question (${previousState.currentQuestions.id})` : 'welcome',
        });
        
        // Update navigation stack
        setNavigationStack(prevStack => prevStack.slice(0, -1));
        
        // Apply the previous state
        setState(previousState);
      }
    };
    
    // Use capture phase to intercept the event before other handlers
    window.addEventListener('popstate', handlePopState, { capture: true });
    return () => window.removeEventListener('popstate', handlePopState, { capture: true });
  }, [navigationStack, state]);

  // Update a specific part of the state without affecting the navigation stack
  const updateState = useCallback((updates) => {
    console.log('Updating state without navigation:', updates);
    setState(prevState => ({
      ...prevState,
      ...updates
    }));
  }, []);

  // Save current state to navigation stack and update state
  const navigateTo = useCallback((updates) => {
    // Check if we're going to the report screen
    const isGoingToReport = updates.showReport === true;
    
    // Check if we're moving between different screens/steps
    const isScreenChange = updates.hasOwnProperty('showReport') || 
                          updates.hasOwnProperty('currentQuestions') ||
                          updates.hasOwnProperty('currentlyLoadingModule');
    
    // Log navigation for debugging
    console.log('Navigating to new state:', {
      currentStateKeys: Object.keys(state),
      updateKeys: Object.keys(updates),
      isGoingToReport,
      isScreenChange,
      stackSizeBefore: navigationStack.length,
      fromScreen: state.showReport ? 'report' : 
                 state.currentlyLoadingModule ? 'loading' :
                 state.currentQuestions?.multiSelect ? 'categories' :
                 state.currentQuestions ? 'questions' : 'welcome',
      toScreen: updates.showReport ? 'report' : 
               updates.currentlyLoadingModule ? 'loading' :
               updates.currentQuestions?.multiSelect ? 'categories' :
               updates.currentQuestions ? 'questions' : 'welcome',
    });
    
    // Save current state to navigation stack
    setNavigationStack(prevStack => [...prevStack, state]);
    
    // Update state
    setState(prevState => ({
      ...prevState,
      ...updates
    }));
    
    // Push a new state to the browser history - use a unique key to ensure history entries are distinct
    window.history.pushState(
      { 
        stackPosition: Date.now(),
        isReport: isGoingToReport,
        isScreenChange,
        isQuestionSet: updates.currentQuestions !== undefined,
        fromScreen: state.showReport ? 'report' : 
                   state.currentlyLoadingModule ? 'loading' :
                   state.currentQuestions?.multiSelect ? 'categories' :
                   state.currentQuestions ? 'questions' : 'welcome'
      },
      '',
      window.location.pathname
    );
  }, [state, navigationStack.length]);

  // Go back to previous state with enhanced handling
  const goBack = useCallback(() => {
    if (navigationStack.length === 0) {
      console.log('Cannot go back: navigation stack is empty');
      return false;
    }
    
    console.log('Going back with stack size:', navigationStack.length);
    
    // Use history.back() to trigger the popstate event
    // Our popstate handler will take care of restoring the previous state
    window.history.back();
    
    return true;
  }, [navigationStack.length]);

  // Reset state to initial values
  const resetState = useCallback(() => {
    console.log('Resetting state to initial values');
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