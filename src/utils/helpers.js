const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (board) => {
  // Loop through win conditions and return the winner and condition
  for (let condition of WIN_CONDITIONS) {
    const [idxA, idxB, idxC] = condition;
    if (
      board[idxA] &&
      board[idxA] === board[idxB] &&
      board[idxA] === board[idxC]
    ) {
      return { player: board[idxA], winBoxes: condition };
    }
  }
};

// Check for winning move and blocking move
export const checkBestMove = (board) => {
  let bestMove = -1;

  for (let condition of WIN_CONDITIONS) {
    const [idxA, idxB, idxC] = condition;

    // Check for winning move first
    if (board[idxA] === "O" && board[idxB] === "O" && board[idxC] === "") {
      return idxC;
    } else if (
      board[idxA] === "O" &&
      board[idxC] === "O" &&
      board[idxB] === ""
    ) {
      return idxB;
    } else if (
      board[idxB] === "O" &&
      board[idxC] === "O" &&
      board[idxA] === ""
    ) {
      return idxA;
    }

    // Check for blocking move
    if (board[idxA] === "X" && board[idxB] === "X" && board[idxC] === "") {
      bestMove = idxC;
    }
    if (board[idxA] === "X" && board[idxC] === "X" && board[idxB] === "") {
      bestMove = idxB;
    }
    if (board[idxB] === "X" && board[idxC] === "X" && board[idxA] === "") {
      bestMove = idxA;
    }
  }

  return bestMove;
};
