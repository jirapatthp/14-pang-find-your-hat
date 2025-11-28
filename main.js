"use strict";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

// Board tiles
const PLAYER = "*";
const EMPTY = "░";
const HOLE = "O";
const HAT = "^";

// Hardcoded board
let board = [
  [PLAYER, EMPTY, HOLE],
  [EMPTY, HOLE, EMPTY],
  [EMPTY, HAT, EMPTY],
];

// Game state
let playerRow = 0;
let playerCol = 0;
let playing = true;

// Print board
function printBoard(board) {
  console.clear();
  // call console.clear() before print each move ปริ้นอยู่ที่เดิม เพื่อความต่อเนื่องของเกมส์
  board.forEach((row) => {
    console.log(row.join(""));
  });
}
// input
function getInput() {
  const input = prompt("Which way? (w/a/s/d): ");

  if (!["w", "a", "s", "d"].includes(input)) {
    console.log("🍓Invalid input! Please use w/a/s/d.🍓");
	prompt("Press Enter to continue...");
	// เพิ่มดีเลย์ เพื่อให้เห็นข้อความ ถ้าคีย์ผิด
    return null;
  }

  return input;
}

// movement

function movePlayer(direction) {
  if (direction === "w") {
    playerRow -= 1;
  } else if (direction === "s") {
    playerRow += 1;
  } else if (direction === "a") {
    playerCol -= 1;
  } else if (direction === "d") {
    playerCol += 1;
  }
}

// check Rules

function checkRules() {
  // ออกนอกกระดาน
  if (
    playerRow < 0 ||
    playerRow >= board.length ||
    playerCol < 0 ||
    playerCol >= board[0].length
  ) {
    return "lose";
  }
  // เช็คเงื่อนไขอื่น
  const tile = board[playerRow][playerCol];
  if (tile === HOLE) return "lose";
  if (tile === HAT) return "win";
  // ถ้ายังไม่เจออะไร
  return "continue";

}

// update board
function updateBoard() {
  board[playerRow][playerCol] = PLAYER;
}


// generateBoard
function generateBoard(rows, cols) {
  const board = [];

  // 1) สร้างกระดานว่าง
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push(EMPTY);
    }
    board.push(row);
  }

  // 2) สุ่มตำแหน่งผู้เล่น
  const pR = Math.floor(Math.random() * rows);
  const pC = Math.floor(Math.random() * cols);
  board[pR][pC] = PLAYER;

  // 3) สุ่มตำแหน่งหมวก (ห้ามทับผู้เล่น)
  let hR, hC;
  do {
    hR = Math.floor(Math.random() * rows);
    hC = Math.floor(Math.random() * cols);
  } while (hR === pR && hC === pC);

  board[hR][hC] = HAT;
  // สุ่มหลุม (HOLE)
const totalCells = rows * cols;
const holeCount = Math.floor(totalCells * 0.2);  // 20% ของกระดาน

let placed = 0;

while (placed < holeCount) {
  const r = Math.floor(Math.random() * rows);
  const c = Math.floor(Math.random() * cols);

  // วางหลุมได้ต่อเมื่อช่องนั้นว่าง (EMPTY)
  if (board[r][c] === EMPTY) {
    board[r][c] = HOLE;
    placed++;
  }
}


  return board;
}


// // TEST AREA//


// const testBoard = generateBoard(5, 5);
// console.log(testBoard);
// prompt("Enter to continue...");


// // TEST AREA//



// ============ //

console.log("🎮 Choose Game Mode:");
console.log("1) Classic Mode (Fixed Board)");
console.log("2) Random Mode (Generated Board)");

const mode = prompt("Enter 1 or 2: ");
console.clear();

if (mode === "2") {
  // ใช้ generateBoard แทน Hardcoded
  board = generateBoard(5, 5);
  console.log("✨ Random Mode Activated! ✨");
  prompt("Press Enter to start the game...");
} else {
  console.log("🌟 Classic Mode Activated! 🌟");
  prompt("Press Enter to start the game...");
}


// Game play loop
while (playing) {
printBoard(board);

const input = getInput();
if (!input) continue;

movePlayer(input);

const state = checkRules();

if (state === "win") {
	console.clear();
	console.log("☆🤠 YOU FOUND THE HAT ! ");
	break;
}
if (state === "lose") {
	console.clear();
	console.log("🍧 Oops… This way is dangerous. You fell 🕳️ , It's okay, try again. I've fixed ❤️‍🩹it for you, so you can start over!");
	break;
}
	updateBoard();
}



