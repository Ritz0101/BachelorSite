import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Function to create translated questions from keys
function createTranslatedQuestions(t) {
  return {
    'availabilityQuestions': [
      {
        id: "availability1",
        text: t('availability1_question'),
        options: [
          { label: t('availability1_option1'), next: "finalQuestions" },
          { label: t('availability1_option2'), next: "finalQuestions" },
          { label: t('availability1_option3'), next: "finalQuestions" },
          { label: t('availability1_option4'), next: "finalQuestions" }
        ]
      }
    ],
    'legalRegulationsQuestions': [
      {
        id: "legalReg1",
        text: t('legal_regulations_questions_module_legalReg1'),
        options: [
          { label: t('legalReg1_option1'), next: "legalReg2" },
          { label: t('legalReg1_option2'), next: "legalReg2" },
          { label: t('legalReg1_option3'), next: "legalReg2" },
          { label: t('legalReg1_option4'), next: "legalReg2" },
          { label: t('legalReg1_option5'), next: "legalReg2" },
          { label: t('legalReg1_option6'), next: "integrityQuestions" },
          { label: t('legalReg1_option7'), next: "integrityQuestions" }
        ]
      },
      {
        id: "legalReg2",
        text: t('legal_regulations_questions_module_legalReg2'),
        options: [
          { label: t('legalReg2_option1'), next: "integrityQuestions" },
          { label: t('legalReg2_option2'), next: "integrityQuestions" },
          { label: t('legalReg2_option3'), next: "integrityQuestions" },
          { label: t('legalReg2_option4'), next: "integrityQuestions" }
        ]
      }
    ],
    'confidentialityQuestions': [
      {
        id: "pii1",
        text: t('pii1_question'),
        options: [
          { label: t('pii1_option1'), next: "pii2" },
          { label: t('pii1_option2'), next: "pii2" },
          { label: t('pii1_option3'), next: "pii2" },
          { label: t('pii1_option4'), next: "pii2" },
          { label: t('pii1_option5'), next: "pii2" }
        ]
      },
      {
        id: "pii2",
        text: t('pii2_question'),
        options: [
          { label: t('pii2_option1'), next: "integrityQuestions" },
          { label: t('pii2_option2'), next: "integrityQuestions" },
          { label: t('pii2_option3'), next: "integrityQuestions" },
          { label: t('pii2_option4'), next: "integrityQuestions" }
        ]
      }
    ],
    'integrityQuestions': [
      {
        id: "integrity1",
        text: t('integrity_questions_module_integrity1'),
        options: [
          { label: t('integrity1_option1'), next: "finalQuestions" },
          { label: t('integrity1_option2'), next: "finalQuestions" },
          { label: t('integrity1_option3'), next: "finalQuestions" },
          { label: t('integrity1_option4'), next: "finalQuestions" }
        ]
      }
    ],
    'accessControlQuestions': [
      {
        id: "access1",
        text: t('access_control_questions_module_access1'),
        options: [
          { label: t('access1_option1'), next: "finalQuestions" },
          { label: t('access1_option2'), next: "finalQuestions" },
          { label: t('access1_option3'), next: "finalQuestions" },
          { label: t('access1_option4'), next: "finalQuestions" }
        ]
      }
    ]
  };
}

// List of modules known to have hook issues
const PROBLEMATIC_MODULES = [
  'availabilityQuestions',
  'legalRegulationsQuestions',
  'confidentialityQuestions'
];

// Dynamic import with React context
export function useQuestionSet(moduleName) {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Loading question set module: ${moduleName}`);
    setLoading(true);
    setError(null);
    
    // Get translated fallback questions using current language
    const translatedFallbacks = createTranslatedQuestions(t);
    
    // Special case for legalRegulationsQuestions which seems particularly problematic
    if (moduleName === 'legalRegulationsQuestions') {
      console.log('Using translated fallback for legalRegulationsQuestions');
      setQuestions(translatedFallbacks['legalRegulationsQuestions']);
      setLoading(false);
      return;
    }
    
    // Handle special case for other problematic modules with known issues
    if (PROBLEMATIC_MODULES.includes(moduleName)) {
      console.log(`Using predefined fallback for ${moduleName} to avoid hook errors`);
      if (translatedFallbacks[moduleName]) {
        setQuestions(translatedFallbacks[moduleName]);
        setLoading(false);
        return;
      }
    }

    // For other modules, try to load them normally
    const loadModule = async () => {
      try {
        // Import the module with detailed error logging
        console.log(`Attempting to import: ./question-sets/${moduleName}.js`);
        const importPromise = import(`./question-sets/${moduleName}.js`);
        
        const module = await importPromise.catch(err => {
          console.error(`Import error for ${moduleName}:`, err);
          throw new Error(`Failed to import ${moduleName}: ${err.message}`);
        });
        
        console.log(`Module successfully loaded: ${moduleName}`, module);

        // Check if it's a valid module
        if (!module || !module.default) {
          console.error(`Module ${moduleName} has no default export`);
          throw new Error(`Module ${moduleName} has no default export`);
        }

        // Handle both function and direct array exports
        let questionSet;
        if (typeof module.default === 'function') {
          try {
            console.log(`Module ${moduleName} exports a function, executing with t function`);
            // Use our own translation function in a safe context
            questionSet = module.default();
          } catch (functionError) {
            console.error(`Error executing function for ${moduleName}:`, functionError);
            // Fall back to hardcoded questions if available
            if (translatedFallbacks[moduleName]) {
              console.log(`Falling back to predefined questions for ${moduleName}`);
              questionSet = translatedFallbacks[moduleName];
            } else {
              throw functionError;
            }
          }
        } else {
          console.log(`Module ${moduleName} exports a direct value`);
          questionSet = module.default;
        }

        // Validate question set
        if (!questionSet) {
          throw new Error("Question set is undefined");
        }
        
        if (!Array.isArray(questionSet)) {
          throw new Error("Question set is not an array");
        }
        
        if (questionSet.length === 0) {
          throw new Error("Question set is empty");
        }
        
        // Success - set questions
        console.log(`Valid question set obtained for ${moduleName}:`, questionSet);
        setQuestions(questionSet);
      } catch (error) {
        console.error(`Error loading question set ${moduleName}:`, error);
        
        // Try fallback questions if available
        if (translatedFallbacks[moduleName]) {
          console.log(`Using fallback questions for ${moduleName} after error`);
          setQuestions(translatedFallbacks[moduleName]);
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadModule();
  }, [moduleName, t]);

  return { questions, loading, error };
}

// A component to load a question set and provide it to its children
export function QuestionSetLoader({ moduleName, onLoad, onError }) {
  const { t } = useTranslation();
  const { questions, loading, error } = useQuestionSet(moduleName);
  
  useEffect(() => {
    if (questions && !loading) {
      // Add safety check for translationKey errors - ensure all questions have proper text and options
      try {
        const safeQuestions = questions.map(q => ({
          ...q,
          // If text is a translation key that failed to translate, provide a fallback
          text: q.text && typeof q.text === 'string' && !q.text.includes('_question') && !q.text.includes('module_') 
            ? q.text 
            : t(`${moduleName}_${q.id}_fallback`, q.text || `Question ${q.id || 'unknown'}`),
          options: Array.isArray(q.options) ? q.options.map(opt => ({
            ...opt,
            // If label is a translation key that failed, provide a fallback
            label: opt.label && typeof opt.label === 'string' && !opt.label.includes('option') 
              ? opt.label 
              : t(`${q.id}_option_fallback`, opt.label || 'Option'),
            next: opt.next || 'finalQuestions'
          })) : []
        }));
        
        console.log(`Calling onLoad with validated questions for ${moduleName}:`, safeQuestions);
        onLoad(safeQuestions);
      } catch (validationError) {
        console.error('Error validating questions:', validationError);
        
        // Use fallback if available
        const translatedFallbacks = createTranslatedQuestions(t);
        if (translatedFallbacks[moduleName]) {
          console.log(`Using fallback after validation error for ${moduleName}`);
          onLoad(translatedFallbacks[moduleName]);
        } else {
          onError(validationError);
        }
      }
    }
    
    if (error && !loading) {
      console.log(`Calling onError with error for ${moduleName}:`, error);
      
      // Always provide fallback for problematic modules if there's an error
      const translatedFallbacks = createTranslatedQuestions(t);
      if (PROBLEMATIC_MODULES.includes(moduleName) && translatedFallbacks[moduleName]) {
        console.log(`Providing ${moduleName} fallback after error`);
        onLoad(translatedFallbacks[moduleName]);
      } else {
        onError(error);
      }
    }
  }, [questions, loading, error, onLoad, onError, moduleName, t]);
  
  return null;
} 