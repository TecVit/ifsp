import styles from './Cabecalho.module.css';

/* =========================================================================
   Cabecalho — a marca e o menu.

   Recebe por props a tela atual e a função que troca de tela.
   O componente não guarda estado nenhum: ele só avisa o App do clique.
   Esse é o fluxo normal do React — o dado desce por props, o evento sobe.
   ========================================================================= */

const ITENS = [
  { id: 'sobre', rotulo: 'O tema' },
  { id: 'formulario', rotulo: 'Responder' },
  { id: 'resultados', rotulo: 'Resultados' },
];

export default function Cabecalho({ telaAtual, aoTrocarTela }) {
  return (
    <header className={styles.barra}>
      <div className={styles.interna}>
        <button
          className={styles.marca}
          onClick={() => aoTrocarTela('sobre')}
          aria-label="Início"
        >
          <span className={`${styles.kanji} jp`}>影</span>
          <span className={styles.nome}>Kage</span>
        </button>

        <nav className={styles.menu}>
          {ITENS.map((item) => (
            <button
              key={item.id}
              onClick={() => aoTrocarTela(item.id)}
              className={
                telaAtual === item.id
                  ? `${styles.link} ${styles.linkAtivo}`
                  : styles.link
              }
            >
              {item.rotulo}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
