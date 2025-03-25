// Legal Regulations questions module
const legalRegulationsQuestions = [
    {
      id: "legalReg1",
      text: "Which specific regulations apply to this document?",
      options: [
        { label: "GDPR", next: "legalReg2" },
        { label: "HIPAA", next: "legalReg2" },
        { label: "SOX (Sarbanes-Oxley)", next: "legalReg2" },
        { label: "PCI DSS", next: "legalReg2" },
        { label: "Other specific regulation", next: "legalReg2" },
        { label: "I don't know", next: "regulationHelp" },
        { label: "No specific regulation", next: "integrityQuestions" }
      ]
    },
    {
      id: "regulationHelp",
      text: "Would you like assistance identifying applicable regulations?",
      options: [
        { label: "Yes, help me identify regulations", next: "regulationGuidance" },
        { label: "No, proceed with classification", next: "integrityQuestions" }
      ]
    },
    {
      id: "regulationGuidance",
      text: "Based on the information types you selected, these regulations may apply:",
      infoText: "Documents containing personal data are often subject to GDPR in Europe or various privacy laws. Financial data may be subject to SOX or PCI DSS. Healthcare information falls under HIPAA in the US or similar healthcare privacy laws in other countries.",
      options: [
        { label: "Proceed with classification", next: "integrityQuestions" },
        { label: "I'll consult with our compliance team", next: "integrityQuestions" }
      ]
    },
    {
      id: "legalReg2",
      text: "What is the potential legal or financial impact of non-compliance?",
      options: [
        { label: "Minor penalties", next: "integrityQuestions" },
        { label: "Significant fines", next: "integrityQuestions" },
        { label: "Potential legal action", next: "integrityQuestions" },
        { label: "Severe business disruption", next: "accessControlQuestions" }
      ]
    }
  ];
  
  export default legalRegulationsQuestions;