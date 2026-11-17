import styles from './Home.module.css';
import Hora from '../components/Hora';
import CardFormulario from '../components/CardFormulario';
import FotoAraraquara from '../assets/araraquara.png';

const atual = {
  temperatura: 10,
  condicao: 'Limpo',
  icone: '🌙',
  maxima: 12,
  minima: 9,
  detalhes: [
    { nome: 'Sensação térmica', valor: '18°' },
    { nome: 'Vento', valor: '9 km/h' },
    { nome: 'Umidade', valor: '43%' },
    { nome: 'Nuvem', valor: '24%' },
    { nome: 'Visibilidade', valor: '29 km' },
  ],
};

const aviso =
  'Tempestade prevista por volta das 18:00, com ventos de até 55 km/h e alta probabilidade de raios. Leve guarda-chuva e evite áreas abertas.';

const horas = [
  { hora: 'Agora', icone: '🌙', temp: 10 },
  { hora: '19:00', icone: '🌧️', temp: 11 },
  { hora: '20:00', icone: '⛈️', temp: 12 },
  { hora: '21:00', icone: '🌧️', temp: 10 },
  { hora: '22:00', icone: '🌧️', temp: 11 },
  { hora: '23:00', icone: '☁️', temp: 9 },
  { hora: '00:00', icone: '🌙', temp: 8 },
];

function Home({ irParaFormulario }) {
  return (
    <main className={styles.home}>
      <article className={styles.row}>
        <section className={`${styles.card} ${styles.principal}`}>
          <div className={styles.temperatura}>
            <span className={styles.grau}>{atual.temperatura}°</span>
            <span className={styles.condicao}>
              <span className={styles.iconeCondicao}>{atual.icone}</span>
              {atual.condicao}
            </span>
            <span className={styles.minmax}>
              Máx.: {atual.maxima}° &nbsp; Mín.: {atual.minima}°
            </span>
          </div>

          <ul className={styles.detalhes}>
            {atual.detalhes.map((item) => (
              <li key={item.nome} className={styles.detalhe}>
                <span>{item.nome}</span>
                <strong>{item.valor}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${styles.card} ${styles.hoje}`}>
          <h2 className={styles.titulo}>
            Hoje
          </h2>

          <p className={styles.aviso}>{aviso}</p>

          <div className={styles.horas}>
            {horas.map((item) => (
              <Hora key={item.hora} {...item} />
            ))}
          </div>
        </section>
      </article>
      
      <CardFormulario
        imagem={FotoAraraquara}
        irParaFormulario={irParaFormulario}
      />

    </main>
  );
}

export default Home;