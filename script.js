// Chess Board Layout and Markups
const labels = {
  rows: ["8", "7", "6", "5", "4", "3", "2", "1"],
  cols: ["A", "B", "C", "D", "E", "F", "G", "H"],
};
const [rows, cols] = [Array(8).fill(null), Array(8).fill(null)];
let selectedPiece = "",
  piecePlaced = false,
  lastPlacedPiece = null;

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
      // colLabel.classList.add("col-label");
      colLabel.className= "col-label";
      colLabel.textContent = l.toUpperCase();
      return colLabel;
    }),
     document.createElement("div")
  );

  // Creating chess-board
  rows.forEach((_, i) => {
    // Row labels and boxes
    const createBox = (j) => {
      var box = document.createElement("div");
      box.classList.add("box");
      box.id=`${rows[i]}`;
      if ((i + j) % 2 !== 0) box.style.backgroundColor = "black";
      return box;
    };

    boardDiv.append(
      createLabel(labels.rows[i]),
      ...cols.map((_, j) => createBox(j)),
      createLabel(labels.rows[i])
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

// Placing a piece
function placePiece(event) {
  const target = event.target;
  if (target.classList.contains("box") && selectedPiece && !piecePlaced) {
    target.style.backgroundImage = `url('assets/chessPieces/${selectedPiece}-W.png')`;
    target.style.backgroundSize = "cover";
    target.style.backgroundPosition = "center";
    document
      .querySelectorAll(".btn")
      .forEach((btn) => btn.setAttribute("disabled", true));
    
      // piece's possible moves    
      let currentLoc = event.target;
      console.log(`${selectedPiece}'s current location: ${currentLoc}`);
    piecePlaced = true;
    lastPlacedPiece = target;
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
    }
    document
      .querySelectorAll(".btn")
      .forEach((btn) => btn.removeAttribute("disabled"));
  });

  document.body.appendChild(removeBtn);
}

drawBoard();
const tray = createLeftTray();
document.getElementById("board").addEventListener("click", placePiece);
createRemoveBtn();



