function ListaChamados({ chamados, carregando, erro }) {
  if (carregando) return <div className="loading-state" role="status"><span className="loading-mark" />Carregando chamados...</div>
  if (erro) return <div className="empty-state error-state" role="alert">{erro}</div>

  return (
    <div className="list-content">
      <div className="list-heading">
        <div><span className="section-kicker">ACOMPANHAMENTO</span><h2>Chamados abertos</h2></div>
        <span className="list-total">{chamados.length} {chamados.length === 1 ? 'chamado' : 'chamados'}</span>
      </div>
      {chamados.length === 0 ? (
        <div className="empty-state"><span className="empty-symbol" aria-hidden="true">—</span><h3>Nenhum chamado por enquanto</h3><p>Quando um chamado for registrado, ele aparecerá aqui.</p></div>
      ) : (
        <div className="ticket-list">
          {chamados.map((chamado) => {
            const prioridade = chamado.prioridade.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            return (
              <article className="ticket-item" key={chamado.id}>
                <div className="ticket-main">
                  <div className="ticket-meta"><span>CHAMADO #{String(chamado.id).padStart(3, '0')}</span><span>{chamado.setor}</span></div>
                  <h3>{chamado.tipo} <span className="ticket-separator">/</span> {chamado.solicitante}</h3>
                  <p>{chamado.descricao}</p>
                </div>
                <span className={`priority-badge priority-${prioridade}`}><span className="priority-dot" />{chamado.prioridade}</span>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ListaChamados