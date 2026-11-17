import { useState } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import FormularioPage from './pages/Form';
import ResultadosPage from './pages/Results';
import Footer from './components/Footer';

function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      <main className="container">
        <section className="content">
          
          <Navbar 
            page={page}
            irParaInicio={() => setPage('home')}
            irParaFormulario={() => setPage('form')}
            irParaResultados={() => setPage('results')}
          />

          {page === 'home' && (
            <Home irParaFormulario={() => setPage('form')} />
          )}

          {page === 'form' && (
            <FormularioPage />
          )}

          {page === 'results' && (
            <ResultadosPage />
          )}

          <Footer />

        </section>
      </main>
    </>
  );
}

export default App;