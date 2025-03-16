let editingProductIndex = null; 
let currentFilter = 'all';

function saveProduct(index) {
    const editForm = document.getElementById(`edit-form-${index}`);
    
    const title = editForm.querySelector('.edit-title').value;
    const content = editForm.querySelector('.edit-content').value;
    const price = editForm.querySelector('.edit-price').value;
    const isActive = editForm.querySelector('.edit-status').checked;
    const imagesInput = editForm.querySelector('.edit-images');
    
    if (!title || !content || !price) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }
    
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    const product = products[index];
    
    product.title = title;
    product.content = content;
    product.price = parseFloat(price).toFixed(2);
    product.isActive = isActive;
    
    if (imagesInput.files.length > 0) {
        product.images = [];
        
        const files = imagesInput.files;
        let imagesProcessed = 0;
        
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                product.images.push(e.target.result);
                imagesProcessed++;
                
                if (imagesProcessed === files.length) {
                    finalizeSave(products);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    } else {
        finalizeSave(products);
    }
}

function finalizeSave(products) {
    localStorage.setItem('products', JSON.stringify(products));
    
    loadProducts();
    
    alert('Produto salvo com sucesso!');
}

function addNewProduct(event) {
    if (event) event.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const price = document.getElementById('price').value;
    const isActive = document.getElementById('status').checked;
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
        isActive: isActive, 
        images: []
    };
    
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    products.push(product);
    
    if (images.length > 0) {
        let imagesProcessed = 0;
        
        for (let i = 0; i < images.length; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                product.images.push(e.target.result);
                imagesProcessed++;
                
                if (imagesProcessed === images.length) {
                    localStorage.setItem('products', JSON.stringify(products));
                    
                    document.getElementById('title').value = '';
                    document.getElementById('content').value = '';
                    document.getElementById('price').value = '';
                    document.getElementById('images').value = '';
                    document.getElementById('status').checked = true;
                    
                    alert('Produto adicionado com sucesso!');
                    loadProducts();
                }
            };
            reader.readAsDataURL(images[i]);
        }
    } else {
        localStorage.setItem('products', JSON.stringify(products));
        
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        document.getElementById('price').value = '';
        document.getElementById('images').value = '';
        document.getElementById('status').checked = true;
        
        alert('Produto adicionado com sucesso!');
        loadProducts();
    }
}

function filterProducts(filter) {
    currentFilter = filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`filter-${filter}`).classList.add('active');
    
    loadProducts();
}

function loadProducts() {
    const productList = document.getElementById('product-list');
    
    if (!productList) return;
    
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    if (currentFilter === 'active') {
        products = products.filter(product => product.isActive !== false);
    } else if (currentFilter === 'inactive') {
        products = products.filter(product => product.isActive === false);
    }
    
    const totalCount = document.getElementById('total-count');
    if (totalCount) {
        totalCount.textContent = products.length;
    }
    
    productList.innerHTML = '';
    
    if (products.length === 0) {
        productList.innerHTML = '<div class="no-products">Nenhum produto encontrado.</div>';
        return;
    }
    
    products.forEach((product, index) => {
        if (product.isActive === undefined) {
            product.isActive = true;
        }
        
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.id = `product-${index}`;
        
        const viewMode = document.createElement('div');
        viewMode.className = 'view-mode';
        viewMode.innerHTML = `
            <div class="product-header">
                <h3>${product.title}</h3>
                <span class="status-badge ${product.isActive ? 'active' : 'inactive'}">
                    ${product.isActive ? 'Ativo' : 'Inativo'}
                </span>
            </div>
            <p>${product.content}</p>
            <p><strong>Preço:</strong> R$ ${product.price}</p>
            <div class="product-images">
                ${product.images.map(image => `<img src="${image}" alt="${product.title}" width="100">`).join('')}
            </div>
            <div class="product-actions">
                <button class="edit" onclick="editProduct(${index})">Editar</button>
                <button class="delete" onclick="deleteProduct(${index})">Excluir</button>
                <button class="toggle-status" onclick="toggleProductStatus(${index})">
                    ${product.isActive ? 'Desativar' : 'Ativar'}
                </button>
            </div>
        `;
        
        // Formulário de edição (inicialmente oculto)
        const editMode = document.createElement('div');
        editMode.className = 'edit-mode';
        editMode.style.display = 'none';
        editMode.innerHTML = `
            <form id="edit-form-${index}" class="edit-form">
                <div class="form-group">
                    <label for="edit-title-${index}">Título:</label>
                    <input type="text" class="edit-title" id="edit-title-${index}" value="${product.title}" required>
                </div>
                <div class="form-group">
                    <label for="edit-content-${index}">Descrição:</label>
                    <textarea class="edit-content" id="edit-content-${index}" required>${product.content}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-price-${index}">Preço:</label>
                    <input type="number" step="0.01" class="edit-price" id="edit-price-${index}" value="${product.price}" required>
                </div>
                <div class="form-group checkbox-group">
                    <label for="edit-status-${index}">
                        <input type="checkbox" class="edit-status" id="edit-status-${index}" ${product.isActive ? 'checked' : ''}>
                        Produto ativo
                    </label>
                </div>
                <div class="form-group">
                    <label for="edit-images-${index}">Imagens:</label>
                    <input type="file" class="edit-images" id="edit-images-${index}" multiple>
                </div>
                <div class="product-images">
                    ${product.images.map(image => `<img src="${image}" alt="${product.title}" width="100">`).join('')}
                </div>
                <div class="edit-actions">
                    <button type="button" class="save-edit" onclick="saveProduct(${index})">Salvar</button>
                    <button type="button" class="cancel-edit" onclick="cancelEdit(${index})">Cancelar</button>
                </div>
            </form>
        `;
        
        productItem.appendChild(viewMode);
        productItem.appendChild(editMode);
        productList.appendChild(productItem);
    });
}

function createFilterBar() {
    if (!document.getElementById('filter-bar')) {
        const productSection = document.getElementById('product-list').parentElement;
        
        const filterBar = document.createElement('div');
        filterBar.id = 'filter-bar';
        filterBar.className = 'filter-bar';
        filterBar.innerHTML = `
            <div class="filter-title">
                <h2>Lista de Produtos <span class="count-badge">(<span id="total-count">0</span>)</span></h2>
            </div>
            <div class="filter-options">
                <button id="filter-all" class="filter-btn active" onclick="filterProducts('all')">Todos</button>
                <button id="filter-active" class="filter-btn" onclick="filterProducts('active')">Ativos</button>
                <button id="filter-inactive" class="filter-btn" onclick="filterProducts('inactive')">Inativos</button>
            </div>
        `;
        
        productSection.insertBefore(filterBar, document.getElementById('product-list'));
    }
}

function toggleProductStatus(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    if (index < 0 || index >= products.length) {
        alert('Produto não encontrado!');
        return;
    }
    
    products[index].isActive = !products[index].isActive;
    
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
    
    alert(`Produto ${products[index].isActive ? 'ativado' : 'desativado'} com sucesso!`);
}

function editProduct(index) {
    document.querySelectorAll('.edit-mode').forEach(form => {
        form.style.display = 'none';
    });
    
    document.querySelectorAll('.view-mode').forEach(view => {
        view.style.display = 'block';
    });
    
    const productItem = document.getElementById(`product-${index}`);
    const viewMode = productItem.querySelector('.view-mode');
    const editMode = productItem.querySelector('.edit-mode');
    
    viewMode.style.display = 'none';
    editMode.style.display = 'block';
    
    editingProductIndex = index;
}

function cancelEdit(index) {
    const productItem = document.getElementById(`product-${index}`);
    const viewMode = productItem.querySelector('.view-mode');
    const editMode = productItem.querySelector('.edit-mode');
    
    viewMode.style.display = 'block';
    editMode.style.display = 'none';
    
    editingProductIndex = null;
}

function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (index < 0 || index >= products.length) {
        alert('Produto não encontrado!');
        return;
    }

    if (confirm('Tem certeza que deseja excluir este produto?')) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
        alert('Produto excluído com sucesso!');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.querySelector('.save');
    if (saveButton) {
        saveButton.addEventListener('click', addNewProduct);
        
        const formGroups = document.querySelectorAll('.form-group');
        if (formGroups.length > 0) {
            const lastFormGroup = formGroups[formGroups.length - 1];
            
            const statusFormGroup = document.createElement('div');
            statusFormGroup.className = 'form-group checkbox-group';
            statusFormGroup.innerHTML = `
                <label for="status">
                    <input type="checkbox" id="status" checked>
                    Produto ativo
                </label>
            `;
            
            lastFormGroup.parentNode.insertBefore(statusFormGroup, lastFormGroup);
        }
    }

    if (document.getElementById('product-list')) {
        createFilterBar();
        
        loadProducts();
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .product-item {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .product-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .status-badge {
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
        }
        .status-badge.active {
            background-color: #4CAF50;
            color: white;
        }
        .status-badge.inactive {
            background-color: #f44336;
            color: white;
        }
        .edit-form {
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 5px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .checkbox-group label {
            display: flex;
            align-items: center;
            font-weight: normal;
        }
        .checkbox-group input[type="checkbox"] {
            margin-right: 8px;
            width: auto;
        }
        .form-group input, .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .edit-actions {
            margin-top: 10px;
        }
        .edit-actions button, .product-actions button {
            padding: 8px 15px;
            margin-right: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .save-edit {
            background-color: #4CAF50;
            color: white;
        }
        .cancel-edit {
            background-color: #f44336;
            color: white;
        }
        .toggle-status {
            background-color: #ff9800;
            color: white;
        }
    `;
    document.head.appendChild(style);
});