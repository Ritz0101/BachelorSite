// Availability questions module
const availabilityQuestions = [
    {
      id: "q7",
      text: "Does this document need to be accessible 24/7?",
      options: [
        { label: "Yes", next: "backupQuestions" },
        { label: "No", next: "backupQuestions" },
      ],
    },
    {
      id: "q8",
      text: "Should this document have regular backups?",
      options: [
        { label: "Yes", next: "backupQuestions" },
        { label: "No", next: "accessControlQuestions" },
      ],
    },
    {
      id: "availability1",
      text: "What would be the impact if this document was temporarily unavailable?",
      options: [
        { label: "No significant impact", next: "accessControlQuestions" },
        { label: "Minor operational disruption", next: "accessControlQuestions" },
        { label: "Significant business disruption", next: "backupQuestions" },
        { label: "Critical impact on operations", next: "backupQuestions" }
      ]
    },
    {
      id: "availability2",
      text: "Who needs access to this document and when?",
      options: [
        { label: "Only specific individuals during business hours", next: "backupQuestions" },
        { label: "Team members during business hours", next: "backupQuestions" },
        { label: "Multiple teams around the clock", next: "backupQuestions" },
        { label: "Anyone in the organization anytime", next: "backupQuestions" }
      ]
    }
  ];
  
  export default availabilityQuestions;