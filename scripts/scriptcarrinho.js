document.addEventListener("DOMContentLoaded", function () {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let container = document.querySelector(".cart-left");
    let resumoTotal = document.querySelector(".summary-total span:last-child");
    let botaoComprar = document.querySelector(".cart-button");

    if (carrinho.length === 0) {
        container.innerHTML = ` 
            <h2>O meu carrinho <span>0 artigos</span></h2>
            <div class="cart-empty">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Carrinho vazio</p>
            </div>`;
        resumoTotal.innerText = "€0,00";

        botaoComprar.disabled = true;
        botaoComprar.style.opacity = "0.5";
        botaoComprar.style.cursor = "not-allowed";
    } else {
        let listaHTML = `<h2>O meu carrinho <span>${carrinho.length} artigos</span></h2><ul>`;
        let total = 0;

        carrinho.forEach((produto, index) => {
            total += parseFloat(produto.preco.replace("€", "").replace(",", "."));
            listaHTML += ` 
                <li class="cart-item">
                    <img src="${produto.imagem}" width="80">
                    <span>${produto.nome}</span>
                    <span>${produto.preco}</span>
                    <button onclick="removerDoCarrinho(${index})">Remover</button>
                </li>`;
        });

        listaHTML += `</ul>`;
        container.innerHTML = listaHTML;

        resumoTotal.innerText = `€${total.toFixed(2)}`;
        botaoComprar.disabled = false;
        botaoComprar.style.opacity = "1";
        botaoComprar.style.cursor = "pointer";
    }
});

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1); 
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    location.reload(); 
}

function efetuarCompra() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        mostrarPopup("O seu carrinho está vazio! Adicione produtos para continuar.");
        return;
    }

    let isLoggedIn = localStorage.getItem("loggedIn");

    if (isLoggedIn) {
        window.location.href = "confirmarcompra.html";
    } else {
        window.location.href = "login.html";
    }
}

function mostrarPopup(mensagem) {
    let popup = document.getElementById("popup");
    let popupMessage = document.getElementById("popup-message");
    popupMessage.innerText = mensagem;
    popup.style.display = "flex";
}

function fecharPopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "none";
}