let itens = JSON.parse(localStorage.getItem('nfItens')) || [];

function atualizarTabela() {
  const corpo = document.querySelector("#tabela-itens tbody");
  corpo.innerHTML = "";
  let totalGeral = 0;
  let totalItem = 0;
  let totalProdutos = 0;

  itens.forEach(item => {
    const linha = document.createElement("tr");
    const total = item.quantidade * item.preco;
    totalGeral += total;
    totalItem += item.quantidade;
    totalProdutos = itens.length;

    linha.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.quantidade}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td>R$ ${total.toFixed(2)}</td>
      <td><button class="btn-delete" onclick="deletarItem(${itens.indexOf(item)})">🗑️</button></td>
    `;

    corpo.appendChild(linha);
  });

  document.getElementById("total-geral").innerText = totalGeral.toFixed(2);
  document.getElementById("qtd-itens").innerText = totalItem;
  document.getElementById('qtd-produtos').innerText = totalProdutos;
  localStorage.setItem('nfItens', JSON.stringify(itens));
}

function adicionarItem() {
  const nome = document.getElementById("nome").value;
  const quantidade = parseFloat(document.getElementById("quantidade").value);
  const preco = parseFloat(document.getElementById("preco").value);

  if (!nome || isNaN(quantidade) || isNaN(preco)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  itens.push({ nome, quantidade, preco });
  atualizarTabela();

  document.getElementById("nome").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("preco").value = "";
}

function limparLista() {
  const confirmar = confirm("Tem certeza que deseja apagar todos os itens?");
  if (confirmar) {
    itens = [];
    localStorage.removeItem('nfItens'); // limpa o armazenamento local também
    atualizarTabela();
  }
}

function salvarJSON() {

  const total = itens.reduce((acc,item) => acc + (item.quantidade * item.preco),0);
  const jsonfinal = {
    data: new Date().toISOString(),
    valor_total: parseFloat(total.toFixed(2)),
    itens: itens
  };


  const blob = new Blob([JSON.stringify(jsonfinal, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `compra_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
}

function deletarItem(index) {
  const confirmar = confirm("Deseja remover este item?");
  if (confirmar) {
    itens.splice(index, 1);
    atualizarTabela();
  }
}

atualizarTabela();