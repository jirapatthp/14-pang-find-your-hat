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
	board.forEach(row=> {
		console.log(row.join(""));
	});
}
function getInput(){
const input = prompt("Which way? (w/a/s/d): ");
if (!["w","a","s","d"].includes(input)){
	console.log("Invalid input! PLease use w/a/s/d.");
	return null;
}
return input;
}

function movePlayer(direction) {
	if (direction === "w"){
		playerRow -= 1;
	}
	else if (direction === "s"){
		playerRow += 1;
	}
	else if (direction === "a"){
		playerCol -= 1;
	}
	else if (direction === "d"){
		playerCol -= 1;
	}
}

// Game play loop
printBoard(board);
const input = getInput();
console.log(input);
// อธิบาย logic ว่า ถ้าw/a/s/d ทำอะไร ถ้าไม่ใช่ แสดงอะไร

