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
        { label: "No specific regulation", next: "integrityQuestions" }
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