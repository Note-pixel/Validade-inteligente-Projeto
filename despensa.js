const FILTROS = ['Todos', 'Vencendo', 'Vencidos', 'Geladeira', 'Armário', 'Freezer'];
let filtro = 'Todos';
const lista = getAlimentos().slice().sort((a, b) => a.dias - b.dias);
function aplica(a, q) {
  if (q && !a.nome.toLowerCase().includes(q)) return false;
  if (filtro === 'Vencendo') return a.dias >= 0 && a.dias <= 3;
  if (filtro === 'Vencidos') return a.dias < 0;
  if (filtro !== 'Todos') return a.local === filtro;
  return true;
}
function render() {
  const q = document.getElementById('busca').value.trim().toLowerCase();
  const r = lista.filter(a => aplica(a, q));
  document.getElementById('lista').innerHTML = r.map(cardHTML).join('');
  document.getElementById('contagem').textContent = `${r.length} alimento${r.length === 1 ? '' : 's'} · ordenados por validade`;
  document.getElementById('vazio').hidden = r.length > 0;
}
document.getElementById('filtros').innerHTML = FILTROS.map(f => `<button class="fchip${f === filtro ? ' on' : ''}" aria-pressed="${f === filtro}">${f}</button>`).join('');
document.getElementById('filtros').addEventListener('click', e => {
  const b = e.target.closest('.fchip'); if (!b) return; filtro = b.textContent;
  document.querySelectorAll('.fchip').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); render();
});
document.getElementById('busca').addEventListener('input', render);
render(); renderNav('despensa');
