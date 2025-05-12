// Legal Regulations questions module
// Using textKey and labelKey instead of direct translation calls

export default [
  {
    id: "legalReg1",
    textKey: 'legal_regulations_questions_module_legalReg1',
    options: [
      { labelKey: 'legalReg1_option1', next: "legalReg2" },
      { labelKey: 'legalReg1_option2', next: "legalReg2" },
      { labelKey: 'legalReg1_option3', next: "legalReg2" },
      { labelKey: 'legalReg1_option4', next: "legalReg2" },
      { labelKey: 'legalReg1_option5', next: "legalReg2" },
      { labelKey: 'legalReg1_option6', next: "regulationHelp" },
      { labelKey: 'legalReg1_option7', next: "integrityQuestions" }
    ]
  },
  {
    id: "regulationHelp",
    textKey: 'legal_regulations_questions_module_regulationHelp',
    options: [
      { labelKey: 'regulationHelp_option1', next: "regulationGuidance" },
      { labelKey: 'regulationHelp_option2', next: "integrityQuestions" }
    ]
  },
  {
    id: "regulationGuidance",
    textKey: 'legal_regulations_questions_module_regulationGuidance',
    infoTextKey: 'legal_regulations_questions_module_regulationGuidance_infotext',
    options: [
      { labelKey: 'regulationGuidance_option1', next: "integrityQuestions" },
      { labelKey: 'regulationGuidance_option2', next: "integrityQuestions" }
    ]
  },
  {
    id: "legalReg2",
    textKey: 'legal_regulations_questions_module_legalReg2',
    options: [
      { labelKey: 'legalReg2_option1', next: "integrityQuestions" },
      { labelKey: 'legalReg2_option2', next: "integrityQuestions" },
      { labelKey: 'legalReg2_option3', next: "integrityQuestions" },
      { labelKey: 'legalReg2_option4', next: "accessControlQuestions" }
    ]
  }
];