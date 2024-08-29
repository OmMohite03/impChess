// Chess Board Layout and Markups
const labels = {
  rows: ["8", "7", "6", "5", "4", "3", "2", "1"],
  cols: ["A", "B", "C", "D", "E", "F", "G", "H"],
};
const [rows, cols] = [Array(8).fill(null), Array(8).fill(null)];
let selectedPiece = "",
  piecePlaced = false,
  lastPlacedPiece = null;

const createBox = (i, j) => {
  const box = document.createElement("div");
  box.classList.add("box");

  //  settigng box ID 
  box.id = `${labels.cols[j]}${labels.rows[i]}`;
  if ((i + j) % 2 !== 0) box.style.backgroundColor = "black";
  return box;
};

function drawBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.classList.add("boardDiv");
  boardDiv.style.display = "grid";
  boardDiv.style.gridTemplateRows = `repeat(${rows.length + 1}, 50px)`;
  boardDiv.style.gridTemplateColumns = `50px repeat(${cols.length}, 50px) 50px`;

  // Top labels
  boardDiv.append(
    document.createElement("div"),
    ...labels.cols.map((l) => {
      const colLabel = document.createElement("div");
      colLabel.className = "col-label";
      colLabel.textContent = l.toUpperCase();
      return colLabel;
    }),
    document.createElement("div")
  );

  // Creating chess-board
  rows.forEach((_, i) => {
    boardDiv.append(
      createLabel(labels.rows[i]), // Left row label
      ...cols.map((_, j) => createBox(i, j)), // boxes with IDs
      createLabel(labels.rows[i]) // Right row label
    );
  });

  // Bottom labels
  boardDiv.append(
    document.createElement("div"),
    ...labels.cols.map((l) => {
      const colLabel = document.createElement("div");
      colLabel.classList.add("col-label");
      colLabel.textContent = l.toLowerCase();
      return colLabel;
    }),
    document.createElement("div")
  );
}

// create labels
function createLabel(text) {
  const label = document.createElement("div");
  label.classList.add("row-label");
  label.textContent = text;
  return label;
}

// leftTray & btns
function createLeftTray() {
  const tray = document.createElement("div");
  tray.classList.add("leftSideTray");
  document.body.appendChild(tray);

  const pieces = ["king", "queen", "bishop", "rook", "knight", "pawn"];
  pieces.forEach((piece, i) => {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = piece;
    btn.addEventListener("click", () => {
      selectedPiece = piece;
      console.log(`Selected piece: ${selectedPiece}`);
    });
    tray.appendChild(btn);
  });
  return tray;
}

//  actually stores moves for every piece
let currentPawnMoves = []; 

function colorBox(pawnMoves) {
  const updatedBox = document.getElementById(pawnMoves);
  updatedBox.style.border = "4px solid gold";
}

function removeBoxColor() {
  currentPawnMoves.forEach((move) => {
    const removedBox = document.getElementById(move);
    removedBox.style.border = "1px solid black"; 
  });
  currentPawnMoves = []; 
}

// Placing a piece
function placePiece(event) {
  const target = event.target;
  if (target.classList.contains("box") && selectedPiece && !piecePlaced) {
    target.style.backgroundImage = `url('assets/chessPieces/${selectedPiece}-W.png')`;
    target.style.backgroundSize = "cover";
    target.style.backgroundPosition = "center";
    document.querySelectorAll(".btn").forEach((btn) => btn.setAttribute("disabled", true));

    let currentLoc = target.id; 
    console.log(`${selectedPiece}'s current location: ${currentLoc}`);
    piecePlaced = true;
    lastPlacedPiece = target;

    function possibleMoves(selectedPiece) {
      let currCoordStr = [...currentLoc];
      let [i, j] = currCoordStr;

      // for pawn
      if (selectedPiece == "pawn") {
        let coordJ = parseInt(j) + 1;
        let pawnMoves = i + coordJ;
        if (j < 8) {
          console.log(`possible moves of ${selectedPiece}: ${i}${coordJ}`);
          colorBox(pawnMoves);
          currentPawnMoves.push(pawnMoves); 
        } else {
          console.log(`possible moves of ${selectedPiece}: movement not possible`);
        }
        

      } else if (selectedPiece == "rook") {
        // Horizontal moves
        for (let col = 0; col < labels.cols.length; col++) {
          if (labels.cols[col] !== i) {
            let rookMoves = `${labels.cols[col]}${j}`;
            currentPawnMoves.push(rookMoves);
          }
        }
        // Vertical moves
        for (let row = 0; row < labels.rows.length; row++) {
          if (labels.rows[row] !== j) {
            let rookMoves = `${i}${labels.rows[row]}`;
            currentPawnMoves.push(rookMoves);
          }
        }
        console.log(`possible moves of ${selectedPiece}: ${currentPawnMoves.join(", ")}`);
        currentPawnMoves.forEach((move) => colorBox(move));
      } else if (selectedPiece == "bishop") {
        let [colIndex, rowIndex] = [labels.cols.indexOf(i), labels.rows.indexOf(j)];
      
        // 1st quad: i+1, j+1
        for (let count = 1; colIndex + count < labels.cols.length && rowIndex + count < labels.rows.length; count++) {
          let move = `${labels.cols[colIndex + count]}${labels.rows[rowIndex + count]}`;
          currentPawnMoves.push(move);
        }
      
        // 2nd quadr: i-1, j+1
        for (let count = 1; colIndex - count >= 0 && rowIndex + count < labels.rows.length; count++) {
          let move = `${labels.cols[colIndex - count]}${labels.rows[rowIndex + count]}`;
          currentPawnMoves.push(move);
        }
      
        // 3rd quad: i+1, j-1
        for (let count = 1; colIndex + count < labels.cols.length && rowIndex - count >= 0; count++) {
          let move = `${labels.cols[colIndex + count]}${labels.rows[rowIndex - count]}`;
          currentPawnMoves.push(move);
        }
      
        // 4th quad: i-1, j-1
        for (let count = 1; colIndex - count >= 0 && rowIndex - count >= 0; count++) {
          let move = `${labels.cols[colIndex - count]}${labels.rows[rowIndex - count]}`;
          currentPawnMoves.push(move);
        }
      
        console.log(`possible moves of ${selectedPiece}: ${currentPawnMoves.join(", ")}`);
        currentPawnMoves.forEach((move) => colorBox(move));
      }else if(selectedPiece == "queen"){
        // Horizontal moves
        for (let col = 0; col < labels.cols.length; col++) {
          if (labels.cols[col] !== i) {
            let rookMoves = `${labels.cols[col]}${j}`;
            currentPawnMoves.push(rookMoves);
          }
        }
        // Vertical moves
        for (let row = 0; row < labels.rows.length; row++) {
          if (labels.rows[row] !== j) {
            let rookMoves = `${i}${labels.rows[row]}`;
            currentPawnMoves.push(rookMoves);
          }
        }
        let [colIndex, rowIndex] = [labels.cols.indexOf(i), labels.rows.indexOf(j)];
      
        // 1st quad: i+1, j+1
        for (let count = 1; colIndex + count < labels.cols.length && rowIndex + count < labels.rows.length; count++) {
          let move = `${labels.cols[colIndex + count]}${labels.rows[rowIndex + count]}`;
          currentPawnMoves.push(move);
        }
      
        // 2nd quadr: i-1, j+1
        for (let count = 1; colIndex - count >= 0 && rowIndex + count < labels.rows.length; count++) {
          let move = `${labels.cols[colIndex - count]}${labels.rows[rowIndex + count]}`;
          currentPawnMoves.push(move);
        }
      
        // 3rd quad: i+1, j-1
        for (let count = 1; colIndex + count < labels.cols.length && rowIndex - count >= 0; count++) {
          let move = `${labels.cols[colIndex + count]}${labels.rows[rowIndex - count]}`;
          currentPawnMoves.push(move);
        }
      
        // 4th quad: i-1, j-1
        for (let count = 1; colIndex - count >= 0 && rowIndex - count >= 0; count++) {
          let move = `${labels.cols[colIndex - count]}${labels.rows[rowIndex - count]}`;
          currentPawnMoves.push(move);
        }
      
        console.log(`possible moves of ${selectedPiece}: ${currentPawnMoves.join(", ")}`);
        currentPawnMoves.forEach((move) => colorBox(move));
      }
    
    }

    possibleMoves(selectedPiece);
  }
}

// Removing piece
function createRemoveBtn() {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("removeBtn");
  removeBtn.textContent = "remove piece";

  removeBtn.addEventListener("click", () => {
    if (lastPlacedPiece) {
      lastPlacedPiece.style.backgroundImage = "";
      lastPlacedPiece = null;
      piecePlaced = false;
      removeBoxColor(); 
    }
    document.querySelectorAll(".btn").forEach((btn) => btn.removeAttribute("disabled"));
  });

  document.body.appendChild(removeBtn);
}

drawBoard();
createLeftTray();
document.getElementById("board").addEventListener("click", placePiece);
createRemoveBtn();

