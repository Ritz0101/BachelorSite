import "./App.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-light-purple text-custom-black">
      <main className="mt-16">
        {/* Hero section */}
        <div className="text-center py-10">
          <h1 className="text-5xl font-bold mb-4">
            <span className="inline-block px-1 transition-all duration-300 ease-in-out hover:scale-105 cursor-default">
              {t('home_title')}
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">{t('home_subtitle')}</p>
        </div>
        {/* Info section */}
        <div className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col justify-between p-6 rounded-lg border-l-4 border-purple shadow-md bg-white hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">
                  {t('classification_guide_title')}
                </h3>
                <p className="text-gray-600 mb-4">{t('home_classification_guide_intro')}</p>
                <p className="text-gray-600 mb-4">{t('home_classification_guide_details')}</p>
                <Link
                  to="/guide"
                  className="bg-dark-purple text-white rounded-lg p-4 hover:shadow-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-[1.01] cursor-pointer self-start"
                >
                  {t('home_get_started')}
                </Link>
              </div>
              <div className="flex flex-col justify-between p-6 rounded-lg border-l-4 border-purple shadow-md bg-white hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">
                  {t('home_training_modules_title')}
                </h3>
                <p className="text-gray-600 mb-4">{t('home_training_intro')}</p>
                <p className="text-gray-600 mb-4">
                  {t('home_training_details')}
                </p>
                <Link
                  to="/training"
                  className="bg-dark-purple text-white rounded-lg p-4 hover:shadow-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-[1.01] cursor-pointer self-start"
                >
                  {t('home_start_module')}
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
