import React from "react";
import "./Board.css";
import { Box } from "../Box/Box";

export const Board = ({ board, onBoxClick, winBoxes }) => {
  return (
    <div className="board">
      {board.map((box, idx) => (
        <Box
          key={idx}
          value={box}
          onClick={() => onBoxClick(idx)}
          highlight={winBoxes?.includes(idx)}
        />
      ))}
    </div>
  );
};
