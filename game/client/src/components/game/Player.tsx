import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { use1942Game } from "@/lib/stores/use1942Game";
import { useAudio } from "@/lib/stores/useAudio";

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  shoot = "shoot",
  pause = "pause",
}

export function Player() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [, getKeys] = useKeyboardControls<Controls>();
  const shootTimerRef = useRef(0);
  const pausePressedRef = useRef(false);
  
  const { 
    playerX, 
    playerY, 
    setPlayerPosition, 
    addBullet, 
    phase,
    fireBoostActive,
    shieldActive,
    togglePause
  } = use1942Game();

  const { playShoot } = useAudio();

  useEffect(() => {
    console.log("Player controls: Arrow keys or WASD to move, Space to shoot, Enter to pause");
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const { forward, back, left, right, shoot, pause } = getKeys();

    if (pause && !pausePressedRef.current) {
      togglePause();
      pausePressedRef.current = true;
      console.log("Pause toggled");
    }
    if (!pause) {
      pausePressedRef.current = false;
    }

    if (phase !== "playing") return;
    
    let newX = playerX;
    let newY = playerY;
    const speed = 8;

    if (left) {
      newX -= speed * delta;
      console.log("Moving left", newX);
    }
    if (right) {
      newX += speed * delta;
      console.log("Moving right", newX);
    }
    if (forward) {
      newY += speed * delta;
      console.log("Moving forward", newY);
    }
    if (back) {
      newY -= speed * delta;
      console.log("Moving back", newY);
    }

    newX = Math.max(-7, Math.min(7, newX));
    newY = Math.max(-10, Math.min(-2, newY));

    setPlayerPosition(newX, newY);
    meshRef.current.position.set(newX, newY, 0);

    shootTimerRef.current -= delta;
    if (shoot && shootTimerRef.current <= 0) {
      if (fireBoostActive) {
        addBullet(newX - 0.3, newY + 0.5, true);
        addBullet(newX, newY + 0.5, true);
        addBullet(newX + 0.3, newY + 0.5, true);
        console.log("Triple shot fired!");
      } else {
        addBullet(newX, newY + 0.5, true);
        console.log("Shot fired!");
      }
      playShoot();
      shootTimerRef.current = 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[playerX, playerY, 0]}>
      <boxGeometry args={[0.6, 0.8, 0.4]} />
      <meshStandardMaterial 
        color={shieldActive ? "#00ffff" : "#00ff00"} 
        emissive={shieldActive ? "#00ffff" : "#00ff00"}
        emissiveIntensity={shieldActive ? 0.5 : 0.2}
      />
      {shieldActive && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      )}
    </mesh>
  );
}
