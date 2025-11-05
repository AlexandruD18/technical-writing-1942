import { create } from "zustand";

export interface HighScore {
  score: number;
  level: number;
  date: string;
}

interface HighScoresState {
  highScores: HighScore[];
  loadHighScores: () => void;
  saveHighScore: (score: number, level: number) => boolean;
  isNewHighScore: (score: number) => boolean;
}

const MAX_HIGH_SCORES = 5;
const STORAGE_KEY = "1942_high_scores";

export const useHighScores = create<HighScoresState>((set, get) => ({
  highScores: [],

  loadHighScores: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const scores = JSON.parse(stored) as HighScore[];
        set({ highScores: scores });
      }
    } catch (error) {
      console.error("Failed to load high scores:", error);
    }
  },

  saveHighScore: (score: number, level: number) => {
    const { highScores } = get();
    const newScore: HighScore = {
      score,
      level,
      date: new Date().toLocaleDateString(),
    };

    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_HIGH_SCORES);

    set({ highScores: updatedScores });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScores));
      return true;
    } catch (error) {
      console.error("Failed to save high score:", error);
      return false;
    }
  },

  isNewHighScore: (score: number) => {
    const { highScores } = get();
    if (highScores.length < MAX_HIGH_SCORES) return true;
    return score > highScores[highScores.length - 1].score;
  },
}));
