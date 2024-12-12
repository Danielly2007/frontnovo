// Aguarda o DOM estar carregado
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAdicionarItem');
    const listaDiv = document.getElementById('lista');

    // Verifica se o formulário e a lista existem antes de continuar
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            // Obter os valores dos campos do formulário
            const nome = document.getElementById('nome').value;
            const marca = document.getElementById('marca').value;
            const preco = document.getElementById('preco').value;
            const estoque = document.getElementById('estoque')?.value || 0; // Estoque é opcional

            // Criar um objeto com os dados do formulário
            const data = {
                nome,
                marca,
                preco: parseFloat(preco), // Converte preço para número
                estoque: parseInt(estoque, 10), // Converte estoque para número inteiro
            };

            try {
                // Configurações da requisição
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), // Converte os dados para JSON
                };

                const response = await fetch('http://localhost:8080/perfumaria', requestOptions);

                // Verifica se a resposta foi bem-sucedida
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }

                const result = await response.text(); // Lê a resposta como texto

                // Ação após o cadastro
                alert(result); // Mostra a mensagem retornada pela API
                console.log('Dados cadastrados:', result);

                // Limpar os campos do formulário
                form.reset();

                // Atualiza a lista de itens após o cadastro
                getPerfumaria();

            } catch (error) {
                console.error('Erro ao cadastrar:', error);
                alert('Ocorreu um erro ao cadastrar. Tente novamente mais tarde.');
            }
        });
    } else {
        console.error('Formulário não encontrado no DOM.');
    }

    // Função para buscar e exibir os itens da perfumaria
    async function getPerfumaria() {
        // Verifica se a lista existe antes de tentar preenchê-la
        if (!listaDiv) {
            console.error('Elemento com id "lista" não encontrado no DOM.');
            return;
        }

        listaDiv.innerHTML = ''; // Limpar a lista antes de preencher com novos itens

        try {
            const response = await fetch('http://localhost:8080/perfumaria', { method: 'GET' });
            const data = await response.json(); // Lê os dados como JSON

            // Iterar sobre os itens e criar o HTML dinâmico
            data.forEach((item) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item'); // Classe opcional para os itens

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

                // Criar as informações do item
                const itemDetailsDiv = document.createElement('div');
                itemDetailsDiv.innerHTML = `
                    <td>${item.nome}</td>
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

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Ocorreu um erro ao carregar os dados.');
        }
    }

    // Carregar os itens da perfumaria ao iniciar
    getPerfumaria();
});
