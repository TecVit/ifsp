import { useEffect, useState } from 'react';
import { supabase, TEMA } from '../lib/supabase.js';
import Barra from './Barra.jsx';
import styles from './Resultados.module.css';

/* =========================================================================
   Resultados — lê o que está no banco e desenha.

   Três coisas acontecem aqui:
   1. useEffect dispara a busca UMA vez, quando a tela abre;
   2. async/await espera a resposta do Supabase;
   3. .map() transforma a lista em elementos na tela.

   E, de novo, os três finais possíveis: carregando, deu certo, deu erro.
   ========================================================================= */

const OPCOES = ['Sim, várias vezes', 'Sim, uma vez', 'Nunca'];
const CORES = ['#e0231c', '#c9a24a', '#78837c'];

export default function Resultados() {
  const [respostas, setRespostas] = useState([]);
  const [status, setStatus] = useState('carregando'); // carregando | pronto | erro

  useEffect(() => {
    async function buscar() {
      const { data, error } = await supabase
        .from('opinioes')
        .select('resposta_1, resposta_2, resposta_3, criado_em')
        .eq('tema', TEMA)
        .order('criado_em', { ascending: false });

      if (error) {
        console.error('Falha ao ler:', error.message);
        setStatus('erro');
        return;
      }

      setRespostas(data);
      setStatus('pronto');
    }

    buscar();
  }, []); // a lista vazia quer dizer: só uma vez, ao montar a tela

  if (status === 'carregando') {
    return (
      <section className={styles.secao}>
        <p className="eyebrow">Capítulo III · Resultados</p>
        <p className={styles.aviso}>Carregando as respostas…</p>
      </section>
    );
  }

  if (status === 'erro') {
    return (
      <section className={styles.secao}>
        <p className="eyebrow">Capítulo III · Resultados</p>
        <p className={styles.avisoErro}>
          Não deu para carregar os resultados. Recarregue a página.
        </p>
      </section>
    );
  }

  const total = respostas.length;

  // Estado vazio: antes da primeira resposta não há o que agregar,
  // e uma média com total 0 seria uma divisão por zero.
  if (total === 0) {
    return (
      <section className={styles.secao}>
        <p className="eyebrow">Capítulo III · Resultados</p>
        <h1 className={styles.titulo}>Ainda não há respostas</h1>
        <p className={styles.lead}>
          Seja a primeira pessoa a responder — os números aparecem aqui
          assim que chegar a primeira.
        </p>
      </section>
    );
  }

  const media =
    respostas.reduce((soma, r) => soma + r.resposta_2, 0) / total;

  const comentarios = respostas.filter((r) => r.resposta_3);

  return (
    <section className={styles.secao}>
      <p className="eyebrow">Capítulo III · Resultados</p>

      <div className={styles.topo}>
        <h1 className={styles.titulo}>
          O que a turma<br />respondeu <span className="jp">結果</span>
        </h1>
        <div className={styles.destaque}>
          <p className={styles.numero}>{media.toFixed(1)}</p>
          <p className={styles.numeroRotulo}>
            presença média<br />da cultura japonesa
          </p>
        </div>
      </div>

      <p className={styles.lead}>
        {total} {total === 1 ? 'resposta registrada' : 'respostas registradas'}{' '}
        até agora.
      </p>

      <div className={styles.bloco}>
        <h2 className={styles.blocoTitulo}>Já participou de algum evento?</h2>

        {OPCOES.map((opcao, i) => (
          <Barra
            key={opcao}
            rotulo={opcao}
            valor={respostas.filter((r) => r.resposta_1 === opcao).length}
            total={total}
            cor={CORES[i]}
          />
        ))}
      </div>

      {comentarios.length > 0 && (
        <div className={styles.bloco}>
          <h2 className={styles.blocoTitulo}>
            O que as pessoas usam sem perceber
          </h2>

          <div className={styles.comentarios}>
            {comentarios.slice(0, 8).map((r, i) => (
              <blockquote key={i} className={styles.comentario}>
                {r.resposta_3}
              </blockquote>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
