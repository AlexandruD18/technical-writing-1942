import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { use1942Game } from "@/lib/stores/use1942Game";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Bullet } from "./Bullet";
import { PowerUp } from "./PowerUp";
import { ParticleSystem } from "./ParticleSystem";

export function GameScene() {
  const { camera } = useThree();
  const backgroundRef = useRef<THREE.Mesh>(null);
  const background2Ref = useRef<THREE.Mesh>(null);
  const spawnTimerRef = useRef(0);
  const scrollOffset = useRef(0);
  
  const texture = useTexture("/textures/sky.png");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  
  const { 
    phase,
    bullets, 
    enemies, 
    powerUps, 
    updateBullets, 
    updateEnemies, 
    updatePowerUps,
    updatePowerUpTimer,
    checkCollisions,
    addEnemy,
    spawnBoss,
    level,
    enemiesKilled,
    bossSpawned,
    bossActive
  } = use1942Game();

  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      camera.left = -8;
      camera.right = 8;
      camera.top = 12;
      camera.bottom = -12;
      camera.position.set(0, 0, 10);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useEffect(() => {
    console.log(`Game phase: ${phase}, Level: ${level}, Enemies killed: ${enemiesKilled}`);
  }, [phase, level, enemiesKilled]);

  useFrame((_, delta) => {
    if (phase !== "playing") return;

    scrollOffset.current += delta * 2;
    if (backgroundRef.current) {
      backgroundRef.current.position.y = -scrollOffset.current % 24;
    }
    if (background2Ref.current) {
      background2Ref.current.position.y = (-scrollOffset.current % 24) + 24;
    }

    updateBullets(delta);
    updateEnemies(delta);
    updatePowerUps(delta);
    updatePowerUpTimer(delta);
    checkCollisions();

    const isBossLevel = level % 3 === 0;
    const shouldSpawnBoss = isBossLevel && !bossSpawned && enemiesKilled >= level * 10;
    
    if (shouldSpawnBoss && enemies.length === 0) {
      spawnBoss();
    }

    const shouldAdvanceLevel = isBossLevel 
      ? (bossSpawned && !bossActive && enemies.length === 0 && bullets.length === 0)
      : (!bossActive && enemiesKilled >= level * 15 && enemies.length === 0 && bullets.length === 0);
      
    if (shouldAdvanceLevel) {
      use1942Game.getState().nextLevel();
    }

    spawnTimerRef.current -= delta;
    if (bossActive || shouldSpawnBoss) {
      spawnTimerRef.current = 2;
    }
    if (spawnTimerRef.current <= 0) {
      const spawnX = (Math.random() - 0.5) * 14;
      const spawnY = 12;
      
      const rand = Math.random();
      let enemyType: "fighter" | "bomber" | "zigzag" | "diver";
      
      if (level < 2) {
        enemyType = rand < 0.7 ? "fighter" : "bomber";
      } else if (level < 4) {
        if (rand < 0.5) enemyType = "fighter";
        else if (rand < 0.8) enemyType = "bomber";
        else enemyType = "zigzag";
      } else {
        if (rand < 0.3) enemyType = "fighter";
        else if (rand < 0.5) enemyType = "bomber";
        else if (rand < 0.75) enemyType = "zigzag";
        else enemyType = "diver";
      }
      
      addEnemy(spawnX, spawnY, enemyType);
      spawnTimerRef.current = Math.max(0.3, 1.8 - level * 0.15);
      console.log(`Spawned ${enemyType} at x:${spawnX.toFixed(2)}`);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      <mesh ref={backgroundRef} position={[0, 0, -5]}>
        <planeGeometry args={[16, 24]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh ref={background2Ref} position={[0, 24, -5]}>
        <planeGeometry args={[16, 24]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      <Player />
      
      {bullets.map((bullet) => (
        <Bullet key={bullet.id} bullet={bullet} />
      ))}
      
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} enemy={enemy} />
      ))}
      
      {powerUps.map((powerUp) => (
        <PowerUp key={powerUp.id} powerUp={powerUp} />
      ))}

      <ParticleSystem />
    </>
  );
}
