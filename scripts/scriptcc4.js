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

        // Recuperar o custo de envio do localStorage
        let shippingCost = parseFloat(localStorage.getItem("shippingCost")) || 2.90;

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

    // Armazenar os dados no localStorage
    localStorage.setItem("totalCompra", total.toFixed(2));
    localStorage.setItem("paymentMethod", paymentMethod);

    // Exibir os dados da compra no lugar da seção de métodos de pagamento
    exibirResumoCompra(subtotal, shippingCost, total, paymentMethod);

    // Exibir o pop-up com o tempo de entrega
    exibirPopupEntrega();
}

function exibirResumoCompra(subtotal, shippingCost, total, paymentMethod) {
    let paymentSection = document.getElementById("payment-section");
    let orderSummary = document.getElementById("order-summary");
    let orderSubtotal = document.getElementById("order-subtotal");
    let orderShippingCost = document.getElementById("order-shipping-cost");
    let orderTotal = document.getElementById("order-total");
    let orderPaymentMethod = document.getElementById("order-payment-method");
    let orderName = document.getElementById("order-name");
    let orderEmail = document.getElementById("order-email");
    let orderAddress = document.getElementById("order-address");

    // Recuperar os dados do usuário do localStorage
    let nome = localStorage.getItem("nome") || "Nenhum";
    let email = localStorage.getItem("email") || "Nenhum";
    let rua = localStorage.getItem("rua") || "Nenhum";
    let cidade = localStorage.getItem("cidade") || "Nenhum";
    let pais = localStorage.getItem("pais") || "Nenhum";
    let codigoPostal = localStorage.getItem("codigoPostal") || "Nenhum";

    // Montar a morada completa
    let moradaCompleta = `${rua}, ${cidade}, ${pais}, ${codigoPostal}`;

    // Atualizar os valores na seção de resumo
    orderSubtotal.innerText = `€${subtotal.toFixed(2).replace(".", ",")}`;
    orderShippingCost.innerText = `€${shippingCost.toFixed(2).replace(".", ",")}`;
    orderTotal.innerText = `€${total.toFixed(2).replace(".", ",")}`;
    orderPaymentMethod.innerText = paymentMethod;
    orderName.innerText = nome;
    orderEmail.innerText = email;
    orderAddress.innerText = moradaCompleta;

    // Ocultar a seção de métodos de pagamento e exibir a seção de resumo
    paymentSection.style.display = "none";
    orderSummary.style.display = "block";
}

function exibirPopupEntrega() {
    // Recuperar o tipo de envio do localStorage
    let shippingOption = localStorage.getItem("shippingOption");

    // Definir o tempo de entrega com base no tipo de envio
    let tempoEntrega;
    if (shippingOption === "standard") {
        tempoEntrega = "5-7 dias úteis";
    } else if (shippingOption === "express") {
        tempoEntrega = "2-3 dias úteis";
    } else {
        tempoEntrega = "dias não especificados";
    }

    // Exibir o pop-up com a mensagem de entrega
    alert(`Compra efetuada com sucesso! Sua encomenda vai chegar em ${tempoEntrega}.`);
}