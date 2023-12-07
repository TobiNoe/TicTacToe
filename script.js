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

  render();

  function render() {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
      const row = document.createElement('tr');

      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('td');
        const index = i * 3 + j;

        // Check the value in the fields array and set the appropriate symbol
        if (fields[index] === 'circle') {
          cell.textContent = 'O';
        } else if (fields[index] === 'cross') {
          cell.textContent = 'X';
        }

        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    content.appendChild(table);
  }