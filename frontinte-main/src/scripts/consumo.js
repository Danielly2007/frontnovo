async function getPerfumaria() {
  const listaDiv = document.getElementById('lista');
  const altDiv = document.getElementById('alt');

  // Limpar a lista antes de preencher com novos itens
  listaDiv.innerHTML = '';
  altDiv.innerHTML = '';

  // Buscar os dados da API
  fetch('http://localhost:8080/perfumaria', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Verificar os dados no console
      lista(data); // Passar os dados para a função lista
    })
    .catch(error => {
      console.error('Erro ao carregar os dados:', error);
    });

  // Função que vai preencher a lista de itens
  function lista(itens) {
    itens.forEach((item) => {
      // Criar o item de lista
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item'); // Adicionar uma classe para o item (opcional)

      // Criar os botões de editar e excluir
      const altButtonsDiv = document.createElement('div');
      altButtonsDiv.innerHTML = `
        <button class="lapis" onclick="editItem(${item.id})">
            <img src="/src/assets/images/lapis.png" class="lapis1">
        </button>
        <button class="lixo" onclick="deleteItem(${item.id})">
            <img src="/src/assets/images/lixo.png" class="lixo1">
        </button>
      `;
      
      // Adicionar as informações do item (nome, marca, preço)
      const itemDetailsDiv = document.createElement('div');
      itemDetailsDiv.innerHTML = `
        <td>${item.name}</td>
        <td>${item.marca}</td>
        <td>${item.preco}</td>
        <td>${item.estoque}</td>
      `;

      // Adicionar os botões e detalhes do item ao div do item
      itemDiv.appendChild(altButtonsDiv);
      itemDiv.appendChild(itemDetailsDiv);

      // Adicionar o item na lista principal
      listaDiv.appendChild(itemDiv);
    });
  }
}

// Função de edição (vai abrir o modal e preencher com os dados do item)
function editItem(id) {
  // Aqui você pode buscar o item pelo ID e preencher o modal com os dados
  console.log('Editar item com id:', id);
  // Exemplo: abrir o modal e preencher os campos
  document.getElementById('myModal').style.display = 'block';
}

// Função de exclusão (vai remover o item da lista)
function deleteItem(id) {
  // Aqui você pode fazer a exclusão do item (remover do mock ou da API)
  console.log('Excluir item com id:', id);
  // Exemplo: remover do mock e atualizar a lista
  // Mock sendo atualizado, você pode substituir por uma requisição API
  const index = mock.findIndex(item => item.id === id);
  if (index > -1) {
    mock.splice(index, 1);
    getPerfumaria(); // Recarregar a lista após exclusão
  }
}

// Chamar a função para carregar os dados da perfumaria
getPerfumaria();
