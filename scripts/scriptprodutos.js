const produtos = [
    { nome: "Cadeira de Rodas", imagem: "imagens/cadeiraderodas.jpg", precoAntigo: 185.00, preco: 130.00, desconto: "-30%"},
    { nome: "Ataduras", imagem: "imagens/bandagem2.webp", preco: 4.99 },
    { nome: "Fita de Articulação", imagem: "imagens/cotovelo.webp", preco: 23.99 },
    { nome: "Muletas de Apoio", imagem: "imagens/muletas.jpg", preco: 40.99 },
    { nome: "Pomada", imagem: "imagens/pomada.webp", preco: 13.99 },
    { nome: "Xarope", imagem: "imagens/xapore.jpg", preco: 8.99 },
    { nome: "Vick Vaporub", imagem: "imagens/vick.webp", precoAntigo: 5.99, preco: 5.40, desconto: "-10%" },
    { nome: "Tensiómetro", imagem: "imagens/tensiometro.png", precoAntigo: 65.00, preco: 51.00, desconto: "-23%" },
    { nome: "Termômetro", imagem: "imagens/termometro.png", preco: 9.99 }
];

function carregarProdutos(lista) {
    const container = document.getElementById("produtos-container");
    container.innerHTML = "";
    lista.forEach(produto => {
        let item = `<div class='consulta-item'>
            ${produto.desconto ? `<div class='desconto'>${produto.desconto}</div>` : ""}
            <h3>${produto.nome}</h3>
            <img src='${produto.imagem}' alt='${produto.nome}' width='150px'>
            ${produto.precoAntigo ? `<p class='preco-antigo'>${produto.precoAntigo.toFixed(2)} €</p>` : ""}
            <div class='actions'>
                <button class='btn-servico' onclick='adicionarAoCarrinho(this)'>${produto.preco.toFixed(2)} €</button>
                <img src='imagens/fav.webp' alt='Adicionar aos favoritos' class='fav-icon' onclick='adicionarFavorito(this)'>
            </div>
        </div>`;
        container.innerHTML += item;
    });
}


function ordenarProdutos() {
    let criterio = document.getElementById("sort").value;
    let listaOrdenada = [...produtos];
    if (criterio === "menorPreco") {
        listaOrdenada.sort((a, b) => a.preco - b.preco);
    } else if (criterio === "maiorPreco") {
        listaOrdenada.sort((a, b) => b.preco - a.preco);
    }
    carregarProdutos(listaOrdenada);
}

function adicionarFavorito(elemento) {
    const produtoItem = elemento.closest('.consulta-item');
    const nome = produtoItem.querySelector('h3').innerText;
    const imagem = produtoItem.querySelector('img').src;
    const preco = produtoItem.querySelector('.btn-servico').innerText;
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const index = favoritos.findIndex(item => item.nome === nome);
    if (index === -1) {
        favoritos.push({ nome, imagem, preco });
        elemento.classList.add('fa-solid');
    } else {
        favoritos.splice(index, 1);
        elemento.classList.remove('fa-solid');
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    mostrarPopup("Adicionado aos favoritos!");
}

function adicionarAoCarrinho(elemento) {
    const produtoItem = elemento.closest('.consulta-item');
    const nome = produtoItem.querySelector('h3').innerText;
    const imagem = produtoItem.querySelector('img').src;
    const preco = elemento.innerText;
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push({ nome, imagem, preco });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    mostrarPopup("Produto adicionado ao carrinho!");
}

function mostrarPopup(mensagem) {
    let popup = document.createElement("div");
    popup.className = "popup-alert";
    popup.innerText = mensagem;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add("mostrar"), 100);
    setTimeout(() => { popup.classList.remove("mostrar"); setTimeout(() => popup.remove(), 500); }, 3000);
}

carregarProdutos(produtos);