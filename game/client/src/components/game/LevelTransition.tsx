import { use1942Game } from "@/lib/stores/use1942Game";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function LevelTransition() {
  const { level, score, setPhase } = use1942Game();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase("playing");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setPhase]);

  const skipTransition = () => {
    setPhase("playing");
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        color: "#ffffff",
        fontFamily: "Inter, sans-serif",
        zIndex: 100,
      }}
    >
      <div
        style={{
          fontSize: "80px",
          fontWeight: "bold",
          marginBottom: "30px",
          color: "#ffff00",
          textShadow: "4px 4px 8px rgba(255, 255, 0, 0.5)",
          animation: "pulse 1s ease-in-out infinite",
        }}
      >
        LEVEL {level}
      </div>

      <div
        style={{
          fontSize: "36px",
          marginBottom: "40px",
          color: "#00ff00",
        }}
      >
        Score: {score.toLocaleString()}
      </div>

      <div
        style={{
          fontSize: "48px",
          marginBottom: "30px",
          color: "#ffffff",
        }}
      >
        Get Ready!
      </div>

      <div
        style={{
          fontSize: "72px",
          fontWeight: "bold",
          color: "#ff4444",
          marginBottom: "40px",
        }}
      >
        {countdown}
      </div>

      <Button
        onClick={skipTransition}
        size="lg"
        style={{
          fontSize: "20px",
          padding: "15px 40px",
        }}
      >
        SKIP
      </Button>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
