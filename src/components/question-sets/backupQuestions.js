// Backup & Storage questions module
const backupQuestions = [
    {
      id: "q13",
      text: "Does this document need to be stored in a fireproof or secure location?",
      options: [
        { label: "Yes", next: "backup2" },
        { label: "No", next: "backup2" },
      ],
    },
    {
      id: "backup2",
      text: "How often should this document be backed up?",
      options: [
        { label: "Real-time/continuous backup", next: "backup3" },
        { label: "Daily backup", next: "backup3" },
        { label: "Weekly backup", next: "backup3" },
        { label: "Monthly backup", next: "backup3" }
      ]
    },
    {
      id: "backup3",
      text: "What is the required retention period for this document?",
      options: [
        { label: "Less than 1 year", next: "skipToClassification" },
        { label: "1-3 years", next: "skipToClassification" },
        { label: "3-7 years", next: "skipToClassification" },
        { label: "7+ years", next: "skipToClassification" },
        { label: "Indefinite/permanent retention", next: "skipToClassification" }
      ]
    }
  ];
  
  export default backupQuestions;