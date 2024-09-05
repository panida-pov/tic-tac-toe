import "./Game.css";
import React, { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { getUserData, updateUserData } from "../../utils/api";
import { Board } from "../../components/Board/Board";
import { checkBestMove, checkWinner } from "../../utils/helpers";
import { Player } from "../../components/Player/Player";

export const Game = () => {
  const navigate = useNavigate();

  // Get user id and name from google login
  const userId = sessionStorage.getItem("id");
  const userName = sessionStorage.getItem("name");

  const [data, setData] = useState({
    score: 0,
    win_streak: 0,
    last_winner: "player",
  });
  const [board, setBoard] = useState(Array(9).fill(""));
  const [move, setMove] = useState(0);
  const [xPlaying, setXPlaying] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Function used to put marks (O,X) on a board
  const fillBoard = (boxIndex) => {
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIndex) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updatedBoard);

    // Checking if there is a winner
    const winner = checkWinner(updatedBoard);
    setWinner(winner);

    if (winner?.player === "X") {
      // Player wins
      setData({
        score: data.win_streak === 2 ? data.score + 2 : data.score + 1,
        win_streak: data.win_streak === 2 ? 0 : data.win_streak + 1,
        last_winner: "player",
      });
      setGameOver(true);
      return;
    } else if (winner?.player === "O") {
      // Computer wins
      setData({
        score: data.score === 0 ? 0 : data.score - 1,
        win_streak: 0,
        last_winner: "computer",
      });
      setGameOver(true);
      return;
    } else if (move === 9) {
      // Draw
      setData({
        score: data.score,
        win_streak: 0,
        last_winner: data.last_winner,
      });
      setGameOver(true);
      return;
    }

    setMove((prevMove) => prevMove + 1);
    setXPlaying(!xPlaying);
  };

  // Function handles player clicking on a box
  const handleBoxClick = (boxIndex) => {
    if (board[boxIndex] || !xPlaying) return;
    fillBoard(boxIndex);
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(""));
    setMove(1);
    setXPlaying(data.last_winner === "player" ? true : false);
    setGameOver(false);
    setWinner(null);
  };

  const handleLogout = () => {
    googleLogout();
    sessionStorage.clear();
    navigate("/login");
  };

  // Fetch data from api on the first render
  useEffect(() => {
    if (!userId || !userName) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        const response = await getUserData(userId);
        setData({
          score: response.score,
          win_streak: response.win_streak,
          last_winner: response.last_winner,
        });
        setMove(1);
        // Player => X, Computer => O
        setXPlaying(response.last_winner === "player" ? true : false); // who last won gets to start first
      } catch (e) {
        console.error(e);
      }
    };

    loadData();
  }, [userId, userName, navigate]);

  // Call api to update scores
  useEffect(() => {
    try {
      const updateScore = async (newScore, newStreak, newWinner) => {
        await updateUserData(userId, newScore, newStreak, newWinner);
      };

      if (gameOver) {
        updateScore(data.score, data.win_streak, data.last_winner);
      }
    } catch (e) {
      console.error(e);
    }
  }, [data]);

  // Computer play
  useEffect(() => {
    // Functions
    const botPlay = () => {
      if (move >= 4) {
        const bestMove = checkBestMove(board);
        if (bestMove >= 0) {
          fillBoard(bestMove);
          return;
        }
      }

      const emptyBox = [];
      board.forEach((box, idx) => {
        if (!box) {
          emptyBox.push(idx);
        }
      });
      const randomIdx = Math.floor(Math.random() * emptyBox.length);
      fillBoard(emptyBox[randomIdx]);
    };

    // logic
    if (!(xPlaying || gameOver)) {
      setTimeout(() => {
        botPlay();
      }, 1000);
    }
  }, [move, xPlaying, gameOver]);

  return (
    <div className="container">
      <h2 className="greetings">
        Welcome! <span style={{ color: "#FFE07D" }}>{userName}</span>
      </h2>
      <div className="game">
        <div className="board-section">
          <div
            className="status"
            style={{ visibility: gameOver ? "visible" : "hidden" }}
          >
            <span>
              {!winner
                ? "DRAW"
                : winner?.player === "X"
                ? "You WIN!"
                : "You LOSE!"}
            </span>
          </div>
          <Board
            board={board}
            onBoxClick={gameOver ? resetBoard : handleBoxClick}
            winBoxes={winner?.winBoxes}
          />
        </div>
        <div className="score-section">
          <div className="group">
            {gameOver ? (
              <button className="reset" onClick={resetBoard}>
                PLAY AGAIN
              </button>
            ) : (
              <>
                <Player player="X" name="Player" playing={xPlaying}></Player>
                <Player player="O" name="Computer" playing={!xPlaying}></Player>
              </>
            )}
          </div>
          <div className="group">
            <h3>
              Your{" "}
              <span className="toe">
                SCORE : <span className="score">{data.score}</span>
              </span>
            </h3>
            <h3>
              Winning{" "}
              <span className="tic">{`STREAK : ${data.win_streak}`}</span>
            </h3>
          </div>
          <button className="logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
