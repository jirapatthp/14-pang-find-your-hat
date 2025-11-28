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
    console.log("Invalid input! PLease use w/a/s/d.");
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
	console.log("🚧Oops… This way is dangerous. You fell 🕳️ , 🍧It's okay. Try again 💪🏽");
	break;
}
	updateBoard();
}



