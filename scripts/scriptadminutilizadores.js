document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo de utilizadores
    const usuarios = [
        {
            nome: "João Silva",
            email: "joao.silva@exemplo.com",
            dataRegistro: "2024-01-15",
            status: "ativo"
        },
        {
            nome: "Maria Oliveira",
            email: "maria.oliveira@exemplo.com",
            dataRegistro: "2024-02-10",
            status: "ativo"
        },
        {
            nome: "Pedro Santos",
            email: "pedro.santos@exemplo.com",
            dataRegistro: "2024-03-05",
            status: "inativo"
        },
        {
            nome: "Ana Costa",
            email: "ana.costa@exemplo.com",
            dataRegistro: "2024-03-20",
            status: "ativo"
        },
        {
            nome: "Carlos Ferreira",
            email: "carlos.ferreira@exemplo.com",
            dataRegistro: "2024-04-02",
            status: "inativo"
        },
        {
            nome: "Mariana Ribeiro",
            email: "mariana.ribeiro@exemplo.com",
            dataRegistro: "2024-04-15",
            status: "ativo"
        },
        {
            nome: "José Almeida",
            email: "jose.almeida@exemplo.com",
            dataRegistro: "2024-05-08",
            status: "ativo"
        }
    ];

    const usersTableBody = document.getElementById('usersTableBody');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');

    // Função para formatar a data
    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-PT');
    }

    // Função para renderizar os utilizadores na tabela
    function renderizarUtilizadores(utilizadores) {
        usersTableBody.innerHTML = '';
        
        if (utilizadores.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        utilizadores.forEach(usuario => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${formatarData(usuario.dataRegistro)}</td>
                <td><span class="status status-${usuario.status}">${usuario.status === 'ativo' ? 'Ativo' : 'Inativo'}</span></td>
            `;
            
            usersTableBody.appendChild(row);
        });
    }

    // Função para filtrar utilizadores
    function filtrarUtilizadores(termo) {
        if (!termo) {
            return usuarios;
        }
        
        termo = termo.toLowerCase();
        
        return usuarios.filter(usuario => 
            usuario.nome.toLowerCase().includes(termo) || 
            usuario.email.toLowerCase().includes(termo)
        );
    }

    // Evento de input para pesquisa
    searchInput.addEventListener('input', function() {
        const termoPesquisa = this.value.trim();
        const resultadosFiltrados = filtrarUtilizadores(termoPesquisa);
        renderizarUtilizadores(resultadosFiltrados);
    });

    // Renderizar todos os utilizadores ao carregar a página
    renderizarUtilizadores(usuarios);
});