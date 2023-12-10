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

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
    [0, 4, 8], [2, 4, 6]             // Diagonale Reihen
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

    const winner = checkWinner();
    console.log('const winner: ' + winner);
    if (winner) {
        console.log(winner + 'gewinnt!')
        const winningCells = getWinningCombination();
        console.log(winningCells);
        drawWinningLine(getWinningCombination());
        // Hier könntest du zusätzlichen Code für das Ende des Spiels hinzufügen
    }
}


function getWinningCombination() {
  for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i]; // [0, 1, 2]
      if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
          return winningCombinations[i];
      }
  }
  return null;
}


function checkWinner() {
  for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
          return fields[a]; // Der Spieler auf dieser Linie gewinnt
      }
  }

  return null; // Kein Gewinner gefunden
}


function drawWinningLine(combination) {
  const lineColor = '#ffffff';
  const lineWidth = 5;

  const startCell = document.querySelectorAll(`td`)[combination[0]];
  const endCell = document.querySelectorAll(`td`)[combination[2]];
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  const contentRect = document.getElementById('content').getBoundingClientRect();

  const lineLength = Math.sqrt(
    Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
  );
  const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

  const line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.width = `${lineLength}px`;
  line.style.height = `${lineWidth}px`;
  line.style.backgroundColor = lineColor;
  line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
  line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
  line.style.transform = `rotate(${lineAngle}rad)`;
  line.style.transformOrigin = `top left`;
  document.getElementById('content').appendChild(line);
}
  

  function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
            return fields[a]; // Der Spieler auf dieser Linie gewinnt
        }
    }

    return null; // Kein Gewinner gefunden
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
