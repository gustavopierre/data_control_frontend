document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buttons button');
    const subButtonsContainer = document.querySelector('.sub-buttons');
    const tableBody = document.querySelector('tbody');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const newDataButton = document.getElementById('new-data');

    const records = [
        { data: 'Exemplo de dado 1', format: 'Formato 1', permitted: 'Sim' },
        { data: 'Exemplo de dado 2', format: 'Formato 2', permitted: 'Não' },
        { data: 'Exemplo de dado 3', format: 'Formato 3', permitted: 'Sim' },
        { data: 'Exemplo de dado 4', format: 'Formato 4', permitted: 'Não' },
        { data: 'Exemplo de dado 5', format: 'Formato 5', permitted: 'Sim' },
        { data: 'Exemplo de dado 6', format: 'Formato 6', permitted: 'Não' },
        { data: 'Exemplo de dado 7', format: 'Formato 7', permitted: 'Sim' },
        { data: 'Exemplo de dado 8', format: 'Formato 8', permitted: 'Não' },
        { data: 'Exemplo de dado 9', format: 'Formato 9', permitted: 'Sim' },
        { data: 'Exemplo de dado 10', format: 'Formato 10', permitted: 'Não' },
        { data: 'Exemplo de dado 11', format: 'Formato 11', permitted: 'Sim' },
        { data: 'Exemplo de dado 12', format: 'Formato 12', permitted: 'Não' },
        { data: 'Exemplo de dado 13', format: 'Formato 13', permitted: 'Sim' },
        { data: 'Exemplo de dado 14', format: 'Formato 14', permitted: 'Não' },
        { data: 'Exemplo de dado 15', format: 'Formato 15', permitted: 'Sim' },
        { data: 'Exemplo de dado 16', format: 'Formato 16', permitted: 'Não' },
        { data: 'Exemplo de dado 17', format: 'Formato 17', permitted: 'Sim' },
        { data: 'Exemplo de dado 18', format: 'Formato 18', permitted: 'Não' },
        { data: 'Exemplo de dado 19', format: 'Formato 19', permitted: 'Sim' },
        { data: 'Exemplo de dado 20', format: 'Formato 20', permitted: 'Não' },
        { data: 'Exemplo de dado 21', format: 'Formato 21', permitted: 'Sim' },
        { data: 'Exemplo de dado 22', format: 'Formato 22', permitted: 'Não' },
        { data: 'Exemplo de dado 23', format: 'Formato 23', permitted: 'Sim' },
        { data: 'Exemplo de dado 24', format: 'Formato 24', permitted: 'Não' },
        { data: 'Exemplo de dado 25', format: 'Formato 25', permitted: 'Sim' },
    ];

    let currentPage = 1;
    const recordsPerPage = 15;

    function renderTable() {
        tableBody.innerHTML = '';
        const start = (currentPage - 1) * recordsPerPage;
        const end = start + recordsPerPage;
        const pageRecords = records.slice(start, end);

        pageRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.data}</td>
                <td>${record.format}</td>
                <td>${record.permitted}</td>
                <td><button class="icon-button"><i class="trash-icon"></i></button></td>
                <td><button class="icon-button"><i class="edit-icon"></i></button></td>
                <td><button class="icon-button"><i class="info-icon"></i></button></td>
            `;
            tableBody.appendChild(row);
        });

        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = end >= records.length;
    }

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if ((currentPage * recordsPerPage) < records.length) {
            currentPage++;
            renderTable();
        }
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            subButtonsContainer.innerHTML = ''; // Clear previous sub-buttons
            switch (button.id) {
                case 'roi':
                    createSubButtons(['All Counties', 'Dublin', 'Cork', 'Galway']);
                    break;
                case 'ni':
                    createSubButtons(['All Counties', 'Antrim', 'Armagh', 'Down']);
                    break;
                case 'uk':
                    createSubButtons(['England', 'Scotland', 'Wales', 'Northern Ireland']);
                    break;
                case 'brazil':
                    createSubButtons(['Acre', 'Bahia', 'Ceará', 'São Paulo']);
                    break;
                default:
                    break;
            }
        });
    });

    function createSubButtons(labels) {
        labels.forEach(label => {
            const button = document.createElement('button');
            button.textContent = label;
            subButtonsContainer.appendChild(button);
        });
    }

    renderTable();
});
