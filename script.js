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

  //  box ID 
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

// labels
function createLabel(text) {
  const label = document.createElement("div");
  label.classList.add("row-label");
  label.textContent = text;
  return label;
}

// leftTray & btns
function createLeftTray() {
  const tray = document.createElement("div");
  tray.classList.add("rightSideTray");
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
let movesListList; //kind of a list to store moveList

//  actually stores moves for every piece!
let currentPawnMoves = []; 

function colorBox(pawnMoves) {
  const updatedBox = document.getElementById(pawnMoves);
  updatedBox.style.backgroundImage = "url('./assets/red.jpg')";
  updatedBox.style.backgroundSize="contain";
  updatedBox.style.opacity="0.7";
  updatedBox.style.border="1px solid black";

}

function removeBoxColor() {
  currentPawnMoves.forEach((move) => {
    const removedBox = document.getElementById(move);
    removedBox.style.border = "1px solid black";
    removedBox.style.opacity = "1";
    removedBox.style.backgroundImage=""; 
  });
  currentPawnMoves = []; 
}

// Placing a piece
function placePiece(event) {
  const target = event.target;
  if (target.classList.contains("box") && selectedPiece && !piecePlaced) {
    let userPieceColor = prompt("choose piece color", "white");
    switch (userPieceColor) {
      case "white":
        target.style.backgroundImage = `url('assets/chessPieces/${selectedPiece}-W.png')`;
        target.style.backgroundSize = "cover";
        target.style.backgroundPosition = "center";
        document.querySelectorAll(".btn").forEach((btn) => btn.setAttribute("disabled", true));
        break;

      case "black":
        target.style.backgroundImage = `url('assets/chessPieces/${selectedPiece}-B.png')`;
        target.style.backgroundSize = "cover";
        target.style.backgroundPosition = "center";
        document.querySelectorAll(".btn").forEach((btn) => btn.setAttribute("disabled", true));
        break;

      default:
        userPieceColor = prompt("choose piece color", "white");
        break;
    }

    let currentLoc = target.id; 
    console.log(`${selectedPiece}'s current location: ${currentLoc}`);
    piecePlaced = true;
    lastPlacedPiece = target;

    function possibleMoves(selectedPiece) {
      let currCoordStr = [...currentLoc];
      let [i, j] = currCoordStr;
    
      // for pieces
      if (selectedPiece == "pawn") {
        if(userPieceColor=="white"){
          let coordJ = parseInt(j) + 1;
          let pawnMoves = i + coordJ;
          if (j < 8) {
            console.log(`possible moves of ${selectedPiece}: ${i}${coordJ}`);
            colorBox(pawnMoves);
          } else {
            console.log(`possible moves of ${selectedPiece}: movement not possible`);
          }
        }else if(userPieceColor=="black"){
          let coordJ = parseInt(j) - 1;
          let pawnMoves = i + coordJ;
          if (j > 0) {
            console.log(`possible moves of ${selectedPiece}: ${i}${coordJ}`);
            colorBox(pawnMoves);
            currentPawnMoves.push(pawnMoves); 
          } else {
            console.log(`possible moves of ${selectedPiece}: movement not possible`);
          }
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
      }else if (selectedPiece == "king") {
        let colIndex = labels.cols.indexOf(i);
        let rowIndex = labels.rows.indexOf(j);
      
        // Up moves
        if (rowIndex + 1 < labels.rows.length) {
          let move = `${i}${labels.rows[rowIndex + 1]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Down moves
        if (rowIndex - 1 >= 0) {
          let move = `${i}${labels.rows[rowIndex - 1]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Left moves
        if (colIndex - 1 >= 0) {
          let move = `${labels.cols[colIndex - 1]}${j}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Right moves
        if (colIndex + 1 < labels.cols.length) {
          let move = `${labels.cols[colIndex + 1]}${j}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Up-Left moves
        if (colIndex - 1 >= 0 && rowIndex + 1 < labels.rows.length) {
          let move = `${labels.cols[colIndex - 1]}${labels.rows[rowIndex + 1]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Up-Right moves
        if (colIndex + 1 < labels.cols.length && rowIndex + 1 < labels.rows.length) {
          let move = `${labels.cols[colIndex + 1]}${labels.rows[rowIndex + 1]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Down-Left moves
        if (colIndex - 1 >= 0 && rowIndex - 1 >= 0) {
          let move = `${labels.cols[colIndex - 1]}${labels.rows[rowIndex - 1]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Down-Right moves
        if (colIndex + 1 < labels.cols.length && rowIndex - 1 >= 0) {
          let move = `${labels.cols[colIndex + 1]}${labels.rows[rowIndex - 1]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
        console.log(`possible moves of ${selectedPiece}: ${currentPawnMoves.join(", ")}`);
      }else if (selectedPiece == "knight") {
        let colIndex = labels.cols.indexOf(i);
        let rowIndex = labels.rows.indexOf(j);
      
        // Up & Left moves
        if (colIndex - 1 >= 0 && rowIndex - 2 >= 0) {
          let move = `${labels.cols[colIndex - 1]}${labels.rows[rowIndex - 2]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Up & Right moves
        if (colIndex + 1 < labels.cols.length && rowIndex - 2 >= 0) {
          let move = `${labels.cols[colIndex + 1]}${labels.rows[rowIndex - 2]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Down & Right moves
        if (colIndex + 1 < labels.cols.length && rowIndex + 2 < labels.rows.length) {
          let move = `${labels.cols[colIndex + 1]}${labels.rows[rowIndex + 2]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Down & Left moves
        if (colIndex - 1 >= 0 && rowIndex + 2 < labels.rows.length) {
          let move = `${labels.cols[colIndex - 1]}${labels.rows[rowIndex + 2]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Right & Down moves
        if (colIndex + 2 < labels.cols.length && rowIndex + 1 < labels.rows.length) {
          let move = `${labels.cols[colIndex + 2]}${labels.rows[rowIndex + 1]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Right & Up moves
        if (colIndex + 2 < labels.cols.length && rowIndex - 1 >= 0) {
          let move = `${labels.cols[colIndex + 2]}${labels.rows[rowIndex - 1]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Left & Up moves
        if (colIndex - 2 >= 0 && rowIndex - 1 >= 0) {
          let move = `${labels.cols[colIndex - 2]}${labels.rows[rowIndex - 1]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
      
        // Left & Down moves
        if (colIndex - 2 >= 0 && rowIndex + 1 < labels.rows.length) {
          let move = `${labels.cols[colIndex - 2]}${labels.rows[rowIndex + 1]}`;
          colorBox(move);
          currentPawnMoves.push(move);
        }
        console.log(`possible moves of ${selectedPiece}: ${currentPawnMoves.join(", ")}`);
    
      }
            }
    }
    possibleMoves(selectedPiece);
    MovesDisplay();  
    return target;
  }

  //  displaying the moves
function MovesDisplay() {
  if (currentPawnMoves) {
    const movesHeading = document.getElementById("movesHeading");
    movesHeading.textContent = `Selected Piece: ${selectedPiece}`;
  
    // moves display box
    const movesText = document.getElementById("movesText");
    movesText.textContent = currentPawnMoves.join(", ");
  }
}

  
function movePiece(event) {
  const target2 = event.target;
  if (target2.classList.contains("box") && selectedPiece && piecePlaced) {
    let currentLoc2 = target2.id;  
    if (currentPawnMoves.includes(currentLoc2)) {
      if (lastPlacedPiece) {
        target2.style.backgroundImage = lastPlacedPiece.style.backgroundImage;
        target2.style.backgroundSize = "cover";
        target2.style.backgroundPosition = "center";
        
        lastPlacedPiece.style.backgroundImage = "";
        lastPlacedPiece = target2;
        movesText.textContent = currentPawnMoves.join(", ");
        currentPawnMoves = currentPawnMoves.filter(loc => loc !== currentLoc2);
        removeBoxColor();        
        currentPawnMoves = [];
      }
    } else if (!currentPawnMoves.includes(currentLoc2)) {
      movesText.textContent = "Illegal move :(";
    }
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
      currentPawnMoves = []; 
    }
    selectedPiece = ""; 

    document.querySelectorAll(".btn").forEach((btn) => btn.removeAttribute("disabled"));

    if (movesListList) {
      movesListList.remove();
      movesListList = null; 
    }

    console.clear();
  });

  document.body.appendChild(removeBtn);
}



drawBoard();
createLeftTray();
document.getElementById("board").addEventListener("click", placePiece);
document.getElementById("board").addEventListener("click", movePiece);
createRemoveBtn();