import styles from './CardFormulario.module.css';

function CardFormulario({ imagem, irParaFormulario }) {
  return (
    <section className={styles.card}>
      <div className={styles.imagem}>
        {imagem && <img src={imagem} alt='Vista de Araraquara' />}
        <span className={styles.selo}>Araraquara, SP</span>
      </div>

      <div className={styles.conteudo}>
        <h2 className={styles.titulo}>Como está o tempo por aí?</h2>
        <p className={styles.texto}>
          Conte pra gente como você sente o clima em Araraquara hoje:
          temperatura, chuva, vento e conforto. Leva menos de um minuto.
        </p>

        <button className={styles.botao} onClick={irParaFormulario}>
          Responder formulário
        </button>
      </div>
    </section>
  );
}

export default CardFormulario;