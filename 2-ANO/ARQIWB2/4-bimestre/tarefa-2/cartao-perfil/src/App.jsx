import Card from './Card';

const nome = 'Vitor';
const curso = 'Informática';

function App() {
  return (
    <div>
      <h1>Cartão de Perfil</h1>
      <div style={{ display: 'flex' }}>
        <Card nome={nome} curso={curso} avatar="👨‍💻" />
        <Card nome="Ana" curso="Informática" avatar="👩‍💻" />
      </div>
    </div>
  );
}

export default App;
