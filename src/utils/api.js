import axios from "axios";

const baseUrl = "http://localhost:8000/users/";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getUserData = async (id) => {
  try {
    let userFound = false;
    let response = { id: id, score: 0, win_streak: 0, last_winner: "player" };

    const users = await getAllUsers();
    for (let user of users) {
      if (user.id === id) {
        userFound = true;
        response.score = user.score;
        response.win_streak = user.win_streak;
        response.last_winner = user.last_winner;
        break;
      }
    }

    if (!userFound) {
      await axios.post(baseUrl, {
        id: id,
        score: 0,
        win_streak: 0,
        last_winner: "player",
      });
    }

    return response;
  } catch (e) {
    console.error(e);
  }
};

export const updateUserData = async (id, newScore, newStreak, newWinner) => {
  try {
    const response = await axios.patch(baseUrl + id, {
      score: newScore,
      win_streak: newStreak,
      last_winner: newWinner,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
