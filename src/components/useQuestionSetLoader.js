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
    if (!moduleName) {
      setError(new Error('No module name provided'));
      setLoading(false);
      return;
    }
    
    const loadQuestionStructure = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Loading question set module: ${moduleName}`);
        
        // Check if this is trying to load a specific question ID rather than a module
        if (moduleName.includes('Reg') && !moduleName.includes('Questions')) {
          throw new Error(`"${moduleName}" appears to be a question ID, not a module name. Use the full module name ending with "Questions".`);
        }
        
        // Safely try to import the module
        let module;
        try {
          // Ensure the path includes the correct file extension
          const modulePath = moduleName.endsWith('.js') ? moduleName : `./question-sets/${moduleName}.js`;
          module = await import(modulePath);
        } catch (importError) {
          console.error(`Failed to import module ${moduleName}:`, importError);
          throw new Error(`Module ${moduleName} could not be loaded: ${importError.message}`);
        }
        
        if (!module || !module.default) {
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
        
        if (!structure) {
          throw new Error(`Question set from ${moduleName} is null or undefined`);
        }
        
        if (!Array.isArray(structure)) {
          throw new Error(`Question set from ${moduleName} is not an array`);
        }
        
        if (structure.length === 0) {
          console.warn(`Question set from ${moduleName} is empty`);
        }
        
        console.log(`Successfully loaded structure for ${moduleName}`);
        setQuestionStructure(structure);
      } catch (err) {
        console.error(`Error loading question structure for ${moduleName}:`, err);
        setError(err);
        setQuestionStructure([]);  // Set empty array to prevent null issues
      } finally {
        setLoading(false);
      }
    };
    
    loadQuestionStructure();
  }, [moduleName]);

  // Step 2: Apply translations using our custom hook
  const translatedQuestions = useTranslatedQuestionSet(questionStructure);

  return { 
    questions: translatedQuestions || [], // Ensure we always return an array 
    loading, 
    error,
    questionStructure 
  };
} 