import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';

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
  const reportRef = useRef(null);

  // Classification level hierarchy and colors
  const classificationHierarchy = {
    "Public": 0,
    "Internal": 1,
    "Confidential": 2,
    "Highly Confidential": 3
  };
  
  // Colors for classifications
  const classificationColors = {
    "Public": "bg-green-100 text-green-800 border-green-200",
    "Internal": "bg-blue-100 text-blue-800 border-blue-200",
    "Confidential": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Highly Confidential": "bg-red-100 text-red-800 border-red-200"
  };
  
  // Background colors for entire sections
  const classificationBackground = {
    "Public": "bg-green-50",
    "Internal": "bg-blue-50",
    "Confidential": "bg-yellow-50",
    "Highly Confidential": "bg-red-50"
  };

  // Border colors for highlighted sections
  const classificationBorders = {
    "Public": "border-green-300",
    "Internal": "border-blue-300",
    "Confidential": "border-yellow-300",
    "Highly Confidential": "border-red-300"
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

  // Use a more direct approach for PDF generation
  const generatePDF = () => {
    // Create a popup window
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    if (!printWindow) {
      alert('Please allow popups to generate the PDF');
      return;
    }
    
    // Prepare the inline style for the popup
    const styles = `
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        h1, h2, h3, h4 {
          margin-top: 20px;
          margin-bottom: 10px;
        }
        .public-bg {
          background-color: #d1fae5;
          border: 1px solid #10b981;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }
        .internal-bg {
          background-color: #dbeafe;
          border: 1px solid #3b82f6;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }
        .confidential-bg {
          background-color: #fef3c7;
          border: 1px solid #f59e0b;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }
        .highly-confidential-bg {
          background-color: #fee2e2;
          border: 1px solid #ef4444;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }
        .label {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        .public-label {
          background-color: #a7f3d0;
          color: #065f46;
          border: 1px solid #10b981;
        }
        .internal-label {
          background-color: #bfdbfe;
          color: #1e40af;
          border: 1px solid #3b82f6;
        }
        .confidential-label {
          background-color: #fde68a;
          color: #92400e;
          border: 1px solid #f59e0b;
        }
        .highly-confidential-label {
          background-color: #fca5a5;
          color: #7f1d1d;
          border: 1px solid #ef4444;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f8f8f8;
        }
        .highlight-row {
          font-weight: bold;
        }
        .public-bg {
          background-color: rgba(209, 250, 229, 0.5) !important;
        }
        .internal-bg {
          background-color: rgba(219, 234, 254, 0.5) !important;
        }
        .confidential-bg {
          background-color: rgba(254, 243, 199, 0.5) !important;
        }
        .highly-confidential-bg {
          background-color: rgba(254, 226, 226, 0.5) !important;
        }
        .strictest {
          font-weight: bold;
          margin-left: 5px;
          color: #dc2626;
        }
        .document-marker {
          margin-left: 5px;
          font-style: italic;
          font-weight: normal;
        }
        .controls-list {
          padding-left: 20px;
        }
        .btn-container {
          margin-top: 20px;
          text-align: center;
        }
        .print-btn {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        @media print {
          .btn-container {
            display: none;
          }
        }
      </style>
    `;
    
    // Get the class for the background based on strictest classification
    const getBgClass = (level) => {
      switch(level) {
        case 'Public': return 'public-bg';
        case 'Internal': return 'internal-bg';
        case 'Confidential': return 'confidential-bg';
        case 'Highly Confidential': return 'highly-confidential-bg';
        default: return '';
      }
    };
    
    // Get the class for the label based on classification
    const getLabelClass = (level) => {
      switch(level) {
        case 'Public': return 'public-label';
        case 'Internal': return 'internal-label';
        case 'Confidential': return 'confidential-label';
        case 'Highly Confidential': return 'highly-confidential-label';
        default: return '';
      }
    };

    // Get the appropriate background color for checkmark
    const getCheckBg = (level) => {
      switch(level) {
        case 'Public': return 'background-color: #a7f3d0;';
        case 'Internal': return 'background-color: #bfdbfe;';
        case 'Confidential': return 'background-color: #fde68a;';
        case 'Highly Confidential': return 'background-color: #fca5a5;';
        default: return '';
      }
    };

    // Get the appropriate row highlight class for each classification level
    const getRowHighlightClass = (level) => {
      if (level === strictestClassification.level) {
        switch(level) {
          case 'Public': return 'highlight-row public-bg';
          case 'Internal': return 'highlight-row internal-bg';
          case 'Confidential': return 'highlight-row confidential-bg';
          case 'Highly Confidential': return 'highlight-row highly-confidential-bg';
          default: return '';
        }
      }
      return '';
    };
    
    // Create the HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${t('report_title')}</title>
        ${styles}
      </head>
      <body>
        <h1>${t('report_title')}</h1>
        
        ${hasDocumentDetails ? `
          <h2>${t('report_document_details')}</h2>
          <p>
            ${documentInfo.name && `${t('document_name')}: "${documentInfo.name}"`}
            ${documentInfo.type && documentInfo.name && ` (${documentInfo.type})`}
            ${documentInfo.type && !documentInfo.name && `${t('file_type')}: ${documentInfo.type}`}
            ${documentInfo.owner && (documentInfo.name || documentInfo.type) && `, ${t('document_owner')}: ${documentInfo.owner}`}
            ${documentInfo.owner && !documentInfo.name && !documentInfo.type && `${t('document_owner')}: ${documentInfo.owner}`}
            ${documentInfo.department && documentInfo.owner && `, ${t('department')}: ${documentInfo.department}`}
            ${documentInfo.department && !documentInfo.owner && `${t('department')}: ${documentInfo.department}`}
            ${hasDocumentDetails && '.'}
          </p>
        ` : ''}
        
        ${hasDescription ? `
          <h2>${t('report_description')}</h2>
          <p>${documentInfo.description}</p>
        ` : ''}
        
        <h2>${t('report_classification_determination')}</h2>
        ${classificationLevels.length > 1 ? `
          <p>${t('report_multiple_types')}</p>
          <ul>
            ${classificationLevels.map(classification => `
              <li>
                <strong>${classification.category}:</strong> 
                <span class="label ${getLabelClass(classification.level)}">
                  ${classification.level}
                </span>
                ${classification.level === strictestClassification.level ? 
                  `<span class="strictest">(${t('report_strictest_marker')})</span>` : ''}
              </li>
            `).join('')}
          </ul>
          
          <div class="${getBgClass(strictestClassification.level)}">
            <p>
              <strong>${t('report_because_contains')} ${strictestClassification.category}, ${t('report_which_is_classified')} 
              <span class="label ${getLabelClass(strictestClassification.level)}">${strictestClassification.level}</span>, 
              ${t('report_must_be_handled')} ${strictestClassification.level} ${t('report_controls')}.</strong>
            </p>
            <p><em>${t('report_reason')}: ${strictestClassification.reason}</em></p>
          </div>
        ` : `
          <div class="${getBgClass(strictestClassification.level)}">
            <p>${t('report_document_is_classified')} 
            <span class="label ${getLabelClass(strictestClassification.level)}">${strictestClassification.level}</span> 
            ${t('report_because_it_contains')} ${strictestClassification.category}.</p>
          </div>
        `}
        
        <h2>${t('report_handling_instructions')}</h2>
        <div class="${getBgClass(strictestClassification.level)}">
          <p>${t('report_handling_instructions')}: ${handlingInstructions[strictestClassification.level]}.</p>
        </div>
        
        <h2>${t('report_security_controls')}</h2>
        <div style="background-color: #f3e8ff; border: 1px solid #c084fc; padding: 10px; border-radius: 4px;">
          <h4>${t('report_security_controls')}:</h4>
          <ul class="controls-list">
            ${generateSecurityControls().map(control => `<li>${control}</li>`).join('')}
          </ul>
        </div>
        
        <h2>${t('report_classification_context')}</h2>
        <table>
          <thead>
            <tr>
              <th>${t('report_table_level')}</th>
              <th>${t('report_table_description')}</th>
              <th>${t('report_table_examples')}</th>
              <th>${t('report_table_controls')}</th>
            </tr>
          </thead>
          <tbody>
            ${classificationComparison.map(item => {
              return `
                <tr class="${getRowHighlightClass(item.level)}">
                  <td>
                    <span class="label ${getLabelClass(item.level)}">
                      ${item.level}
                    </span>
                    ${item.level === strictestClassification.level ? 
                      `<span class="document-marker"> → <span style="padding: 2px 5px; border-radius: 3px; ${getCheckBg(item.level)}">✓</span></span>` : ''}
                  </td>
                  <td>${item.description}</td>
                  <td>${item.examples}</td>
                  <td>${item.controls}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
        
        <div class="btn-container">
          <button class="print-btn" onclick="window.print(); setTimeout(() => window.close(), 500);">
            ${t('report_save_as_pdf')}
          </button>
        </div>
      </body>
      </html>
    `;
    
    // Write to the popup window
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <style>
        {`
          @media print {
            body, html {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-content {
              width: 100%;
              padding: 15px;
              background: white;
            }
            button, .no-print {
              display: none !important;
            }
            .security-badge {
              page-break-inside: avoid;
            }
          }
        `}
      </style>
      <div ref={reportRef} className="print-content">
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
                  <span className="font-medium">{classification.category}:</span>{' '}
                  <span className={`inline-block px-2 py-1 rounded-md border ${
                    classificationColors[classification.level]
                  }`}>
                    {classification.level}
                  </span>
                  {classification.level === strictestClassification.level && 
                    <span className="text-red-600 font-semibold ml-2">{t('report_strictest_marker')}</span>}
                </li>
              ))}
            </ul>
            <div className={`p-4 rounded-md border-2 mb-4 ${classificationBackground[strictestClassification.level]} ${classificationBorders[strictestClassification.level]}`}>
              <p className="mb-2 text-gray-700 font-medium security-badge">
                Because this document contains <span className="font-bold">{strictestClassification.category}</span>, which is classified as{' '}
                <span className={`inline-block px-2 py-1 rounded-md border font-bold ${
                  classificationColors[strictestClassification.level]
                }`}>
                  {strictestClassification.level}
                </span>, the entire document must be handled according to {strictestClassification.level} controls.
              </p>
              <p className="text-gray-700 italic">
                Reason: {strictestClassification.reason}
              </p>
            </div>
          </>
        ) : (
          <div className={`p-4 rounded-md border-2 mb-4 ${classificationBackground[strictestClassification.level]} ${classificationBorders[strictestClassification.level]}`}>
            <p className="text-gray-700 security-badge">
              This document is classified as{' '}
              <span className={`inline-block px-2 py-1 rounded-md border font-bold ${
                classificationColors[strictestClassification.level]
              }`}>
                {strictestClassification.level}
              </span>
              {' '}because it contains <span className="font-semibold">{strictestClassification.category}</span>.
            </p>
          </div>
        )}

        {/* Handling Instructions Section */}
        <h3 className="text-lg font-semibold mb-2">{t('report_handling_instructions')}</h3>
        <div className={`p-4 rounded-md border-2 mb-4 ${classificationBackground[strictestClassification.level]} ${classificationBorders[strictestClassification.level]}`}>
          <p className="text-gray-700">
            {t('report_handling_instructions')} {handlingInstructions[strictestClassification.level]}.
          </p>
        </div>

        {/* Security Controls Section */}
        <div className="mt-6 p-4 bg-purple/10 rounded-md border border-purple">
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('report_table_level')}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('report_table_description')}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('report_table_examples')}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('report_table_controls')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {classificationComparison.map((item) => {
                  // Define row background colors based on classification level
                  let rowClass = "";
                  if (item.level === strictestClassification.level) {
                    if (item.level === "Public") rowClass = "bg-green-50/50";
                    else if (item.level === "Internal") rowClass = "bg-blue-50/50";
                    else if (item.level === "Confidential") rowClass = "bg-yellow-50/50";
                    else if (item.level === "Highly Confidential") rowClass = "bg-red-50/50";
                  }
                  
                  return (
                    <tr key={item.level} className={rowClass}>
                      <td className="px-4 py-3 text-sm">
                        {item.level === "Public" && (
                          <span className="inline-block px-2 py-1 rounded-md bg-green-100 text-green-800 border border-green-200 font-medium">
                            {item.level}
                            {item.level === strictestClassification.level && 
                              <span className="ml-2 italic font-normal">→ <span className="bg-green-200 px-1 py-0.5 rounded-sm">✓</span></span>
                            }
                          </span>
                        )}
                        {item.level === "Internal" && (
                          <span className="inline-block px-2 py-1 rounded-md bg-blue-100 text-blue-800 border border-blue-200 font-medium">
                            {item.level}
                            {item.level === strictestClassification.level && 
                              <span className="ml-2 italic font-normal">→ <span className="bg-blue-200 px-1 py-0.5 rounded-sm">✓</span></span>
                            }
                          </span>
                        )}
                        {item.level === "Confidential" && (
                          <span className="inline-block px-2 py-1 rounded-md bg-yellow-100 text-yellow-800 border border-yellow-200 font-medium">
                            {item.level}
                            {item.level === strictestClassification.level && 
                              <span className="ml-2 italic font-normal">→ <span className="bg-yellow-200 px-1 py-0.5 rounded-sm">✓</span></span>
                            }
                          </span>
                        )}
                        {item.level === "Highly Confidential" && (
                          <span className="inline-block px-2 py-1 rounded-md bg-red-100 text-red-800 border border-red-200 font-medium">
                            {item.level}
                            {item.level === strictestClassification.level && 
                              <span className="ml-2 italic font-normal">→ <span className="bg-red-200 px-1 py-0.5 rounded-sm">✓</span></span>
                            }
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">{item.description}</td>
                      <td className="px-4 py-3 text-sm">{item.examples}</td>
                      <td className="px-4 py-3 text-sm">{item.controls}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Buttons section */}
      <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 no-print">
            <button
          onClick={generatePDF}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.01] flex-1 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t('report_save_as_pdf')}
              </button>
      <button
        onClick={onReset}
          className="bg-purple text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-[1.01] flex-1"
      >
        {t('report_start_new')}
      </button>
      </div>
    </div>
  );
}

export default ReportGenerator;