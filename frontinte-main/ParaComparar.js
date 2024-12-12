let registros = [];
const maxRegistros = 8;
let filmeEscolhido = '';
let idEdicao = null;

// Objeto com filmes e suas imagens
const filmes = {
    "Sonic 2": {
        imagem: "img/image 14.png",
    },
    "WiFi Ralph: Quebrando a Internet": {
        imagem: "img/image 15.png",
    },
    "Capitão America": {
        imagem: "img/image 16.png",
    },
    "Panico": {
        imagem: "img/image 17.png",
    },
};

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const chave = document.getElementById('chave').value.trim();
    const horario = document.getElementById('horario').value;

    // Verificando se o filme foi escolhido
    if (!filmeEscolhido) {
        alert('Por favor, escolha um filme antes de confirmar.');
        return;
    }

    // Verificando se a chave está correta
    if (!/^\d{4}$/.test(chave)) {
        alert('A chave deve conter exatamente 4 dígitos.');
        return;
    }

    // Verificando se o nome ou a chave já existem
    if (registros.some((r) => r.nome === nome || r.chave === chave)) {
        alert('Nome ou chave já estão em uso.');
        return;
    }

    // Verificando se o horário é válido
    const [hora, minuto] = horario.split(':').map(Number);
    if (hora >= 24 || minuto >= 60) {
        alert('O horário deve estar no formato correto e ser válido (HH:MM).');
        return;
    }

    // Capturando a foto escolhida, caso o usuário tenha escolhido uma nova foto
    const fotoInput = document.getElementById('novaFoto');
    let fotoURL = '';

    if (fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onloadend = function () {
            fotoURL = reader.result; // A URL da imagem é salva como base64
            salvarRegistro(fotoURL); // Salva o registro com a URL da foto
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        // Se o usuário não escolheu uma nova foto, mantém a foto anterior
        if (idEdicao !== null) {
            const registroExistente = registros.find(r => r.id === idEdicao);
            fotoURL = registroExistente.fotoURL; // Mantém a foto existente
        } else {
            fotoURL = 'img/default-profile.png'; // Foto padrão
        }
        salvarRegistro(fotoURL);
    }
});

function salvarRegistro(fotoURL) {
    const nome = document.getElementById('nome').value.trim();
    const chave = document.getElementById('chave').value.trim();
    const horario = document.getElementById('horario').value;

    const novoRegistro = {
        id: Date.now(),
        nome,
        chave,
        horario,
        filme: filmeEscolhido,
        fotoURL, // Adiciona a URL da foto no registro
    };

    if (idEdicao !== null) {
        // Atualiza o registro existente
        const registro = registros.find((r) => r.id === idEdicao);
        registro.nome = novoRegistro.nome;
        registro.chave = novoRegistro.chave;
        registro.horario = novoRegistro.horario;
        registro.filme = novoRegistro.filme;
        registro.fotoURL = novoRegistro.fotoURL; // Atualiza a foto se ela foi alterada
        idEdicao = null;
        alert('Reserva atualizada com sucesso!');
    } else {
        if (registros.length >= maxRegistros) {
            alert('Você já atingiu o limite de 8 registros!');
            return;
        }
        registros.push(novoRegistro); // Adiciona o novo registro
        alert('Reserva criada com sucesso!');
    }

    renderRegistros();
    document.getElementById('form').reset();
    filmeEscolhido = '';
    document.getElementById('submit-btn').textContent = '✔️ Confirmar Reserva';
}

function renderRegistros() {
    const registroList = document.getElementById('registro-list');
    registroList.innerHTML = '';

    registros.forEach((registro) => {
        const div = document.createElement('div');
        div.className = 'registro-item';
        div.innerHTML = `
            <img src="${registro.fotoURL}" alt="Imagem de Perfil" class="perfil-img">
            <div>
                <strong>Nome:</strong> ${registro.nome}<br>
                <strong>Chave:</strong> ${registro.chave}<br>
                <strong>Filme:</strong> ${registro.filme}<br>
                <strong>Horário:</strong> ${registro.horario}
            </div>
            <button onclick="deletarRegistro(${registro.id})">Excluir</button>
            <button onclick="editarRegistro(${registro.id})">Editar</button>
        `;
        registroList.appendChild(div);
    });
}

function deletarRegistro(id) {
    registros = registros.filter((registro) => registro.id !== id);
    renderRegistros();
}

function editarRegistro(id) {
    const registro = registros.find((r) => r.id === id);
    if (!registro) {
        alert('Registro não encontrado.');
        return;
    }

    document.getElementById('nome').value = registro.nome;
    document.getElementById('chave').value = registro.chave;
    document.getElementById('horario').value = registro.horario;
    filmeEscolhido = registro.filme;

    // Exibe a foto atual e o filme atual
    if (registro.fotoURL) {
        document.querySelector('.perfil-img').src = registro.fotoURL; // Atualiza a imagem
    }
    document.getElementById('submit-btn').textContent = 'Salvar Alterações';
    idEdicao = id;
}

function selectFilme(filme) {
    filmeEscolhido = filme;
    const imagemContainer = document.getElementById('filme-imagem');
    imagemContainer.innerHTML = `<img src="${filmes[filme].imagem}" alt="${filme}" class="filme-imagem">`;
    closeModal();
}

function openModal() {
    document.getElementById('filme-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('filme-modal').classList.add('hidden');
}
