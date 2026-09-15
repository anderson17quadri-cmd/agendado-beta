(function (root, factory) {
  var api = factory()
  if (typeof module === 'object' && module.exports) module.exports = api
  root.AgendadoTenant = api
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict'

  var DEFAULT_PRIMARY = '#2457D6'
  var DEFAULT_SECONDARY = '#183B91'

  var VERTICALS = {
    barbearia: {
      nome: 'Barbearia', plural: 'Barbearias', profissional: 'Barbeiro', profissionais: 'Barbeiros',
      servico: 'Serviço', servicos: 'Serviços', especialidade: 'Especialidade',
      chamada: 'Marca o teu próximo corte em segundos', acao: 'Marcar o meu corte', icone: 'ic-barber'
    },
    cabeleireiro: {
      nome: 'Cabeleireiro', plural: 'Cabeleireiros', profissional: 'Cabeleireiro', profissionais: 'Cabeleireiros',
      servico: 'Serviço', servicos: 'Serviços', especialidade: 'Especialidade',
      chamada: 'Marca o teu próximo serviço em segundos', acao: 'Marcar agora', icone: 'ic-scissors'
    },
    estetica: {
      nome: 'Espaço de estética', plural: 'Espaços de estética', profissional: 'Especialista', profissionais: 'Especialistas',
      servico: 'Tratamento', servicos: 'Tratamentos', especialidade: 'Especialidade',
      chamada: 'Marca o teu próximo tratamento em segundos', acao: 'Marcar tratamento', icone: 'ic-spark'
    },
    unhas: {
      nome: 'Espaço de unhas', plural: 'Espaços de unhas', profissional: 'Nail artist', profissionais: 'Nail artists',
      servico: 'Serviço', servicos: 'Serviços', especialidade: 'Técnica',
      chamada: 'Marca o teu próximo serviço em segundos', acao: 'Marcar agora', icone: 'ic-spark'
    },
    massagem: {
      nome: 'Espaço de massagens', plural: 'Espaços de massagens', profissional: 'Terapeuta', profissionais: 'Terapeutas',
      servico: 'Sessão', servicos: 'Sessões', especialidade: 'Especialidade',
      chamada: 'Marca a tua próxima sessão em segundos', acao: 'Marcar sessão', icone: 'ic-clock'
    },
    tatuagem: {
      nome: 'Estúdio de tatuagem', plural: 'Estúdios de tatuagem', profissional: 'Tatuador', profissionais: 'Tatuadores',
      servico: 'Sessão', servicos: 'Sessões', especialidade: 'Estilo',
      chamada: 'Marca a tua próxima sessão em segundos', acao: 'Marcar sessão', icone: 'ic-user'
    }
  }

  function vertical(value) {
    return VERTICALS[value] ? value : 'barbearia'
  }

  function termos(value) {
    return VERTICALS[vertical(value)]
  }

  function cor(value, fallback) {
    var text = String(value || '').trim()
    return /^#[0-9a-f]{6}$/i.test(text) ? text.toUpperCase() : fallback
  }

  function tema(negocio) {
    negocio = negocio || {}
    return {
      primary: cor(negocio.cor_primaria, DEFAULT_PRIMARY),
      secondary: cor(negocio.cor_secundaria, DEFAULT_SECONDARY)
    }
  }

  function applyBranding(negocio, doc) {
    if (!negocio) return
    doc = doc || (typeof document !== 'undefined' ? document : null)
    if (!doc) return
    var colors = tema(negocio)
    doc.documentElement.style.setProperty('--accent', colors.primary)
    doc.documentElement.style.setProperty('--accent2', colors.secondary)
    var theme = doc.querySelector('meta[name="theme-color"]')
    if (theme) theme.setAttribute('content', colors.primary)
    doc.body && doc.body.setAttribute('data-vertical', vertical(negocio.vertical))
  }

  function storageKey(tenantId, key) {
    return 'agendado:' + String(tenantId || 'global') + ':' + key
  }

  return {
    DEFAULT_PRIMARY: DEFAULT_PRIMARY,
    DEFAULT_SECONDARY: DEFAULT_SECONDARY,
    VERTICALS: VERTICALS,
    vertical: vertical,
    termos: termos,
    cor: cor,
    tema: tema,
    applyBranding: applyBranding,
    storageKey: storageKey
  }
})
