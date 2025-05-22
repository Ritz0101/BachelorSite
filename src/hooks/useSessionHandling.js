import { useState, useEffect, useCallback } from 'react';

/**
 * Deep clone an object while handling circular references and complex types
 * @param {*} obj - Object to clone
 * @returns {*} - Cloned object
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // Create a new object
  const clonedObj = {};
  
  // Copy all properties
  Object.keys(obj).forEach(key => {
    // Skip functions
    if (typeof obj[key] === 'function') {
      return;
    }
    clonedObj[key] = deepClone(obj[key]);
  });
  
  return clonedObj;
};

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
      // Create a safe-to-serialize version of the state
      const serializableState = {
        ...state,
        // Ensure currentQuestions is properly serialized if it exists
        currentQuestions: state.currentQuestions ? deepClone(state.currentQuestions) : null,
      };
      
      sessionStorage.setItem(storageKey, JSON.stringify(serializableState));
    } catch (error) {
      console.error('Error saving state to storage:', error);
    }
  }, [state, storageKey]);

  // Save navigation stack to storage whenever it changes
  useEffect(() => {
    try {
      // Create a safe-to-serialize version of the navigation stack
      const serializableStack = navigationStack.map(stackState => ({
        ...stackState,
        // Ensure currentQuestions is properly serialized if it exists
        currentQuestions: stackState.currentQuestions ? deepClone(stackState.currentQuestions) : null,
      }));
      
      sessionStorage.setItem(`${storageKey}_stack`, JSON.stringify(serializableStack));
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
        
        // Handle case where previous state has currentlyLoadingModule but no currentQuestions
        if (previousState.currentlyLoadingModule && !previousState.currentQuestions) {
          console.log('Previous state has a loading module but no questions - this might be a serialization issue');
          
          // Try to reload the question set if needed
          if (!previousState._needsReload) {
            previousState._needsReload = true;
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
    
    // Check if this is a new question set or just moving within the same set
    const isNewQuestionSet = updates.currentlyLoadingModule !== state.currentlyLoadingModule;
    const isJustMovingToNextQuestion = updates.hasOwnProperty('currentQuestionIndex') && 
                                      !isScreenChange && 
                                      !isNewQuestionSet;
    
    // Always track navigation between questions even within the same set
    const shouldTrackNavigation = isScreenChange || isNewQuestionSet || 
                                  (updates.hasOwnProperty('currentQuestionIndex') && 
                                   updates.currentQuestionIndex !== state.currentQuestionIndex);
    
    // Log navigation for debugging
    console.log('Navigating to new state:', {
      currentStateKeys: Object.keys(state),
      updateKeys: Object.keys(updates),
      isGoingToReport,
      isScreenChange,
      isNewQuestionSet,
      isJustMovingToNextQuestion,
      shouldTrackNavigation,
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
    
    // Modified: Track all question navigation for better back button support
    if (shouldTrackNavigation) {
      // Create a deep clone of the current state to avoid reference issues
      const stateToSave = deepClone(state);
      
      // Save current state to navigation stack
      setNavigationStack(prevStack => [...prevStack, stateToSave]);
      
      // Push a new state to the browser history - use a unique key to ensure history entries are distinct
      window.history.pushState(
        { 
          stackPosition: Date.now(),
          isReport: isGoingToReport,
          isScreenChange,
          isQuestionSet: updates.currentQuestions !== undefined,
          isNewQuestionSet,
          fromScreen: state.showReport ? 'report' : 
                     state.currentlyLoadingModule ? 'loading' :
                     state.currentQuestions?.multiSelect ? 'categories' :
                     state.currentQuestions ? 'questions' : 'welcome'
        },
        '',
        window.location.pathname
      );
    }
    
    // Update state
    setState(prevState => ({
      ...prevState,
      ...updates
    }));
  }, [state, navigationStack.length]);

  // Go back to previous state with enhanced handling
  const goBack = useCallback(() => {
    if (navigationStack.length === 0) {
      console.log('Cannot go back: navigation stack is empty');
      return false;
    }
    
    console.log('Going back with stack size:', navigationStack.length);
    
    // Modified: Get the previous state directly
    const previousState = navigationStack[navigationStack.length - 1];
    
    // Check if previous state has valid question data
    if (previousState.currentQuestions === null && !previousState.showReport && !previousState.currentlyLoadingModule) {
      console.warn('Previous state has null question data, trying to recover');
      
      // Try to recover by setting a loading state that will trigger the question loader
      if (previousState.questionSequence && previousState.currentSequenceIndex >= 0) {
        const moduleToLoad = previousState.questionSequence[previousState.currentSequenceIndex];
        if (moduleToLoad) {
          console.log(`Recovering by setting current module to: ${moduleToLoad}`);
          previousState.currentlyLoadingModule = moduleToLoad;
          previousState.currentQuestions = null;
        }
      }
    }
    
    // Update navigation stack
    setNavigationStack(prevStack => prevStack.slice(0, -1));
    
    // Apply the previous state
    setState(previousState);
    
    // Ensure history state is also updated
    window.history.back();
    
    return true;
  }, [navigationStack]);

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