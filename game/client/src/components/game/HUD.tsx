import { use1942Game } from "@/lib/stores/use1942Game";

export function HUD() {
  const { score, lives, level, phase, activePowerUp, powerUpTimer } = use1942Game();

  if (phase === "menu" || phase === "gameOver") return null;

  return (
    <div 
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "20px",
        color: "#ffffff",
        fontFamily: "Inter, sans-serif",
        fontSize: "18px",
        fontWeight: "bold",
        pointerEvents: "none",
        zIndex: 10,
        textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
      }}
    >
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "10px 20px",
        borderRadius: "8px",
      }}>
        <div>SCORE: {score}</div>
        <div>LEVEL: {level}</div>
        <div>LIVES: {lives}</div>
      </div>
      
      {activePowerUp && (
        <div style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: activePowerUp === "fireBoost" 
            ? "rgba(255, 102, 0, 0.7)" 
            : "rgba(0, 204, 255, 0.7)",
          borderRadius: "8px",
          textAlign: "center",
        }}>
          {activePowerUp === "fireBoost" ? "🔥 TRIPLE SHOT" : "🛡️ SHIELD"} - {Math.ceil(powerUpTimer)}s
        </div>
      )}
      
      {phase === "paused" && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "48px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "30px 60px",
          borderRadius: "12px",
        }}>
          PAUSED
        </div>
      )}
    </div>
  );
}
