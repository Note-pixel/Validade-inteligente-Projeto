const KEY = 'vi_alimentos';
const SEED = [
  { id: 1, nome: 'Iogurte natural', emoji: '🥛', qtd: '1 unidade', local: 'Geladeira', dias: 0 },
  { id: 2, nome: 'Frango congelado', emoji: '🍗', qtd: '500 g', local: 'Freezer', dias: -1 },
  { id: 3, nome: 'Tomate', emoji: '🍅', qtd: '4 unidades', local: 'Geladeira', dias: 2 },
  { id: 4, nome: 'Leite integral', emoji: '🥛', qtd: '2 unidades', local: 'Geladeira', dias: 3 },
  { id: 5, nome: 'Pão de forma', emoji: '🍞', qtd: '1 pacote', local: 'Armário', dias: 5 },
  { id: 6, nome: 'Arroz', emoji: '🍚', qtd: '2 kg', local: 'Armário', dias: 120 }
];
function getAlimentos() {
  try { const d = JSON.parse(localStorage.getItem(KEY)); if (d) return d; } catch (e) {}
  localStorage.setItem(KEY, JSON.stringify(SEED)); return SEED;
}
function saveAlimentos(l) { localStorage.setItem(KEY, JSON.stringify(l)); }
function statusDe(d) {
  if (d < 0) return { c: 'ex', t: d === -1 ? 'Vencido há 1 dia' : `Vencido há ${-d} dias`, bg: 'var(--ex)' };
  if (d === 0) return { c: 'so', t: 'Vence hoje', bg: 'var(--so)' };
  if (d <= 3) return { c: 'so', t: `Vence em ${d} dias`, bg: 'var(--so)' };
  if (d <= 7) return { c: 'wn', t: `Atenção · ${d} dias`, bg: 'var(--wn)' };
  return { c: 'ok', t: `Seguro · ${d} dias`, bg: 'var(--ok)' };
}
function cardHTML(a, i = 0) {
  const s = statusDe(a.dias);
  return `<article class="food" style="animation-delay:${i * 60}ms" tabindex="0" aria-label="${a.nome}, ${s.t}">
    <div class="ic" style="background:${s.bg}" aria-hidden="true">${a.emoji}</div>
    <div class="grow"><h3>${a.nome}</h3><p class="muted">${a.qtd} · ${a.local}</p><span class="chip s-${s.c}"><i></i>${s.t}</span></div>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></article>`;
}
const ICONS = {
  inicio: '<path d="M3 11l9-8 9 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  despensa: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
  receitas: '<path d="M4 5a1 1 0 0 1 1-1h7v16H5a1 1 0 0 1-1-1zM12 4h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-7"/>',
  perfil: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 4-7 8-7s8 2.5 8 7"/>'
};
function renderNav(ativo) {
  const it = (k, nome, href) => `<a href="${href}" class="${ativo === k ? 'on' : ''}" ${ativo === k ? 'aria-current="page"' : ''}><span><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg></span>${nome}</a>`;
  document.getElementById('nav').innerHTML = `<nav class="nav" aria-label="Navegação principal">${it('inicio', 'Início', 'inicio.html')}${it('despensa', 'Despensa', 'despensa.html')}
    <a href="adicionar.html" aria-label="Adicionar alimento"><div class="fab"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></div></a>
    ${it('receitas', 'Receitas', 'receitas.html')}${it('perfil', 'Perfil', 'perfil.html')}</nav>`;
}
function toast(msg) {
  let t = document.querySelector('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2200);
}
