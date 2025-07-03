// Lógica do modal
document.getElementById('transacao').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('hidden');
});

let tipo = 'entrada';

document.getElementById('btn-entrada').addEventListener('click', () => {
  tipo = 'entrada';
  alert('Tipo selecionado: Entrada');
});

document.getElementById('btn-saida').addEventListener('click', () => {
  tipo = 'saida';
  alert('Tipo selecionado: Saída');
});

document.getElementById('form-transacao').addEventListener('submit', function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const categoria = document.getElementById('categoria').value;
  const data_criacao = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD

  const dados = {
    titulo,
    preco: tipo === 'saida' ? -valor : valor,
    categoria,
    data_criacao
  };

  fetch('http://localhost:3000/api/v1/tarefas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
  .then(res => res.json())
  .then(() => {
    alert('Transação cadastrada com sucesso!');
    getTarefas(); // atualiza a tabela
    document.getElementById('modal').classList.add('hidden');
    this.reset();
  })
  .catch(err => {
    console.error('Erro ao salvar transação:', err);
    alert('Erro ao salvar.');
  });
});
