"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p>Could not fetch note details.</p>
      <p style={{ color: "red" }}>{error.message}</p>

      <button onClick={reset}>Try again</button>
    </div>
  );
}
