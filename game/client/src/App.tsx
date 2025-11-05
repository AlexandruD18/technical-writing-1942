import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { KeyboardControls } from "@react-three/drei";
import { use1942Game } from "./lib/stores/use1942Game";
import { GameScene } from "./components/game/GameScene";
import { HUD } from "./components/game/HUD";
import { Menu } from "./components/game/Menu";
import { GameOver } from "./components/game/GameOver";
import { LevelTransition } from "./components/game/LevelTransition";
import { SoundManager } from "./components/game/SoundManager";
import "@fontsource/inter";

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  shoot = "shoot",
  pause = "pause",
}

const keyMap = [
  { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
  { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
  { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
  { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
  { name: Controls.shoot, keys: ["Space"] },
  { name: Controls.pause, keys: ["Enter"] },
];

function App() {
  const { phase } = use1942Game();

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <KeyboardControls map={keyMap}>
        <SoundManager />
        {phase === "menu" && <Menu />}
        {phase === "gameOver" && <GameOver />}
        {phase === "levelTransition" && <LevelTransition />}
        
        {(phase === "playing" || phase === "paused" || phase === "levelTransition") && (
          <>
            <Canvas
              camera={{
                position: [0, 0, 10],
                near: 0.1,
                far: 1000,
              }}
              orthographic
              gl={{
                antialias: true,
                powerPreference: "default",
              }}
            >
              <color attach="background" args={["#001122"]} />
              <Suspense fallback={null}>
                <GameScene />
              </Suspense>
            </Canvas>
            <HUD />
          </>
        )}
      </KeyboardControls>
    </div>
  );
}

export default App;
