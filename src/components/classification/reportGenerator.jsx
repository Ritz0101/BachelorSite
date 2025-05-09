import { useEffect, useState } from "react";

function ReportGenerator({
  documentInfo,
  answers,
  selectedCategories,
  onReset,
}) {
  const [classificationLevels, setClassificationLevels] = useState([]);
  const [strictestClassification, setStrictestClassification] = useState({
    category: "Default",
    level: "Public",
    reason: "No sensitive information identified",
  });
  const [email, setEmail] = useState("");
  const [certificateSent, setCertificateSent] = useState(false);

  // Classification level hierarchy
  const classificationHierarchy = {
    Public: 0,
    "Internal Use Only": 1,
    Confidential: 2,
    "Highly Confidential": 3,
  };

  useEffect(() => {
    // Determine classification levels for each selected category
    const levels = [];

    if (selectedCategories.includes("pii")) {
      levels.push({
        category: "Personal Identifiable Information",
        level: "Confidential",
        reason: "Contains personal data subject to privacy regulations",
      });
    }

    if (selectedCategories.includes("financial")) {
      levels.push({
        category: "Financial Information",
        level: "Confidential",
        reason: "Contains sensitive financial data",
      });
    }

    if (selectedCategories.includes("credentials")) {
      levels.push({
        category: "Authentication Credentials",
        level: "Highly Confidential",
        reason: "Contains access credentials that could compromise security",
      });
    }

    if (selectedCategories.includes("hr")) {
      levels.push({
        category: "HR/Personnel Information",
        level: "Confidential",
        reason: "Contains private employee information",
      });
    }

    if (selectedCategories.includes("ip")) {
      levels.push({
        category: "Intellectual Property",
        level: "Confidential",
        reason: "Contains proprietary business information",
      });
    }

    if (selectedCategories.includes("strategy")) {
      levels.push({
        category: "Business Strategy",
        level: "Confidential",
        reason: "Contains sensitive strategic plans",
      });
    }

    if (selectedCategories.includes("operational")) {
      levels.push({
        category: "Operational Documents",
        level: "Internal Use Only",
        reason: "Contains day-to-day operational information",
      });
    }

    if (selectedCategories.includes("public")) {
      levels.push({
        category: "Public Information",
        level: "Public",
        reason: "Contains information intended for public consumption",
      });
    }

    // Find strictest classification
    let strictest = {
      category: "Default",
      level: "Public",
      reason: "No sensitive information identified",
    };

    levels.forEach((classification) => {
      if (
        classificationHierarchy[classification.level] >
        classificationHierarchy[strictest.level]
      ) {
        strictest = classification;
      }
    });

    setClassificationLevels(levels);
    setStrictestClassification(strictest);
  }, [selectedCategories]);

  // Handling instructions based on classification
  const handlingInstructions = {
    Public: "can be freely shared and distributed",
    "Internal Use Only": "should only be shared within the organization",
    Confidential: "must be encrypted and access-controlled",
    "Highly Confidential":
      "requires strict access control, encryption, and audit logging",
  };

  // Generate security controls based on classification and answers
  const generateSecurityControls = () => {
    const controls = [];

    // Add classification-based controls
    if (
      strictestClassification.level === "Confidential" ||
      strictestClassification.level === "Highly Confidential"
    ) {
      controls.push("Encrypt document when at rest and in transit");
      controls.push("Implement role-based access control");
      controls.push("Maintain access logs");
    }

    if (strictestClassification.level === "Highly Confidential") {
      controls.push("Implement multi-factor authentication for access");
      controls.push("Perform regular access reviews");
      controls.push("Apply digital rights management");
    }

    // Add controls based on specific answers
    if (answers.q7 === "Yes") {
      controls.push("Implement high availability measures");
    }

    if (answers.q9 === "Yes") {
      controls.push("Restrict access to authorized personnel only");
    }

    if (answers.q5 === "Yes") {
      controls.push("Implement version control and document integrity checks");
    }

    if (answers.q11 === "Yes") {
      controls.push(
        "Implement retention policies according to legal requirements"
      );
    }

    return controls;
  };

  // First check if we have any document details at all
  const hasDocumentDetails =
    documentInfo.name ||
    documentInfo.type ||
    documentInfo.owner ||
    documentInfo.department;

  // Check if we have a description
  const hasDescription =
    documentInfo.description && documentInfo.description.trim() !== "";

  // Classification comparison table data
  const classificationComparison = [
    {
      level: "Public",
      description: "Information intended for public release",
      examples:
        "Marketing materials, public announcements, general product info",
      controls: "No special security controls required",
    },
    {
      level: "Internal Use Only",
      description: "Non-sensitive information meant only for company use",
      examples: "Meeting minutes, internal communications, operational docs",
      controls: "Basic access controls, no distribution outside organization",
    },
    {
      level: "Confidential",
      description: "Sensitive information with restricted access",
      examples: "Financial records, customer data, business strategies",
      controls: "Access controls, encryption, audit logging",
    },
    {
      level: "Highly Confidential",
      description: "Extremely sensitive information",
      examples: "Authentication credentials, trade secrets, sensitive IP",
      controls: "Strict access controls, encryption, MFA, detailed auditing",
    },
  ];

  const handleCertificateRequest = (e) => {
    e.preventDefault();
    // Here you would implement the actual email sending logic
    console.log(`Sending certificate to: ${email}`);
    setCertificateSent(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Classification Report</h2>

      {/* Document Details Section */}
      {hasDocumentDetails && (
        <>
          <h3 className="text-lg font-semibold mb-2">Document Details</h3>
          <p className="mb-4 text-gray-700">
            {documentInfo.name && `Document "${documentInfo.name}"`}
            {documentInfo.type &&
              documentInfo.name &&
              ` (${documentInfo.type})`}
            {documentInfo.type &&
              !documentInfo.name &&
              `${documentInfo.type} document`}
            {documentInfo.owner &&
              (documentInfo.name || documentInfo.type) &&
              ` owned by ${documentInfo.owner}`}
            {documentInfo.owner &&
              !documentInfo.name &&
              !documentInfo.type &&
              `Owned by ${documentInfo.owner}`}
            {documentInfo.department &&
              documentInfo.owner &&
              ` from ${documentInfo.department} department`}
            {documentInfo.department &&
              !documentInfo.owner &&
              `From ${documentInfo.department} department`}
            {hasDocumentDetails && "."}
          </p>
        </>
      )}

      {/* Description Section */}
      {hasDescription && (
        <>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="mb-4 text-gray-700">{documentInfo.description}</p>
        </>
      )}

      {/* Classification Determination Section */}
      <h3 className="text-lg font-semibold mb-2">
        Classification Determination
      </h3>

      {classificationLevels.length > 1 ? (
        <>
          <p className="mb-2 text-gray-700">
            This document contains multiple types of sensitive information:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
            {classificationLevels.map((classification, index) => (
              <li key={index}>
                <span className="font-medium">{classification.category}:</span>{" "}
                {classification.level}
                {classification.level === strictestClassification.level && (
                  <span className="text-red-600 font-semibold">
                    {" "}
                    (Strictest)
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mb-4 text-gray-700 font-medium">
            Because this document contains {strictestClassification.category},
            which is classified as
            <span className="font-bold"> {strictestClassification.level}</span>,
            the entire document must be handled according to{" "}
            {strictestClassification.level} controls.
          </p>
          <p className="mb-4 text-gray-700 italic">
            Reason: {strictestClassification.reason}
          </p>
        </>
      ) : (
        <p className="mb-4 text-gray-700">
          This document is classified as{" "}
          <span className="font-bold">{strictestClassification.level}</span>{" "}
          because it contains {strictestClassification.category.toLowerCase()}.
        </p>
      )}

      {/* Handling Instructions Section */}
      <h3 className="text-lg font-semibold mb-2">Handling Instructions</h3>
      <p className="mb-4 text-gray-700">
        This document {handlingInstructions[strictestClassification.level]}.
      </p>

      {/* Security Controls Section */}
      <div className="mt-6 p-4 bg-purple/10 rounded-md">
        <h4 className="font-semibold mb-2">Required Security Controls:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {generateSecurityControls().map((control, index) => (
            <li key={index}>{control}</li>
          ))}
        </ul>
      </div>

      {/* Classification context table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          Classification Levels in Context
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Examples
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Controls
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classificationComparison.map((item) => (
                <tr
                  key={item.level}
                  className={
                    item.level === strictestClassification.level
                      ? "bg-purple/10"
                      : ""
                  }
                >
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`font-medium ${
                        item.level === strictestClassification.level
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      {item.level}
                      {item.level === strictestClassification.level &&
                        " ← Your Document"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{item.description}</td>
                  <td className="px-4 py-3 text-sm">{item.examples}</td>
                  <td className="px-4 py-3 text-sm">{item.controls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="mt-6 bg-dark-purple text-white px-6 py-3 rounded-md hover:bg-opacity-90 w-full transition-all duration-200 transform hover:scale-[1.01]"
      >
        Start New Classification
      </button>
    </div>
  );
}

export default ReportGenerator;
