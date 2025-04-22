import './App.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-light-purple text-custom-black">
      <main className="mt-16">
        {/* Hero section */}
        <div className="text-center py-10">
          <h1 className="text-5xl font-bold mb-4">{t('home.title')}</h1>
          <p className="text-xl text-gray-600 mb-6">{t('home.subtitle')}</p>
        </div>
        {/* Info section */}
        <div className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col justify-between p-6 rounded-lg border border-gray-300 shadow-md">
                <h3 className="text-xl font-semibold mb-4">{t('guide.title')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('home.guide.intro')}
                </p>
                <p className="text-gray-600 mb-4">
                  {t('home.guide.details')}
                </p>
                <Link to="/guide" className="bg-purple text-black px-2 py-1 rounded-md hover:bg-opacity-90 self-start">
                  {t('home.getStarted')}
                </Link>
              </div>
              <div className="flex flex-col justify-between p-6 rounded-lg border border-gray-300 shadow-md">
                <h3 className="text-xl font-semibold mb-4">{t('training.title')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('home.training.intro')}
                </p>
                <p className="text-gray-600 mb-4">
                  {t('home.training.details')}
                </p>
                <Link to="/training" className="bg-purple text-black px-2 py-1 rounded-md hover:bg-opacity-90 self-start">
                  {t('training.startModule')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;