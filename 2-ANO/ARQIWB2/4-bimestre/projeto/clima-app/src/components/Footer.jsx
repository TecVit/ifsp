import styles from './Footer.module.css';

function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.conteudo}>
        <div className={styles.marca}>
          <strong className={styles.nome}>Clima Araraquara</strong>
          <span className={styles.descricao}>
            Pesquisa sobre o calor e as mudanças climáticas na cidade.
          </span>
        </div>

        <p className={styles.copy}>
          © {ano} · Feito por Custódio e Figueredo, SP
        </p>
      </div>
    </footer>
  );
}

export default Footer;