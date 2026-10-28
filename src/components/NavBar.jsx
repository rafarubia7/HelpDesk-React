import { Nav } from 'react-bootstrap'

function NavBar({ paginaAtiva, onMudarPagina, totalChamados }) {
  return (
    <Nav className="ticket-nav" aria-label="Navegação de chamados">
      <Nav.Link as="button" className="nav-tab" active={paginaAtiva === 'form'} onClick={() => onMudarPagina('form')}>
        <span className="tab-symbol" aria-hidden="true">+</span>
        Abrir chamado
      </Nav.Link>
      <Nav.Link as="button" className="nav-tab" active={paginaAtiva === 'lista'} onClick={() => onMudarPagina('lista')}>
        Chamados abertos
        <span className="tab-count">{totalChamados}</span>
      </Nav.Link>
    </Nav>
  )
}

export default NavBar