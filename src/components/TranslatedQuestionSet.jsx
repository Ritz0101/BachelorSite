import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Component that transforms question structures with translation keys into
 * fully translated question objects.
 * 
 * @param {Array} questionStructure - Array of question objects with textKey and labelKey properties
 * @returns {Array} - Array of questions with translated text and labels
 */
export function useTranslatedQuestionSet(questionStructure) {
  const { t } = useTranslation();
  
  // Transform the question structure with translations
  const translatedQuestions = React.useMemo(() => {
    // Handle null/undefined case with better error reporting
    if (!questionStructure) {
      console.error('Invalid question structure provided:', questionStructure);
      return [];
    }
    
    // Handle non-array values with better error reporting
    if (!Array.isArray(questionStructure)) {
      console.error('Question structure is not an array:', typeof questionStructure, questionStructure);
      // Try to recover if it's an object with a default property (sometimes happens with imports)
      if (questionStructure && typeof questionStructure === 'object' && Array.isArray(questionStructure.default)) {
        console.log('Recovering array from questionStructure.default');
        questionStructure = questionStructure.default;
      } else {
        return [];
      }
    }
    
    // Process each question with better error handling
    return questionStructure.map(question => {
      // Handle null/undefined questions
      if (!question) {
        console.error('Null or undefined question in structure');
        return {
          id: 'error',
          text: 'Error: Missing question data',
          options: []
        };
      }
      
      try {
        // Create translated question with better structure validation
        return {
          ...question,
          id: question.id || `q_${Math.random().toString(36).substr(2, 9)}`,
          text: question.textKey ? t(question.textKey) : (question.text || 'Missing question text'),
          options: Array.isArray(question.options) 
            ? question.options
                .map(option => {
                  if (!option) return null;
                  
                  // Ensure the option has all required fields
                  return {
                    ...option,
                    label: option.labelKey ? t(option.labelKey) : (option.label || 'Missing option label'),
                  };
                })
                .filter(Boolean) 
            : []
        };
      } catch (error) {
        console.error('Error processing question:', error, question);
        return {
          id: question.id || 'error',
          text: 'Error: Could not process question',
          options: []
        };
      }
    });
  }, [questionStructure, t]);
  
  return translatedQuestions;
} 