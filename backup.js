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
  if (winner) {
      alert('Spieler ' + winner + ' gewinnt!');
      const winningCells = getWinningCells(winner);
      highlightWinningCells(winningCells);
      // Hier könntest du zusätzlichen Code für das Ende des Spiels hinzufügen
  }
}


function getWinningCells(winner) {
  // Horizontale Linien
  for (let i = 0; i < 9; i += 3) {
    if (fields[i] === winner && fields[i] === fields[i + 1] && fields[i] === fields[i + 2]) {
      return [i, i + 1, i + 2];
    }
  }

  // Vertikale Linien
  for (let i = 0; i < 3; i++) {
    if (fields[i] === winner && fields[i] === fields[i + 3] && fields[i] === fields[i + 6]) {
      return [i, i + 3, i + 6];
    }
  }

  // Diagonale Linien
  if (fields[0] === winner && fields[0] === fields[4] && fields[0] === fields[8]) {
    return [0, 4, 8];
  }

  if (fields[2] === winner && fields[2] === fields[4] && fields[2] === fields[6]) {
    return [2, 4, 6];
  }

  return [];
}


function highlightWinningCells(winningCells) {
  const overlay = document.createElement('div');
  overlay.className = 'winning-line';

  const cellElements = winningCells.map(index => document.getElementById('cell-' + index));

  const minX = Math.min(...cellElements.map(cell => cell.getBoundingClientRect().left));
  const minY = Math.min(...cellElements.map(cell => cell.getBoundingClientRect().top));
  const maxX = Math.max(...cellElements.map(cell => cell.getBoundingClientRect().right));
  const maxY = Math.max(...cellElements.map(cell => cell.getBoundingClientRect().bottom));

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  const angle = calculateAngle(cellElements[0].getBoundingClientRect(), cellElements[cellElements.length - 1].getBoundingClientRect());
  const length = calculateLength(minX, minY, maxX, maxY);

  overlay.style.width = length + 'px';
  overlay.style.height = '5px'; // Breite der Linie
  overlay.style.backgroundColor = 'white';
  overlay.style.transformOrigin = '0% 0%';
  overlay.style.transform = 'rotate(' + angle + 'rad)';
  overlay.style.position = 'absolute';
  overlay.style.left = minX + 'px';
  overlay.style.top = minY + 'px';

  document.getElementById('content').appendChild(overlay);
}


function calculateAngle(rect1, rect2) {
  return Math.atan2(rect2.top - rect1.bottom, rect2.left - rect1.right);
}

function calculateLength(minX, minY, maxX, maxY) {
  return Math.hypot(maxX - minX, maxY - minY);
}


/* function checkWinner() {
  // Gewinnkombinationen
  const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
      [0, 4, 8], [2, 4, 6]             // Diagonale Reihen
  ];

  // Überprüfe jede Gewinnkombination
  for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      // Überprüfe, ob die Felder der Kombination den gleichen Spieler haben
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
          return fields[a]; // Gewinner gefunden
      }
  } */


function checkWinner() {
  // Horizontale Linien
  for (let i = 0; i < 9; i += 3) {
      if (fields[i] !== null && fields[i] === fields[i + 1] && fields[i] === fields[i + 2]) {
          return fields[i]; // Der Spieler auf dieser Linie gewinnt
      }
  }

  // Vertikale Linien
  for (let i = 0; i < 3; i++) {
      if (fields[i] !== null && fields[i] === fields[i + 3] && fields[i] === fields[i + 6]) {
          return fields[i]; // Der Spieler auf dieser Linie gewinnt
      }
  }

  // Diagonale Linien
  if (fields[0] !== null && fields[0] === fields[4] && fields[0] === fields[8]) {
      return fields[0]; // Der Spieler auf dieser Linie gewinnt
  }

  if (fields[2] !== null && fields[2] === fields[4] && fields[2] === fields[6]) {
      return fields[2]; // Der Spieler auf dieser Linie gewinnt
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