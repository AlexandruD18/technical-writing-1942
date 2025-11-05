import { useEffect, useRef } from "react";
import { use1942Game } from "@/lib/stores/use1942Game";
import { useAudio } from "@/lib/stores/useAudio";

export function SoundManager() {
  const { initializeSounds, startBackgroundMusic, stopBackgroundMusic, playExplosion, playPowerUp, playLevelComplete } = useAudio();
  const prevEnemiesKilledRef = useRef(0);
  const prevLevelRef = useRef(1);
  const { enemiesKilled, phase, activePowerUp, level } = use1942Game();
  const prevActivePowerUpRef = useRef<string | null>(null);

  useEffect(() => {
    initializeSounds();
  }, [initializeSounds]);

  useEffect(() => {
    if (phase === "playing") {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [phase, startBackgroundMusic, stopBackgroundMusic]);

  useEffect(() => {
    if (enemiesKilled > prevEnemiesKilledRef.current && phase === "playing") {
      playExplosion();
    }
    prevEnemiesKilledRef.current = enemiesKilled;
  }, [enemiesKilled, playExplosion, phase]);

  useEffect(() => {
    if (activePowerUp && activePowerUp !== prevActivePowerUpRef.current) {
      playPowerUp();
    }
    prevActivePowerUpRef.current = activePowerUp;
  }, [activePowerUp, playPowerUp]);

  useEffect(() => {
    if (level > prevLevelRef.current) {
      playLevelComplete();
    }
    prevLevelRef.current = level;
  }, [level, playLevelComplete]);

  return null;
}
