import './App.css';
import Header from './components/header';

function App() {
  return (
    <div className="min-h-screen bg-light-purple text-custom-black">
      <Header />
      <main className="mt-16">
        {/* Hero section */}
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold mb-4">Velkommen til Isotron!</h1>
          <p className="text-xl text-gray-600 mb-8">Din guide til sikker informasjonshåndtering!</p>
          <div className="flex justify-center gap-4">
            <button className="bg-purple text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90">
              Start Guide
            </button>
            <button className="bg-white text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90 shadow-sm">
              Opplæring
            </button>
          </div>
        </div>

        {/* Info section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Guide for gradering</h3>
                <p className="text-gray-600 mb-4">
                  Usikker på hvordan du skal behandle sensitiv informasjon? Vår graderingsguide 
                  hjelper deg å ta riktige beslutninger gjennom en enkel og effektiv sjekkliste.
                </p>
                <button className="text-custom-black font-semibold hover:underline">
                  Start gradering →
                </button>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Opplæring og quiz</h3>
                <p className="text-gray-600 mb-4">
                  Start din læringsprosess med våre interaktive opplæringsmoduler og test 
                  din kunnskap gjennom våre skreddersydde quizer.
                </p>
                <button className="text-custom-black font-semibold hover:underline">
                  Start opplæring →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;