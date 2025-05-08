import { useState, useEffect } from 'react';
import { useTranslatedQuestionSet } from './TranslatedQuestionSet';

/**
 * Hook to load question sets from module files and apply translations
 * 
 * @param {string} moduleName - Name of the question set module to load
 * @returns {Object} - Object containing questions, loading state, and any errors
 */
export function useQuestionSetLoader(moduleName) {
  const [questionStructure, setQuestionStructure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Step 1: Load the question structure from the module
  useEffect(() => {
    const loadQuestionStructure = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Loading question set module: ${moduleName}`);
        const module = await import(`./question-sets/${moduleName}.js`);
        
        if (!module.default) {
          throw new Error(`Module ${moduleName} has no default export`);
        }
        
        let structure = module.default;
        // Handle if the module exports a function instead of direct structure
        if (typeof structure === 'function') {
          try {
            // For backward compatibility - if the function doesn't use hooks internally
            structure = structure();
          } catch (functionError) {
            console.error(`Error executing function for ${moduleName}:`, functionError);
            throw new Error(`Cannot execute function export from ${moduleName}: ${functionError.message}`);
          }
        }
        
        if (!Array.isArray(structure)) {
          throw new Error(`Question set from ${moduleName} is not an array`);
        }
        
        console.log(`Successfully loaded structure for ${moduleName}`);
        setQuestionStructure(structure);
      } catch (err) {
        console.error(`Error loading question structure for ${moduleName}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadQuestionStructure();
  }, [moduleName]);

  // Step 2: Apply translations using our custom hook
  const translatedQuestions = useTranslatedQuestionSet(questionStructure);

  return { 
    questions: translatedQuestions, 
    loading, 
    error,
    questionStructure 
  };
} 