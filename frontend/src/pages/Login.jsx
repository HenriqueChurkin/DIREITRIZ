import { useState } from 'react'
import logoDireitriz from '../assets/logodireitriz.png' // Verifique se o caminho da logo está correto

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleEntrar = (e) => {
    e.preventDefault() // Evita que a página recarregue ao enviar o form
    
    // Verificação simples conforme você pediu
    if (usuario === 'admin' && senha === '123') {
      setErro('')
      onLogin() // Chama a função que avisa o App.jsx que o login deu certo
    } else {
      setErro('Usuário ou senha incorretos!')
    }
  }

  return (
    <>
      <style>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100vw;
          background: #f4f6f8; /* Fundo cinza claro que já usamos */
          font-family: "Montserrat", Arial, sans-serif;
        }

        .login-box {
          background: #ffffff;
          padding: 48px 40px;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-top: 4px solid #001624; /* Azul escuro do topbar */
        }

        .login-logo {
          height: 70px;
          margin-bottom: 32px;
          /* Se a logo for branca (feita para o topbar escuro), 
             ela pode sumir no fundo branco. O filtro abaixo inverte as cores 
             só caso seja necessário. Se a logo já tiver cor, pode apagar a linha do filter. */
          background-color: #001624; 
          padding: 10px;
          border-radius: 8px;
        }

        .login-title {
          font-size: 24px;
          font-weight: 700;
          color: #001624;
          margin-bottom: 24px;
          text-align: center;
        }

        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 14px;
          font-weight: 600;
          color: #444444;
        }

        .input-group input {
          padding: 12px 16px;
          border: 1px solid #c8c8c8;
          border-radius: 4px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }

        .input-group input:focus {
          border-color: #0070b8;
        }

        .error-message {
          color: #e32929; /* O vermelho do design */
          font-size: 13px;
          font-weight: 600;
          text-align: center;
          margin-top: -8px;
          margin-bottom: 8px;
        }

        .btn-login {
          margin-top: 8px;
          padding: 14px;
          background: #0056b3;
          color: white;
          font-weight: bold;
          font-size: 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-login:hover {
          background: #004494;
        }
      `}</style>

      <div className="login-container">
        <div className="login-box">
          
          <img src={logoDireitriz} alt="Logo Direitriz" className="login-logo" />
          
          <h2 className="login-title">Acesse sua conta</h2>

          <form className="login-form" onSubmit={handleEntrar}>
            <div className="input-group">
              <label htmlFor="usuario">Usuário</label>
              <input 
                type="text" 
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <input 
                type="password" 
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {erro && <span className="error-message">{erro}</span>}

            <button type="submit" className="btn-login">
              ENTRAR
            </button>
          </form>

        </div>
      </div>
    </>
  )
}