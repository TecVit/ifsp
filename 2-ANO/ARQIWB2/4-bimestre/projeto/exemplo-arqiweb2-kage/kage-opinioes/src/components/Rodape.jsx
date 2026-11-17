import styles from './Rodape.module.css';

export default function Rodape() {
  return (
    <footer className={styles.rodape}>
      <div className={styles.interna}>
        <p className={styles.texto}>
          Projeto de exemplo · ARQIWEB2 · IFSP — Campus Araraquara
        </p>
        <p className={styles.texto}>
          React + Vite + Supabase · design system <span className="jp">影</span>{' '}
          Kage
        </p>
      </div>
    </footer>
  );
}
