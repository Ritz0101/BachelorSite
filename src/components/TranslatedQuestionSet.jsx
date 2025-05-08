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
    if (!questionStructure || !Array.isArray(questionStructure)) {
      console.error('Invalid question structure provided', questionStructure);
      return [];
    }
    
    return questionStructure.map(question => ({
      ...question,
      text: question.textKey ? t(question.textKey, question.fallbackText || question.id) : question.text,
      options: Array.isArray(question.options) ? question.options.map(option => ({
        ...option,
        label: option.labelKey ? t(option.labelKey, option.fallbackLabel || 'Option') : option.label,
      })) : []
    }));
  }, [questionStructure, t]);
  
  return translatedQuestions;
} 