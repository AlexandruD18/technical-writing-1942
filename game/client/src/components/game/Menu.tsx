import { use1942Game } from "@/lib/stores/use1942Game";
import { useHighScores } from "@/lib/stores/useHighScores";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAudio } from "@/lib/stores/useAudio";

export function Menu() {
  const { setPhase } = use1942Game();
  const { highScores, loadHighScores } = useHighScores();
  const { isMuted, toggleMute } = useAudio();

  useEffect(() => {
    loadHighScores();
  }, [loadHighScores]);

  const startGame = () => {
    console.log("Starting game...");
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
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        color: "#ffffff",
        fontFamily: "Inter, sans-serif",
        zIndex: 100,
      }}
    >
      <h1
        style={{
          fontSize: "72px",
          fontWeight: "bold",
          marginBottom: "20px",
          textShadow: "4px 4px 8px rgba(255, 0, 0, 0.5)",
        }}
      >
        1942
      </h1>
      <p
        style={{
          fontSize: "24px",
          marginBottom: "40px",
          textAlign: "center",
          maxWidth: "600px",
          lineHeight: "1.6",
        }}
      >
        Vertical scrolling shooter - Destroy enemy aircraft, collect power-ups, and survive!
      </p>
      
      <div style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "10px" }}>
          <strong>Desktop Controls:</strong>
        </div>
        <div>Arrow Keys or WASD - Move</div>
        <div>Space - Shoot</div>
        <div>Enter - Pause</div>
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <strong>Power-Ups:</strong>
        </div>
        <div>🔥 Fire Boost - Triple Shot (15s)</div>
        <div>🛡️ Shield - Invulnerability (10s)</div>
      </div>

      {highScores.length > 0 && (
        <div
          style={{
            marginBottom: "30px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "15px 25px",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "bold" }}>
            HIGH SCORES
          </div>
          <div style={{ fontSize: "16px" }}>
            {highScores.slice(0, 3).map((hs, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "30px",
                  marginBottom: "5px",
                }}
              >
                <span>#{index + 1}</span>
                <span><strong>{hs.score.toLocaleString()}</strong></span>
                <span>Lvl {hs.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <Button
          onClick={startGame}
          size="lg"
          style={{
            fontSize: "24px",
            padding: "20px 60px",
            backgroundColor: "#ff4444",
            color: "#ffffff",
          }}
        >
          START GAME
        </Button>

        <Button
          onClick={toggleMute}
          size="lg"
          variant="outline"
          style={{
            fontSize: "20px",
            padding: "20px 30px",
          }}
        >
          {isMuted ? "🔇 UNMUTE" : "🔊 MUTE"}
        </Button>
      </div>
    </div>
  );
}
