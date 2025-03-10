document.addEventListener("DOMContentLoaded", function () {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let container = document.querySelector(".cart-left");
    let subtotalElem = document.getElementById("subtotal");
    let shippingCostElem = document.getElementById("shipping-cost");
    let totalElem = document.getElementById("total");

    if (carrinho.length === 0) {
        container.innerHTML = ` 
            <h2>O meu carrinho <span>0 artigos</span></h2>
            <div class="cart-empty">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Carrinho vazio</p>
            </div>`;
        subtotalElem.innerText = "€0,00";
        shippingCostElem.innerText = "€0,00";
        totalElem.innerText = "€0,00";
    } else {
        let listaHTML = `<h2>O meu carrinho <span>${carrinho.length} artigo(s)</span></h2><ul>`;
        let subtotal = 0;

        carrinho.forEach((produto, index) => {
            subtotal += parseFloat(produto.preco.replace("€", "").replace(",", "."));
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

        // Definir custo de envio (exemplo: €2,90 para envio padrão)
        let shippingCost = 2.90;

        // Atualizar os valores na interface
        subtotalElem.innerText = `€${subtotal.toFixed(2).replace(".", ",")}`;
        shippingCostElem.innerText = `€${shippingCost.toFixed(2).replace(".", ",")}`;
        totalElem.innerText = `€${(subtotal + shippingCost).toFixed(2).replace(".", ",")}`;
    }
});

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1); 
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    location.reload(); 
}

function efetuarCompra() {
    let paymentMethod = document.getElementById("payment-method").value;
    let subtotalElem = document.getElementById("subtotal");
    let shippingCostElem = document.getElementById("shipping-cost");
    let totalElem = document.getElementById("total");

    let subtotal = parseFloat(subtotalElem.innerText.replace("€", "").replace(",", "."));
    let shippingCost = parseFloat(shippingCostElem.innerText.replace("€", "").replace(",", "."));

    if (!paymentMethod) {
        alert("Por favor, selecione um método de pagamento.");
        return;
    }

    let total = subtotal + shippingCost;

    // Armazenar os dados no localStorage para uso na próxima página
    localStorage.setItem("totalCompra", total.toFixed(2));
    localStorage.setItem("paymentMethod", paymentMethod);

    // Redirecionar para a página de confirmação de compra
    window.location.href = "confirmarcompra4.html";
}