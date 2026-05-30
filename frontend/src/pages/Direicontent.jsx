import React from 'react';

const Direicontent = () => {
  return (
    <div style={styles.container}>
      {/* O "negocinho bonitinho" para mostrar que está em obras */}
      <div>
        <span style={styles.icon}>🚧</span>
      </div>

      <h1 style={styles.title}>Direicontent em construção</h1>
      <p style={styles.subtitle}>
        Essa página será adicionada no futuro!
      </p>
    </div>
  );
};

// Estilos simples para deixar a página centralizada e bonita
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh', // Faz a página ocupar a tela toda
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    textAlign: 'center',
    padding: '20px'
  },
  icon: {
    fontSize: '3.5rem', // Deixa os emojis grandes
    margin: '0 10px',
  },
  title: {
    color: '#d97757', // Um tom de terracota/laranja suave
    fontSize: '2.5rem',
    marginTop: '20px',
    marginBottom: '10px'
  },
  subtitle: {
    color: '#666666',
    fontSize: '1.2rem',
    fontWeight: '400'
  }
};

export default Direicontent;