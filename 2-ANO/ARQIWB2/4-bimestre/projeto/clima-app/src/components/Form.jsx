import { useState } from 'react';
import styles from './Form.module.css';
import { supabase, TEMA } from '../lib/supabase.js';

const OPTIONS = ['Piorou muito', 'Piorou um pouco', 'Não mudou', 'Não sei dizer'];
const NOTES = [1, 2, 3, 4, 5];

function Form() {
  const [heatChange, setHeatChange] = useState('');
  const [climateImpact, setClimateImpact] = useState(0);
  const [suggestion, setSuggestion] = useState('');

  const [stats, setStats] = useState('parado');

  const canSend = heatChange !== '' && climateImpact !== 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSend) return;

    setStats('sending');

    const { error } = await supabase.from('opinioes').insert({
      tema: TEMA,
      resposta_1: heatChange,
      resposta_2: climateImpact,
      resposta_3: suggestion.trim() === '' ? null : suggestion.trim(),
    });

    if (error) {
      console.log('Falha ao gravar:', error.message);
      setStats('erro');
      return;
    }

    setStats('sent');

    // limpar formulrio
    setStats('sent');
    setHeatChange('');
    setClimateImpact(0);
    setSuggestion('');
  }

  return (
    <main className={styles.formulario}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.titulo}>Como está o tempo?</h2>

        <fieldset className={styles.grupo}>
          <legend className={styles.pergunta} style={{ margin: '0px 0px 14px 0px'}}>
            Você sente que o calor em Araraquara mudou nos últimos anos?
          </legend>

          {OPTIONS.map((opcao) => (
            <label key={opcao} className={styles.opcao}>
              <input
                type='radio'
                name='heatChange'
                value={opcao}
                checked={heatChange === opcao}
                onChange={() => setHeatChange(opcao)}
              />
              {opcao}
            </label>
          ))}
        </fieldset>

        <div className={styles.grupo}>
          <p className={styles.pergunta}>
            De 1 a 5, quanto as mudanças climáticas afetam a sua rotina hoje?
          </p>

          <div className={styles.notas}>
            {NOTES.map((note) => (
              <button
                key={note}
                type='button'
                className={
                  climateImpact === note
                    ? `${styles.nota} ${styles.notaAtiva}`
                    : styles.nota
                }
                onClick={() => setClimateImpact(note)}
              >
                {note}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grupo}>
          <label htmlFor='suggestion' className={styles.pergunta}>
            O que o campus poderia fazer para diminuir o impacto do calor no dia a dia?
          </label>
          <input
            id='suggestion'
            className={styles.texto}
            type='text'
            placeholder='Escreva sua sugestão (opcional)'
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </div>

        <button
          className={styles.botao}
          type='submit'
          disabled={!canSend || stats === 'sending'}
        >
          {stats === 'sending' ? 'Enviando aguarde...' : 'Enviar'}
        </button>

        {stats === 'sent' && (
          <p className={styles.sucesso}>Resposta foi registrada!</p>
        )}
        {stats === 'erro' && (
          <p className={styles.erro}>Não foi possível enviar, Tente novamente</p>
        )}
      </form>
    </main>
  );
}

export default Form;