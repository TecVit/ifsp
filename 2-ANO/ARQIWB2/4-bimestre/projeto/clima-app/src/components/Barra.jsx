import styles from './Barra.module.css';

function Barra({ rotulo, valor, total, cor }) {
  const porcentagem = Math.round((valor / total) * 100);

  return (
    <div className={styles.barra}>
      <div className={styles.linha}>
        <span>{rotulo}</span>
        <span className={styles.valor}>
          {valor} · {porcentagem}%
        </span>
      </div>

      <div className={styles.trilho}>
        <div
          className={styles.preenchimento}
          style={{ width: `${porcentagem}%`, background: cor }}
        ></div>
      </div>
    </div>
  );
}

export default Barra;