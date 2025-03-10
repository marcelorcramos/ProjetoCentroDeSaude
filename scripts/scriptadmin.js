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
        id: new Date().getTime(),
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

    products.push(product);

    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('price').value = '';
    document.getElementById('images').value = '';

    alert('Produto salvo com sucesso!');
}

function loadProducts() {
    const productList = document.getElementById('product-list');

    const products = JSON.parse(localStorage.getItem('products')) || [];

    productList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.content}</p>
            <p><strong>Preço:</strong> R$ ${product.price}</p>
            <div class="product-images">
                ${product.images.map(image => `<img src="${image}" alt="${product.title}" width="100">`).join('')}
            </div>
        `;
        productList.appendChild(productItem);
    });
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