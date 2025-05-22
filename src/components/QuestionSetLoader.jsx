import React, { useEffect, useState } from 'react';
import { useQuestionSetLoader } from './useQuestionSetLoader';

/**
 * Component that loads a question set and provides it to its parent
 * through the onLoad callback
 * 
 * @param {Object} props
 * @param {string} props.moduleName - Name of the module to load
 * @param {Function} props.onLoad - Callback when questions are loaded
 * @param {Function} props.onError - Callback when an error occurs
 */
export function QuestionSetLoader({ moduleName, onLoad, onError }) {
  const { questions, loading, error } = useQuestionSetLoader(moduleName);
  const [loadAttempts, setLoadAttempts] = useState(0);
  
  // Add a safety timeout to prevent getting stuck in loading state
  useEffect(() => {
    // If we're loading, set a timeout to fail after 5 seconds
    if (loading && loadAttempts < 3) {
      const timeoutId = setTimeout(() => {
        console.error(`Loading timeout for module ${moduleName} after 5 seconds`);
        setLoadAttempts(prev => prev + 1);
        onError(new Error(`Loading timeout for module ${moduleName}`));
      }, 5000); // 5 second timeout
      
      return () => clearTimeout(timeoutId);
    }
  }, [loading, moduleName, onError, loadAttempts]);
  
  useEffect(() => {
    // Only call onLoad if we have valid questions
    if (!loading && Array.isArray(questions)) {
      if (questions.length > 0) {
        console.log(`Providing ${questions.length} translated questions for ${moduleName} to parent`);
        onLoad(questions);
      } else {
        console.error(`Loaded empty question array for ${moduleName}`);
        onError(new Error(`No questions loaded for module ${moduleName}`));
      }
    }
    
    if (error && !loading) {
      console.error(`Error loading questions for ${moduleName}:`, error);
      onError(error);
    }
  }, [questions, loading, error, onLoad, onError, moduleName]);
  
  return null;
} 