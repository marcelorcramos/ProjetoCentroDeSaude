document.addEventListener("DOMContentLoaded", function () {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let container = document.querySelector(".cart-left");
    let subtotalElem = document.getElementById("subtotal");
    let totalElem = document.getElementById("total");

    if (carrinho.length === 0) {
        container.innerHTML = ` 
            <h2>O meu carrinho <span>0 artigos</span></h2>
            <div class="cart-empty">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Carrinho vazio</p>
            </div>`;
        subtotalElem.innerText = "€0,00";
        totalElem.innerText = "€0,00";
    } else {
        let listaHTML = `<h2>O meu carrinho <span>${carrinho.length} artigo(s)</span></h2><ul>`;
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

        subtotalElem.innerText = `€${total.toFixed(2).replace(".", ",")}`;
        totalElem.innerText = `€${total.toFixed(2).replace(".", ",")}`;
    }
});

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1); 
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    location.reload(); 
}

function updateTotal() {
    let selectedShippingOption = document.querySelector('input[name="shipping"]:checked');
    let subtotalElem = document.getElementById("subtotal");
    let shippingCostElem = document.getElementById("shipping-cost");
    let totalElem = document.getElementById("total");

    let subtotal = parseFloat(subtotalElem.innerText.replace("€", "").replace(",", "."));
    let shippingCost = 0;

    if (selectedShippingOption) {
        if (selectedShippingOption.value === "standard") {
            shippingCost = 2.90;
        } else if (selectedShippingOption.value === "express") {
            shippingCost = 5.90;
        }

        shippingCostElem.innerText = `€${shippingCost.toFixed(2).replace(".", ",")}`;
        totalElem.innerText = `€${(subtotal + shippingCost).toFixed(2).replace(".", ",")}`;
    }
}

function efetuarCompra() {
    let selectedShippingOption = document.querySelector('input[name="shipping"]:checked');
    let subtotalElem = document.getElementById("subtotal");
    let shippingCostElem = document.getElementById("shipping-cost");
    let totalElem = document.getElementById("total");

    let subtotal = parseFloat(subtotalElem.innerText.replace("€", "").replace(",", "."));
    let shippingCost = 0;

    if (!selectedShippingOption) {
        alert("Por favor, selecione uma opção de envio.");
        return;
    }

    if (selectedShippingOption.value === "standard") {
        shippingCost = 2.90;
    } else if (selectedShippingOption.value === "express") {
        shippingCost = 5.90;
    }

    let total = subtotal + shippingCost;

    localStorage.setItem("totalCompra", total.toFixed(2));
    localStorage.setItem("shippingOption", selectedShippingOption.value);
    localStorage.setItem("shippingCost", shippingCost.toFixed(2));

    window.location.href = "confirmarcompra4.html";
}