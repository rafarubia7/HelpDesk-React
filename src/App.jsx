import { useEffect, useState } from 'react'
import NavBar from './components/NavBar.jsx'
import FormChamado from './components/FormChamado.jsx'
import ListaChamados from './components/ListaChamados.jsx'
import './App.css'

const API_URL = 'http://localhost:3000/chamados'

function App() {
  const [chamados, setChamados] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erroBusca, setErroBusca] = useState('')
  const [paginaAtiva, setPaginaAtiva] = useState('form')

  useEffect(() => {
    async function buscarChamados() {
      try {
        const resposta = await fetch(API_URL)
        if (!resposta.ok) throw new Error('Falha ao buscar chamados')
        setChamados(await resposta.json())
      } catch {
        setErroBusca('Não foi possível carregar os chamados. Verifique se o JSON Server está ativo.')
      } finally {
        setCarregando(false)
      }
    }

    buscarChamados()
  }, [])

  function adicionarChamado(novoChamado) {
    setChamados((prev) => [...prev, novoChamado])
    setPaginaAtiva('lista')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#inicio" aria-label="Central de suporte, início">
            <span className="brand-mark" aria-hidden="true">+</span>
            <span>central<span className="brand-light">.suporte</span></span>
          </a>
          <div className="topbar-meta"><span className="status-dot" /> Atendimento de TI</div>
        </div>
      </header>

      <main className="main-content">
        <div className="page-heading">
          <div>
            <p className="eyebrow">SUPORTE INTERNO</p>
            <h1>Central de chamados</h1>
            <p className="page-description">Abra uma solicitação ou acompanhe os chamados da equipe.</p>
          </div>
          <div className="heading-index" aria-hidden="true">TI / 01</div>
        </div>

        <NavBar paginaAtiva={paginaAtiva} onMudarPagina={setPaginaAtiva} totalChamados={chamados.length} />
        <section className="content-panel" aria-live="polite">
          {paginaAtiva === 'form' && <FormChamado onChamadoCriado={adicionarChamado} />}
          {paginaAtiva === 'lista' && <ListaChamados chamados={chamados} carregando={carregando} erro={erroBusca} />}
        </section>
      </main>

      <footer className="site-footer">
        <span>Central de serviços de TI</span>
        <span>Precisa de ajuda? Abra um chamado.</span>
      </footer>
    </div>
  )
}

export default App