import { useState } from 'react'
import PageLayout from './components/common/PageLayout' 
import Login from './pages/Login'
import Home from './pages/Home'
import Direitodo from './pages/Direitodo'
import Pomodoro from './pages/Pomodoro'
import Direicontent from './pages/Direicontent'
import Simulados from './pages/Simulados'
import Comunidade from './pages/Comunidade'
import './App.css'

export default function App() {
  const [autenticado, setAutenticado] = useState(false)
  
  if (!autenticado) {
    return <Login onLogin={() => setAutenticado(true)} />
  }

  // ── Transformamos em um "Objeto" em vez de Array ──
  const telas = {
    'home': <Home key="home" />, // A Home agora é acessada pela chave 'home' (ao clicar na logo)
    
    // As chaves numéricas representam a ordem dos botões na barra lateral (0 a 4)
    0: <Direitodo key="direitodo" />,
    1: <Pomodoro key="pomodoro" />,  
    2: <Direicontent key="direicontent" />,
    3: <Simulados key="simulados" />,
    4: <Comunidade key="comunidade" />,
  }

  return (
    <PageLayout pages={telas} />
  )
}
