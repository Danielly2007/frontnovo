// Obtém os elementos necessários
// import express  from '../../node_modules/express';
// const app = express();

const modal = document.getElementById("myModal");
const lapis = [...document.querySelectorAll(".lapis1")]; // Botão para abrir o modal
const fechar = document.getElementById("fechar"); // Botão para fechar o modal
const closeSpan = document.getElementsByClassName("close")[0]; // O "X" do modal

// Função para abrir o modal
lapis.forEach((e)=>{
    e.addEventListener("click",()=>{
        modal.classList.toggle("active");
        console.log(modal)
    })
    
})

// Função para fechar o modal
fechar.onclick = function() {
    modal.classList.remove("active"); // Remove a classe "active", ocultando o modal
}

closeSpan.onclick = function() {
    modal.classList.remove("active"); // Remove a classe "active" quando o usuário clicar no "X"
}

// Fecha o modal quando o usuário clica fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove("active"); // Remove a classe "active" quando o usuário clicar fora do modal
    }
}

// Função para enviar o formulário
document.getElementById('myForm').onsubmit = function(event) {
    event.preventDefault(); // Evitar o envio do formulário para o servidor
  
    const name = document.getElementById('name').value;
    const preco = document.getElementById('preco').value;
    const marca = document.getElementById('marca').value;
  
    // Simulando o envio dos dados
    console.log(`Nome: ${name}`);
    console.log(`Preço: ${preco}`);
    console.log(`Marca: ${marca}`);
};

// // Defina a função myFunction
// export function myFunction() {
//     console.log("MyFuncion");
//   }
  

// app.use(bodyParser.json());

// Simulando um banco de dados com um array de itens
let itens = [
  { id: 1, nome: 'Cassandra Dark Blosson', preco: '100', marca: 'Marca A' },
  { id: 2, nome: 'Her Code Touch', preco: '120', marca: 'Marca B' },
  { id: 3, nome: 'Malbec Desodorante', preco: '90', marca: 'Marca C' }
];





