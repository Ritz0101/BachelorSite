// Access Control questions module
const accessControlQuestions = [
    {
      id: "q9",
      text: "Should this document be restricted to specific people?",
      options: [
        { label: "Yes", next: "accessControl2" },
        { label: "No", next: "skipToClassification" },
      ],
    },
    {
      id: "q10",
      text: "Does this document require two-factor authentication (MFA) for access?",
      options: [
        { label: "Yes", next: "accessControl2" },
        { label: "No", next: "skipToClassification" },
      ],
    },
    {
      id: "accessControl2",
      text: "How should access to this document be managed?",
      options: [
        { label: "Basic password protection", next: "skipToClassification" },
        { label: "Role-based access control", next: "skipToClassification" },
        { label: "Multi-factor authentication", next: "skipToClassification" },
        { label: "Time-limited access with auditing", next: "skipToClassification" }
      ]
    },
    {
      id: "accessControl3",
      text: "Who should be able to modify this document?",
      options: [
        { label: "Document owner only", next: "skipToClassification" },
        { label: "Specific authorized individuals", next: "skipToClassification" },
        { label: "Team members with appropriate permissions", next: "skipToClassification" },
        { label: "Read-only for most users", next: "skipToClassification" }
      ]
    }
  ];
  
  export default accessControlQuestions;