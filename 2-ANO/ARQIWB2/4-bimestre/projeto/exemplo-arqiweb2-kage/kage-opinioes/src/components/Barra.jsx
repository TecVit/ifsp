import styles from './Barra.module.css';

/* =========================================================================
   Barra — um componente pequeno, reutilizável, que só recebe props.

   Ele não sabe nada sobre o Supabase nem sobre o tema do projeto:
   recebe um rótulo, um número e o total, e desenha a barra.
   É o mesmo molde usado três vezes na tela de resultados.

   Repare na desestruturação logo no parâmetro — o estilo que vocês viram
   na aula de props.
   ========================================================================= */

export default function Barra({ rotulo, valor, total, cor }) {
  const porcentagem = total > 0 ? Math.round((valor / total) * 100) : 0;

  return (
    <div className={styles.linha}>
      <p className={styles.rotulo}>{rotulo}</p>

      <div className={styles.trilho}>
        <div
          className={styles.preenchimento}
          style={{ width: `${porcentagem}%`, background: cor }}
        />
      </div>

      <p className={styles.valor}>
        {valor}
        <span className={styles.pct}> · {porcentagem}%</span>
      </p>
    </div>
  );
}
