let editingProductIndex = null; // Variável para armazenar o índice do produto em edição

function saveProduct(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const price = document.getElementById('price').value;
    const images = document.getElementById('images').files;

    if (!title || !content || !price) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    const product = {
        id: editingProductIndex !== null ? editingProductIndex : new Date().getTime(), // Mantém o ID se estiver editando
        title: title,
        content: content,
        price: parseFloat(price).toFixed(2),
        images: []
    };

    if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                product.images.push(e.target.result);
            };
            reader.readAsDataURL(images[i]);
        }
    }

    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (editingProductIndex !== null) {
        // Se estiver editando, substitui o produto existente
        products[editingProductIndex] = product;
        editingProductIndex = null; // Reseta o índice de edição
    } else {
        // Se for um novo produto, adiciona à lista
        products.push(product);
    }

    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('price').value = '';
    document.getElementById('images').value = '';

    alert('Produto salvo com sucesso!');
    window.location.href = 'adminlista.html'; // Redireciona para a lista de produtos
}

function loadProducts() {
    const productList = document.getElementById('product-list');

    const products = JSON.parse(localStorage.getItem('products')) || [];

    productList.innerHTML = '';

    products.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.content}</p>
            <p><strong>Preço:</strong> R$ ${product.price}</p>
            <div class="product-images">
                ${product.images.map(image => `<img src="${image}" alt="${product.title}" width="100">`).join('')}
            </div>
            <div class="product-actions">
                <button class="edit" onclick="editProduct(${index})">Editar</button>
                <button class="delete" onclick="deleteProduct(${index})">Excluir</button>
            </div>
        `;
        productList.appendChild(productItem);
    });
}

function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (index < 0 || index >= products.length) {
        alert('Produto não encontrado!');
        return;
    }

    const product = products[index];

    // Preenche o formulário com os dados do produto
    document.getElementById('title').value = product.title;
    document.getElementById('content').value = product.content;
    document.getElementById('price').value = product.price;

    // Define o índice do produto em edição
    editingProductIndex = index;

    // Redireciona para a página de edição
    window.location.href = 'admin.html';
}

function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (index < 0 || index >= products.length) {
        alert('Produto não encontrado!');
        return;
    }

    products.splice(index, 1);

    localStorage.setItem('products', JSON.stringify(products));

    loadProducts();

    alert('Produto excluído com sucesso!');
}

document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.querySelector('.save');
    if (saveButton) {
        saveButton.addEventListener('click', saveProduct);
    }

    if (window.location.pathname.includes('adminlista.html')) {
        loadProducts();
    }
});