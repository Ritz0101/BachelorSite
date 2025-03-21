// Main Questions.jsx file - This will now have the initial category selection question

const questions = {
  id: "categories",
  text: "What types of data does the document contain? (Select all that apply)",
  multiSelect: true,
  options: [
    { label: "Personal Identifiable Information (PII)", value: "pii" },
    { label: "Financial data", value: "financial" },
    { label: "Customer data", value: "customer" },
    { label: "Intellectual property", value: "ip" },
    { label: "HR/Personnel information", value: "hr" },
    { label: "Business strategy", value: "strategy" },
    { label: "Operational documents", value: "operational" },
    { label: "Public information", value: "public" },
    { label: "Passwords or authentication keys", value: "credentials" }
  ]
};

// Classification rules function 
const classificationRules = (answers) => {
  const { q1, q3, q4, q5, q7, q9 } = answers;

  if (q1 === "Public information") return "Public";
  if (q3 === "Yes" || q4 === "Yes") return "Highly Confidential";
  if (q5 === "Yes") return "Confidential";
  if (q7 === "Yes" || q9 === "Yes") return "Internal Use Only";
  
  return "Unclassified";
};

export { questions, classificationRules };