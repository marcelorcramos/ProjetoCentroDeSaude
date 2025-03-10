function carregarFavoritos() {
    const container = document.querySelector('.favoritos-container');
    container.innerHTML = ''; // Limpar antes de carregar

    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (favoritos.length === 0) {
        container.innerHTML = '<p>Nenhum item nos favoritos.</p>';
        return;
    }

    favoritos.forEach(produto => {
        const div = document.createElement('div');
        div.classList.add('favorito-item');
        div.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>${produto.preco}</p>
            <button class="btn-remover">Remover</button>
        `;
        container.appendChild(div);
    });

    // Adicionar eventos de remoção
    document.querySelectorAll('.btn-remover').forEach(button => {
        button.addEventListener('click', (event) => {
            const nomeProduto = event.target.previousElementSibling.previousElementSibling.innerText;
            removerFavorito(nomeProduto);
        });
    });
}

    function removerFavorito(nome) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        favoritos = favoritos.filter(produto => produto.nome !== nome);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        carregarFavoritos();
    }

    document.addEventListener('DOMContentLoaded', carregarFavoritos);