import React from "react";
import "./Player.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const Player = ({ player, name, playing }) => {
  return (
    <div className={`player-container ${player === "X" ? "x" : "o"}`}>
      <ArrowRightIcon
        style={{
          fontSize: "2.5rem",
          visibility: playing ? "visible" : "hidden",
        }}
      />
      <span className="player">{player}</span>
      <h3 className={playing ? "blink" : "inactive"}>{name}</h3>
    </div>
  );
};
