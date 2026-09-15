// Configuração do NOVO ambiente. Não apontar este repositório para o Supabase
// de produção do barbearia-v2: a migração multi-vertical altera schema e RLS.
var SUPA_URL = 'https://vvgpykbmpwgdtcgakwod.supabase.co'
var SUPA_KEY = 'sb_publishable_zOSncEB4Vzl3zaMf4QzYHg_9Or_0pQm'
// Usa sempre o domínio atual (local, beta ou produção) nos retornos de autenticação.
var APP_URL = window.location.origin
