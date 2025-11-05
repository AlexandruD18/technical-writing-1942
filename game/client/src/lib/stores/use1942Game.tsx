import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "menu" | "playing" | "paused" | "gameOver" | "levelTransition";
export type EnemyType = "fighter" | "bomber" | "zigzag" | "diver" | "boss";
export type PowerUpType = "fireBoost" | "shield";

export interface Bullet {
  id: string;
  x: number;
  y: number;
  isPlayerBullet: boolean;
  active: boolean;
}

export interface Enemy {
  id: string;
  x: number;
  y: number;
  type: EnemyType;
  health: number;
  maxHealth: number;
  speed: number;
  active: boolean;
  shootTimer: number;
  moveTimer?: number;
  initialX?: number;
  phase?: number;
}

export interface PowerUp {
  id: string;
  x: number;
  y: number;
  type: PowerUpType;
  active: boolean;
}

export interface DeathEvent {
  x: number;
  y: number;
  type: "enemy" | "powerup";
}

interface Game1942State {
  phase: GamePhase;
  score: number;
  lives: number;
  level: number;
  playerX: number;
  playerY: number;
  playerHealth: number;
  bullets: Bullet[];
  enemies: Enemy[];
  powerUps: PowerUp[];
  activePowerUp: PowerUpType | null;
  powerUpTimer: number;
  fireBoostActive: boolean;
  shieldActive: boolean;
  enemiesKilled: number;
  nextId: number;
  bulletPool: Bullet[];
  enemyPool: Enemy[];
  deathEvents: DeathEvent[];
  bossActive: boolean;
  bossSpawned: boolean;

  setPhase: (phase: GamePhase) => void;
  togglePause: () => void;
  addDeathEvent: (x: number, y: number, type: "enemy" | "powerup") => void;
  clearDeathEvents: () => void;
  setPlayerPosition: (x: number, y: number) => void;
  addBullet: (x: number, y: number, isPlayer: boolean) => void;
  addEnemy: (x: number, y: number, type: EnemyType) => void;
  addPowerUp: (x: number, y: number, type: PowerUpType) => void;
  spawnBoss: () => void;
  updateBullets: (deltaTime: number) => void;
  updateEnemies: (deltaTime: number) => void;
  updatePowerUps: (deltaTime: number) => void;
  updatePowerUpTimer: (deltaTime: number) => void;
  checkCollisions: () => void;
  collectPowerUp: (powerUpId: string) => void;
  damagePlayer: () => void;
  addScore: (points: number) => void;
  nextLevel: () => void;
  restart: () => void;
}

const BULLET_SPEED = 15;
const ENEMY_BULLET_SPEED = 8;
const POWER_UP_DURATION = 15;
const FIRE_BOOST_DURATION = 15;
const SHIELD_DURATION = 10;

export const use1942Game = create<Game1942State>()(
  subscribeWithSelector((set, get) => ({
    phase: "menu",
    score: 0,
    lives: 3,
    level: 1,
    playerX: 0,
    playerY: -8,
    playerHealth: 3,
    bullets: [],
    enemies: [],
    powerUps: [],
    activePowerUp: null,
    powerUpTimer: 0,
    fireBoostActive: false,
    shieldActive: false,
    enemiesKilled: 0,
    nextId: 0,
    bulletPool: Array.from({ length: 100 }, (_, i) => ({
      id: `pooled-bullet-${i}`,
      x: 0,
      y: 0,
      isPlayerBullet: true,
      active: false,
    })),
    enemyPool: Array.from({ length: 50 }, (_, i) => ({
      id: `pooled-enemy-${i}`,
      x: 0,
      y: 0,
      type: "fighter" as EnemyType,
      health: 1,
      maxHealth: 1,
      speed: 2,
      active: false,
      shootTimer: 0,
    })),
    deathEvents: [],
    bossActive: false,
    bossSpawned: false,

    setPhase: (phase) => set({ phase }),

    addDeathEvent: (x, y, type) => {
      const state = get();
      set({ deathEvents: [...state.deathEvents, { x, y, type }] });
    },

    clearDeathEvents: () => {
      set({ deathEvents: [] });
    },

    togglePause: () => {
      const state = get();
      if (state.phase === "playing") {
        set({ phase: "paused" });
      } else if (state.phase === "paused") {
        set({ phase: "playing" });
      }
    },

    setPlayerPosition: (x, y) => set({ playerX: x, playerY: y }),

    addBullet: (x, y, isPlayer) => {
      const state = get();
      const pooledBullet = state.bulletPool.find((b) => !b.active);
      if (pooledBullet) {
        pooledBullet.x = x;
        pooledBullet.y = y;
        pooledBullet.isPlayerBullet = isPlayer;
        pooledBullet.active = true;
        set({ bullets: [...state.bullets, pooledBullet] });
      }
    },

    addEnemy: (x, y, type) => {
      const state = get();
      const pooledEnemy = state.enemyPool.find((e) => !e.active);
      if (pooledEnemy) {
        let maxHealth = 1;
        let speed = 2;
        
        switch (type) {
          case "fighter":
            maxHealth = 1;
            speed = 2;
            break;
          case "bomber":
            maxHealth = 3;
            speed = 1.5;
            break;
          case "zigzag":
            maxHealth = 2;
            speed = 2.5;
            break;
          case "diver":
            maxHealth = 1;
            speed = 4;
            break;
          case "boss":
            maxHealth = 50;
            speed = 1;
            break;
        }
        
        pooledEnemy.x = x;
        pooledEnemy.y = y;
        pooledEnemy.type = type;
        pooledEnemy.health = maxHealth;
        pooledEnemy.maxHealth = maxHealth;
        pooledEnemy.speed = speed;
        pooledEnemy.active = true;
        pooledEnemy.shootTimer = Math.random() * 2;
        pooledEnemy.moveTimer = 0;
        pooledEnemy.initialX = x;
        pooledEnemy.phase = 1;
        set({ enemies: [...state.enemies, pooledEnemy] });
      }
    },

    spawnBoss: () => {
      get().addEnemy(0, 10, "boss");
      set({ bossActive: true, bossSpawned: true });
    },

    addPowerUp: (x, y, type) => {
      const state = get();
      const newPowerUp: PowerUp = {
        id: `powerup-${state.nextId}`,
        x,
        y,
        type,
        active: true,
      };
      set({
        powerUps: [...state.powerUps, newPowerUp],
        nextId: state.nextId + 1,
      });
    },

    updateBullets: (deltaTime) => {
      const state = get();
      state.bullets.forEach((bullet) => {
        if (!bullet.active) return;
        
        bullet.y += bullet.isPlayerBullet
          ? BULLET_SPEED * deltaTime
          : -ENEMY_BULLET_SPEED * deltaTime;

        if (bullet.y > 12 || bullet.y < -12) {
          bullet.active = false;
        }
      });

      const activeBullets = state.bullets.filter((b) => b.active);
      set({ bullets: activeBullets });
    },

    updateEnemies: (deltaTime) => {
      const state = get();
      const playerX = state.playerX;
      const playerY = state.playerY;
      
      state.enemies.forEach((enemy) => {
        if (!enemy.active) return;

        enemy.moveTimer = (enemy.moveTimer || 0) + deltaTime;

        switch (enemy.type) {
          case "fighter":
            enemy.y -= enemy.speed * deltaTime;
            break;
          case "bomber":
            enemy.y -= enemy.speed * deltaTime;
            enemy.x += Math.sin(enemy.moveTimer * 2) * deltaTime * 0.5;
            break;
          case "zigzag":
            enemy.y -= enemy.speed * deltaTime;
            enemy.x = (enemy.initialX || 0) + Math.sin(enemy.moveTimer * 3) * 3;
            break;
          case "diver":
            if (enemy.y > playerY + 2) {
              const dx = playerX - enemy.x;
              const dy = playerY - enemy.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance > 0) {
                enemy.x += (dx / distance) * enemy.speed * deltaTime;
                enemy.y += (dy / distance) * enemy.speed * deltaTime;
              }
            } else {
              enemy.y -= enemy.speed * deltaTime;
            }
            break;
          case "boss":
            if (enemy.y > 6) {
              enemy.y -= enemy.speed * deltaTime * 0.5;
            } else {
              const healthPercent = enemy.health / enemy.maxHealth;
              if (healthPercent > 0.66) {
                enemy.phase = 1;
                enemy.x = Math.sin(enemy.moveTimer * 1.5) * 5;
              } else if (healthPercent > 0.33) {
                enemy.phase = 2;
                enemy.x = Math.sin(enemy.moveTimer * 2.5) * 6;
                enemy.y = 6 + Math.sin(enemy.moveTimer * 1.5) * 2;
              } else {
                enemy.phase = 3;
                const dx = playerX - enemy.x;
                const targetX = enemy.x + Math.sign(dx) * deltaTime * 3;
                enemy.x = Math.max(-6, Math.min(6, targetX));
              }
            }
            break;
        }

        enemy.shootTimer -= deltaTime;
        if (enemy.type === "boss") {
          const shootInterval = enemy.phase === 3 ? 0.3 : enemy.phase === 2 ? 0.5 : 0.8;
          if (enemy.shootTimer <= 0) {
            if (enemy.phase === 1) {
              get().addBullet(enemy.x, enemy.y - 1, false);
            } else if (enemy.phase === 2) {
              get().addBullet(enemy.x - 1, enemy.y - 1, false);
              get().addBullet(enemy.x + 1, enemy.y - 1, false);
            } else {
              get().addBullet(enemy.x - 1.5, enemy.y - 1, false);
              get().addBullet(enemy.x, enemy.y - 1, false);
              get().addBullet(enemy.x + 1.5, enemy.y - 1, false);
            }
            enemy.shootTimer = shootInterval;
          }
        } else if (enemy.shootTimer <= 0 && enemy.y > -10 && enemy.y < 10) {
          get().addBullet(enemy.x, enemy.y - 0.5, false);
          enemy.shootTimer = 1.5 + Math.random() * 2;
        }

        if (enemy.type !== "boss" && (enemy.y < -12 || enemy.x < -10 || enemy.x > 10)) {
          enemy.active = false;
        }
      });

      const activeEnemies = state.enemies.filter((e) => e.active);
      set({ enemies: activeEnemies });
    },

    updatePowerUps: (deltaTime) => {
      const state = get();
      state.powerUps.forEach((powerUp) => {
        if (!powerUp.active) return;
        powerUp.y -= 2 * deltaTime;
        if (powerUp.y < -12) {
          powerUp.active = false;
        }
      });

      const activePowerUps = state.powerUps.filter((p) => p.active);
      set({ powerUps: activePowerUps });
    },

    updatePowerUpTimer: (deltaTime) => {
      const state = get();
      if (state.powerUpTimer > 0) {
        const newTimer = state.powerUpTimer - deltaTime;
        if (newTimer <= 0) {
          set({
            powerUpTimer: 0,
            activePowerUp: null,
            fireBoostActive: false,
            shieldActive: false,
          });
        } else {
          set({ powerUpTimer: newTimer });
        }
      }
    },

    checkCollisions: () => {
      const state = get();
      let scoreGain = 0;
      let killedCount = 0;

      state.bullets.forEach((bullet) => {
        if (!bullet.active || !bullet.isPlayerBullet) return;

        state.enemies.forEach((enemy) => {
          if (!enemy.active) return;

          const distance = Math.sqrt(
            Math.pow(bullet.x - enemy.x, 2) + Math.pow(bullet.y - enemy.y, 2)
          );

          if (distance < 0.8) {
            bullet.active = false;
            enemy.health -= 1;

            if (enemy.health <= 0) {
              enemy.active = false;
              get().addDeathEvent(enemy.x, enemy.y, "enemy");
              
              let points = 100;
              switch (enemy.type) {
                case "bomber":
                  points = 300;
                  break;
                case "zigzag":
                  points = 200;
                  break;
                case "diver":
                  points = 150;
                  break;
                case "boss":
                  points = 5000;
                  set({ bossActive: false });
                  break;
                default:
                  points = 100;
              }
              scoreGain += points;
              killedCount += 1;

              if (enemy.type === "boss" || Math.random() < 0.15) {
                const powerUpType: PowerUpType =
                  Math.random() < 0.5 ? "fireBoost" : "shield";
                get().addPowerUp(enemy.x, enemy.y, powerUpType);
              }
            }
          }
        });
      });

      state.bullets.forEach((bullet) => {
        if (!bullet.active || bullet.isPlayerBullet) return;

        const distance = Math.sqrt(
          Math.pow(bullet.x - state.playerX, 2) +
            Math.pow(bullet.y - state.playerY, 2)
        );

        if (distance < 0.6) {
          bullet.active = false;
          if (!state.shieldActive) {
            get().damagePlayer();
          }
        }
      });

      state.enemies.forEach((enemy) => {
        if (!enemy.active) return;

        const distance = Math.sqrt(
          Math.pow(enemy.x - state.playerX, 2) +
            Math.pow(enemy.y - state.playerY, 2)
        );

        if (distance < 0.8) {
          enemy.active = false;
          if (!state.shieldActive) {
            get().damagePlayer();
          }
        }
      });

      set({
        bullets: state.bullets.filter((b) => b.active),
        enemies: state.enemies.filter((e) => e.active),
        score: state.score + scoreGain,
        enemiesKilled: state.enemiesKilled + killedCount,
      });
    },

    collectPowerUp: (powerUpId) => {
      const state = get();
      const powerUp = state.powerUps.find((p) => p.id === powerUpId);
      if (!powerUp) return;

      const duration =
        powerUp.type === "fireBoost" ? FIRE_BOOST_DURATION : SHIELD_DURATION;

      set({
        powerUps: state.powerUps.filter((p) => p.id !== powerUpId),
        activePowerUp: powerUp.type,
        powerUpTimer: duration,
        fireBoostActive: powerUp.type === "fireBoost",
        shieldActive: powerUp.type === "shield",
      });
    },

    damagePlayer: () => {
      const state = get();
      const newLives = state.lives - 1;
      if (newLives <= 0) {
        set({ lives: 0, phase: "gameOver" });
      } else {
        set({ lives: newLives });
      }
    },

    addScore: (points) => {
      set((state) => ({ score: state.score + points }));
    },

    nextLevel: () => {
      const state = get();
      state.bulletPool.forEach((bullet) => {
        bullet.active = false;
      });
      state.enemyPool.forEach((enemy) => {
        enemy.active = false;
      });
      
      set((state) => ({
        level: state.level + 1,
        enemies: [],
        bullets: [],
        powerUps: [],
        enemiesKilled: 0,
        phase: "levelTransition",
        bossSpawned: false,
        bossActive: false,
      }));
    },

    restart: () => {
      const state = get();
      state.bulletPool.forEach((bullet) => {
        bullet.active = false;
      });
      state.enemyPool.forEach((enemy) => {
        enemy.active = false;
      });
      
      set({
        phase: "playing",
        score: 0,
        lives: 3,
        level: 1,
        playerX: 0,
        playerY: -8,
        playerHealth: 3,
        bullets: [],
        enemies: [],
        powerUps: [],
        activePowerUp: null,
        powerUpTimer: 0,
        fireBoostActive: false,
        shieldActive: false,
        enemiesKilled: 0,
        bossSpawned: false,
        bossActive: false,
      });
    },
  }))
);
