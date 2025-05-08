import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function ReportGenerator({ documentInfo, answers, selectedCategories, onReset }) {
  const { t } = useTranslation();
  const [classificationLevels, setClassificationLevels] = useState([]);
  const [strictestClassification, setStrictestClassification] = useState({
    category: "No sensitive information",
    level: "Public",
    reason: "No sensitive information identified"
  });
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [email, setEmail] = useState("");
  const [certificateSent, setCertificateSent] = useState(false);

  // Classification level hierarchy
  const classificationHierarchy = {
    "Public": 0,
    "Internal": 1,
    "Confidential": 2,
    "Highly Confidential": 3
  };

  useEffect(() => {
    // Determine classification levels for each selected category
    const levels = [];
    
    if (selectedCategories.includes('pii')) {
      levels.push({
        category: "Personal Identifiable Information",
        level: "Confidential", 
        reason: "Contains personal data subject to privacy regulations"
      });
    }
    
    if (selectedCategories.includes('financial')) {
      levels.push({
        category: "Financial Information",
        level: "Confidential", 
        reason: "Contains sensitive financial data"
      });
    }
    
    if (selectedCategories.includes('credentials')) {
      levels.push({
        category: "Authentication Credentials",
        level: "Highly Confidential", 
        reason: "Contains access credentials that could compromise security"
      });
    }
    
    if (selectedCategories.includes('hr')) {
      levels.push({
        category: "HR/Personnel Information",
        level: "Confidential", 
        reason: "Contains private employee information"
      });
    }
    
    if (selectedCategories.includes('ip')) {
      levels.push({
        category: "Intellectual Property",
        level: "Confidential", 
        reason: "Contains proprietary business information"
      });
    }
    
    if (selectedCategories.includes('strategy')) {
      levels.push({
        category: "Business Strategy",
        level: "Confidential", 
        reason: "Contains sensitive strategic plans"
      });
    }
    
    if (selectedCategories.includes('operational')) {
      levels.push({
        category: "Operational Documents",
        level: "Internal", 
        reason: "Contains day-to-day operational information"
      });
    }
    
    if (selectedCategories.includes('public')) {
      levels.push({
        category: "Public Information",
        level: "Public", 
        reason: "Contains information intended for public consumption"
      });
    }
    
    // Find strictest classification
    let strictest = {
      category: "No sensitive information",
      level: "Public",
      reason: "No sensitive information identified"
    };
    
    levels.forEach(classification => {
      if (classificationHierarchy[classification.level] > 
          classificationHierarchy[strictest.level]) {
        strictest = classification;
      }
    });
    
    setClassificationLevels(levels);
    setStrictestClassification(strictest);
  }, [selectedCategories]);

  // Handling instructions based on classification
  const handlingInstructions = {
    "Public": t('report_handling_public'),
    "Internal": t('report_handling_internal'),
    "Confidential": t('report_handling_confidential'),
    "Highly Confidential": t('report_handling_highly_confidential')
  };

  // Generate security controls based on classification and answers
  const generateSecurityControls = () => {
    const controls = [];
    
    // Add classification-based controls
    if (strictestClassification.level === "Confidential" || 
        strictestClassification.level === "Highly Confidential") {
      controls.push(t('report_control_encrypt'));
      controls.push(t('report_control_access'));
      controls.push(t('report_control_logs'));
    }
    
    if (strictestClassification.level === "Highly Confidential") {
      controls.push(t('report_control_mfa'));
      controls.push(t('report_control_reviews'));
      controls.push(t('report_control_drm'));
    }
    
    // Add controls based on specific answers
    if (answers.q7 === t('common_yes')) {
      controls.push(t('report_control_availability'));
    }
    
    if (answers.q9 === t('common_yes')) {
      controls.push(t('report_control_restrict'));
    }
    
    if (answers.q5 === t('common_yes')) {
      controls.push(t('report_control_version'));
    }
    
    if (answers.q11 === t('common_yes')) {
      controls.push(t('report_control_retention'));
    }
    
    return controls;
  };

  // First check if we have any document details at all
  const hasDocumentDetails = documentInfo.name || documentInfo.type || 
                            documentInfo.owner || documentInfo.department;

  // Check if we have a description
  const hasDescription = documentInfo.description && documentInfo.description.trim() !== '';

  // Classification comparison table data
  const classificationComparison = [
    {
      level: "Public",
      description: t('report_level_public_description'),
      examples: t('report_level_public_examples'),
      controls: t('report_level_public_controls')
    },
    {
      level: "Internal",
      description: t('report_level_internal_description'),
      examples: t('report_level_internal_examples'),
      controls: t('report_level_internal_controls')
    },
    {
      level: "Confidential",
      description: t('report_level_confidential_description'),
      examples: t('report_level_confidential_examples'),
      controls: t('report_level_confidential_controls')
    },
    {
      level: "Highly Confidential",
      description: t('report_level_highly_confidential_description'),
      examples: t('report_level_highly_confidential_examples'),
      controls: t('report_level_highly_confidential_controls')
    }
  ];

  const handleCertificateRequest = (e) => {
    e.preventDefault();
    // Here you would implement the actual email sending logic
    console.log(`Sending certificate to: ${email}`);
    setCertificateSent(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">{t('report_title')}</h2>
      
      {/* Document Details Section */}
      {hasDocumentDetails && (
        <>
          <h3 className="text-lg font-semibold mb-2">{t('report_document_details')}</h3>
          <p className="mb-4 text-gray-700">
            {documentInfo.name && `${t('document_name')}: "${documentInfo.name}"`}
            {documentInfo.type && documentInfo.name && ` (${documentInfo.type})`}
            {documentInfo.type && !documentInfo.name && `${t('file_type')}: ${documentInfo.type}`}
            {documentInfo.owner && (documentInfo.name || documentInfo.type) && `, ${t('document_owner')}: ${documentInfo.owner}`}
            {documentInfo.owner && !documentInfo.name && !documentInfo.type && `${t('document_owner')}: ${documentInfo.owner}`}
            {documentInfo.department && documentInfo.owner && `, ${t('department')}: ${documentInfo.department}`}
            {documentInfo.department && !documentInfo.owner && `${t('department')}: ${documentInfo.department}`}
            {hasDocumentDetails && '.'}
          </p>
        </>
      )}
      
      {/* Description Section */}
      {hasDescription && (
        <>
          <h3 className="text-lg font-semibold mb-2">{t('report_description')}</h3>
          <p className="mb-4 text-gray-700">{documentInfo.description}</p>
        </>
      )}

      {/* Classification Determination Section */}
      <h3 className="text-lg font-semibold mb-2">{t('report_classification_determination')}</h3>
      
      {classificationLevels.length > 1 ? (
        <>
          <p className="mb-2 text-gray-700">
            {t('report_multiple_types')}
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
            {classificationLevels.map((classification, index) => (
              <li key={index}>
                <span className="font-medium">{classification.category}:</span> {classification.level} 
                {classification.level === strictestClassification.level && 
                  <span className="text-red-600 font-semibold"> (Strictest)</span>}
              </li>
            ))}
          </ul>
          <p className="mb-4 text-gray-700 font-medium">
            Because this document contains {strictestClassification.category}, which is classified as {strictestClassification.level}, the entire document must be handled according to {strictestClassification.level} controls.
          </p>
          <p className="mb-4 text-gray-700 italic">
            Reason: {strictestClassification.reason}
          </p>
        </>
      ) : (
        <p className="mb-4 text-gray-700">
          {strictestClassification.category === "No sensitive information" 
            ? `This document is classified as ${strictestClassification.level} because it contains no sensitive information.` 
            : `This document is classified as ${strictestClassification.level} because it contains ${strictestClassification.category}.`
          }
        </p>
      )}

      {/* Handling Instructions Section */}
      <h3 className="text-lg font-semibold mb-2">{t('report_handling_instructions')}</h3>
      <p className="mb-4 text-gray-700">
        {t('report_handling_instructions')} {handlingInstructions[strictestClassification.level]}.
      </p>

      {/* Security Controls Section */}
      <div className="mt-6 p-4 bg-purple/10 rounded-md">
        <h4 className="font-semibold mb-2">{t('report_security_controls')}</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {generateSecurityControls().map((control, index) => (
            <li key={index}>{control}</li>
          ))}
        </ul>
      </div>

      {/* Classification context table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">{t('report_classification_context')}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('report_table_level')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('report_table_description')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('report_table_examples')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('report_table_controls')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classificationComparison.map((item) => (
                <tr key={item.level} className={item.level === strictestClassification.level ? "bg-purple/10" : ""}>
                  <td className="px-4 py-3 text-sm">
                    <span className={`font-medium ${item.level === strictestClassification.level ? "font-bold" : ""}`}>
                      {item.level}
                      {item.level === strictestClassification.level && ` ${t('report_your_document')}`}
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

      {/* Training certificate section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-2">{t('report_document_training')}</h3>
        
        {!showCertificateForm && !certificateSent ? (
          <div>
            <p className="text-gray-600 mb-4">
              {t('report_certificate_question')}
            </p>
            <button
              onClick={() => setShowCertificateForm(true)}
              className="bg-purple text-custom-black px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              {t('report_request_certificate')}
            </button>
          </div>
        ) : certificateSent ? (
          <div className="p-4 bg-green-100 rounded-md">
            <p className="text-green-800">
              {t('report_certificate_sent')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleCertificateRequest} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('report_email_label')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="your.email@company.com"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-purple text-custom-black px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                {t('report_send_certificate')}
              </button>
              <button
                type="button"
                onClick={() => setShowCertificateForm(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                {t('common_button_cancel')}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="mt-6 bg-purple text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90 w-full transition-all duration-200 transform hover:scale-[1.01]"
      >
        {t('report_start_new')}
      </button>
    </div>
  );
}

export default ReportGenerator;