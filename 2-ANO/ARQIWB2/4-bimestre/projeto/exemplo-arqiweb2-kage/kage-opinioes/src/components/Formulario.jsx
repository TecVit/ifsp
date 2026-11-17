import { useState } from 'react';
import { supabase, TEMA } from '../lib/supabase.js';
import styles from './Formulario.module.css';

/* =========================================================================
   Formulario — o coração do projeto.

   Tudo aqui já é conhecido: componente controlado, useState, onSubmit com
   preventDefault. A única novidade do bimestre são as duas palavras
   async e await, que aparecem uma vez cada, lá embaixo.

   O dado não "some" mais: em vez de um alert(), ele vai para o banco.
   ========================================================================= */

const OPCOES = ['Sim, várias vezes', 'Sim, uma vez', 'Nunca'];
const NOTAS = [1, 2, 3, 4, 5];

export default function Formulario({ aoTerminar }) {
  // Um estado por campo — o valor do input mora aqui, não no DOM.
  const [participou, setParticipou] = useState('');
  const [presenca, setPresenca] = useState(0);
  const [costume, setCostume] = useState('');

  // Um estado só para o andamento da requisição.
  // 'parado' | 'enviando' | 'enviado' | 'erro'
  const [status, setStatus] = useState('parado');

  const podeEnviar = participou !== '' && presenca !== 0;

  async function handleSubmit(e) {
    e.preventDefault(); // evita o recarregamento da página
    if (!podeEnviar) return;

    setStatus('enviando');

    // O Supabase NÃO lança exceção quando dá errado:
    // ele devolve um objeto com { data, error }. Quem lê só o data
    // acha que gravou — e não gravou.
    const { error } = await supabase.from('opinioes').insert({
      tema: TEMA,
      resposta_1: participou,
      resposta_2: presenca,
      resposta_3: costume.trim() === '' ? null : costume.trim(),
    });

    if (error) {
      console.error('Falha ao gravar:', error.message);
      setStatus('erro');
      return;
    }

    setStatus('enviado');
  }

  // --- tela de agradecimento, depois do envio ---
  if (status === 'enviado') {
    return (
      <section className={styles.secao}>
        <p className="eyebrow">Capítulo II · Resposta registrada</p>
        <h1 className={styles.titulo}>
          Obrigado <span className="jp">ありがとう</span>
        </h1>
        <p className={styles.lead}>
          Sua resposta foi gravada no banco. Ela já conta nos números da
          próxima tela.
        </p>
        <button className={styles.cta} onClick={aoTerminar}>
          <span>Ver os resultados</span>
          <span className={styles.seta} aria-hidden="true">
            →
          </span>
        </button>
      </section>
    );
  }

  // --- o formulário ---
  return (
    <section className={styles.secao}>
      <p className="eyebrow">Capítulo II · Três perguntas</p>
      <h1 className={styles.titulo}>
        O que você leva<br />da cultura japonesa
      </h1>
      <p className={styles.lead}>
        Leva menos de um minuto. Nada aqui identifica quem respondeu.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* ---------- pergunta 1: escolha única ---------- */}
        <div className={styles.campo}>
          <p className={styles.pergunta}>
            <span className={styles.indice}>01</span>
            Você já participou de algum evento de cultura japonesa no Brasil?
          </p>

          <div className={styles.opcoes}>
            {OPCOES.map((opcao) => (
              <button
                key={opcao}
                type="button"
                onClick={() => setParticipou(opcao)}
                className={
                  participou === opcao
                    ? `${styles.opcao} ${styles.opcaoAtiva}`
                    : styles.opcao
                }
              >
                {opcao}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- pergunta 2: escala de 1 a 5 ---------- */}
        <div className={styles.campo}>
          <p className={styles.pergunta}>
            <span className={styles.indice}>02</span>
            De 1 a 5, quanto a cultura japonesa aparece no seu dia a dia?
          </p>

          <div className={styles.escala}>
            {NOTAS.map((nota) => (
              <button
                key={nota}
                type="button"
                onClick={() => setPresenca(nota)}
                className={
                  presenca === nota
                    ? `${styles.nota} ${styles.notaAtiva}`
                    : styles.nota
                }
              >
                {nota}
              </button>
            ))}
          </div>
          <p className={styles.legenda}>1 = quase nada · 5 = o tempo todo</p>
        </div>

        {/* ---------- pergunta 3: texto livre ---------- */}
        <div className={styles.campo}>
          <p className={styles.pergunta}>
            <span className={styles.indice}>03</span>
            Qual comida, palavra ou costume japonês você usa sem nem pensar que
            é japonês?
          </p>

          <textarea
            className={styles.textarea}
            rows={3}
            maxLength={280}
            placeholder="Opcional — escreva à vontade"
            value={costume}
            onChange={(e) => setCostume(e.target.value)}
          />
        </div>

        {/* ---------- envio e os três estados ---------- */}
        <div className={styles.rodapeForm}>
          <button
            type="submit"
            className={styles.enviar}
            disabled={!podeEnviar || status === 'enviando'}
          >
            {status === 'enviando' ? 'Enviando…' : 'Enviar resposta'}
          </button>

          {status === 'erro' && (
            <p className={styles.erro}>
              Não deu para enviar. Verifique a conexão e tente de novo.
            </p>
          )}

          {status === 'parado' && !podeEnviar && (
            <p className={styles.dica}>
              Responda as perguntas 01 e 02 para liberar o envio.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
