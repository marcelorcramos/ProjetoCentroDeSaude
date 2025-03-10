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

    let isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
        let userName = localStorage.getItem("name");
        let userEmail = localStorage.getItem("loggedUser");

        document.getElementById("name").value = userName || "";
        document.getElementById("email").value = userEmail || "";
    }
});

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1); 
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    location.reload(); 
}

function efetuarCompra() {
    let nome = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let rua = document.getElementById("street").value;
    let cidade = document.getElementById("city").value;
    let pais = document.getElementById("country").value;
    let codigoPostal = document.getElementById("postal-code").value;

    if (nome === "" || email === "" || rua === "" || cidade === "" || pais === "" || codigoPostal === "") {
        alert("Por favor, preencha todos os campos.");
    } else {
        localStorage.setItem("nome", nome);
        localStorage.setItem("email", email);
        localStorage.setItem("rua", rua);
        localStorage.setItem("cidade", cidade);
        localStorage.setItem("pais", pais);
        localStorage.setItem("codigoPostal", codigoPostal);

        window.location.href = "confirmarcompra2.html";
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