let fields = [
    null,
    'circle',
    'circle',
    null,
    null,
    'cross',
    'cross',
    null,
    null
];

function init() {
    render();
}

function render() {
    const content = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';

        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            tableHTML += '<td>';

            // Check the value in the fields array and set the appropriate symbol
            if (fields[index] === 'circle') {
                tableHTML += 'O';
            } else if (fields[index] === 'cross') {
                tableHTML += 'X';
            }

            tableHTML += '</td>';
        }

        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    content.innerHTML = tableHTML;
}
