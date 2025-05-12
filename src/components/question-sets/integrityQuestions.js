// Integrity questions module
// Using textKey and labelKey instead of direct translation calls

export default [
  {
    id: "q5",
    textKey: 'integrity_questions_module_q5',
    options: [
      { labelKey: 'common_yes', next: "accessControlQuestions" },
      { labelKey: 'common_no', next: "skipToClassification" },
    ],
  },
  {
    id: "q6",
    textKey: 'integrity_questions_module_q6',
    options: [
      { labelKey: 'common_yes', next: "accessControlQuestions" },
      { labelKey: 'common_no', next: "availabilityQuestions" },
    ],
  },
  {
    id: "financial1",
    textKey: 'financial1_question',
    options: [
      { labelKey: 'financial1_option1', next: "financial2" },
      { labelKey: 'financial1_option2', next: "financial2" },
      { labelKey: 'financial1_option3', next: "financial2" },
      { labelKey: 'financial1_option4', next: "financial2" },
      { labelKey: 'financial1_option5', next: "financial2" }
    ]
  },
  {
    id: "financial2",
    textKey: 'financial2_question',
    options: [
      { labelKey: 'financial2_option1', next: "skipToClassification" },
      { labelKey: 'financial2_option2', next: "skipToClassification" },
      { labelKey: 'financial2_option3', next: "accessControlQuestions" },
      { labelKey: 'financial2_option4', next: "accessControlQuestions" }
    ]
  }
];