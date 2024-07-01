document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buttons .radio-button');
    const subButtonsContainer = document.querySelector('.sub-buttons');
    const mainContent = document.getElementById('main-content');
    const secondaryContent = document.getElementById('secondary-content');
    const infoContent = document.getElementById('info-content');
    const editContent = document.getElementById('edit-content');
    const showMainContentButtons = document.querySelectorAll('#show-main-content, #show-main-content-from-info, #show-main-content-from-edit');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const newDataButton = document.getElementById('new-data');
    const closeInfoButton = document.getElementById('close-info');
    const saveEditButton = document.getElementById('save-edit');
    const cancelEditButton = document.getElementById('cancel-edit');
    const saveNewDataButton = document.getElementById('save-new-data');
    const cancelNewDataButton = document.getElementById('cancel-new-data');
    const infoDetails = document.getElementById('info-details');
    const editDetails = document.getElementById('edit-details');
    const newDataDetails = document.getElementById('new-data-details');
    let currentPage = 1;
    const rowsPerPage = 10; // Ajuste para garantir que todos os elementos fiquem visíveis
    const tableBody = document.querySelector('tbody');
    const totalRows = 25; // Total de registros

    // Função para adicionar sub-botões
    function addSubButtons(labels) {
        labels.forEach(label => {
            const button = document.createElement('button');
            button.textContent = label;
            button.classList.add('sub-button', 'radio-button');
            subButtonsContainer.appendChild(button);
        });
    }

    // Função para mostrar a página atual da tabela
    function showPage(page) {
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.style.display = (index >= (page - 1) * rowsPerPage && index < page * rowsPerPage) ? '' : 'none';
        });
        prevPageButton.disabled = page === 1;
        nextPageButton.disabled = page === Math.ceil(totalRows / rowsPerPage);
    }

    // Adiciona os registros de exemplo
    for (let i = 1; i <= totalRows; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Exemplo de dado ${i}</td>
            <td>Área ${i}</td>
            <td>Formato ${i}</td>
            <td>Yes</td>
            <td>ITM</td>
            <td>x days</td>
            <td><button class="icon-button delete"></button></td>
            <td><button class="icon-button edit"></button></td>
            <td><button class="icon-button info"></button></td>
            <td><button class="icon-button check"></button></td>
        `;
        tableBody.appendChild(row);
    }

    // Inicializa a tabela na primeira página
    showPage(currentPage);

    // Eventos de navegação
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(totalRows / rowsPerPage)) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Eventos para mostrar e esconder conteúdo
    showMainContentButtons.forEach(button => {
        button.addEventListener('click', () => {
            mainContent.classList.remove('hidden');
            secondaryContent.classList.add('hidden');
            infoContent.classList.add('hidden');
            editContent.classList.add('hidden');
        });
    });

    newDataButton.addEventListener('click', () => {
        mainContent.classList.add('hidden');
        secondaryContent.classList.remove('hidden');
    });

    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('info')) {
            const row = event.target.closest('tr');
            const cells = row.querySelectorAll('td');
            infoDetails.innerHTML = `
                <p>Data: ${cells[0].textContent}</p>
                <p>Area: ${cells[1].textContent}</p>
                <p>Format: ${cells[2].textContent}</p>
                <p>Permitted: ${cells[3].textContent}</p>
            `;
            mainContent.classList.add('hidden');
            infoContent.classList.remove('hidden');
        } else if (event.target.classList.contains('edit')) {
            const row = event.target.closest('tr');
            const cells = row.querySelectorAll('td');
            editDetails.innerHTML = `
                <p>Data: <input type="text" value="${cells[0].textContent}"></p>
                <p>Area: <input type="text" value="${cells[1].textContent}"></p>
                <p>Format: <input type="text" value="${cells[2].textContent}"></p>
                <p>Permitted: <input type="text" value="${cells[3].textContent}"></p>
            `;
            mainContent.classList.add('hidden');
            editContent.classList.remove('hidden');
        } else if (event.target.classList.contains('check')) {
            if (confirm('Confirma (s/n)?')) {
                // Lógica para confirmação
            }
        }
    });

    closeInfoButton.addEventListener('click', () => {
        infoContent.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });

    saveEditButton.addEventListener('click', () => {
        // Aqui você pode adicionar a lógica para salvar as edições
        editContent.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });

    cancelEditButton.addEventListener('click', () => {
        editContent.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });

    saveNewDataButton.addEventListener('click', () => {
        // Aqui você pode adicionar a lógica para salvar os novos dados
        secondaryContent.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });

    cancelNewDataButton.addEventListener('click', () => {
        secondaryContent.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            subButtonsContainer.innerHTML = ''; // Limpa os botões anteriores
            switch (button.id) {
                case 'roi':
                    addSubButtons(['All Counties', 'Dublin', 'Cork', 'Galway']);
                    break;
                case 'ni':
                    addSubButtons(['All Counties', 'Antrim', 'Armagh', 'Down']);
                    break;
                case 'uk':
                    addSubButtons(['England', 'Scotland', 'Wales', 'Northern Ireland']);
                    break;
                case 'brazil':
                    addSubButtons(['Acre', 'Alagoas', 'Amapá', 'Amazonas']);
                    break;
                default:
                    break;
            }
        });
    });

    // Seleciona o primeiro botão "All Registers" ao carregar a página
    document.getElementById('all-registers').click();

    // Eventos para sub-botões
    subButtonsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('radio-button')) {
            const subButtons = subButtonsContainer.querySelectorAll('.radio-button');
            subButtons.forEach(btn => btn.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    });
});
