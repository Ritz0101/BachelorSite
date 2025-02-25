import Header from './components/header';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Velkommen til Appen!</h1>
        <p className="text-gray-700">Her er innholdet ditt.</p>
      </main>
    </div>
  );
}

export default App;