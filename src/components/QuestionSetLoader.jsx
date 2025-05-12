import React, { useEffect } from 'react';
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