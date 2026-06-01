import { useState } from 'react'
import PageLayout from './components/common/PageLayout' 
import Login from './pages/Login'
import Home from './pages/Home'
import Direitodo from './pages/Direitodo'
import Pomodoro from './pages/Pomodoro'
import Direiladder from './pages/Direiladder'
import Simulados from './pages/Simulados'
import Comunidade from './pages/Comunidade'
import './App.css'

export default function App() {
  const [autenticado, setAutenticado] = useState(false)
  const [telaAtual, setTelaAtual] = useState('home')
  
  if (!autenticado) {
    return <Login onLogin={() => setAutenticado(true)} />
  }

  // Mapeamento seguro das telas por chave
  const telas = {
    'home': <Home key="home" setActiveNav={setTelaAtual} />, 
    0: <Direitodo key="direitodo" />,
    1: <Pomodoro key="pomodoro" />,  
    2: <Direiladder key="direiladder" />,
    3: <Simulados key="simulados" setActiveNav={setTelaAtual}/>,
    4: <Comunidade key="comunidade" />,
  }

  return (
    <PageLayout 
      pages={telas} 
      activeNav={telaAtual} 
      setActiveNav={setTelaAtual}
      onLogout={() => setAutenticado(false)} // Função que faz voltar para o Login
    />
  )
}
