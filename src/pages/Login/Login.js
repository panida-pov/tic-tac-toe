import React, { useState } from "react";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [failedLogin, setFailedLogin] = useState(false);

  if (failedLogin) {
    throw new Error("Failed to log in.");
  }

  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const credentials = jwtDecode(credentialResponse?.credential);
    sessionStorage.setItem("id", credentials.sub);
    sessionStorage.setItem("name", credentials.name);

    navigate("/");
  };

  const handleFailure = () => {
    setFailedLogin(true);
    console.error("Failed to log in.");
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2>
          <span className="toe">Ready?</span>
        </h2>
        <h2>
          <span className="tic">LOG IN</span> NOW
        </h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
          theme="filled_black"
          text="signin_with"
          shape="pill"
        />
      </div>
      <div className="rule">
        <h3>
          Game <span className="toe">Rules</span>
        </h3>
        <ol>
          <li>The game is played on a 3x3 grid.</li>
          <li>
            You (X) and the computer (O) take turns placing marks in empty
            squares.
          </li>
          <li>
            The first to align 3 marks in a row (vertically, horizontally, or
            diagonally) wins.
          </li>
          <li>
            The game ends in a tie if all squares are filled without a winner.
          </li>
          <li>Win = +1 point, Loss = -1 point.</li>
          <li>Win 3 times in a row to earn an extra point.</li>
          <li>The winner starts first in the next round.</li>
        </ol>
      </div>
    </div>
  );
};
