import { useEffect, useState } from "react";

// --- DEFINISJON AV KONSTANTER ---
// Disse er flyttet utenfor komponenten siden de ikke endres og ikke avhenger av komponentens interne state eller props.

// Klassifiseringshierarki som definerer "strengheten" til hvert nivå.
// Høyere tall betyr strengere klassifisering.

const CLASSIFICATION_HIERARCHY = {
  Public: 0,
  "Internal Use Only": 1,
  Confidential: 2,
  "Highly Confidential": 3,
};

// Detaljer for hver datakategori som kan velges av brukeren.
// Brukes for å automatisk bestemme klassifiseringsnivå og begrunnelse basert på valgte kategorier.
const CATEGORY_DETAILS = {
  pii: {
    category: "Personal Identifiable Information",
    level: "Confidential",
    reason: "Contains personal data subject to privacy regulations",
  },
  financial: {
    category: "Financial Information",
    level: "Confidential",
    reason: "Contains sensitive financial data",
  },
  credentials: {
    category: "Authentication Credentials",
    level: "Highly Confidential",
    reason: "Contains access credentials that could compromise security",
  },
  hr: {
    category: "HR/Personnel Information",
    level: "Confidential",
    reason: "Contains private employee information",
  },
  ip: {
    category: "Intellectual Property",
    level: "Confidential",
    reason: "Contains proprietary business information",
  },
  strategy: {
    category: "Business Strategy",
    level: "Confidential",
    reason: "Contains sensitive strategic plans",
  },
  operational: {
    category: "Operational Documents",
    level: "Internal Use Only",
    reason: "Contains day-to-day operational information",
  },
  public: {
    category: "Public Information",
    level: "Public",
    reason: "Contains information intended for public consumption",
  },
};

// Standard / fallback klassifisering som brukes hvis ingen spesifikke sensitive kategorier er identifisert.
const DEFAULT_CLASSIFICATION = {
  category: "Default",
  level: "Public",
  reason: "No sensitive information identified",
};

// Instruksjoner for håndtering av dokumentet, basert på det endelige klassifiseringsnivået.
const HANDLING_INSTRUCTIONS = {
  Public: "can be freely shared and distributed",
  "Internal Use Only": "should only be shared within the organization",
  Confidential: "must be encrypted and access-controlled",
  "Highly Confidential":
    "requires strict access control, encryption, and audit logging",
};

// Data for sammenligningstabellen som viser alle klassifiseringsnivåer i kontekst.
const CLASSIFICATION_COMPARISON_DATA = [
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


// --- REACT KOMPONENT: ReportGenerator ---
function ReportGenerator({
  documentInfo,         // Informasjon om dokumentet (navn, type, eier, etc.)
  answers,              // Svar på tilleggsspørsmål som kan påvirke sikkerhetskontroller
  selectedCategories,   // En liste over kategorier av data som dokumentet inneholder (f.eks. 'pii', 'financial')
  onReset,              // Funksjon som kalles for å nullstille og starte en ny klassifisering
}) {

  // State for å lagre de bestemte klassifiseringsnivåene basert på valgte kategorier.
  // Eksempel: [{ category: "Financial Information", level: "Confidential", reason: "..."}]
  const [classificationLevels, setClassificationLevels] = useState([]);

  // State for å lagre den strengeste klassifiseringen som er funnet for dokumentet.
  // Initialiseres med en standard, lav klassifisering.
  const [strictestClassification, setStrictestClassification] = useState(DEFAULT_CLASSIFICATION);

  // State for e-postadresse (brukes i 'handleCertificateRequest' nedenfor).
  const [email, setEmail] = useState(""); // Beholdes for "nøyaktig samme funksjonalitet"

  // State for å indikere om et "sertifikat" er sendt (brukes i 'handleCertificateRequest').
  const [certificateSent, setCertificateSent] = useState(false); // Beholdes for "nøyaktig samme funksjonalitet"


  // useEffect-hook: Kjører når 'selectedCategories' (fra props) endres.
  // Formål: Å bestemme alle relevante klassifiseringsnivåer basert på de valgte kategoriene,
  // og deretter identifisere det aller strengeste nivået blant disse.
  useEffect(() => {
    const determinedLevels = []; // Midlertidig liste for å samle klassifiseringer

    // Gå gjennom hver kategori som er valgt for dokumentet
    for (const categoryKey of selectedCategories) {
      // Sjekk om den valgte kategorien (f.eks. 'pii') har en definisjon i vår CATEGORY_DETAILS konstant
      if (CATEGORY_DETAILS[categoryKey]) {
        // Hvis ja, legg til detaljene (kategori, nivå, årsak) i listen over bestemte nivåer
        determinedLevels.push(CATEGORY_DETAILS[categoryKey]);
      }
    }

    // Oppdater state 'classificationLevels' med listen over alle identifiserte klassifiseringer
    setClassificationLevels(determinedLevels);

    // Nå, finn den strengeste klassifiseringen blant de som er funnet
    let currentStrictest = DEFAULT_CLASSIFICATION; // Start med å anta standard/laveste klassifisering

    if (determinedLevels.length > 0) {
      // Hvis det faktisk ble funnet noen klassifiseringsnivåer basert på kategoriene:
      currentStrictest = determinedLevels[0]; // Anta at det første funnet nivået er det strengeste

      // Gå gjennom resten av de funnet nivåene for å se om noen er strengere
      // Starter på indeks 1 siden vi allerede har satt currentStrictest til elementet på indeks 0
      for (let i = 1; i < determinedLevels.length; i++) {
        const classification = determinedLevels[i];
        // Sammenlign "styrken" (numerisk verdi fra CLASSIFICATION_HIERARCHY)
        if (
          CLASSIFICATION_HIERARCHY[classification.level] >
          CLASSIFICATION_HIERARCHY[currentStrictest.level]
        ) {
          // Hvis det nåværende 'classification.level' er strengere, oppdater 'currentStrictest'
          currentStrictest = classification;
        }
      }
    }

    // Oppdater state 'strictestClassification' med det strengeste nivået som ble funnet (eller default hvis ingen ble funnet)
    setStrictestClassification(currentStrictest);

  }, [selectedCategories]); // Denne effekten skal kun kjøre på nytt hvis 'selectedCategories' endres.


  // Funksjon for å generere en liste over nødvendige sikkerhetskontroller.
  // Kontrollene baseres både på den strengeste klassifiseringen og svarene på tilleggsspørsmål.
  const generateSecurityControls = () => {
    const controls = []; // Initialiser en tom liste for kontroller

    // Legg til kontroller basert på den strengeste klassifiseringens nivå
    // Kontroller som gjelder for både Confidential og Highly Confidential
    if (
      strictestClassification.level === "Confidential" ||
      strictestClassification.level === "Highly Confidential"
    ) {
      controls.push("Encrypt document when at rest and in transit");
      controls.push("Implement role-based access control");
      controls.push("Maintain access logs");
    }

    // Tilleggskontroller som kun gjelder for Highly Confidential
    if (strictestClassification.level === "Highly Confidential") {
      controls.push("Implement multi-factor authentication for access");
      controls.push("Perform regular access reviews");
      controls.push("Apply digital rights management");
    }

    // Legg til kontroller basert på spesifikke svar fra brukeren (fra 'answers' prop)
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

    // Returner den ferdige listen med sikkerhetskontroller
    return controls;
  };


  // Hjelpevariabel: Sjekker om det finnes noen dokumentdetaljer å vise.
  // Brukes for betinget rendering av "Document Details"-seksjonen i JSX.
  const hasDocumentDetails =
    documentInfo.name ||
    documentInfo.type ||
    documentInfo.owner ||
    documentInfo.department;

  // Hjelpevariabel: Sjekker om dokumentet har en beskrivelse (ikke tom eller bare mellomrom).
  // Brukes for betinget rendering av "Description"-seksjonen i JSX.
  const hasDescription =
    documentInfo.description && documentInfo.description.trim() !== "";


  // Funksjon for å håndtere forespørsel om sertifikat.
  // Denne funksjonen er i den originale koden, men ser ikke ut til å være koblet til noe UI-element for brukerinteraksjon.
  // Den beholdes for å sikre "nøyaktig samme funksjonalitet".
  // For øyeblikket logger den bare til konsollen og oppdaterer 'certificateSent' state.
  const handleCertificateRequest = (e) => {
    e.preventDefault(); // Forhindrer standard skjemainnsending hvis den brukes i et skjema
    console.log(`Sending certificate to: ${email}`); // Simulerer sending av sertifikat
    setCertificateSent(true); // Oppdaterer state for å indikere at "sendingen" er utført
  };


  // --- JSX: Rendering av komponenten ---
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Classification Report</h2>

      {/* Seksjon: Dokumentdetaljer */}
      {/* Denne seksjonen vises kun hvis 'hasDocumentDetails' er true. */}
      {hasDocumentDetails && (
        <>
          <h3 className="text-lg font-semibold mb-2">Document Details</h3>
          <p className="mb-4 text-gray-700">
            {/* Dynamisk bygging av tekststrengen for dokumentdetaljer */}
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

      {/* Seksjon: Beskrivelse */}
      {/* Denne seksjonen vises kun hvis 'hasDescription' er true. */}
      {hasDescription && (
        <>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="mb-4 text-gray-700">{documentInfo.description}</p>
        </>
      )}

      {/* Seksjon: Klassifiseringsbestemmelse */}
      <h3 className="text-lg font-semibold mb-2">
        Classification Determination
      </h3>

      {/* Logikk for å vise informasjon basert på antall klassifiseringsnivåer som er funnet. */}
      {/* Bruker en ternary operator (if/else) for å velge mellom to ulike visninger. */}
      {classificationLevels.length > 1 ? (
        // TILFELLE 1: Dokumentet har flere typer sensitiv informasjon
        <>
          <p className="mb-2 text-gray-700">
            This document contains multiple types of sensitive information:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
            {/* Mapper gjennom alle identifiserte klassifiseringsnivåer og lager listeelementer */}
            {classificationLevels.map((classification, index) => (
              <li key={index}>
                <span className="font-medium">{classification.category}:</span>{" "}
                {classification.level}
                {/* Fremhev visuelt hvis dette nivået er det strengeste */}
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
        // TILFELLE 2: Dokumentet har kun én type klassifisering (eller standardklassifiseringen)
        <p className="mb-4 text-gray-700">
          This document is classified as{" "}
          <span className="font-bold">{strictestClassification.level}</span>{" "}
          because it contains {strictestClassification.category.toLowerCase()}.
        </p>
      )}

      {/* Seksjon: Håndteringsinstruksjoner */}
      <h3 className="text-lg font-semibold mb-2">Handling Instructions</h3>
      <p className="mb-4 text-gray-700">
        This document {HANDLING_INSTRUCTIONS[strictestClassification.level]}.
      </p>

      {/* Seksjon: Nødvendige Sikkerhetskontroller */}
      <div className="mt-6 p-4 bg-purple/10 rounded-md">
        <h4 className="font-semibold mb-2">Required Security Controls:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {/* Genererer listen av sikkerhetskontroller og mapper dem til listeelementer */}
          {generateSecurityControls().map((control, index) => (
            <li key={index}>{control}</li>
          ))}
        </ul>
      </div>

      {/* Seksjon: Klassifiseringsnivåer i Kontekst (Tabell) */}
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
              {/* Mapper gjennom data for sammenligningstabellen (CLASSIFICATION_COMPARISON_DATA) */}
              {CLASSIFICATION_COMPARISON_DATA.map((item) => (
                <tr
                  key={item.level}
                  // Fremhev raden visuelt hvis den matcher dokumentets strengeste klassifiseringsnivå
                  className={
                    item.level === strictestClassification.level
                      ? "bg-purple/10" // Bruker TailwindCSS klasse for bakgrunnsfarge
                      : ""
                  }
                >
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`font-medium ${
                        // Gjør teksten fet hvis dette er dokumentets gjeldende nivå
                        item.level === strictestClassification.level
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      {item.level}
                      {/* Legg til en liten indikator for hvilket nivå dokumentet har i tabellen */}
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

      {/* Seksjon: Tilbakestillingsknapp */}
      <button
        onClick={onReset} // Kaller 'onReset'-funksjonen som ble mottatt via props
        className="mt-6 bg-dark-purple text-white px-6 py-3 rounded-md hover:bg-opacity-90 w-full transition-all duration-200 transform hover:scale-[1.01]"
      >
        Start New Classification
      </button>

    </div>
  );
}

export default ReportGenerator;