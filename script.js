let lastPlacedPiece = null;
// right side btns
function createRemoveBtn() {
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "remove piece";
  removeBtn.style.position = "absolute";
  removeBtn.style.bottom = "10%";
  removeBtn.style.left = "0%";
  removeBtn.style.padding = "10px 20px";
  removeBtn.style.backgroundColor = "red";
  removeBtn.style.color = "white";
  removeBtn.style.border = "none";
  removeBtn.style.cursor = "pointer";
  removeBtn.style.width = "21%";

  // removing a piece
  removeBtn.addEventListener("click", () => {
    removePiece();
    // Re-enable buttons after removing the piece
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
      btn.removeAttribute("disabled");
    });
  });

  // Function to remove the piece
  function removePiece() {
    if (lastPlacedPiece) {
      lastPlacedPiece.style.backgroundImage = "";
      lastPlacedPiece = null;
      piecePlaced = false; // Reset the piecePlaced flag
    }
  }

  document.body.appendChild(removeBtn);
}

// Chess Board Layout and Markups

const labelRows = ["8", "7", "6", "5", "4", "3", "2", "1"];
const labelCol = ["A", "B", "C", "D", "E", "F", "G", "H"];

const rows = Array(8).fill(null);
const columns = Array(8).fill(null);

function drawBoard() {
  //board properties
  const boardDiv = document.getElementById("board");
  boardDiv.style.margin = "auto";
  boardDiv.style.display = "grid";
  boardDiv.style.gridTemplateRows = `repeat(${rows.length + 1}, 50px)`;
  boardDiv.style.gridTemplateColumns = `50px repeat(${columns.length}, 50px) 50px`;
  boardDiv.style.backgroundColor = "white";
  boardDiv.style.border = "50px solid brown";

  // top column labels (A-H)
  const topLeftCorner = document.createElement("div");
  boardDiv.appendChild(topLeftCorner);

  labelCol.forEach((label) => {
    const colLabel = document.createElement("div");
    colLabel.classList.add("col-label");
    colLabel.textContent = label.toUpperCase();
    colLabel.style.textAlign = "center";
    colLabel.style.verticalAlign = "middle";
    colLabel.style.fontWeight = "bold";
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
    rowLabelLeft.style.textAlign = "center";
    rowLabelLeft.style.verticalAlign = "middle";
    rowLabelLeft.style.fontWeight = "bold";
    boardDiv.appendChild(rowLabelLeft);

    // Create row with 8 boxes
    for (let j = 0; j < columns.length; j++) {
      // creating & styling boxes
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.width = "50px";
      box.style.height = "50px";
      box.style.display = "flex";
      box.style.border = "1px solid black";
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
    rowLabelRight.style.textAlign = "center";
    rowLabelRight.style.verticalAlign = "middle";
    rowLabelRight.style.fontWeight = "bold";
    boardDiv.appendChild(rowLabelRight);
  }

  // bottom col label (A-H)
  const bottomLeftCorner = document.createElement("div");
  boardDiv.appendChild(bottomLeftCorner);

  labelCol.forEach((label) => {
    const colLabel = document.createElement("div");
    colLabel.classList.add("col-label");
    colLabel.textContent = label.toLowerCase();
    colLabel.style.textAlign = "center";
    colLabel.style.verticalAlign = "middle";
    colLabel.style.fontWeight = "bold";
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
  leftTray.style.display = "flex";
  leftTray.style.flexDirection = "column";
  leftTray.style.position = "absolute";
  leftTray.style.top = "10%";
  leftTray.style.left = "0%";
  leftTray.style.height = "70vh";
  leftTray.style.width = "20vw";
  leftTray.style.backgroundColor = "brown";
  leftTray.style.border = "5px solid white";

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
    leftBtn.style.width = "50%";
    leftBtn.style.margin = "auto";

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

drawBoard();
leftTrayBtns(tray);
createRemoveBtn();
