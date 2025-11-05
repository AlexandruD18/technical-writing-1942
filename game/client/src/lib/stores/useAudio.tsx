import { create } from "zustand";
import { Howl, Howler } from "howler";

interface AudioState {
  backgroundMusic: Howl | null;
  shootSound: Howl | null;
  explosionSound: Howl | null;
  powerUpSound: Howl | null;
  levelCompleteSound: Howl | null;
  isMuted: boolean;
  isInitialized: boolean;
  
  initializeSounds: () => void;
  toggleMute: () => void;
  playShoot: () => void;
  playExplosion: () => void;
  playPowerUp: () => void;
  playLevelComplete: () => void;
  startBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  shootSound: null,
  explosionSound: null,
  powerUpSound: null,
  levelCompleteSound: null,
  isMuted: true,
  isInitialized: false,
  
  initializeSounds: () => {
    if (get().isInitialized) return;
    
    const bgMusic = new Howl({
      src: ["/sounds/background.mp3"],
      loop: true,
      volume: 0.3,
    });
    
    const shoot = new Howl({
      src: ["/sounds/hit.mp3"],
      volume: 0.2,
    });
    
    const explosion = new Howl({
      src: ["/sounds/hit.mp3"],
      volume: 0.4,
      rate: 0.8,
    });
    
    const powerUp = new Howl({
      src: ["/sounds/success.mp3"],
      volume: 0.5,
    });
    
    const levelComplete = new Howl({
      src: ["/sounds/success.mp3"],
      volume: 0.6,
      rate: 1.2,
    });
    
    set({
      backgroundMusic: bgMusic,
      shootSound: shoot,
      explosionSound: explosion,
      powerUpSound: powerUp,
      levelCompleteSound: levelComplete,
      isInitialized: true,
    });
  },
  
  toggleMute: () => {
    const { isMuted, backgroundMusic } = get();
    const newMutedState = !isMuted;
    
    Howler.mute(newMutedState);
    
    if (!newMutedState && backgroundMusic) {
      backgroundMusic.play();
    } else if (newMutedState && backgroundMusic) {
      backgroundMusic.pause();
    }
    
    set({ isMuted: newMutedState });
    console.log(`Sound ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  playShoot: () => {
    const { shootSound, isMuted } = get();
    if (!isMuted && shootSound) {
      shootSound.play();
    }
  },
  
  playExplosion: () => {
    const { explosionSound, isMuted } = get();
    if (!isMuted && explosionSound) {
      explosionSound.play();
    }
  },
  
  playPowerUp: () => {
    const { powerUpSound, isMuted } = get();
    if (!isMuted && powerUpSound) {
      powerUpSound.play();
    }
  },
  
  playLevelComplete: () => {
    const { levelCompleteSound, isMuted } = get();
    if (!isMuted && levelCompleteSound) {
      levelCompleteSound.play();
    }
  },
  
  startBackgroundMusic: () => {
    const { backgroundMusic, isMuted } = get();
    if (!isMuted && backgroundMusic && !backgroundMusic.playing()) {
      backgroundMusic.play();
    }
  },
  
  stopBackgroundMusic: () => {
    const { backgroundMusic } = get();
    if (backgroundMusic) {
      backgroundMusic.pause();
    }
  },
}));
