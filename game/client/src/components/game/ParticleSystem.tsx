import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { use1942Game } from "@/lib/stores/use1942Game";

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  color: THREE.Color;
  size: number;
}

export function ParticleSystem() {
  const particlesRef = useRef<Particle[]>([]);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { deathEvents, clearDeathEvents, activePowerUp } = use1942Game();
  const prevActivePowerUpRef = useRef<string | null>(null);

  const particleGeometry = useMemo(() => new THREE.SphereGeometry(0.1, 8, 8), []);
  const particleMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 1,
      }),
    []
  );

  const createExplosion = (x: number, y: number, count: number = 15) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 3 + Math.random() * 2;
      particlesRef.current.push({
        position: new THREE.Vector3(x, y, 0),
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          (Math.random() - 0.5) * 2
        ),
        life: 1,
        maxLife: 1,
        color: new THREE.Color(1, 0.5 + Math.random() * 0.5, 0),
        size: 0.15 + Math.random() * 0.1,
      });
    }
  };

  const createPowerUpEffect = (x: number, y: number) => {
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const speed = 2 + Math.random() * 1.5;
      particlesRef.current.push({
        position: new THREE.Vector3(x, y, 0),
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          (Math.random() - 0.5)
        ),
        life: 0.8,
        maxLife: 0.8,
        color: new THREE.Color(0, 1, 1),
        size: 0.12,
      });
    }
  };

  useEffect(() => {
    deathEvents.forEach((event) => {
      if (event.type === "enemy") {
        createExplosion(event.x, event.y);
      }
    });
    
    if (deathEvents.length > 0) {
      clearDeathEvents();
    }
  }, [deathEvents, clearDeathEvents]);

  useFrame((_, delta) => {

    if (activePowerUp && activePowerUp !== prevActivePowerUpRef.current) {
      const playerX = use1942Game.getState().playerX;
      const playerY = use1942Game.getState().playerY;
      createPowerUpEffect(playerX, playerY);
    }
    prevActivePowerUpRef.current = activePowerUp;

    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.life -= delta;
      if (particle.life <= 0) return false;

      particle.position.add(particle.velocity.clone().multiplyScalar(delta));
      particle.velocity.multiplyScalar(0.95);

      return true;
    });

    if (meshRef.current && particlesRef.current.length > 0) {
      const matrix = new THREE.Matrix4();
      const color = new THREE.Color();
      
      particlesRef.current.forEach((particle, i) => {
        if (i >= meshRef.current!.count) return;

        const scale = particle.size * (particle.life / particle.maxLife);
        matrix.makeScale(scale, scale, scale);
        matrix.setPosition(particle.position);
        meshRef.current!.setMatrixAt(i, matrix);

        const opacity = particle.life / particle.maxLife;
        color.copy(particle.color).multiplyScalar(opacity);
        meshRef.current!.setColorAt(i, color);
      });

      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
      meshRef.current.count = particlesRef.current.length;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[particleGeometry, particleMaterial, 200]}
      frustumCulled={false}
    >
      <meshBasicMaterial transparent opacity={1} />
    </instancedMesh>
  );
}
