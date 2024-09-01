import React from "react";
import "./Box.css";

export const Box = ({ value, onClick, highlight }) => {
  return (
    <>
      <button
        className={`box ${value === "X" ? "x" : "o"} ${highlight ? "win" : ""}`}
        onClick={onClick}
      >
        {value}
      </button>
    </>
  );
};
