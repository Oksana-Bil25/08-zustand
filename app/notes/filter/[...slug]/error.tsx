"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error("Filter page error:", error);
  }, [error]);

  return (
    <div style={{ padding: "20px", textAlign: "center", color: "#721c24" }}>
      <h3>Could not fetch the list of notes.</h3>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#f8d7da",
          border: "1px solid #f5c6cb",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default Error;
