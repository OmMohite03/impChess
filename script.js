// Chess Board Layout and Markups

const labelRows = ["8", "7", "6", "5", "4", "3", "2", "1"];
const labelCol = ["A", "B", "C", "D", "E", "F", "G", "H"];

const rows = Array(8).fill(null);
const columns = Array(8).fill(null);

function drawBoard() {
  //board properties
  const boardDiv = document.getElementById("board");
  boardDiv.classList.add("boardDiv");
  boardDiv.style.display = "grid";
  boardDiv.style.gridTemplateRows = `repeat(${rows.length + 1}, 50px)`;
  boardDiv.style.gridTemplateColumns = `50px repeat(${columns.length}, 50px) 50px`;
  const topLeftCorner = document.createElement("div");
  boardDiv.appendChild(topLeftCorner);

  labelCol.forEach((label) => {
    const colLabel = document.createElement("div");
    colLabel.classList.add("col-label");
    colLabel.textContent = label.toUpperCase();
    boardDiv.appendChild(colLabel);
  });

  const topRightCorner = document.createElement("div");
  boardDiv.appendChild(topRightCorner);

  // Creating chess-board
  for (let i = 0; i < rows.length; i++) {
    // left row label
    const rowLabelLeft = document.createElement("div");
    rowLabelLeft.classList.add("row-label");
    rowLabelLeft.textContent = labelRows[i];
    boardDiv.appendChild(rowLabelLeft);

    // Create row with 8 boxes
    for (let j = 0; j < columns.length; j++) {
      // creating & styling boxes
      const box = document.createElement("div");
      box.classList.add("box");
      boardDiv.appendChild(box);

      // coloring boxes black
      if (j % 2 == 0 && i % 2 != 0) {
        box.style.backgroundColor = "black";
      }
      if (i % 2 == 0 && j % 2 != 0) {
        box.style.backgroundColor = "black";
      }
    }

    // right side label
    const rowLabelRight = document.createElement("div");
    rowLabelRight.classList.add("row-label");
    rowLabelRight.textContent = labelRows[i];
    boardDiv.appendChild(rowLabelRight);
  }

  // bottom col label (A-H)
  const bottomLeftCorner = document.createElement("div");
  boardDiv.appendChild(bottomLeftCorner);

  labelCol.forEach((label) => {
    const colLabel = document.createElement("div");
    colLabel.classList.add("col-label");
    colLabel.textContent = label.toLowerCase();
    boardDiv.appendChild(colLabel);
  });

  const bottomRightCorner = document.createElement("div");
  boardDiv.appendChild(bottomRightCorner);
}

// markup & styles for left-side tray
const body = document.querySelector("body");

// Create the left-side tray
function leftTray() {
  const leftTray = document.createElement("div");
  leftTray.classList.add("leftSideTray");
  body.appendChild(leftTray);
  return leftTray;
}

// Storing leftTray for later use
const tray = leftTray();

// creating btns
// Variable to store the selected piece
let selectedPiece = "";

function leftTrayBtns(tray) {
  for (let i = 0; i < 6; i++) {
    const leftBtn = document.createElement("button");
    leftBtn.classList.add("btn");
    leftBtn.setAttribute("id", `btn${i}`);

    switch (i) {
      case 0:
        leftBtn.textContent = "king";
        break;
      case 1:
        leftBtn.textContent = "queen";
        break;
      case 2:
        leftBtn.textContent = "bishop";
        break;
      case 3:
        leftBtn.textContent = "rook";
        break;
      case 4:
        leftBtn.textContent = "knight";
        break;
      case 5:
        leftBtn.textContent = "pawn";
        break;
    }

    leftBtn.addEventListener("click", () => {
      selectedPiece = leftBtn.textContent.toLowerCase();
      console.log(`Selected piece: ${selectedPiece}`);
    });

    tray.appendChild(leftBtn);
  }
}

// placing piece
let piecePlaced = false;

function placePiece(event) {
  const target = event.target;
  if (target.classList.contains("box") && selectedPiece) {
    if (!piecePlaced) {
      target.style.backgroundImage = `url('assets/chessPieces/${selectedPiece}-W.png')`;
      target.style.backgroundSize = "cover";
      target.style.backgroundPosition = "center";

      const buttons = document.querySelectorAll(".btn");
      buttons.forEach((btn) => {
        btn.setAttribute("disabled", true);
      });

      piecePlaced = true;
      lastPlacedPiece = target;
    }
  }
}

const boardDiv = document.getElementById("board");
boardDiv.addEventListener("click", placePiece);

let lastPlacedPiece = null;
// right-side btns
function createRemoveBtn() {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("removeBtn");
  removeBtn.textContent = "remove piece";

  // removing a piece
  removeBtn.addEventListener("click", () => {
    removePiece();
    // Re-enable buttons after removing the piece
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
      btn.removeAttribute("disabled");
    });
  });

  // Func remove the piece
  function removePiece() {
    if (lastPlacedPiece) {
      lastPlacedPiece.style.backgroundImage = "";
      lastPlacedPiece = null;
      piecePlaced = false;
    }
  }

  document.body.appendChild(removeBtn);
}

drawBoard();
leftTrayBtns(tray);
createRemoveBtn();
