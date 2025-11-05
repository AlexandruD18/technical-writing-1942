import { useRef } from "react";
import * as THREE from "three";
import { Bullet as BulletType } from "@/lib/stores/use1942Game";

interface BulletProps {
  bullet: BulletType;
}

export function Bullet({ bullet }: BulletProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={[bullet.x, bullet.y, 0]}>
      <boxGeometry args={[0.1, 0.4, 0.1]} />
      <meshStandardMaterial 
        color={bullet.isPlayerBullet ? "#ffff00" : "#ff0000"}
        emissive={bullet.isPlayerBullet ? "#ffff00" : "#ff0000"}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}
