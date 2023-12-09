let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
];

let currentPlayer = 'circle'; // Startspieler

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
      tableHTML += '<td onclick="handleCellClick(' + index + ')" id="cell-' + index + '">';
      /* // Check the value in the fields array and set the appropriate symbol
      if (fields[index] === 'circle') {
        tableHTML += generateAnimatedCircle();
      } else if (fields[index] === 'cross') {
        tableHTML += generateAnimatedCross();
      } */
      tableHTML += '</td>';
    }

    tableHTML += '</tr>';
  }

  tableHTML += '</table>';
  content.innerHTML = tableHTML;
}


function handleCellClick(index) {
  const cell = document.getElementById('cell-' + index);

  // Überprüfe, ob das Zellen-Element bereits geklickt wurde
  if (cell.getAttribute('data-clicked') === 'true') {
    return;
  }

  // Markiere das Zellen-Element als geklickt
  cell.setAttribute('data-clicked', 'true');

  // Wechsele zwischen 'circle' und 'cross' im fields-Array
  fields[index] = currentPlayer;
  currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

  // Rendere nur das geklickte Zellen-Element neu
  renderCell(index);
}


function renderCell(index) {
  const cell = document.getElementById('cell-' + index);

  // Rendere das Zellen-Element basierend auf dem fields-Array
  if (fields[index] === 'circle') {
    cell.innerHTML = generateAnimatedCircle();
  } else if (fields[index] === 'cross') {
    cell.innerHTML = generateAnimatedCross();
  }
}
  

  function generateAnimatedCircle() {
    const svgCode = `
      <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="5" 
          stroke-dasharray="188.5" stroke-dashoffset="188.5">
          <animate attributeName="stroke-dashoffset" from="188.5" to="0" dur="0.5s" begin="0s" fill="freeze" />
        </circle>
      </svg>
    `;
  
    return svgCode;
  }


  function generateAnimatedCross() {
    const svgCode = `
      <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
        <line id="line1" x1="10" y1="10" x2="10" y2="10" stroke="#FFC000" stroke-width="5">
          <animate attributeName="x2" from="10" to="60" dur="0.25s" begin="0s" repeatCount="1" fill="freeze" />
          <animate attributeName="y2" from="10" to="60" dur="0.25s" begin="0s" repeatCount="1" fill="freeze" />
        </line>
        <line id="line2" x1="60" y1="10" x2="60" y2="10" stroke="#FFC000" stroke-width="5">
          <animate attributeName="x2" from="60" to="10" dur="0.25s" begin="0.25s" repeatCount="1" fill="freeze" />
          <animate attributeName="y2" from="10" to="60" dur="0.25s" begin="0.25s" repeatCount="1" fill="freeze" />
        </line>
      </svg>
    `;
  
    return svgCode;
  }
