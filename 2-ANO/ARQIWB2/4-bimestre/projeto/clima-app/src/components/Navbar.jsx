import styles from './Navbar.module.css';
import Logo from '../assets/logo.svg';

import Dia from '../components/Dia';

function Navbar({ page, irParaInicio, irParaFormulario, irParaResultados }) {
  const classe = (nome) => `${styles.link} ${nome === page && styles.linkActive}`

  return (
    <>
      <header className={styles.navbar}>
        <img className={styles.logo} src={Logo} alt='Logo' />

        <nav className={styles.links}>
          <a className={classe('home')}
            onClick={irParaInicio}>Início</a>
          <a className={classe('form')} onClick={irParaFormulario}>Formulário</a>
          <a className={classe('results')} onClick={irParaResultados}>Resultados</a>
        </nav>
      </header>
      <div className={styles.hours}>
        <Dia />
      </div>
    </>
  );
}

export default Navbar;