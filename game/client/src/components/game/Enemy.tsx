import { useRef } from "react";
import * as THREE from "three";
import { Enemy as EnemyType } from "@/lib/stores/use1942Game";

interface EnemyProps {
  enemy: EnemyType;
}

export function Enemy({ enemy }: EnemyProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  let size: [number, number, number];
  let color: string;
  
  switch (enemy.type) {
    case "fighter":
      size = [0.6, 0.6, 0.4];
      color = "#ff4444";
      break;
    case "bomber":
      size = [1.0, 0.8, 0.5];
      color = "#ff8800";
      break;
    case "zigzag":
      size = [0.7, 0.7, 0.4];
      color = "#ff00ff";
      break;
    case "diver":
      size = [0.5, 0.8, 0.4];
      color = "#00ffff";
      break;
    case "boss":
      size = [3.0, 2.5, 1.0];
      color = enemy.phase === 3 ? "#ff0000" : enemy.phase === 2 ? "#ff4444" : "#ff8888";
      break;
  }

  return (
    <group position={[enemy.x, enemy.y, 0]}>
      <mesh ref={meshRef}>
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      {enemy.health < enemy.maxHealth && (
        <mesh position={[0, 0.6, 0]}>
          <planeGeometry args={[0.8, 0.1]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      )}
      {enemy.health < enemy.maxHealth && (
        <mesh position={[-(0.8 - (enemy.health / enemy.maxHealth) * 0.8) / 2, 0.6, 0.01]}>
          <planeGeometry args={[(enemy.health / enemy.maxHealth) * 0.8, 0.1]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
      )}
    </group>
  );
}
