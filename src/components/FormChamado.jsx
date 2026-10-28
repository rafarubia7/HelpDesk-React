import { useState } from 'react'

const estadoInicial = { solicitante: '', setor: '', tipo: '', descricao: '', prioridade: '' }

function FormChamado({ onChamadoCriado }) {
  const [formulario, setFormulario] = useState(estadoInicial)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setEnviando(true)
    setErro('')
    try {
      const resposta = await fetch('http://localhost:3000/chamados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario),
      })
      if (!resposta.ok) throw new Error('Falha ao registrar chamado')
      const novoChamado = await resposta.json()
      setFormulario(estadoInicial)
      onChamadoCriado(novoChamado)
    } catch {
      setErro('Não foi possível enviar. Confira se o JSON Server está em execução e tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="form-layout">
      <div className="section-intro">
        <span className="section-kicker">NOVA SOLICITAÇÃO <span>01 — 05</span></span>
        <h2>Como podemos ajudar?</h2>
        <p>Conte para a equipe de TI o que está acontecendo. Os campos marcados com * são obrigatórios.</p>
        <div className="form-aside-note"><span className="note-icon" aria-hidden="true">i</span><span>Descreva o problema com detalhes para agilizar o atendimento.</span></div>
      </div>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="solicitante">Nome do solicitante <span>*</span></label>
          <input id="solicitante" className="form-control" type="text" minLength={3} maxLength={100} autoComplete="name" placeholder="Ex.: Maria Silva" value={formulario.solicitante} onChange={(event) => setFormulario({ ...formulario, solicitante: event.target.value })} required />
        </div>

        <div className="field-row">
          <div className="field-group">
            <label htmlFor="setor">Setor <span>*</span></label>
            <select id="setor" className="form-select" value={formulario.setor} onChange={(event) => setFormulario({ ...formulario, setor: event.target.value })} required>
              <option value="" disabled>Selecione o setor</option><option>TI</option><option>RH</option><option>Financeiro</option><option>Operações</option><option>Comercial</option>
            </select>
          </div>
          <div className="field-group">
            <label htmlFor="tipo">Tipo de problema <span>*</span></label>
            <select id="tipo" className="form-select" value={formulario.tipo} onChange={(event) => setFormulario({ ...formulario, tipo: event.target.value })} required>
              <option value="" disabled>Selecione o tipo</option><option>Hardware</option><option>Software</option><option>Rede</option><option>Acesso</option>
            </select>
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="descricao">Descrição do problema <span>*</span></label>
          <textarea id="descricao" className="form-control" minLength={10} maxLength={1000} rows={4} placeholder="Explique o que aconteceu e, se possível, quando começou..." value={formulario.descricao} onChange={(event) => setFormulario({ ...formulario, descricao: event.target.value })} required />
          <span className="field-hint">Mínimo de 10 caracteres</span>
        </div>

        <div className="field-group priority-field">
          <label htmlFor="prioridade">Prioridade <span>*</span></label>
          <select id="prioridade" className="form-select" value={formulario.prioridade} onChange={(event) => setFormulario({ ...formulario, prioridade: event.target.value })} required>
            <option value="" disabled>Selecione a prioridade</option><option>Baixa</option><option>Média</option><option>Alta</option>
          </select>
        </div>

        {erro && <p className="form-error" role="alert">{erro}</p>}
        <div className="form-actions">
          <span className="required-note"><span>*</span> Campos obrigatórios</span>
          <button className="submit-button" type="submit" disabled={enviando}>{enviando ? 'Enviando...' : <>Enviar chamado <span aria-hidden="true">→</span></>}</button>
        </div>
      </form>
    </div>
  )
}

export default FormChamado