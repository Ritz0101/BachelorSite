import './App.css';
import Header from './components/header';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4 mt-16 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Velkommen til Isotron!</h1>
        <p className="text-gray-700 text-center">
          Denne siden assisterer personer i hvordan håndtere data, filer, passord og mer i henhold til det nye ISO27001-direktivet fra EU. 
          Vi tilbyr veiledning og ressurser for å sikre at din organisasjon oppfyller de nyeste sikkerhetsstandardene.
        </p>
      </main>
    </div>
  );
}

export default App;