// Função para buscar tarefas e exibir na tabela e nos cards
function getTarefas() {
    fetch('http://localhost:3000/api/v1/tarefas')
        .then(res => res.json())
        .then(data => {
            exibirTarefasNaTabela(data);
            atualizarTotais(data); // calcula e preenche os 3 cards
        })
        .catch(err => console.error('Erro ao buscar tarefas:', err.message));
}

// Função que insere as tarefas na <table>
function exibirTarefasNaTabela(tarefas) {
    const tbody = document.getElementById('body');
    tbody.innerHTML = ''; // limpa a tabela antes de adicionar novas linhas

    tarefas.forEach(tarefa => {
        const tr = document.createElement('tr');

        const tdTitulo = document.createElement('td');
        tdTitulo.textContent = tarefa.titulo;

        const tdPreco = document.createElement('td');
        tdPreco.textContent = formatarMoeda(tarefa.preco);

        const tdCategoria = document.createElement('td');
        tdCategoria.textContent = tarefa.categoria;

        const tdData = document.createElement('td');
        const data = new Date(tarefa.data_criacao);
        tdData.textContent = data.toLocaleDateString('pt-BR');

        tr.appendChild(tdTitulo);
        tr.appendChild(tdPreco);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdData);

        tbody.appendChild(tr);
    });
}

// Função para calcular totais e preencher os 3 cards
function atualizarTotais(tarefas) {
    let totalEntradas = 0;
    let totalSaidas = 0;

    tarefas.forEach(tarefa => {
        const valor = parseFloat(tarefa.preco);
        if (valor > 0) {
            totalEntradas += valor;
        } else {
            totalSaidas += valor;
        }
    });

    const saldo = totalEntradas + totalSaidas;

    document.getElementById('total-entradas').textContent = formatarMoeda(totalEntradas);
    document.getElementById('total-saidas').textContent = formatarMoeda(totalSaidas);
    document.getElementById('total-geral').textContent = formatarMoeda(saldo);
}

// Função para formatar número como moeda brasileira
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Ao carregar a página
getTarefas();
