// Main Questions.jsx file - This will now have the initial category selection question
import { useTranslation } from 'react-i18next';

// Create a component to use the translation hook
const QuestionsData = () => {
  try {
    console.log("QuestionsData function called");
    const { t } = useTranslation();
    console.log("useTranslation hook in QuestionsData called successfully");
    
    // Attempt to create the question object with translations
    const categoryQuestion = {
      id: "categories",
      text: t('default_questions_categories'),
      multiSelect: true,
      options: [
        { label: t('personal_identifiable_information') || "Personal Identifiable information (PII)", value: "pii" },
        { label: t('financial_data') || "Financial data", value: "financial" },
        { label: t('customer_data') || "Customer data", value: "customer" },
        { label: t('intellectual_property') || "Intellectual property", value: "ip" },
        { label: t('hr_personell_information') || "HR/Personnel information", value: "hr" },
        { label: t('business_strategy') || "Business strategy", value: "strategy" },
        { label: t('operation_documents') || "Operational documents", value: "operational" },
        { label: t('public_information') || "Public Information", value: "public" },
        { label: t('passwords_authentication_keys') || "Passwords or authentication keys", value: "credentials" }
      ]
    };
    
    console.log("Category question created:", categoryQuestion);
    return categoryQuestion;
  } catch (error) {
    console.error("Error in QuestionsData function:", error);
    
    // Fallback to English if translation fails
    return {
      id: "categories",
      text: "What types of data does the document contain? (Select all that apply)",
      multiSelect: true,
      options: [
        { label: "Personal Identifiable information (PII)", value: "pii" },
        { label: "Financial data", value: "financial" },
        { label: "Customer data", value: "customer" },
        { label: "Intellectual property", value: "ip" },
        { label: "HR/Personnel information", value: "hr" },
        { label: "Business strategy", value: "strategy" },
        { label: "Operational documents", value: "operational" },
        { label: "Public Information", value: "public" },
        { label: "Passwords or authentication keys", value: "credentials" }
      ]
    };
  }
};

// Classification rules function that uses translations
const classificationRulesFunction = (answers) => {
  try {
    console.log("classificationRulesFunction called with answers:", answers);
    const { t } = useTranslation();
    console.log("useTranslation hook in classificationRules called successfully");
    
    const { q1, q3, q4, q5, q7, q9 } = answers;
    
    console.log("Extracted answer keys:", { q1, q3, q4, q5, q7, q9 });

    if (q1 === t('public_information')) return t('report_level_public_title') || "Public";
    if (q3 === t('common_yes') || q4 === t('common_yes')) return t('report_level_highly_confidential_title') || "Highly Confidential";
    if (q5 === t('common_yes')) return t('report_level_confidential_title') || "Confidential";
    if (q7 === t('common_yes') || q9 === t('common_yes')) return t('report_level_internal_title') || "Internal Use Only";
    
    return t('report_level_public_title') || "Public";
  } catch (error) {
    console.error("Error in classificationRulesFunction:", error);
    
    // Fallback logic in English
    const { q1, q3, q4, q5, q7, q9 } = answers;
    
    if (q1 === "Public Information") return "Public";
    if (q3 === "Yes" || q4 === "Yes") return "Highly Confidential";
    if (q5 === "Yes") return "Confidential";
    if (q7 === "Yes" || q9 === "Yes") return "Internal Use Only";
    
    return "Public";
  }
};

// Export a function that will provide the questions with translation
export const getQuestions = () => {
  console.log("getQuestions function called");
  
  try {
    // Try to get the questions using the translation hook
    const questionData = QuestionsData();
    console.log("Questions data obtained successfully:", questionData);
    return questionData;
  } catch (error) {
    console.error("Error in getQuestions:", error);
    
    // Fallback if translation or hook fails
    console.log("Using fallback question data due to error");
    return {
      id: "categories",
      text: "What types of data does the document contain? (Select all that apply)",
      multiSelect: true,
      options: [
        { label: "Personal Identifiable information (PII)", value: "pii" },
        { label: "Financial data", value: "financial" },
        { label: "Customer data", value: "customer" },
        { label: "Intellectual property", value: "ip" },
        { label: "HR/Personnel information", value: "hr" },
        { label: "Business strategy", value: "strategy" },
        { label: "Operational documents", value: "operational" },
        { label: "Public Information", value: "public" },
        { label: "Passwords or authentication keys", value: "credentials" }
      ]
    };
  }
};

// Export the function to get the classification rules
export const getClassificationRules = () => {
  console.log("getClassificationRules function called");
  return classificationRulesFunction;
};