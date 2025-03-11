const initialQuestions = [
    {
      id: "q1",
      text: "What type of data does the document contain?",
      options: [
        { label: "Personal Identifiable Information (PII)", next: "confidentialityQuestions" },
        { label: "Financial data", next: "confidentialityQuestions" },
        { label: "Public information", next: "skipToClassification" },
        { label: "Passwords or authentication keys", next: "accessControlQuestions" },
      ],
    },
    {
      id: "q2",
      text: "Who is the intended audience for this document?",
      options: [
        { label: "Only specific employees", next: "confidentialityQuestions" },
        { label: "All employees", next: "integrityQuestions" },
        { label: "External partners", next: "complianceQuestions" },
        { label: "Publicly available", next: "skipToClassification" },
      ],
    },
  ];
  
  /* ----------------- Confidentiality Questions ----------------- */
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
  ];
  
  /* ----------------- Integrity Questions ----------------- */
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
  ];
  
  /* ----------------- Availability Questions ----------------- */
  const availabilityQuestions = [
    {
      id: "q7",
      text: "Does this document need to be accessible 24/7?",
      options: [
        { label: "Yes", next: "backupQuestions" },
        { label: "No", next: "skipToClassification" },
      ],
    },
    {
      id: "q8",
      text: "Should this document have regular backups?",
      options: [
        { label: "Yes", next: "backupQuestions" },
        { label: "No", next: "skipToClassification" },
      ],
    },
  ];
  
  /* ----------------- Access Control Questions ----------------- */
  const accessControlQuestions = [
    {
      id: "q9",
      text: "Should this document be restricted to specific people?",
      options: [
        { label: "Yes", next: "authenticationQuestions" },
        { label: "No", next: "skipToClassification" },
      ],
    },
    {
      id: "q10",
      text: "Does this document require two-factor authentication (MFA) for access?",
      options: [
        { label: "Yes", next: "authenticationQuestions" },
        { label: "No", next: "skipToClassification" },
      ],
    },
  ];
  
  /* ----------------- Compliance Questions ----------------- */
  const legalRegulationsQuestions = [
    {
      id: "q11",
      text: "Is this document legally required to be stored for a certain period?",
      options: [
        { label: "Yes", next: "backupQuestions" },
        { label: "No", next: "skipToClassification" },
      ],
    },
    {
      id: "q12",
      text: "Are there legal obligations on how this document should be deleted?",
      options: [
        { label: "Yes", next: "backupQuestions" },
        { label: "No", next: "skipToClassification" },
      ],
    },
  ];
  
  /* ----------------- Backup & Storage Questions ----------------- */
  const backupQuestions = [
    {
      id: "q13",
      text: "Does this document need to be stored in a fireproof or secure location?",
      options: [
        { label: "Yes", next: "skipToClassification" },
        { label: "No", next: "skipToClassification" },
      ],
    },
  ];
  
  /* ----------------- Classification Decision ----------------- */
  const classificationRules = (answers) => {
    const { q1, q3, q4, q5, q7, q9 } = answers;
  
    if (q1 === "Public information") return "Classification: Public";
    if (q3 === "Yes" || q4 === "Yes") return "Classification: Highly Confidential";
    if (q5 === "Yes") return "Classification: Confidential";
    if (q7 === "Yes" || q9 === "Yes") return "Classification: Internal Use Only";
    
    return "Classification: Unclassified";
  };
  
  export {
    initialQuestions as questions,
    confidentialityQuestions,
    integrityQuestions,
    availabilityQuestions,
    accessControlQuestions,
    legalRegulationsQuestions,
    backupQuestions,
    classificationRules,
  };
  