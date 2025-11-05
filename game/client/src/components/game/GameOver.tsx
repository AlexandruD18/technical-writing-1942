import { use1942Game } from "@/lib/stores/use1942Game";
import { useHighScores } from "@/lib/stores/useHighScores";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function GameOver() {
  const { score, level, restart, setPhase } = use1942Game();
  const { highScores, loadHighScores, saveHighScore, isNewHighScore } = useHighScores();
  const [isHighScore, setIsHighScore] = useState(false);

  useEffect(() => {
    loadHighScores();
  }, [loadHighScores]);

  useEffect(() => {
    const isNew = isNewHighScore(score);
    setIsHighScore(isNew);
    if (isNew) {
      saveHighScore(score, level);
    }
  }, [score, level, isNewHighScore, saveHighScore]);

  const handleRestart = () => {
    console.log("Restarting game...");
    restart();
  };

  const handleMenu = () => {
    console.log("Returning to menu...");
    setPhase("menu");
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
      <h1
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#ff4444",
          textShadow: "4px 4px 8px rgba(255, 0, 0, 0.5)",
        }}
      >
        GAME OVER
      </h1>
      
      <div
        style={{
          fontSize: "32px",
          marginBottom: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "20px 40px",
          borderRadius: "8px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>Final Score: <strong>{score}</strong></div>
        <div>Level Reached: <strong>{level}</strong></div>
        {isHighScore && (
          <div style={{ color: "#ffff00", marginTop: "10px", fontSize: "24px" }}>
            🎉 NEW HIGH SCORE! 🎉
          </div>
        )}
      </div>

      {highScores.length > 0 && (
        <div
          style={{
            marginBottom: "30px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "400px",
          }}
        >
          <h2 style={{ fontSize: "28px", marginBottom: "15px", textAlign: "center" }}>
            HIGH SCORES
          </h2>
          <div style={{ fontSize: "18px" }}>
            {highScores.map((hs, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  padding: "8px",
                  backgroundColor: score === hs.score && isHighScore ? "rgba(255, 255, 0, 0.2)" : "transparent",
                  borderRadius: "4px",
                }}
              >
                <span>#{index + 1}</span>
                <span><strong>{hs.score.toLocaleString()}</strong></span>
                <span>Lvl {hs.level}</span>
                <span style={{ fontSize: "14px", opacity: 0.7 }}>{hs.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div style={{ display: "flex", gap: "20px" }}>
        <Button
          onClick={handleRestart}
          size="lg"
          style={{
            fontSize: "20px",
            padding: "15px 40px",
            backgroundColor: "#44ff44",
            color: "#000000",
          }}
        >
          RESTART
        </Button>
        
        <Button
          onClick={handleMenu}
          size="lg"
          variant="outline"
          style={{
            fontSize: "20px",
            padding: "15px 40px",
          }}
        >
          MENU
        </Button>
      </div>
    </div>
  );
}
