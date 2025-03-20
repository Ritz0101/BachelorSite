import './App.css';
import { Link } from 'react-router-dom';

// Innholdsdata
const infoSections = [
  {
    title: 'Classification Guide',
    description: 'Unsure how to handle sensitive information? Our classification guide helps you make the right decisions through a simple and effective checklist.',
    actionText: 'Start classification →',
    actionLink: '/classification',
  },
  {
    title: 'Training and Quiz',
    description: 'Start your learning journey with our interactive training modules and test your knowledge through our tailored quizzes.',
    actionText: 'Start training →',
    actionLink: '/training',
  },
];

// Hero-seksjon komponent med forbedret visuell design
const Hero = () => (
  <div className="text-center py-24 px-4 relative overflow-hidden">
    {/* Subtilt bakgrunnsmønster */}
    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
    
    {/* Hovedinnhold */}
    <div className="relative z-10">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600">
        Welcome to Isotron!
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Your guide to secure information handling!
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-5">
        <Link 
          to="/guide" 
          className="bg-white text-purple-700 px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg border border-purple-100"
        >
          Start Guide
        </Link>
        <Link 
          to="/training" 
          className="bg-white text-purple-700 px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg border border-purple-100"
        >
          Training
        </Link>
      </div>
    </div>
  </div>
);

// Info-seksjon komponent med forbedret visuell design
const InfoSection = ({ title, description, actionText, actionLink, icon }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <div className="flex items-center mb-4">
      {icon && <span className="mr-3 text-purple-500">{icon}</span>}
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
    <div className="w-16 h-1 bg-gradient-to-r from-purple-300 to-purple-600 mb-6 rounded-full"></div>
    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
    <Link 
      to={actionLink} 
      className="text-purple-700 font-semibold hover:text-purple-900 inline-flex items-center group transition-colors" 
      aria-label={actionText}
    >
      {actionText.replace('→', '')}
      <svg 
        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </Link>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-light-purple text-custom-black">
      <main className="mt-16">
        <Hero />
        
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {infoSections.map((section, index) => (
                <InfoSection 
                  key={index}
                  title={section.title}
                  description={section.description}
                  actionText={section.actionText}
                  actionLink={section.actionLink}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;