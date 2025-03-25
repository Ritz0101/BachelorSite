// Intellectual Property questions module
const intellectualPropertyQuestions = [
    {
      id: "ip1",
      text: "What type of intellectual property does the document contain?",
      options: [
        { label: "Trade secrets", next: "ip2" },
        { label: "Patent information (applications, research)", next: "ip2" },
        { label: "Copyright materials", next: "ip2" },
        { label: "Proprietary algorithms or code", next: "ip2" },
        { label: "Designs or blueprints", next: "ip2" }
      ]
    },
    {
      id: "ip2",
      text: "What is the development status of this intellectual property?",
      options: [
        { label: "Early stage/concept", next: "ip3" },
        { label: "Under active development", next: "ip3" },
        { label: "Ready for patent/copyright filing", next: "ip3" },
        { label: "Already protected by legal means", next: "ip3" }
      ]
    },
    {
      id: "ip3",
      text: "What is the commercial value of this intellectual property?",
      options: [
        { label: "Core to business operations", next: "accessControlQuestions" },
        { label: "Significant competitive advantage", next: "accessControlQuestions" },
        { label: "Moderate value", next: "accessControlQuestions" },
        { label: "Minimal value but still proprietary", next: "accessControlQuestions" }
      ]
    }
  ];
  
  export default intellectualPropertyQuestions;