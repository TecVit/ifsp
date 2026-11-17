import styles from './Hora.module.css';

function Hora({ hora, icone, temp }) {
  return (
    <div className={styles.hora}>
      <span className={styles.horario}>{hora}</span>
      <span className={styles.icone}>{icone}</span>
      <span className={styles.temp}>{temp}°</span>
    </div>
  );
}

export default Hora;