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
    if (!questionStructure) {
      console.error('Invalid question structure provided', questionStructure);
      return [];
    }
    
    if (!Array.isArray(questionStructure)) {
      console.error('Question structure is not an array', questionStructure);
      return [];
    }
    
    return questionStructure.map(question => {
      if (!question) {
        console.error('Null or undefined question in structure');
        return {
          id: 'error',
          text: 'Error: Missing question data',
          options: []
        };
      }
      
      return {
        ...question,
        text: question.textKey ? t(question.textKey) : question.text,
        options: Array.isArray(question.options) ? question.options.map(option => {
          if (!option) return null;
          
          return {
            ...option,
            label: option.labelKey ? t(option.labelKey) : option.label,
          };
        }).filter(Boolean) : []
      };
    });
  }, [questionStructure, t]);
  
  return translatedQuestions;
} 