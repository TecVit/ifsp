function Card({ nome, curso, avatar }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      width: '200px',
      textAlign: 'center'
    }}>
      <p style={{ fontSize: '48px' }}>{avatar}</p>
      <h2>{nome}</h2>
      <p>{curso}</p>
    </div>
  );
}

export default Card;
