import React from "react";

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error">
      <h2>An error was found!</h2>
      <button onClick={resetErrorBoundary}>Reset</button>
      <p>Error: {error.message}</p>
    </div>
  );
};
