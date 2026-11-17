import { useState } from 'react';
import Cabecalho from './components/Cabecalho.jsx';
import Sobre from './components/Sobre.jsx';
import Formulario from './components/Formulario.jsx';
import Resultados from './components/Resultados.jsx';
import Rodape from './components/Rodape.jsx';
import { configurado } from './lib/supabase.js';
import styles from './App.module.css';

/* =========================================================================
   App — o componente que monta a página e decide qual tela aparece.

   Não usamos biblioteca de rotas: uma variável de estado guarda o nome
   da tela atual, e o cabeçalho troca esse valor. É o mesmo recurso de
   sempre (useState), aplicado à navegação.
   ========================================================================= */

export default function App() {
  const [tela, setTela] = useState('sobre');

  // Se ninguém criou o arquivo .env, o app avisa em vez de abrir em branco.
  if (!configurado) {
    return (
      <div className={styles.aviso}>
        <p className="eyebrow">Configuração pendente</p>
        <h1 className={styles.avisoTitulo}>
          Faltam as chaves do Supabase
        </h1>
        <p className={styles.avisoTexto}>
          Crie um arquivo <code>.env</code> na raiz do projeto com as variáveis{' '}
          <code>VITE_SUPABASE_URL</code> e{' '}
          <code>VITE_SUPABASE_PUBLISHABLE_KEY</code>,
          e reinicie o <code>npm run dev</code>. O passo a passo está no
          roteiro da aula.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.pagina}>
      <Cabecalho telaAtual={tela} aoTrocarTela={setTela} />

      <main className={styles.conteudo}>
        {tela === 'sobre' && <Sobre aoAvancar={() => setTela('formulario')} />}
        {tela === 'formulario' && (
          <Formulario aoTerminar={() => setTela('resultados')} />
        )}
        {tela === 'resultados' && <Resultados />}
      </main>

      <Rodape />
    </div>
  );
}
