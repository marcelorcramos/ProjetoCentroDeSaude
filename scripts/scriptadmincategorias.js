// Simplified data and functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const categoriesList = document.querySelector('.categories-list');
    const formSection = document.getElementById('category-form-section');
    const categoryForm = document.getElementById('category-form');
    const deleteModal = document.getElementById('delete-modal');
    const showAddFormBtn = document.getElementById('showAddFormBtn');
    const cancelFormBtn = document.getElementById('cancel-form');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    
    let categoryToDelete = null;
    
    // Event Listeners
    showAddFormBtn.addEventListener('click', () => {
        document.getElementById('form-title').textContent = 'Adicionar Nova Categoria';
        document.getElementById('category-id').value = '';
        document.getElementById('category-name').value = '';
        document.getElementById('category-description').value = '';
        formSection.style.display = 'block';
    });
    
    cancelFormBtn.addEventListener('click', () => {
        formSection.style.display = 'none';
    });
    
    // Handle edit buttons
    categoriesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-category')) {
            const categoryCard = e.target.closest('.category-card');
            const categoryId = categoryCard.dataset.id;
            const categoryName = categoryCard.querySelector('.category-name').textContent;
            const categoryDesc = categoryCard.querySelector('.category-description').textContent;
            
            document.getElementById('form-title').textContent = 'Editar Categoria';
            document.getElementById('category-id').value = categoryId;
            document.getElementById('category-name').value = categoryName;
            document.getElementById('category-description').value = categoryDesc;
            
            formSection.style.display = 'block';
        }
        
        if (e.target.classList.contains('delete-category')) {
            categoryToDelete = e.target.closest('.category-card');
            deleteModal.style.display = 'flex';
        }
    });
    
    // Form submission
    categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const categoryId = document.getElementById('category-id').value;
        const categoryName = document.getElementById('category-name').value;
        const categoryDesc = document.getElementById('category-description').value;
        
        if (categoryId) {
            // Edit existing category
            const categoryCard = document.querySelector(`.category-card[data-id="${categoryId}"]`);
            categoryCard.querySelector('.category-name').textContent = categoryName;
            categoryCard.querySelector('.category-description').textContent = categoryDesc;
        } else {
            // Add new category
            const template = document.getElementById('category-template');
            const newCard = document.importNode(template.content, true).querySelector('.category-card');
            
            const newId = document.querySelectorAll('.category-card').length + 1;
            newCard.dataset.id = newId;
            newCard.querySelector('.category-name').textContent = categoryName;
            newCard.querySelector('.category-description').textContent = categoryDesc;
            newCard.querySelector('.product-count').textContent = '0 produtos';
            
            categoriesList.insertBefore(newCard, document.getElementById('no-categories'));
        }
        
        formSection.style.display = 'none';
    });
    
    // Delete confirmation
    confirmDeleteBtn.addEventListener('click', () => {
        if (categoryToDelete) {
            categoryToDelete.remove();
            deleteModal.style.display = 'none';
            
            // Show "no categories" message if needed
            if (document.querySelectorAll('.category-card').length === 0) {
                document.getElementById('no-categories').style.display = 'block';
            }
        }
    });
    
    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            deleteModal.style.display = 'none';
        }
    });
});