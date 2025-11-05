import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PowerUp as PowerUpType } from "@/lib/stores/use1942Game";
import { use1942Game } from "@/lib/stores/use1942Game";

interface PowerUpProps {
  powerUp: PowerUpType;
}

export function PowerUp({ powerUp }: PowerUpProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { playerX, playerY, collectPowerUp } = use1942Game();

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.05;

    const distance = Math.sqrt(
      Math.pow(powerUp.x - playerX, 2) + Math.pow(powerUp.y - playerY, 2)
    );

    if (distance < 0.8) {
      collectPowerUp(powerUp.id);
    }
  });

  const isFireBoost = powerUp.type === "fireBoost";
  const color = isFireBoost ? "#ff6600" : "#00ccff";

  return (
    <mesh ref={meshRef} position={[powerUp.x, powerUp.y, 0]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}
