// Confidentiality questions module
const confidentialityQuestions = [
    {
      id: "q3",
      text: "Would exposure of this document cause legal or reputational damage?",
      options: [
        { label: "Yes", next: "legalRegulationsQuestions" },
        { label: "No", next: "integrityQuestions" },
      ],
    },
    {
      id: "q4",
      text: "Is the document subject to GDPR, HIPAA, or other regulations?",
      options: [
        { label: "Yes", next: "legalRegulationsQuestions" },
        { label: "No", next: "integrityQuestions" },
      ],
    },
    {
      id: "pii1",
      text: "What types of personal information does the document contain?",
      options: [
        { label: "Names and basic contact information", next: "pii2" },
        { label: "Financial data (credit card, bank details)", next: "pii2" },
        { label: "Health information", next: "pii2" },
        { label: "Biometric data", next: "pii2" },
        { label: "Location data", next: "pii2" }
      ]
    },
    {
      id: "pii2",
      text: "How many individuals' personal data is included in this document?",
      options: [
        { label: "Just one person", next: "integrityQuestions" },
        { label: "A small group (2-10 people)", next: "integrityQuestions" },
        { label: "A large group (10+ people)", next: "integrityQuestions" },
        { label: "Mass data (100+ people)", next: "legalRegulationsQuestions" }
      ]
    }
  ];
  
  export default confidentialityQuestions;