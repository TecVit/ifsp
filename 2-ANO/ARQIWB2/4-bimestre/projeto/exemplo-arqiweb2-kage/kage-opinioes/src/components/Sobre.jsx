import styles from './Sobre.module.css';

/* =========================================================================
   Sobre — a tela de conteúdo.

   No projeto de vocês é aqui que entra a pesquisa sobre o tema escolhido,
   com texto próprio e as fontes citadas no rodapé da página.
   ========================================================================= */

const MARCOS = [
  {
    numero: '1908',
    titulo: 'Kasato Maru',
    texto:
      'Em 18 de junho, o navio atraca em Santos com 781 japoneses a bordo, depois de 52 dias de viagem. É o marco inicial da imigração japonesa no Brasil.',
  },
  {
    numero: '1,9 mi',
    titulo: 'A maior comunidade',
    texto:
      'É a estimativa de nikkeis no Brasil segundo o Bunkyo — o maior número fora do Japão. “Nikkei” abrange descendentes, japoneses vivendo aqui e simpatizantes da cultura.',
  },
  {
    numero: '日本語',
    titulo: 'Palavras que ficaram',
    texto:
      'Karaokê, quimono, origami, sushi, caqui, biombo. Entraram no português e hoje ninguém pensa duas vezes antes de usar.',
  },
];

export default function Sobre({ aoAvancar }) {
  return (
    <section className={styles.secao}>
      <p className="eyebrow">Capítulo I · O tema</p>

      <h1 className={styles.titulo}>
        A cultura japonesa<br />
        no Brasil <span className="jp">日系</span>
      </h1>

      <p className={styles.lead}>
        Mais de um século depois do primeiro navio, o Japão está no prato, no
        vocabulário e no calendário brasileiro — muitas vezes sem que a gente
        perceba. Esta página reúne três marcos e, no fim, pergunta o que
        <em> você </em>já leva da cultura japonesa no dia a dia.
      </p>

      <div className={styles.grade}>
        {MARCOS.map((marco) => (
          <article key={marco.numero} className={styles.cartao}>
            <p className={`${styles.numero} jp`}>{marco.numero}</p>
            <h3 className={styles.cartaoTitulo}>{marco.titulo}</h3>
            <p className={styles.cartaoTexto}>{marco.texto}</p>
          </article>
        ))}
      </div>

      <button className={styles.cta} onClick={aoAvancar}>
        <span>Responder as três perguntas</span>
        <span className={styles.seta} aria-hidden="true">
          →
        </span>
      </button>

      <p className={styles.fonte}>
        Fonte: Agência Brasil, “Entidades japonesas comemoram 112 anos de
        imigração ao Brasil” (2020), com dados da Sociedade Brasileira de
        Cultura Japonesa e de Assistência Social (Bunkyo).
      </p>
    </section>
  );
}
