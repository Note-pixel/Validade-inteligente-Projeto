const itens = getAlimentos().slice().sort((a, b) => a.dias - b.dias);
const cont = { ok: 0, so: 0, ex: 0 };
itens.forEach(a => { const c = statusDe(a.dias).c; cont[c === 'wn' ? 'ok' : c]++; });
['ok', 'so', 'ex'].forEach(k => document.getElementById('n-' + k).textContent = cont[k]);
document.getElementById('lista').innerHTML = itens.slice(0, 3).map(cardHTML).join('');
renderNav('inicio');
