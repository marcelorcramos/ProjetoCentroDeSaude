// Função para ordenar os produtos
function ordenarProdutos() {
    const criterio = document.getElementById("sort").value;
    const container = document.getElementById("produtos-container");
    const produtos = Array.from(container.querySelectorAll('.consulta-item'));
    
    if (criterio === "menorPreco") {
        produtos.sort((a, b) => parseFloat(a.dataset.preco) - parseFloat(b.dataset.preco));
    } else if (criterio === "maiorPreco") {
        produtos.sort((a, b) => parseFloat(b.dataset.preco) - parseFloat(a.dataset.preco));
    } else {
        // Ordenação padrão (ordem original do HTML)
        produtos.sort((a, b) => {
            const aIndex = Array.from(container.children).indexOf(a);
            const bIndex = Array.from(container.children).indexOf(b);
            return aIndex - bIndex;
        });
    }
    
    // Limpar o container e adicionar os itens ordenados
    container.innerHTML = '';
    produtos.forEach(produto => container.appendChild(produto));
}

// Função para adicionar aos favoritos
function adicionarFavorito(elemento) {
    const produtoItem = elemento.closest('.consulta-item');
    const nome = produtoItem.querySelector('h3').innerText;
    const imagem = produtoItem.querySelector('img').src;
    const preco = produtoItem.querySelector('.btn-servico').innerText;
    
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const index = favoritos.findIndex(item => item.nome === nome);
    
    if (index === -1) {
        favoritos.push({ nome, imagem, preco });
        // Mudar para uma imagem de favorito preenchida
        elemento.src = "imagens/fav-filled.webp";
    } else {
        favoritos.splice(index, 1);
        // Voltar para a imagem de favorito normal
        elemento.src = "imagens/fav.webp";
    }
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    mostrarPopup("Adicionado aos favoritos!");
}

// Função para adicionar ao carrinho
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

// Função para mostrar popup
function mostrarPopup(mensagem) {
    let popup = document.createElement("div");
    popup.className = "popup-alert";
    popup.innerText = mensagem;
    document.body.appendChild(popup);
    
    setTimeout(() => popup.classList.add("mostrar"), 100);
    setTimeout(() => { 
        popup.classList.remove("mostrar"); 
        setTimeout(() => popup.remove(), 500); 
    }, 3000);
}

// Função para verificar o estado dos favoritos ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const favoritosIcons = document.querySelectorAll('.fav-icon');
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    favoritosIcons.forEach(icon => {
        const produtoItem = icon.closest('.consulta-item');
        const nome = produtoItem.querySelector('h3').innerText;
        
        if (favoritos.some(item => item.nome === nome)) {
            icon.src = "imagens/fav-filled.webp"; // Mude para uma imagem preenchida
        }
    });
});