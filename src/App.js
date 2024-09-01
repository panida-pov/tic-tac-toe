import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { Game } from "./pages/Game/Game";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./pages/ErrorFallback/ErrorFallback";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>
          <span className="tic">TIC</span> TAC <span className="toe">TOE</span>
        </h1>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
