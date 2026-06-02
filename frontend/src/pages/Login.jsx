import { useState } from 'react'
import logoDireitriz from '../assets/logodireitriz.png'
import bentoPhoto from '../assets/profile/bento.jpg'

export default function Login({ onLogin }) {
  const [showPopup, setShowPopup] = useState(false)

  const handleTrocarConta = () => {
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 3000)
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
          background: #f4f6f8;
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
          border-top: 4px solid #001624;
        }

        .login-logo {
          height: 70px;
          margin-bottom: 24px;
          background-color: #001624;
          padding: 10px;
          border-radius: 8px;
        }

        .avatar-container {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 20px;
          border: 3px solid #001624;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .welcome-text {
          font-size: 20px;
          font-weight: 700;
          color: #001624;
          margin-bottom: 4px;
        }

        .user-name {
          font-size: 16px;
          color: #666;
          margin-bottom: 32px;
        }

        .btn-entrar {
          width: 100%;
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

        .btn-entrar:hover { background: #004494; }

        .btn-trocar {
          margin-top: 20px;
          background: none;
          border: none;
          color: #888;
          font-size: 12px;
          text-decoration: underline;
          cursor: pointer;
        }

        .popup-aviso {
          position: fixed;
          bottom: 30px;
          background: #333;
          color: #fff;
          padding: 12px 24px;
          border-radius: 4px;
          font-size: 14px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
          @media (max-width: 480px) {
          .login-container {
            padding: 20px; /* Garante que a caixa branca nÃ£o encoste nas bordas do celular */
          }
          
          .login-box {
            padding: 35px 20px; /* Reduz o espaÃ§amento interno para dar mais espaÃ§o ao conteÃºdo */
          }
          
          .login-logo {
            height: 55px; /* Reduz levemente o logo */
            margin-bottom: 20px;
          }
          
          .avatar-container {
            width: 85px; /* Reduz levemente o avatar */
            height: 85px;
          }
          
          .welcome-text {
            font-size: 18px; /* Ajusta o tamanho da fonte do tÃ­tulo */
          }
          
          .popup-aviso {
            /* Centraliza o popup de aviso no celular e dÃ¡ uma largura adaptÃ¡vel */
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            text-align: center;
            bottom: 20px;
          }
        }
      `}</style>

      <div className="login-container">
        <div className="login-box">
          <img src={logoDireitriz} alt="Logo Direitriz" className="login-logo" />
          
          <div className="avatar-container">
            <img src={bentoPhoto} alt="Foto de Bento Neves" className="avatar-img" />
          </div>

          <h2 className="welcome-text">Bem-vindo de volta!</h2>
          <p className="user-name">Bento Neves</p>

          <button className="btn-entrar" onClick={onLogin}>
            ENTRAR
          </button>

          <button className="btn-trocar" onClick={handleTrocarConta}>
            Trocar de conta
          </button>
        </div>

        {showPopup && (
          <div className="popup-aviso">âš ï¸ FunÃ§Ã£o indisponÃ­vel no momento</div>
        )}
      </div>
    </>
  )
}
