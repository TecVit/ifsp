import { useEffect, useState } from 'react';
import { supabase, TEMA } from '../lib/supabase.js';
import Barra from './Barra.jsx';
import styles from './Results.module.css';

const OPCOES = ['Piorou muito', 'Piorou um pouco', 'Não mudou', 'Não sei dizer'];
const CORES = ['#f87171', '#fbbf24', '#a78bfa', '#94a3b8'];

export default function Resultados() {
  const [answers, setAnswers] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('opinioes')
        .select('resposta_1, resposta_2, resposta_3, criado_em')
        .eq('tema', TEMA)
        .order('criado_em', { ascending: false });

      if (error) {
        console.log('Falha ao ler:', error.message);
        setStatus('error');
        return;
      }

      setAnswers(data);
      setStatus('ready');
    }

    load();
  }, []);

    if (status === 'loading') {
    return (
      <main className={styles.resultados}>
        <section className={`${styles.card} ${styles.topo}`}>
          <div className={styles.skeletonTextos}>
            <div className={`${styles.skeleton} ${styles.skeletonTitulo}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonLinha}`}></div>
          </div>
          <div className={`${styles.skeleton} ${styles.skeletonDestaque}`}></div>
        </section>

        <section className={styles.card}>
          <div className={`${styles.skeleton} ${styles.skeletonSubtitulo}`}></div>

          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={styles.skeletonBarra}>
              <div className={`${styles.skeleton} ${styles.skeletonLinha}`}></div>
              <div className={`${styles.skeleton} ${styles.skeletonTrilho}`}></div>
            </div>
          ))}
        </section>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className={styles.resultados}>
        <section className={styles.card}>
          <p className={styles.avisoErro}>
            Não deu para carregar os resultados. Recarregue a página.
          </p>
        </section>
      </main>
    );
  }

  const total = answers.length;

  if (total === 0) {
    return (
      <main className={styles.resultados}>
        <section className={styles.card}>
          <h1 className={styles.titulo}>Ainda não há respostas</h1>
          <p className={styles.texto}>
            Seja a primeira pessoa a responder. Os números aparecem aqui
            assim que chegar a primeira resposta.
          </p>
        </section>
      </main>
    );
  }

  const average = answers.reduce((sum, a) => sum + a.resposta_2, 0) / total;
  const comments = answers.filter((a) => a.resposta_3);

  return (
    <main className={styles.resultados}>
      <section className={`${styles.card} ${styles.topo}`}>
        <div>
          <h1 className={styles.titulo}>Calor em Araraquara</h1>
          <p className={styles.texto}>
            {total} {total === 1 ? 'resposta registrada' : 'respostas registradas'}
          </p>
        </div>

        <div className={styles.destaque}>
          <span className={styles.numero}>{average.toFixed(1)}</span>
          <span className={styles.rotulo}>impacto médio na rotina (1 a 5)</span>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.subtitulo}>
          O calor mudou nos últimos anos?
        </h2>

        {OPCOES.map((opcao, i) => (
          <Barra
            key={opcao}
            rotulo={opcao}
            valor={answers.filter((a) => a.resposta_1 === opcao).length}
            total={total}
            cor={CORES[i]}
          />
        ))}
      </section>

      {comments.length > 0 && (
        <section className={styles.card}>
          <h2 className={styles.subtitulo}>
            Sugestões para o campus
          </h2>

          <div className={styles.comentarios}>
            {comments.slice(0, 6).map((a, i) => (
              <blockquote key={i} className={styles.comentario}>
                {a.resposta_3}
              </blockquote>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}