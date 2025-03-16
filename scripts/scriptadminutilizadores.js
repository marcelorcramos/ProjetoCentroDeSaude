let users = [
    { id: 1, name: "João Silva", email: "joao@exemplo.com", registerDate: "2023-05-10", status: "ativo", purchases: [
        { id: 101, date: "2023-06-15", total: 120.50, items: 3 },
        { id: 102, date: "2023-07-22", total: 75.20, items: 2 }
    ], interactions: [
        { date: "2023-06-01", type: "login" },
        { date: "2023-06-10", type: "wishlist" },
        { date: "2023-07-05", type: "review" }
    ]},
    { id: 2, name: "Maria Oliveira", email: "maria@exemplo.com", registerDate: "2023-02-18", status: "ativo", purchases: [
        { id: 201, date: "2023-03-05", total: 220.00, items: 4 },
        { id: 202, date: "2023-04-12", total: 150.75, items: 3 },
        { id: 203, date: "2023-06-30", total: 89.90, items: 1 }
    ], interactions: [
        { date: "2023-02-20", type: "login" },
        { date: "2023-03-01", type: "wishlist" },
        { date: "2023-04-15", type: "review" }
    ]},
    { id: 3, name: "Carlos Santos", email: "carlos@exemplo.com", registerDate: "2023-07-25", status: "inativo", purchases: [], interactions: [
        { date: "2023-07-25", type: "login" },
        { date: "2023-07-26", type: "wishlist" }
    ]},
    { id: 4, name: "Ana Ferreira", email: "ana@exemplo.com", registerDate: "2023-01-05", status: "ativo", purchases: [
        { id: 301, date: "2023-01-20", total: 67.80, items: 2 }
    ], interactions: [
        { date: "2023-01-06", type: "login" },
        { date: "2023-01-10", type: "wishlist" },
        { date: "2023-01-18", type: "review" }
    ]},
    { id: 5, name: "Pedro Costa", email: "pedro@exemplo.com", registerDate: "2023-08-01", status: "ativo", purchases: [], interactions: [
        { date: "2023-08-01", type: "login" }
    ]}
];

const usersTableBody = document.getElementById('usersTableBody');
const searchInput = document.getElementById('searchInput');
const searchType = document.getElementById('searchType');
const statusFilter = document.getElementById('statusFilter');
const noResults = document.getElementById('noResults');
const confirmModal = document.getElementById('confirmModal');
const confirmTitle = document.getElementById('confirmTitle');
const confirmMessage = document.getElementById('confirmMessage');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');
const detailsModal = document.getElementById('detailsModal');
const userDetailsContent = document.getElementById('userDetailsContent');
const closeDetailsButton = document.getElementById('closeDetailsButton');

let pendingAction = null;

function renderUsersTable(filteredUsers = users) {
    usersTableBody.innerHTML = '';
    
    if (filteredUsers.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        
        const registerDate = new Date(user.registerDate);
        const formattedDate = registerDate.toLocaleDateString('pt-PT');
        
        const statusClass = user.status === 'ativo' ? 'status-active' : 'status-inactive';
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${formattedDate}</td>
            <td><span class="${statusClass}">${user.status === 'ativo' ? 'Ativo' : 'Inativo'}</span></td>
            <td class="actions">
                <button class="btn-toggle-status" data-id="${user.id}">
                    ${user.status === 'ativo' ? 'Desativar' : 'Ativar'}
                </button>
                <button class="btn-view-details" data-id="${user.id}">Ver Mais</button>
            </td>
        `;
        
        usersTableBody.appendChild(row);
    });
    
    addButtonEventListeners();
}

function addButtonEventListeners() {
    document.querySelectorAll('.btn-toggle-status').forEach(button => {
        button.addEventListener('click', function() {
            const userId = parseInt(this.getAttribute('data-id'));
            const user = users.find(user => user.id === userId);
            
            if (user) {
                const newStatus = user.status === 'ativo' ? 'inativo' : 'ativo';
                const action = user.status === 'ativo' ? 'desativar' : 'ativar';
                
                confirmTitle.textContent = `Confirmar ${action}`;
                confirmMessage.textContent = `Tem certeza que deseja ${action} o utilizador ${user.name}?`;
                
                pendingAction = {
                    type: 'toggleStatus',
                    userId: userId,
                    newStatus: newStatus
                };
                
                confirmModal.style.display = 'flex';
            }
        });
    });
    
    document.querySelectorAll('.btn-view-details').forEach(button => {
        button.addEventListener('click', function() {
            const userId = parseInt(this.getAttribute('data-id'));
            showUserDetails(userId);
        });
    });
}

function filterUsers() {
    const searchValue = searchInput.value.toLowerCase();
    const searchOption = searchType.value;
    const statusOption = statusFilter.value;
    
    const filteredUsers = users.filter(user => {
        if (statusOption !== 'all' && user.status !== statusOption) {
            return false;
        }
        
        if (searchValue) {
            if (searchOption === 'name' || searchOption === 'all') {
                if (user.name.toLowerCase().includes(searchValue)) {
                    return true;
                }
            }
            
            if (searchOption === 'email' || searchOption === 'all') {
                if (user.email.toLowerCase().includes(searchValue)) {
                    return true;
                }
            }
            
            return false;
        }
        
        return true;
    });
    
    renderUsersTable(filteredUsers);
}

function showUserDetails(userId) {
    const user = users.find(user => user.id === userId);
    
    if (user) {
        let purchasesHtml = '';
        if (user.purchases && user.purchases.length > 0) {
            purchasesHtml = `
                <div class="detail-section">
                    <h4>Compras</h4>
                    <ul>
                        ${user.purchases.map(purchase => `
                            <li>
                                ID: ${purchase.id} | Data: ${new Date(purchase.date).toLocaleDateString('pt-PT')} | 
                                Total: ${purchase.total.toFixed(2)}€ | Itens: ${purchase.items}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        } else {
            purchasesHtml = `
                <div class="detail-section">
                    <h4>Compras</h4>
                    <p>Este utilizador não realizou nenhuma compra.</p>
                </div>
            `;
        }
        
        let interactionsHtml = '';
        if (user.interactions && user.interactions.length > 0) {
            interactionsHtml = `
                <div class="detail-section">
                    <h4>Interações</h4>
                    <ul>
                        ${user.interactions.map(interaction => `
                            <li>
                                Data: ${new Date(interaction.date).toLocaleDateString('pt-PT')} | 
                                Tipo: ${getInteractionTypeLabel(interaction.type)}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        } else {
            interactionsHtml = `
                <div class="detail-section">
                    <h4>Interações</h4>
                    <p>Este utilizador não tem interações registradas.</p>
                </div>
            `;
        }
        
        userDetailsContent.innerHTML = `
            <div class="user-info">
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Nome:</strong> ${user.name}</p>
                <p><strong>E-mail:</strong> ${user.email}</p>
                <p><strong>Data de Registo:</strong> ${new Date(user.registerDate).toLocaleDateString('pt-PT')}</p>
                <p><strong>Status:</strong> <span class="status-${user.status === 'ativo' ? 'active' : 'inactive'}">${user.status === 'ativo' ? 'Ativo' : 'Inativo'}</span></p>
            </div>
            ${purchasesHtml}
            ${interactionsHtml}
        `;
        
        detailsModal.style.display = 'flex';
    }
}

function getInteractionTypeLabel(type) {
    const types = {
        'login': 'Login',
        'wishlist': 'Lista de Desejos',
        'review': 'Avaliação'
    };
    
    return types[type] || type;
}

function toggleUserStatus(userId, newStatus) {
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
        users[userIndex].status = newStatus;
        filterUsers();
    }
}

searchInput.addEventListener('input', filterUsers);
searchType.addEventListener('change', filterUsers);
statusFilter.addEventListener('change', filterUsers);

confirmButton.addEventListener('click', function() {
    if (pendingAction) {
        if (pendingAction.type === 'toggleStatus') {
            toggleUserStatus(pendingAction.userId, pendingAction.newStatus);
        }
        
        pendingAction = null;
        
        confirmModal.style.display = 'none';
    }
});

cancelButton.addEventListener('click', function() {
    pendingAction = null;
    confirmModal.style.display = 'none';
});

closeDetailsButton.addEventListener('click', function() {
    detailsModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === confirmModal) {
        pendingAction = null;
        confirmModal.style.display = 'none';
    }
    
    if (event.target === detailsModal) {
        detailsModal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    renderUsersTable();
    
    confirmModal.style.display = 'none';
    detailsModal.style.display = 'none';
});