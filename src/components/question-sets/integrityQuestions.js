// Integrity questions module
const integrityQuestions = [
    {
      id: "q5",
      text: "Does the document require proof that it has not been altered?",
      options: [
        { label: "Yes", next: "accessControlQuestions" },
        { label: "No", next: "availabilityQuestions" },
      ],
    },
    {
      id: "q6",
      text: "Does the document need digital signatures or version tracking?",
      options: [
        { label: "Yes", next: "accessControlQuestions" },
        { label: "No", next: "availabilityQuestions" },
      ],
    },
    {
      id: "financial1",
      text: "What type of financial information does this document contain?",
      options: [
        { label: "Budget information", next: "financial2" },
        { label: "Financial reports", next: "financial2" },
        { label: "Salary or compensation details", next: "financial2" },
        { label: "Investment or strategic financial plans", next: "financial2" },
        { label: "Banking or payment information", next: "financial2" }
      ]
    },
    {
      id: "financial2",
      text: "What is the scope of this financial information?",
      options: [
        { label: "Individual level", next: "availabilityQuestions" },
        { label: "Department level", next: "availabilityQuestions" },
        { label: "Organization-wide", next: "accessControlQuestions" },
        { label: "Including external partners or clients", next: "accessControlQuestions" }
      ]
    }
  ];
  
  export default integrityQuestions;