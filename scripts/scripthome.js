function adicionarFavorito(elemento) {
    const produtoItem = elemento.closest('.consulta-item');
    const nome = produtoItem.querySelector('h3').innerText;
    const imagem = produtoItem.querySelector('img').src;
    const preco = produtoItem.querySelector('.btn-servico').innerText;

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const index = favoritos.findIndex(item => item.nome === nome);

    if (index === -1) {
        favoritos.push({ nome, imagem, preco });
        elemento.classList.remove('fa-regular');
        elemento.classList.add('fa-solid');
    } else {
        favoritos.splice(index, 1);
        elemento.classList.remove('fa-solid');
        elemento.classList.add('fa-regular');
    }
    
    mostrarPopup("Adicionado aos favoritos!");
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function adicionarAoCarrinho(elemento) {
    const produtoItem = elemento.closest('.consulta-item');
    if (!produtoItem) {
        console.error("Elemento do produto não encontrado!");
        return;
    }

    const nome = produtoItem.querySelector('h3').innerText;
    const imagem = produtoItem.querySelector('img').src;
    const preco = elemento.innerText;

    if (!nome || !imagem || !preco) {
        console.error("Dados do produto estão incompletos!");
        return;
    }

    const produto = { nome, imagem, preco };

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    console.log("Produto adicionado:", produto);
    console.log("Carrinho atualizado:", carrinho);
    
    mostrarPopup("Produto adicionado ao carrinho!");
}

function mostrarPopup(mensagem) {
    let popup = document.createElement("div");
    popup.className = "popup-alert";
    popup.innerText = mensagem;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("mostrar");
    }, 100);

    setTimeout(() => {
        popup.classList.remove("mostrar");
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}