const COMUNS = [
  { nome: 'Leite', emoji: '🥛', qtd: '1 unidade', local: 'Geladeira', dias: 7 },
  { nome: 'Ovos', emoji: '🥚', qtd: '12 unidades', local: 'Geladeira', dias: 20 },
  { nome: 'Tomate', emoji: '🍅', qtd: '4 unidades', local: 'Geladeira', dias: 7 },
  { nome: 'Pão', emoji: '🍞', qtd: '1 pacote', local: 'Armário', dias: 5 }
];
document.getElementById('rep').innerHTML = COMUNS.map((c, i) => `<button data-i="${i}">+ ${c.nome}</button>`).join('');
document.getElementById('rep').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const c = COMUNS[b.dataset.i], lista = getAlimentos();
  lista.push({ ...c, id: Date.now() }); saveAlimentos(lista);
  toast(`${c.nome} adicionado à despensa`);
});
