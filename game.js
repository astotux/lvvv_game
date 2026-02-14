const canvas = document.getElementById("game");
const screenCtx = canvas.getContext("2d");
let viewW = C.LOGIC_WIDTH;
let viewH = C.LOGIC_HEIGHT;
let screenW = window.innerWidth;
let screenH = window.innerHeight;

const LOGIC_WIDTH = C.LOGIC_WIDTH;
const LOGIC_HEIGHT = C.LOGIC_HEIGHT;
const offscreen = document.createElement("canvas");
offscreen.width = LOGIC_WIDTH;
offscreen.height = LOGIC_HEIGHT;
const ctx = offscreen.getContext("2d");

ctx.imageSmoothingEnabled = false;
ctx.imageSmoothingQuality = C.IMAGE_SMOOTHING_QUALITY;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  screenW = Math.max(1, window.innerWidth);
  screenH = Math.max(1, window.innerHeight);
  canvas.width = Math.max(1, Math.floor(screenW * dpr));
  canvas.height = Math.max(1, Math.floor(screenH * dpr));
  canvas.style.width = screenW + "px";
  canvas.style.height = screenH + "px";

  screenCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  screenCtx.imageSmoothingEnabled = false;
  screenCtx.imageSmoothingQuality = 'high';
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    resizeCanvas();
  }
});

let lastTime = 0;
let accumulator = 0;
const fixedTimeStep = C.FIXED_TIMESTEP_MS;

let currentLevel = 0;
const STORAGE_KEY_LEVEL = 'love_game_unlocked_level';
const STORAGE_KEY_STATS = 'love_game_level_stats';
const STORAGE_KEY_BOSS_DIFFICULTY_STATS = 'love_game_boss_difficulty_stats';
const STORAGE_KEY_ARTIFACTS = 'love_game_artifacts';

// Кэш для статистики уровней, босс-сложностей и артефактов,
// чтобы не дергать localStorage и JSON.parse слишком часто
let cachedLevelStats = null;
let cachedBossDifficultyStats = null;
let cachedArtifactsState = null;

function loadLevelProgress(){
  try {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY_LEVEL) || '0', 10);
    if (!isNaN(stored) && stored >= 0 && stored < levels.length) {
      currentLevel = stored;
    }
  } catch (e) {}
}

function saveLevelProgress(nextLevelIndex){
  try {
    const toStore = Math.min(Math.max(0, nextLevelIndex), levels.length - 1);
    localStorage.setItem(STORAGE_KEY_LEVEL, String(toStore));
  } catch (e) {}
}

function loadLevelStats() {
  if (cachedLevelStats) return cachedLevelStats;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_STATS);
    if (stored) {
      cachedLevelStats = JSON.parse(stored);
      return cachedLevelStats;
    }
  } catch (e) {}
  cachedLevelStats = {};
  return cachedLevelStats;
}

function saveLevelStats(levelIndex, stats) {
  try {
    const allStats = loadLevelStats();
    allStats[levelIndex] = stats;
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(allStats));
  } catch (e) {}
}

function loadBossDifficultyStats() {
  if (cachedBossDifficultyStats) return cachedBossDifficultyStats;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_BOSS_DIFFICULTY_STATS);
    if (stored) {
      cachedBossDifficultyStats = JSON.parse(stored);
      return cachedBossDifficultyStats;
    }
  } catch (e) {}
  cachedBossDifficultyStats = {};
  return cachedBossDifficultyStats;
}

function isBossBeatenGlobally() {
  try {
    const all = loadBossDifficultyStats();
    const bossStats = all[9] || all["9"];
    if (!bossStats) return false;
    return Object.values(bossStats).some(s => s && s.bestTime);
  } catch (e) {
    return false;
  }
}

function loadArtifactsState() {
  if (cachedArtifactsState) return cachedArtifactsState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_ARTIFACTS);
    if (stored) {
      cachedArtifactsState = JSON.parse(stored);
      if (cachedArtifactsState && typeof cachedArtifactsState === 'object') {
        return cachedArtifactsState;
      }
    }
  } catch (e) {}
  cachedArtifactsState = {};
  return cachedArtifactsState;
}

function saveArtifactsState(state) {
  try {
    cachedArtifactsState = state || {};
    localStorage.setItem(STORAGE_KEY_ARTIFACTS, JSON.stringify(cachedArtifactsState));
  } catch (e) {}
}

function isArtifactUnlockedGlobal(id) {
  const st = loadArtifactsState();
  return !!st[id] || !!st[String(id)];
}

function unlockArtifactGlobal(id) {
  if (!id && id !== 0) return;
  const st = loadArtifactsState();
  const key = String(id);
  if (st[key]) return;
  st[key] = true;
  saveArtifactsState(st);
}

function saveBossDifficultyStats(levelIndex, difficultyKey, stats) {
  try {
    const allStats = loadBossDifficultyStats();
    if (!allStats[levelIndex]) allStats[levelIndex] = {};
    allStats[levelIndex][difficultyKey] = stats;
    localStorage.setItem(STORAGE_KEY_BOSS_DIFFICULTY_STATS, JSON.stringify(allStats));
  } catch (e) {}
}

function getLevelStats(levelIndex) {
  const allStats = loadLevelStats();
  return allStats[levelIndex] || { bestTime: null, bestCoins: 0 };
}

function startLevelTimer() {
  levelStartTime = performance.now();
  levelTimerActive = true;
  levelElapsedTime = 0;
}

function stopLevelTimer() {
  levelTimerActive = false;
  levelElapsedTime = performance.now() - levelStartTime;
  return levelElapsedTime;
}

function updateLevelTimer() {
  if (!levelTimerActive || gamePaused) return;
  levelElapsedTime = performance.now() - levelStartTime;
}

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  } else {
    return `${remainingSeconds}.${ms.toString().padStart(2, '0')}`;
  }
}
let player = {
    x: 50, y: 100, w: C.PLAYER.W, h: C.PLAYER.H,
    dx: 0, dy: 0, onGround: false,
    frame: 0,
    frameTick: 0,
    state: "idle",
    idleTimer: 0,     
    prevState: "idle",
    onDynamicPlatform: null,
  };


let companion = {
    x: 50, y: 100, w: C.COMPANION.W, h: C.COMPANION.H,
    dx: 0, dy: 0, onGround: false,
    frame: 0,       
    frameTick: 0,    
    state: "idle",    
    idleTimer: 0,   
    targetX: 50,     
    targetY: 300,  
    followDelay: C.COMPANION.FOLLOW_DELAY,
    prevState: "idle",
    onDynamicPlatform: null,
  };
  
let keys = {left:false,right:false};
let cameraX = 0;
let targetCameraX = 0;
let cameraTransitionStart = 0;
let cameraTransitionDuration = 5000; // миллисекунды
let isCameraTransitioning = false;
let previousActiveCharacter = "player";
let gameOver = false;
let gamePaused = false;
let activeCharacter = "player";

// --- Состояние босса и снарядов (только для босс-уровня) ---
let boss = null;
let bossPhase = 0;              // 0 – не активен, 1..3 – фазы
let bossVisible = false;
let bossMaxHp = 0;
let bossHp = 0;
let bossDirection = 1;
let bossFrame = 0;
let bossFrameTick = 0;
let bossState = "idle";         // "idle" | "walk" | "attack"
let bossShootCooldown = 0;
let playerShootCooldown = 0;
let bossPlatforms = [];
let bossMinions = [];
let playerProjectiles = [];
let bossProjectiles = [];
let bossDeath = false;
let bossDeathTimer = 0;
let bossMinionRespawnTimer = 0; // Таймер для респавна миньонов
let bossPhaseStartTime = 0; // Время начала текущей фазы
let bossPhaseTransitionTimer = 0; // Таймер для перехода между фазами
let bossAppearTimer = 0; // Анимация появления босса (зелёные партиклы)
let bossPhaseDisappearing = false;
let bossPhaseDisappearTimer = 0;
let bossPhaseNext = 0; // 2 или 3 — следующая фаза после анимации исчезновения
const BOSS_PHASE_DISAPPEAR_DURATION = 50;
const BOSS_PHASE1_EMPTY_DELAY = 60; // ~6 секунд пустой карты после убийства всех врагов в фазе 1
const BOSS_PHASE2_EMPTY_DELAY = 60; // ~1 секунда пустой карты после окончания второй фазы

// --- Сложность боссфайта и жизни игрока на боссе ---
const BOSS_DIFFICULTY_CONFIG = {
  easy: {
    key: 'easy',
    label: 'Лёгкое',
    playerHp: 5,
    bossHpPhase2: 20,
    bossHpPhase3: 25,
    bossShootCooldownPhase2: 85,
    bossShootCooldownPhase3: 75,
    minionShootCooldownMultiplier: 1.4,
    minionRespawnDelayMultiplier: 1.5
  },
  normal: {
    key: 'normal',
    label: 'Средне',
    playerHp: 4,
    bossHpPhase2: 25,
    bossHpPhase3: 35,
    bossShootCooldownPhase2: 80,
    bossShootCooldownPhase3: 70,
    minionShootCooldownMultiplier: 1.2,
    minionRespawnDelayMultiplier: 1.2
  },
  hard: {
    key: 'hard',
    label: 'Сложно',
    playerHp: 3,
    bossHpPhase2: 30,
    bossHpPhase3: 45,
    bossShootCooldownPhase2: 70,
    bossShootCooldownPhase3: 60,
    minionShootCooldownMultiplier: 1.0,
    minionRespawnDelayMultiplier: 1.1
  }
};

let currentBossDifficulty = 'normal';
let playerBossMaxHp = 0;
let playerBossHp = 0;

function getCurrentBossConfig() {
  return BOSS_DIFFICULTY_CONFIG[currentBossDifficulty] || BOSS_DIFFICULTY_CONFIG.normal;
}

function initBossPlayerHpForLevel(level) {
  if (level && level.isBossLevel) {
    const cfg = getCurrentBossConfig();
    playerBossMaxHp = cfg.playerHp;
    playerBossHp = cfg.playerHp;
  } else {
    playerBossMaxHp = 0;
    playerBossHp = 0;
  }
}

function isBossLevel() {
  const lvl = levels[currentLevel];
  return !!lvl.isBossLevel;
}
window.isBossLevel = isBossLevel;


window.player = player;
window.companion = companion;
window.keys = keys;
let followEnabled = true;
Object.defineProperty(window, 'followEnabled', { get(){ return followEnabled; }, set(v){ followEnabled = !!v; } });
Object.defineProperty(window, 'gameOver', { get(){ return gameOver; }, set(v){ gameOver = v; } });
let highlightUntil = 0; // подсветка активного персонажа при переключении (мс)
Object.defineProperty(window, 'activeCharacter', { 
  get(){ return activeCharacter; }, 
  set(v){ 
    if (activeCharacter !== v) {
      // Запускаем анимацию камеры при переключении персонажа
      cameraTransitionStart = performance.now();
      isCameraTransitioning = true;
      previousActiveCharacter = activeCharacter;
      highlightUntil = performance.now() + 800; // подсветка 0.5 сек
    }
    activeCharacter = v; 
  } 
});
Object.defineProperty(window, 'companionLockToCenter', { get(){ return companionLockToCenter; }, set(v){ companionLockToCenter = v; } });
Object.defineProperty(window, 'cameraX', { get(){ return cameraX; } });
Object.defineProperty(window, 'currentLevel', { get(){ return currentLevel; }, set(v){ currentLevel = v; } });
 
// Стрельба игрока по направлению джойстика
function updatePlayerShooting() {
  if (!isBossLevel() || gameOver || gamePaused) return;
  
  // Уменьшаем кулдаун
  if (playerShootCooldown > 0) {
    playerShootCooldown--;
  }

  // Получаем направление от джойстика стрельбы
  if (typeof window.getShootDirection === "function") {
    const dir = window.getShootDirection();
    // Проверяем, что джойстик активен и направление не нулевое
    if (Math.abs(dir.x) > 0.01 || Math.abs(dir.y) > 0.01) {
      // Стреляем только если кулдаун прошел
      if (playerShootCooldown <= 0) {
        const startX = player.x + player.w / 2;
        const startY = player.y + player.h / 2;
        const speed = 10;
        
        // Направление уже нормализовано в джойстике, используем напрямую
        playerProjectiles.push({
          x: startX - 7,
          y: startY - 7,
          w: 14,
          h: 14,
          vx: dir.x * speed,
          vy: dir.y * speed
        });

        playerShootCooldown = 30; // небольшой кулдаун
      }
    }
  }
}

function shootBossProjectile() {
  if (!boss || !bossVisible || bossHp <= 0) return;
  const startX = boss.x + boss.w / 2;
  const startY = boss.y + boss.h / 2;
  const targetX = player.x + player.w / 2;
  const targetY = player.y + player.h / 2;
  const dx = targetX - startX;
  const dy = targetY - startY;
  const len = Math.hypot(dx, dy) || 1;
  const speed = 7;

  bossProjectiles.push({
    x: startX - 7,
    y: startY - 7,
    w: 14,
    h: 14,
    vx: (dx / len) * speed,
    vy: (dy / len) * speed
  });
}

let totalCoins = 0;

let levelStartTime = 0;
let levelElapsedTime = 0;
let levelTimerActive = false;
let levelStats = {
  time: 0,
  coins: 0,
  bestTime: null,
  bestCoins: 0
};

let companionLockToCenter = false;

let enemies = [];

// --- Артефакты ---
const ARTIFACT_DEFS = {
  1: { id: 1, title: 'Новый артефакт!', name: 'Магический лог (ковш) Стефана Пермского', image: 'img/art_1.png' },
  2: { id: 2, title: 'Новый артефакт!', name: 'Заговоренный пояс колдуна (Вöрса сий)', image: 'img/art_2.png' },
  3: { id: 3, title: 'Новый артефакт!', name: 'Лыжи Йиркапа (Аслыс кöтi)', image: 'img/art_3.png' },
  4: { id: 4, title: 'Новый артефакт!', name: 'Неуязвимая кольчуга (Пас)', image: 'img/art_4.png' },
  5: { id: 5, title: 'Новый артефакт!', name: 'Золотая баба (Зарни ань)', image: 'img/art_5.png' }
};

function getArtifactDefById(id) {
  return ARTIFACT_DEFS[id] || null;
}

// --- Партиклы (ходьба, приземление, атмосфера) ---
let particles = [];
let ambientParticleTimer = 0;
let prevPlayerOnGround = false;
let prevCompanionOnGround = false;
function spawnWalkParticle(x, y, dir) {
  for (let i = 0; i < 2; i++) {
    particles.push({
      x: x + (Math.random() - 0.5) * 10,
      y: y,
      vx: (dir === 1 ? 1 : -1) * (0.4 + Math.random() * 1),
      vy: -0.3 - Math.random() * 0.8,
      life: 0,
      maxLife: 12 + Math.floor(Math.random() * 8),
      type: "walk",
      size: 1.5 + Math.random() * 0.8
    });
  }
}
function spawnLandParticles(x, y, w) {
  const count = 10 + Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x + Math.random() * w,
      y: y,
      vx: (Math.random() - 0.5) * 2.5,
      vy: -0.3 - Math.random() * 1.2,
      life: 0,
      maxLife: 12 + Math.floor(Math.random() * 12),
      type: "land",
      size: 2 + Math.random() * 1.5
    });
  }
}
function spawnEnemyHitParticles(x, y, w, h) {
  const count = 8 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x + Math.random() * w,
      y: y + Math.random() * h,
      vx: (Math.random() - 0.5) * 5,
      vy: -2 - Math.random() * 4,
      life: 0,
      maxLife: 14 + Math.floor(Math.random() * 10),
      type: "hit",
      size: 1.5 + Math.random() * 2,
      color: "#FFA424"
    });
  }
}

// Зелёные партиклы появления босса
function spawnBossAppearParticles(cx, cy) {
  const count = 4 + Math.floor(Math.random() * 4);
  const green = ["#2d8a2d", "#3cb371", "#228b22", "#32cd32"];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 2.5;
    particles.push({
      x: cx + (Math.random() - 0.5) * 20,
      y: cy + (Math.random() - 0.5) * 20,
      vx: Math.cos(angle) * speed,
      vy: -Math.abs(Math.sin(angle)) * speed - 0.5,
      life: 0,
      maxLife: 20 + Math.floor(Math.random() * 15),
      type: "boss_appear",
      size: 2 + Math.random() * 2,
      color: green[Math.floor(Math.random() * green.length)]
    });
  }
}

// Эпичные партиклы смерти босса (третья фаза)
function spawnBossDeathParticles(cx, cy) {
  const count = 18 + Math.floor(Math.random() * 10);
  const colors = ["#ff4444", "#ff9a3c", "#ffd32a", "#ffffff"];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2.5 + Math.random() * 4.5;
    particles.push({
      x: cx + (Math.random() - 0.5) * 12,
      y: cy + (Math.random() - 0.5) * 12,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * 0.8 - 0.5,
      life: 0,
      maxLife: 26 + Math.floor(Math.random() * 18),
      type: "boss_death",
      size: 2.5 + Math.random() * 3.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

// Зелёные партиклы появления миньона при респавне во время боя
function spawnMinionSpawnParticles(cx, cy) {
  const green = ["#2d8a2d", "#3cb371", "#228b22", "#32cd32"];
  const count = 16 + Math.floor(Math.random() * 8);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.8 + Math.random() * 1.5;
    particles.push({
      x: cx + (Math.random() - 0.5) * 12,
      y: cy + (Math.random() - 0.5) * 12,
      vx: Math.cos(angle) * speed,
      vy: -Math.abs(Math.sin(angle)) * speed - 0.3,
      life: 0,
      maxLife: 30 + Math.floor(Math.random() * 10),
      type: "minion_spawn",
      size: 1.2 + Math.random() * 1.5,
      color: green[Math.floor(Math.random() * green.length)]
    });
  }
}

// Партиклы ветра для forest — по всему экрану, летят справа налево, немного
function spawnWindParticles() {
  const count = 2 + Math.floor(Math.random() * 2);
  const colors = ["#b8c4ce", "#a0b0bc", "#d0dce4", "#e8eef2"];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: cameraX + Math.random() * viewW,
      y: Math.random() * viewH,
      vx: -1.2 - Math.random() * 1.2,
      vy: (Math.random() - 0.5) * 0.3,
      life: 0,
      maxLife: 60 + Math.floor(Math.random() * 40),
      type: "wind",
      size: 0.7 + Math.random() * 0.8,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

// Партиклы света для house — по всей комнате
function spawnLightParticles() {
  if (Math.random() > 0.5) return;
  const colors = ["#fff8dc", "#ffe4b5", "#fffacd", "#ffefd5", "#fff5e6"];
  particles.push({
    x: cameraX + Math.random() * viewW,
    y: Math.random() * viewH,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -0.12 - Math.random() * 0.2,
    life: 0,
    maxLife: 35 + Math.floor(Math.random() * 25),
    type: "light",
    size: 0.8 + Math.random() * 1,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

// Коричневые партиклы появления платформ босса
function spawnPlatformAppearParticles(x, y, w, h) {
  const count = 3 + Math.floor(Math.random() * 4);
  const brown = ["#8B4513", "#A0522D", "#654321", "#6B4423"];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x + Math.random() * w,
      y: y + (Math.random() - 0.2) * h,
      vx: (Math.random() - 0.5) * 3,
      vy: -1.5 - Math.random() * 2.5,
      life: 0,
      maxLife: 15 + Math.floor(Math.random() * 12),
      type: "platform_appear",
      size: 1.2 + Math.random() * 1.5,
      color: brown[Math.floor(Math.random() * brown.length)]
    });
  }
}

function updateParticles() {
  const lvl = levels[currentLevel];
  const bg = lvl && (lvl.background || "forest");
  if (bg === "forest" || bg === "house" || bg === "home") {
    ambientParticleTimer++;
    if (bg === "forest") {
      if (ambientParticleTimer >= 4) {
        ambientParticleTimer = 0;
        spawnWindParticles();
      }
    } else {
      if (ambientParticleTimer >= 14) {
        ambientParticleTimer = 0;
        spawnLightParticles();
      }
    }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.type !== "wind" && p.type !== "light") p.vy += 0.15;
    p.life++;
    if (p.life >= p.maxLife) particles.splice(i, 1);
  }
}

function clearBossPlatforms(level) {
  if (!level.dynamicPlatforms) return;
  bossPlatforms.forEach(p => {
    const idx = level.dynamicPlatforms.indexOf(p);
    if (idx !== -1) {
      level.dynamicPlatforms.splice(idx, 1);
    }
  });
  bossPlatforms = [];
}

function resetBossStateForLevel(level) {
  boss = null;
  bossPhase = level.isBossLevel ? 1 : 0;
  bossVisible = false;
  bossMaxHp = 0;
  bossHp = 0;
  bossDirection = 1;
  bossFrame = 0;
  bossFrameTick = 0;
  bossState = "idle";
  bossShootCooldown = 0;
  playerShootCooldown = 0;
  bossMinions = [];
  playerProjectiles = [];
  bossProjectiles = [];
  bossDeath = false;
  bossDeathTimer = 0;
  bossMinionRespawnTimer = 0;
  bossPhaseStartTime = 0;
  bossPhaseTransitionTimer = 0;
  bossAppearTimer = 0;
  bossPhaseDisappearing = false;
  bossPhaseDisappearTimer = 0;
  bossPhaseNext = 0;
  clearBossPlatforms(level);
  initBossPlayerHpForLevel(level);
}

const BOSS_PLATFORM_RISE_HEIGHT = 50;

function getPlatformTopY(p) {
  return p.effectiveY != null ? p.effectiveY : p.y;
}

function spawnBossPlatform(level, x, y, w, h) {
  if (!level.dynamicPlatforms) level.dynamicPlatforms = [];
  const p = { x, y, w, h, texture: "wood", open: true, type: "boss", appearProgress: 0 };
  p.effectiveY = y + BOSS_PLATFORM_RISE_HEIGHT; // старт анимации снизу
  level.dynamicPlatforms.push(p);
  bossPlatforms.push(p);
  return p;
}

function spawnBossMinionOnPlatform(platform, opts) {
  const options = opts || {};
  const cfg = getCurrentBossConfig();
  const shootCdBase = options.shootCooldown || 0;
  const adjustedShootCd = Math.round(shootCdBase * cfg.minionShootCooldownMultiplier);
  const enemy = {
    x: platform.x + 10,
    y: platform.y - 38,
    w: 46,
    h: 38,
    dx: 1,
    direction: 1,
    platformX: platform.x,
    platformY: platform.y,
    platformW: platform.w,
    frame: 0,
    frameTick: 0,
    state: "walk",
    hp: 3,
    maxHp: 3,
    isBossMinion: true,
    spawnDelay: options.spawnDelay || 0,   // задержка появления в тиках
    spawnTimer: 0,
    active: options.spawnDelay ? false : true,
    spawnAnimProgress: 0,                 // 0..1 — анимация появления при респавне
    spawnAnimDuration: 22,
    shootCooldownBase: adjustedShootCd, // базовый кулдаун выстрела
    shootCooldownTimer: adjustedShootCd
  };
  enemies.push(enemy);
  bossMinions.push(enemy);
}

function initBossPhase1(level) {
  clearBossPlatforms(level);
  enemies = [];
  bossMinions = [];

  // Несколько фиксированных платформ
  const p1 = spawnBossPlatform(level, 247, 332, 164, 20);
  const p2 = spawnBossPlatform(level, 139, 180, 164, 20);
  const p3 = spawnBossPlatform(level, 195, 48, 164, 20);
  const p4 = spawnBossPlatform(level, 559, 48, 164, 20);
  const p5 = spawnBossPlatform(level, 655, 180, 164, 20);
  const p6 = spawnBossPlatform(level, 539, 332, 164, 20);
  const p7 = spawnBossPlatform(level, 375, 167, 164, 20);


  // Сохраняем платформы для респавна миньонов
  level._bossPhase1Platforms = [];
  const cfg = getCurrentBossConfig();
  // Базовый кулдаун респавна миньонов первой фазы (в тиках) с учётом сложности
  level._bossPhase1RespawnDelay = Math.round(180 * cfg.minionRespawnDelayMultiplier);

  // Задержки появления и кулдауны выстрелов миньонов
  // Эти числа можно свободно менять под баланс:
  spawnBossMinionOnPlatform(p1, { spawnDelay: 50,   shootCooldown: 170 });
  spawnBossMinionOnPlatform(p2, { spawnDelay: 60,  shootCooldown: 190 });
  spawnBossMinionOnPlatform(p3, { spawnDelay: 90,  shootCooldown: 180 });
  spawnBossMinionOnPlatform(p4, { spawnDelay: 110,  shootCooldown: 210 });
  spawnBossMinionOnPlatform(p5, { spawnDelay: 120, shootCooldown: 160 });
  spawnBossMinionOnPlatform(p6, { spawnDelay: 140, shootCooldown: 200 });
  spawnBossMinionOnPlatform(p7, { spawnDelay: 160, shootCooldown: 210 });

  bossVisible = false; // Босс пропадает после призыва
  bossPhaseStartTime = 0; // Сброс таймера фазы
  bossMinionRespawnTimer = 0;
}

function initBossPhase2(level) {
  clearBossPlatforms(level);
  enemies = [];
  bossMinions = [];

  const cfg = getCurrentBossConfig();

  const p3 = spawnBossPlatform(level, 75, 312, 82, 20);
  const p4 = spawnBossPlatform(level, 195, 244, 82, 20);
  const p5 = spawnBossPlatform(level, 75, 180, 82, 20);
  const p6 = spawnBossPlatform(level, 215, 136, 492, 20);
  const p7 = spawnBossPlatform(level, 800, 180, 82, 20);
  const p8 = spawnBossPlatform(level, 700, 244, 82, 20);
  const p9 = spawnBossPlatform(level, 800, 312, 82, 20);
  const p12 = spawnBossPlatform(level, 335, 320, 246, 20);

  // Сохраняем платформы для респавна миньонов
  level._bossPhase2Platforms = [p3, p4, p5, p7, p8, p9, p12];
  // Базовый кулдаун респавна миньонов второй фазы (в тиках) с учётом сложности
  level._bossPhase2RespawnDelay = Math.round(240 * cfg.minionRespawnDelayMultiplier);

  // Босс стоит на средней платформе (появляется с анимацией)
  boss = {
    x: p6.x + (p6.w - 53) / 2,
    y: p6.y - 65,
    w: 53,
    h: 65
  };
  bossMaxHp = cfg.bossHpPhase2;
  bossHp = bossMaxHp;
  bossVisible = false;
  bossAppearTimer = 55;
  bossDirection = 1;
  bossState = "walk";
  bossFrame = 0;
  bossFrameTick = 0;
  bossShootCooldown = cfg.bossShootCooldownPhase2;
  bossPhaseStartTime = 0;
  bossMinionRespawnTimer = 0;
}

function initBossPhase3(level) {
  clearBossPlatforms(level);
  enemies = [];
  bossMinions = [];

  const cfg = getCurrentBossConfig();
  const p1 = spawnBossPlatform(level, 47, 352, 164, 20);
  const p2 = spawnBossPlatform(level, 139, 200, 164, 20);
  const p3 = spawnBossPlatform(level, 655, 200, 164, 20);
  const p4 = spawnBossPlatform(level, 739, 352, 164, 20);
  const p5 = spawnBossPlatform(level, 215, 136, 492, 20);

  // Сохраняем платформы для респавна миньонов 
  level._bossPhase3Platforms = [p1, p2, p3, p4];
  // Базовый кулдаун респавна миньонов третьей фазы (в тиках) с учётом сложности
  level._bossPhase3RespawnDelay = Math.round(240 * cfg.minionRespawnDelayMultiplier);

  // В третьей фазе тоже можно задать разные задержки и кулдауны
  spawnBossMinionOnPlatform(p1, { spawnDelay: 50,   shootCooldown: 200 });
  spawnBossMinionOnPlatform(p2, { spawnDelay: 70,  shootCooldown: 240 });
  spawnBossMinionOnPlatform(p3, { spawnDelay: 80,  shootCooldown: 230 });
  spawnBossMinionOnPlatform(p4, { spawnDelay: 100,  shootCooldown: 210 });

  boss = {
    x: p5.x + (p5.w - 53) / 2,
    y: p5.y - 65,
    w: 53,
    h: 65
  };
  bossMaxHp = cfg.bossHpPhase3;
  bossHp = bossMaxHp;
  bossVisible = false;
  bossAppearTimer = 55;
  bossDirection = 1;
  bossState = "walk";
  bossFrame = 0;
  bossFrameTick = 0;
  bossShootCooldown = cfg.bossShootCooldownPhase3;
  bossPhaseStartTime = 0;
  bossMinionRespawnTimer = 0;
}

function respawnBossMinions(level) {
  let platforms = [];
  let respawnDelay = 0;
  
  if (bossPhase === 1 && level._bossPhase1Platforms) {
    platforms = level._bossPhase1Platforms;
    respawnDelay = level._bossPhase1RespawnDelay;
  } else if (bossPhase === 2 && level._bossPhase2Platforms) {
    platforms = level._bossPhase2Platforms;
    respawnDelay = level._bossPhase2RespawnDelay;
  } else if (bossPhase === 3 && level._bossPhase3Platforms) {
    platforms = level._bossPhase3Platforms;
    respawnDelay = level._bossPhase3RespawnDelay;
  }
  
  if (platforms.length === 0) return;
  
  // Находим платформы без миньонов
  const freePlatforms = platforms.filter(platform => {
    // Проверяем, есть ли на этой платформе живой миньон
    return !bossMinions.some(minion => {
      if (minion._dead || minion.deathAnim || minion.hp <= 0) return false;
      return minion.platformX === platform.x && 
             minion.platformY === platform.y &&
             minion.platformW === platform.w;
    });
  });
  
  // Спавним миньона на случайной свободной платформе
  if (freePlatforms.length > 0) {
    const randomPlatform = freePlatforms[Math.floor(Math.random() * freePlatforms.length)];
    spawnBossMinionOnPlatform(randomPlatform, { 
      spawnDelay: 0, 
      shootCooldown: 190 + Math.floor(Math.random() * 60) // Случайный кулдаун 190-250
    });
  }
}

function updateBossLogic() {
  if (!isBossLevel()) return;
  const lvl = levels[currentLevel];

  if (bossPhase === 0) return;

  // Инициализация фаз
  if (bossPhase === 1 && bossPlatforms.length === 0 && bossMinions.length === 0) {
    initBossPhase1(lvl);
    bossPhaseStartTime = 0;
  } else if (bossPhase === 2 && !bossVisible && !boss) {
    initBossPhase2(lvl);
    bossPhaseStartTime = 0;
  } else if (bossPhase === 3 && !bossVisible && !boss) {
    initBossPhase3(lvl);
    bossPhaseStartTime = 0;
  }
  
  // Отслеживаем время с начала фазы
  if (bossPhaseStartTime === 0 && (bossPlatforms.length > 0 || bossVisible)) {
    bossPhaseStartTime = 1; // Начинаем отсчет
  }
  
  if (bossPhaseStartTime > 0) {
    bossPhaseStartTime++;
  }

  // Анимация исчезновения в конце фазы (платформы и враги уходят)
  if (bossPhaseDisappearing) {
    bossPhaseDisappearTimer++;
    bossPlatforms.forEach(p => {
      p.disappearProgress = Math.min(1, bossPhaseDisappearTimer / BOSS_PHASE_DISAPPEAR_DURATION);
      p.effectiveY = p.y + p.disappearProgress * BOSS_PLATFORM_RISE_HEIGHT;
    });
    bossMinions.forEach(e => {
      if (!e.deathAnim) {
        e.phaseOutAnim = true;
        e.phaseOutTimer = (e.phaseOutTimer || 0) + 1;
      }
    });
    if (bossPhaseDisappearTimer >= BOSS_PHASE_DISAPPEAR_DURATION) {
      clearBossPlatforms(lvl);
      bossMinions = [];
      enemies = [];
      bossPhase = bossPhaseNext;
      bossVisible = false;
      boss = null;
      bossPhaseDisappearing = false;
      bossPhaseDisappearTimer = 0;
      bossPhaseTransitionTimer = 0;
      if (bossPhaseNext === 2) initBossPhase2(lvl);
      else if (bossPhaseNext === 3) initBossPhase3(lvl);
      bossPhaseNext = 0;
    }
  }

  // Анимация появления платформ босса (подъём снизу + коричневые партиклы)
  if (!bossPhaseDisappearing) {
    bossPlatforms.forEach(p => {
      if (p.appearProgress !== undefined && p.appearProgress < 1) {
        p.appearProgress = Math.min(1, p.appearProgress + 0.025);
        if (Math.random() < 0.4) spawnPlatformAppearParticles(p.x, p.y, p.w, p.h);
      }
      if (p.disappearProgress !== undefined && p.disappearProgress > 0) {
        p.effectiveY = p.y + Math.min(1, p.disappearProgress) * BOSS_PLATFORM_RISE_HEIGHT;
      } else {
        p.effectiveY = p.appearProgress !== undefined
          ? p.y + (1 - Math.min(1, p.appearProgress)) * BOSS_PLATFORM_RISE_HEIGHT
          : p.y;
      }
    });
  }

  // Анимация появления босса (зелёные партиклы, затем показ)
  if (boss && bossAppearTimer > 0) {
    bossAppearTimer--;
    const cx = boss.x + boss.w / 2;
    const cy = boss.y + boss.h / 2;
    spawnBossAppearParticles(cx, cy);
    if (bossAppearTimer <= 0) bossVisible = true;
  }

  // Респавн миньонов для каждой фазы
  let respawnDelay = 0;
  if (bossPhase === 1) {
    // В первой фазе после стартовой волны миньоны не респавнятся
    respawnDelay = 0;
  } else if (bossPhase === 2) {
    respawnDelay = lvl._bossPhase2RespawnDelay || 240;
  } else if (bossPhase === 3) {
    // В третьей фазе миньоны не респавнятся во время анимации смерти босса
    if (bossDeath) {
      respawnDelay = 0;
    } else {
      respawnDelay = lvl._bossPhase3RespawnDelay || 200;
    }
  }
  
  // Проверяем, нужно ли респавнить миньонов
  if (respawnDelay > 0) {
    const aliveMinions = bossMinions.filter(m => m.active && m.hp > 0);
    
    // Респавн после гибели всех миньонов
    if (aliveMinions.length === 0) {
      bossMinionRespawnTimer++;
      if (bossMinionRespawnTimer >= respawnDelay) {
        respawnBossMinions(lvl);
        bossMinionRespawnTimer = 0;
      }
    } else {
      // Если есть живые миньоны, сбрасываем таймер респавна
      bossMinionRespawnTimer = 0;
    }
    
    // Также периодический респавн через определенное время после начала фазы
    // (если есть свободные платформы)
    if (bossPhaseStartTime > 0 && bossPhaseStartTime > respawnDelay) {
      // Проверяем каждые respawnDelay тиков
      if ((bossPhaseStartTime - respawnDelay) % respawnDelay === 0) {
        respawnBossMinions(lvl);
      }
    }
  }

  // Переходы между фазами (не запускаем, если идёт анимация исчезновения)
  if (!bossPhaseDisappearing) {
    if (bossPhase === 1) {
      const anyAlive = bossMinions.some(e => e.hp > 0 && !e.deathAnim);
      if (!anyAlive) {
        bossPhaseTransitionTimer++;
        // После убийства всех врагов в первой фазе ждём ~6 секунд пустой карты
        if (bossPhaseTransitionTimer >= BOSS_PHASE1_EMPTY_DELAY) {
          bossPhaseDisappearing = true;
          bossPhaseDisappearTimer = 0;
          bossPhaseNext = 2;
          bossPlatforms.forEach(p => { p.disappearProgress = 0; });
          bossMinions.forEach(e => {
            if (!e.deathAnim) { e.phaseOutAnim = true; e.phaseOutTimer = 0; }
          });
        }
      } else {
        bossPhaseTransitionTimer = 0;
      }
    } else if (bossPhase === 2) {
      if (bossHp <= 0) {
        bossPhaseTransitionTimer++;
        // После окончания второй фазы ждём ~1 секунду пустой карты
        if (bossPhaseTransitionTimer >= BOSS_PHASE2_EMPTY_DELAY) {
          bossPhaseDisappearing = true;
          bossPhaseDisappearTimer = 0;
          bossPhaseNext = 3;
          bossPlatforms.forEach(p => { p.disappearProgress = 0; });
          bossMinions.forEach(e => { e.phaseOutAnim = true; e.phaseOutTimer = 0; });
        }
      } else {
        bossPhaseTransitionTimer = 0;
      }
    }
  }

  if (bossPhase === 3) {
    if (bossHp <= 0 && !bossDeath) {
      bossDeath = true;
      bossDeathTimer = 0;
      bossVisible = false;
      clearBossPlatforms(lvl);
      enemies = [];
      bossMinions = [];
      playerProjectiles = [];
      bossProjectiles = [];
    }
    if (bossDeath) {
      bossDeathTimer++;
      // Эпичная анимация смерти: мощный взрыв партиклов вокруг последней позиции босса
      if (boss && bossDeathTimer <= 180 && (bossDeathTimer % 2 === 0)) {
        const cx = boss.x + boss.w / 2;
        const cy = boss.y + boss.h / 2;
        spawnBossDeathParticles(cx, cy);
      }
      // Увеличиваем длительность анимации смерти босса примерно в 2 раза
      if (bossDeathTimer > 240) {
        completeBossLevel();
      }
      return;
    }
  }

  // Движение и атаки босса во 2 и 3 фазах
  if ((bossPhase === 2 || bossPhase === 3) && boss && bossVisible && bossHp > 0) {
    // Движение влево-вправо
    const speed = 1.5;
    boss.x += bossDirection * speed;

    // Ограничения движения по платформе под боссом (берем любую ближайшую)
    let plat = null;
    bossPlatforms.forEach(p => {
      const py = getPlatformTopY(p);
      if (boss.y + boss.h <= py + 1 && boss.y + boss.h >= py - 70) {
        if (boss.x + boss.w > p.x && boss.x < p.x + p.w) {
          plat = p;
        }
      }
    });
    if (plat) {
      if (boss.x < plat.x) {
        boss.x = plat.x;
        bossDirection = 1;
      } else if (boss.x + boss.w > plat.x + plat.w) {
        boss.x = plat.x + plat.w - boss.w;
        bossDirection = -1;
      }
    } else {
      // Если по какой-то причине платформы не найдено, ограничиваем по краям уровня
      if (boss.x < 0) { boss.x = 0; bossDirection = 1; }
      if (boss.x + boss.w > lvl.width) { boss.x = lvl.width - boss.w; bossDirection = -1; }
    }

    // Атаки шарами
    if (bossShootCooldown <= 0) {
      bossState = "attack";
      bossFrame = 0;
      shootBossProjectile();
      bossShootCooldown = bossPhase === 2 ? 60 : 45;
    } else {
      bossState = "walk";
    }

    // Анимация босса
    bossFrameTick++;
    const frameTickLimit = bossState === "attack" ? 5 : 7;
    const maxFrames = bossState === "attack" ? 5 : 7;
    if (bossFrameTick > frameTickLimit) {
      bossFrameTick = 0;
      bossFrame++;
      if (bossFrame >= maxFrames) bossFrame = 0;
    }
  }
}

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalImageContainer = document.getElementById("modalImageContainer");
const modalImage = document.getElementById("modalImage");
const modalBtn = document.getElementById("modalBtn");
const modalNextBtn = document.getElementById("modalNextBtn");
const modalRestartBtn = document.getElementById("modalRestartBtn");
const modalResumeBtn = document.getElementById("modalResumeBtn");
const modalHomeBtn = document.getElementById("modalHomeBtn");

let modalNextCallback = ()=>{};
let modalRestartCallback = ()=>{};

function showModal(title, text, nextCallback = null, restartCallback = null, showHome = false, showResume = false, imageUrl = null) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.style.display = "flex";
  modalRestartCallback = restartCallback || (()=>{});

  // Картинка в модалке (для артефактов и др.)
  if (modalImageContainer && modalImage) {
    if (imageUrl) {
      modalImage.src = imageUrl;
      modalImage.alt = title || '';
      modalImageContainer.style.display = "block";
    } else {
      modalImageContainer.style.display = "none";
      modalImage.src = "";
    }
  }
  
  if (nextCallback) {
    modalNextBtn.style.display = "inline-block";
    modalNextBtn.setAttribute('href', 'dialog.html');
  } else {
    modalNextBtn.style.display = "none";
    modalNextBtn.setAttribute('href', '#');
  }
  
  if (restartCallback) {
    modalRestartBtn.style.display = "inline-block";
  } else {
    modalRestartBtn.style.display = "none";
  }
  
  if (showResume) {
    modalResumeBtn.style.display = "inline-block";
  } else {
    modalResumeBtn.style.display = "none";
  }
  
  if (showHome) {
    modalHomeBtn.style.display = "inline-block";
  } else {
    modalHomeBtn.style.display = "none";
  }
  
  if (!nextCallback && !restartCallback && !showHome && !showResume) {
    modalBtn.style.display = "inline-block";
  } else {
    modalBtn.style.display = "none";
  }
  if (typeof window.updateCounterEdges === 'function') {
    setTimeout(()=>window.updateCounterEdges(), 0);
  }
}

// --- Модалка выбора сложности боссфайта ---
function showBossDifficultyModalIfNeeded(level) {
  if (!level || !level.isBossLevel) return;
  const diffModal = document.getElementById('difficultyModal');
  if (!diffModal) {
    // Если по какой-то причине модалки нет, просто инициализируем жизни по умолчанию
    initBossPlayerHpForLevel(level);
    return;
  }
  gamePaused = true;
  diffModal.style.display = 'flex';
  if (typeof window.updateCounterEdges === 'function') {
    setTimeout(()=>window.updateCounterEdges(), 0);
  }
}

window.selectBossDifficulty = function(diffKey) {
  if (diffKey === 'easy' || diffKey === 'normal' || diffKey === 'hard') {
    currentBossDifficulty = diffKey;
  } else {
    currentBossDifficulty = 'normal';
  }
  const lvl = levels[currentLevel];
  initBossPlayerHpForLevel(lvl);
  const diffModal = document.getElementById('difficultyModal');
  if (diffModal) {
    diffModal.style.display = 'none';
  }
  gamePaused = false;
};

function showPauseModal() {
  if (gamePaused) {
    // Если уже на паузе, закрываем паузу
    closePauseModal();
    return;
  }
  gamePaused = true;
  showModal("Пауза", "", null, ()=>{
    closePauseModal();
    resetPlayer();
  }, true, true);
}

function closePauseModal() {
  gamePaused = false;
  modal.style.display = "none";
}

window.showPauseModal = showPauseModal;

modalBtn.onclick = ()=>{
  if (gamePaused) {
    closePauseModal();
  } else {
    modal.style.display = "none";
  }
};

modalRestartBtn.onclick = ()=>{
  modal.style.display = "none";
  gamePaused = false;
  modalRestartCallback();
};

modalResumeBtn.onclick = ()=>{
  closePauseModal();
};

modalHomeBtn.onclick = (e)=>{
  e.preventDefault();
  const fade = document.getElementById('fade');
  if (fade) {
    fade.classList.add('show');
    setTimeout(() => {
      window.location.href = 'play.html';
    }, 1000);
  } else {
    window.location.href = 'play.html';
  }
};

// Проверяем, запущена ли игра из редактора
try {
  const editorMode = localStorage.getItem('love_game_editor_mode');
  if (editorMode === '1') {
    const editorLevelJson = localStorage.getItem('love_game_editor_level');
    if (editorLevelJson) {
      const editorLevel = JSON.parse(editorLevelJson);
      // Временно заменяем первый уровень уровнем из редактора
      if (levels.length > 0) {
        levels[0] = editorLevel;
      } else {
        levels.push(editorLevel);
      }
      currentLevel = 0;
      saveLevelProgress(0);
      // НЕ очищаем флаг редактора - он должен оставаться для переключения
    } else {
      // Если флаг есть, но уровня нет - загружаем обычный прогресс
      loadLevelProgress();
    }
  } else {
    loadLevelProgress();
    try {
      const goNext = localStorage.getItem('love_game_go_next');
      if (goNext === '1') {
        localStorage.removeItem('love_game_go_next');
        const nextLevel = Math.min(currentLevel + 1, levels.length - 1);
        currentLevel = nextLevel;
        saveLevelProgress(nextLevel);
      }
    } catch (e) {}
  }
} catch (e) {
  loadLevelProgress();
}

const stats = getLevelStats(currentLevel);
levelStats.bestTime = stats.bestTime;
levelStats.bestCoins = stats.bestCoins;

document.getElementById("level").innerText = currentLevel+1;

startLevelTimer();
updateStatsDisplay();

window.createEnemy = function(platformX, platformY, platformW) {
  return {
    x: platformX + 10,
    y: platformY - 38,
    w: 46,
    h: 38,
    dx: 1,
    direction: 1,
    platformX: platformX,
    platformW: platformW,
    frame: 0,
    frameTick: 0,
    state: "walk"
  };
}

window.updateEnemies = function() {
  enemies.forEach(enemy => {
    if (enemy.deathAnim) {
      enemy.deathAnimTimer = (enemy.deathAnimTimer || 0) + 1;
      if (enemy.deathAnimTimer >= 28) enemy._dead = true;
      return;
    }
    if (enemy.phaseOutAnim) return;
    // Миньоны босса появляются только после полного появления платформы
    if (enemy.isBossMinion && !enemy.active) {
      const plat = bossPlatforms.find(p =>
        p.x === enemy.platformX && p.y === enemy.platformY && p.w === enemy.platformW
      );
      if (plat && plat.appearProgress !== undefined && plat.appearProgress >= 1) {
        enemy.active = true;
        enemy.spawnAnimProgress = 0; // старт анимации появления
      } else {
        return;
      }
    }
    // Прогресс анимации спавна миньонов (респавн во время боя)
    if (enemy.isBossMinion && enemy.active && (enemy.spawnAnimProgress || 0) < 1) {
      const duration = enemy.spawnAnimDuration || 22;
      if (enemy.spawnAnimProgress === 0) {
        const cx = enemy.x + enemy.w / 2;
        const cy = enemy.y + enemy.h / 2;
        spawnMinionSpawnParticles(cx, cy);
      }
      enemy.spawnAnimProgress = Math.min(1, (enemy.spawnAnimProgress || 0) + 1 / duration);
    }
    enemy.x += enemy.dx * enemy.direction;
    
    if (enemy.x <= enemy.platformX) {
      enemy.x = enemy.platformX;
      enemy.direction = 1;
    } else if (enemy.x + enemy.w >= enemy.platformX + enemy.platformW) {
      enemy.x = enemy.platformX + enemy.platformW - enemy.w;
      enemy.direction = -1;
    }
    

    enemy.frameTick++;
    if (enemy.frameTick > 3) {
      enemy.frameTick = 0;
      enemy.frame++;
      if (enemy.frame > 10) enemy.frame = 0;
    }
    
    // Во время боссфайта столкновения с обычными врагами не наносят урон игроку
    if (!isBossLevel() &&
        !enemy.deathAnim && !enemy.phaseOutAnim &&
        player.x < enemy.x + enemy.w && player.x + player.w > enemy.x &&
        player.y < enemy.y + enemy.h && player.y + player.h > enemy.y) {
      gameOver = true;
      showModal("Игра окончена.", "Ты столкнулась с врагом!", null, ()=>resetPlayer());
    }
    
    if (!enemy.deathAnim && !enemy.phaseOutAnim && activeCharacter === "companion" && 
        companion.x < enemy.x + enemy.w && companion.x + companion.w > enemy.x &&
        companion.y < enemy.y + enemy.h && companion.y + companion.h > enemy.y) {
      gameOver = true;
      showModal("Игра окончена.", "Арчик столкнулся с врагом!", null, ()=>resetPlayer());
    }
  });
}

function resetPlayer() {
  // Запускаем музыку уровня заново при перезапуске
  
  let lvl = levels[currentLevel];
  const isBoss = !!lvl && !!lvl.isBossLevel;
  if (isBoss && lvl.width) {
    const centerX = Math.round(lvl.width / 2 - player.w / 2);
    player.x = centerX;
    player.y = 350;
    companion.x = centerX;
    companion.y = 100;
    companion.targetX = centerX;
    companion.targetY = 250;
  } else {
    player.x = 50;
    player.y = 100;
    companion.x = 50;
    companion.y = 100;
    companion.targetX = 50;
    companion.targetY = 250;
  }
  player.dy = 0;
  player.idleTimer = 0;
  player.onDynamicPlatform = null;
  gameOver = false;
  gamePaused = false;
  totalCoins = 0;

  companion.dy = 0;
  companion.idleTimer = 0;
  companion.onDynamicPlatform = null;
  
  // При рестарте всегда устанавливаем управление игроком и режим следования компаньона
  activeCharacter = "player";
  followEnabled = true;
  companionLockToCenter = true;
  
  // Устанавливаем начальные targetX и targetY для компаньона, чтобы он начал следовать сразу
  companion.targetX = player.x;
  companion.targetY = player.y + player.h - companion.h;
  
  // Обновляем визуальное состояние кнопки "следовать"
  if (typeof window.updateCompanionButtonsVisibility === 'function') {
    window.updateCompanionButtonsVisibility();
  }
  // Устанавливаем активное состояние кнопки "следовать"
  const followBtn = document.getElementById('follow');
  if (followBtn) {
    followBtn.classList.add('active');
  }
  
  enemies = [];
  particles = [];
  lvl = levels[currentLevel];

  // Сбрасываем состояние босса для уровня
  resetBossStateForLevel(lvl);
  
  // Сброс состояния динамических платформ
  if (lvl.dynamicPlatforms) {
    lvl.dynamicPlatforms.forEach(dp => {
      dp.initialized = false;
      if (dp.type === 'moving') {
        dp.x = dp.startX || dp.x;
        dp.y = dp.startY || dp.y;
        dp.offsetX = 0;
        dp.offsetY = 0;
      }
    });
  }
  if (lvl.enemies) {
    lvl.enemies.forEach(enemyData => {
      const platform = lvl.platforms.find(p => 
        p.x === enemyData.platformX && p.y === enemyData.platformY
      );
      if (platform) {
        enemies.push(createEnemy(platform.x, platform.y, platform.w));
      }
    });
  }

  if (lvl.coins) {
    lvl.coins.forEach(coin => {
      coin.collected = false;
    });
  }

  // Сбрасываем состояние артефактов на уровне:
  // до победы над боссом они не должны появляться вовсе,
  // после победы уже найденные глобально помечаем собранными,
  // остальные показываем снова.
  if (lvl.artifacts) {
    const bossBeaten = isBossBeatenGlobally();
    lvl.artifacts.forEach(art => {
      if (!art) return;
      if (!bossBeaten) {
        art.collected = true;
      } else if (isArtifactUnlockedGlobal(art.id)) {
        art.collected = true;
      } else {
        art.collected = false;
      }
    });
  }

  const stats = getLevelStats(currentLevel);
  levelStats.bestTime = stats.bestTime;
  levelStats.bestCoins = stats.bestCoins;

  if (levelTimerActive) {
    stopLevelTimer();
  }
  startLevelTimer();

  document.getElementById("level").innerText = currentLevel+1;
  updateStatsDisplay();
}

function updateCoins () {
  totalCoins++;
  document.getElementById('totalCoins').innerText = `${totalCoins} | ${levels[currentLevel].coins.length}`;
  // Воспроизводим звук сбора монетки
}

function collectArtifact(artifact) {
  if (!artifact || artifact.collected) return;

  const def = getArtifactDefById(artifact.id);

  // Помечаем как собранный на уровне и глобально
  artifact.collected = true;
  unlockArtifactGlobal(artifact.id);

  // Показываем модалку с картинкой и кнопкой продолжить
  const title = def ? def.title : "Новый артефакт";
  const name = def ? def.name : ("Артефакт " + String(artifact.id || ""));
  const imgUrl = def ? def.image : null;
  const text = `Ты нашла ${name}!\nТеперь он доступен в меню артефактов.`;

  gamePaused = true;
  showModal(title, text, null, null, false, true, imgUrl);
}

function updateStatsDisplay() {
  document.getElementById('totalCoins').innerText = `${totalCoins} | ${levels[currentLevel].coins.length}`;
}

function update() {
  if(gameOver || gamePaused) return;
  
  prevPlayerOnGround = player.onGround;
  prevCompanionOnGround = companion.onGround;
  
  processSwitchesAndDynamics();
  updateDynamicPlatforms();
  updateEnemies();

  // Обновляем снаряды босса и игрока (для босс-уровня)
  if (isBossLevel()) {
    updatePlayerShooting(); // Стрельба игрока по джойстику
    updateBossProjectiles();
  }

  if (activeCharacter === "player") {
    player.dx = 0;
    if (keys.left) player.dx = -C.PLAYER.SPEED;
    if (keys.right) player.dx = C.PLAYER.SPEED;
    player.dy += C.PLAYER.GRAVITY;

    player.x += player.dx;
    player.y += player.dy;
    player.onGround = false;

    let lvl = levels[currentLevel];
    const ground = getGroundArray(lvl);

    ground.forEach(p=>{
      const py = getPlatformTopY(p);
      if(player.x < p.x+p.w && player.x+player.w > p.x &&
         player.y < py+p.h && player.y+player.h > py){
           if(player.dy > 0 && player.y + player.h - player.dy <= py){
             player.y = py - player.h; 
             player.dy = 0; 
             if (!prevPlayerOnGround) spawnLandParticles(player.x, player.y + player.h, player.w);
             player.onGround = true;
             
             // Обработка подпрыгивающих платформ
             if (p.type === 'bouncy') {
               player.dy = (p.bounceStrength || -20);
               if (window.followEnabled && companion.onGround) {
                 companion.dy = (p.bounceStrength || -20);
               }
               // Воспроизводим звук прыжка на слизи
             }
             
             // Отслеживание движущихся платформ
             if (p.type === 'moving') {
               player.onDynamicPlatform = p;
             } else {
               player.onDynamicPlatform = null;
             }
           }
      }
    });
    const obstacles = getObstaclesArray(lvl);
    obstacles.forEach(o=>{
      if(player.x < o.x+o.w && player.x+player.w > o.x &&
         player.y < o.y+o.h && player.y+player.h > o.y){
           if (player.y + player.h <= o.y + 1) return;
           if (player.y >= o.y + o.h - 1) return;
           if (player.dx > 0) player.x = o.x - player.w;
           else if (player.dx < 0) player.x = o.x + o.w;
      }
    });

    lvl.traps.forEach(t=>{
      if(player.x < t.x+t.w && player.x+player.w > t.x &&
         player.y < t.y+t.h && player.y+player.h > t.y){
           gameOver = true;
           showModal("Игра окончена.","Ты наступила на шипы!", null, ()=>resetPlayer());
      }
    });

    let f = lvl.finish;
    if(!isBossLevel() && player.x < f.x+f.w && player.x+player.w > f.x &&
       player.y < f.y+f.h && player.y+player.h > f.y){
         gameOver = true;
         
         const finishTime = stopLevelTimer();
         const currentStats = getLevelStats(currentLevel);
         
         let isNewBestTime = !currentStats.bestTime || finishTime < currentStats.bestTime;
         let isNewBestCoins = totalCoins > currentStats.bestCoins;
         
         if (isNewBestTime || isNewBestCoins) {
           const newStats = {
             bestTime: isNewBestTime ? finishTime : currentStats.bestTime,
             bestCoins: isNewBestCoins ? totalCoins : currentStats.bestCoins
           };
           saveLevelStats(currentLevel, newStats);
         }
         
         try { localStorage.setItem('love_game_dialog_level', String(currentLevel)); } catch (e) {}
         
         let resultText = `${lvl.gift.desc}\n\n`;
         resultText += `Время прохождения: ${formatTime(finishTime)}\n`;
         resultText += `Собрано морошки: ${totalCoins}/${lvl.coins.length}\n\n`;
         
         if (isNewBestTime) {
           resultText += `Новый рекорд времени!\n`;
         }
         
         if (currentStats.bestTime) {
           resultText += `Лучшее время: ${formatTime(currentStats.bestTime)}\n`;
         }
         
         // В режиме редактора не показываем кнопку "Далее" (переход к диалогу)
         const editorMode = localStorage.getItem('love_game_editor_mode');
         const showNext = editorMode !== '1';
         
        showModal(lvl.gift.title, resultText, showNext ? ()=>{} : null, ()=>{
          resetPlayer();
        });
    }

    if (lvl.coins) {
      lvl.coins.forEach(coin => {
        if (!coin.collected && 
            player.x < coin.x + coin.w && player.x + player.w > coin.x &&
            player.y < coin.y + coin.h && player.y + player.h > coin.y) {
          coin.collected = true;
          updateCoins()
        }
      });
    }

    if (lvl.artifacts && isBossBeatenGlobally()) {
      lvl.artifacts.forEach(art => {
        if (!art.collected &&
            !isArtifactUnlockedGlobal(art.id) &&
            player.x < art.x + art.w && player.x + player.w > art.x &&
            player.y < art.y + art.h && player.y + player.h > art.y) {
          collectArtifact(art);
        }
      });
    }

    if (player.dx > 0) {
        player.state = "walk-right";
        player.idleTimer = 0;
        // Звук ходьбы
    } else if (player.dx < 0) {
        player.state = "walk-left";
        player.idleTimer = 0;
        // Звук ходьбы
    } else {
        player.state = "idle";
        player.idleTimer++;
    }

    if (player.state !== player.prevState) {
        player.frameTick = 0;
        player.frame = 0;
        player.prevState = player.state;
    }
    
    player.frameTick += 1
    if (player.state === "idle") {
        if (player.frameTick > C.PLAYER.IDLE_FRAME_TICK) {
            player.frameTick = 0;
            if (player.idleTimer > C.PLAYER.IDLE_ANIM_DELAY_FRAMES) {
                player.frame++;
                if (player.frame > C.PLAYER.IDLE_FRAMES - 1) player.frame = 0;
            } else {
                player.frame = 0;
            }
        }
    } else {
        if (player.frameTick > C.PLAYER.WALK_FRAME_TICK) {
            player.frameTick = 0;
            player.frame++;
            if (player.frame > C.PLAYER.WALK_FRAMES - 1) player.frame = 0;
        }
    }
    if ((player.state === "walk-right" || player.state === "walk-left") && player.onGround && player.frameTick % 2 === 0) {
      spawnWalkParticle(player.x + player.w / 2, player.y + player.h, player.state === "walk-right" ? 1 : -1);
    }

    if (player.y > viewH + C.FALL_OFF.Y_MARGIN || player.x < -C.FALL_OFF.X_MARGIN || player.x > lvl.width + C.FALL_OFF.X_MARGIN) {
      gameOver = true;
      showModal("Игра окончена.","Ты упала в пропасть!", null, ()=>resetPlayer());
    }
  } else {
    companion.dx = 0;
    if (keys.left) companion.dx = -C.COMPANION.SPEED;
    if (keys.right) companion.dx = C.COMPANION.SPEED;
    companion.dy += C.COMPANION.GRAVITY;

    companion.x += companion.dx;
    companion.y += companion.dy;
    companion.onGround = false;

    let lvl = levels[currentLevel];
    const groundC = getGroundArray(lvl);

    groundC.forEach(p=>{
      const py = getPlatformTopY(p);
      if(companion.x < p.x+p.w && companion.x+companion.w > p.x &&
         companion.y < py+p.h && companion.y+companion.h > py){
           if(companion.dy > 0 && companion.y + companion.h - companion.dy <= py){ 
             companion.y = py - companion.h; 
             companion.dy = 0; 
             if (!prevCompanionOnGround && !isBossLevel()) spawnLandParticles(companion.x, companion.y + companion.h, companion.w);
             companion.onGround = true;
             
             // Обработка подпрыгивающих платформ
             if (p.type === 'bouncy') {
               companion.dy = (p.bounceStrength || -20);
               // Воспроизводим звук прыжка на слизи
             }
             
             // Отслеживание движущихся платформ
             if (p.type === 'moving') {
               companion.onDynamicPlatform = p;
             } else {
               companion.onDynamicPlatform = null;
             }
           }
      }
    });
    const obstacles2 = getObstaclesArray(lvl);
    obstacles2.forEach(o=>{
      if(companion.x < o.x+o.w && companion.x+companion.w > o.x &&
         companion.y < o.y+o.h && companion.y+companion.h > o.y){
           if (companion.y + companion.h <= o.y + 1) return;
           if (companion.y >= o.y + o.h - 1) return;
           if (companion.dx > 0) companion.x = o.x - companion.w;
           else if (companion.dx < 0) companion.x = o.x + o.w;
      }
    });

    lvl.traps.forEach(t=>{
      if(companion.x < t.x+t.w && companion.x+companion.w > t.x &&
         companion.y < t.y+t.h && companion.y+companion.h > t.y){
           gameOver = true;
           showModal("Игра окончена.","Арчик наступил на шипы!", null, ()=>resetPlayer());
      }
    });

    let f = lvl.finish;
    if(!isBossLevel() && companion.x < f.x+f.w && companion.x+companion.w > f.x &&
       companion.y < f.y+f.h && companion.y+companion.h > f.y){
         gameOver = true;
         
         const finishTime = stopLevelTimer();
         const currentStats = getLevelStats(currentLevel);
         
         let isNewBestTime = !currentStats.bestTime || finishTime < currentStats.bestTime;
         let isNewBestCoins = totalCoins > currentStats.bestCoins;
         
         if (isNewBestTime || isNewBestCoins) {
           const newStats = {
             bestTime: isNewBestTime ? finishTime : currentStats.bestTime,
             bestCoins: isNewBestCoins ? totalCoins : currentStats.bestCoins
           };
           saveLevelStats(currentLevel, newStats);
         }
         
         try { localStorage.setItem('love_game_dialog_level', String(currentLevel)); } catch (e) {}
         
         let resultText = `${lvl.gift.desc}\n\n`;
         resultText += `Время прохождения: ${formatTime(finishTime)}\n`;
         resultText += `Собрано морошки: ${totalCoins}/${lvl.coins.length}\n\n`;
         
         if (isNewBestTime) {
           resultText += `Новый рекорд времени!\n`;
         }
         if (isNewBestCoins) {
           resultText += `Новый рекорд монет!\n`;
         }
         
         if (currentStats.bestTime) {
           resultText += `Лучшее время: ${formatTime(currentStats.bestTime)}\n`;
         }
         
         // В режиме редактора не показываем кнопку "Далее" (переход к диалогу)
         const editorMode = localStorage.getItem('love_game_editor_mode');
         const showNext = editorMode !== '1';
         
        showModal(lvl.gift.title, resultText, showNext ? ()=>{} : null, ()=>{
          resetPlayer();
         });
    }


    if (lvl.coins) {
      lvl.coins.forEach(coin => {
        if (!coin.collected && 
            companion.x < coin.x + coin.w && companion.x + companion.w > coin.x &&
            companion.y < coin.y + coin.h && companion.y + companion.h > coin.y) {
          coin.collected = true;
          updateCoins()
        }
      });
    }

    if (lvl.artifacts && isBossBeatenGlobally()) {
      lvl.artifacts.forEach(art => {
        if (!art.collected &&
            !isArtifactUnlockedGlobal(art.id) &&
            companion.x < art.x + art.w && companion.x + companion.w > art.x &&
            companion.y < art.y + art.h && companion.y + companion.h > art.y) {
          collectArtifact(art);
        }
      });
    }

    if (companion.dx > 0) {
        companion.state = "walk-right";
        companion.idleTimer = 0;
        // Звук ходьбы для companion когда он активен
    } else if (companion.dx < 0) {
        companion.state = "walk-left";
        companion.idleTimer = 0;
        // Звук ходьбы для companion когда он активен
    } else {
        companion.state = "idle";
        companion.idleTimer++;
    }

    if (companion.state !== companion.prevState) {
        companion.frameTick = 0;
        companion.frame = 0;
        companion.prevState = companion.state;
    }
    
    companion.frameTick++;
    if (companion.state === "idle") {
        if (companion.frameTick > 6) {
            companion.frameTick = 0;
            if (companion.idleTimer > 600) {
                companion.frame++;
                if (companion.frame > C.COMPANION.IDLE_FRAMES - 1) companion.frame = 0;
            } else {
                companion.frame = 0;
            }
        }
    } else {
        if (companion.frameTick > 2) {
            companion.frameTick = 0;
            companion.frame++;
            if (companion.frame > C.COMPANION.WALK_FRAMES - 1) companion.frame = 0;
        }
    }
    if (!isBossLevel() && (companion.state === "walk-right" || companion.state === "walk-left") && companion.onGround && companion.frameTick % 2 === 0) {
      spawnWalkParticle(companion.x + companion.w / 2, companion.y + companion.h, companion.state === "walk-right" ? 1 : -1);
    }

    if (companion.y > viewH + C.FALL_OFF.Y_MARGIN || companion.x < -C.FALL_OFF.X_MARGIN || companion.x > lvl.width + C.FALL_OFF.X_MARGIN) {
      gameOver = true;
      showModal("Игра окончена.","Арчик упал в пропасть!", null, ()=>resetPlayer());
    }
  }

  if (isBossLevel()) {
    updateBossLogic();
    window.bossAppearTimer = bossAppearTimer;
    window.playerBossMaxHp = playerBossMaxHp;
    window.playerBossHp = playerBossHp;
    window.bossDeath = bossDeath;
    window.bossDeathTimer = bossDeathTimer;
  } else {
    window.bossAppearTimer = 0;
    window.playerBossMaxHp = 0;
    window.playerBossHp = 0;
    window.bossDeath = false;
    window.bossDeathTimer = 0;
  }
  
  if (activeCharacter === "player") {
    updateCompanion();
  } else {
    updatePlayer();
  }
  updateArtifactEffects();
  updateParticles();
}
  
  function updateCompanion() {
    if (!followEnabled) {
      companion.targetX = companion.x;
      companion.targetY = companion.y;
      companionLockToCenter = false;
    }
    let distanceToPlayer = Math.abs(companion.x - player.x);
    let maxDistance = C.COMPANION.MAX_HORIZONTAL_DISTANCE;
    // Тянем кота к уровню ног игрока, чтобы не пытаться залезть на голову
    if (followEnabled) companion.targetY = player.y + player.h - companion.h;
    
    if (followEnabled && distanceToPlayer > maxDistance) {
      if (companion.x < player.x) {
        companion.targetX = player.x - maxDistance;
      } else {
        companion.targetX = player.x + maxDistance;
      }
    } else {
      companion.targetX = companion.x;
    }
    
    if (followEnabled) companion.x += (companion.targetX - companion.x) * companion.followDelay;
    
    if (followEnabled) companion.y += (companion.targetY - companion.y) * companion.followDelay;
    
    companion.dy += C.COMPANION.GRAVITY;
    companion.y += companion.dy;
    companion.onGround = false;
    
    let lvl = levels[currentLevel];
    const groundF = getGroundArray(lvl);
    groundF.forEach(p => {
      const py = getPlatformTopY(p);
      if (companion.x < p.x + p.w && companion.x + companion.w > p.x &&
          companion.y < py + p.h && companion.y + companion.h > py) {
          if (companion.dy > 0 && companion.y + companion.h - companion.dy <= py) {
          companion.y = py - companion.h;
          companion.dy = 0;
          if (!prevCompanionOnGround && !isBossLevel()) spawnLandParticles(companion.x, companion.y + companion.h, companion.w);
          companion.onGround = true;
          
          // Обработка подпрыгивающих платформ
          if (p.type === 'bouncy') {
            companion.dy = (p.bounceStrength || -20);
            // Воспроизводим звук прыжка на слизи
          }
          
          // Отслеживание движущихся платформ
          if (p.type === 'moving') {
            companion.onDynamicPlatform = p;
          } else {
            companion.onDynamicPlatform = null;
          }
        }
      }
    });

    if (activeCharacter === "player" && followEnabled) {
      const centerX = player.x + (player.w - companion.w) / 2;
      if (companionLockToCenter) {
        const followStrength = C.COMPANION.FOLLOW_STRENGTH_AIR;
        companion.x += (centerX - companion.x) * followStrength;
      }
      const maxVerticalLag = C.COMPANION.MAX_VERTICAL_LAG;
      const companionBottom = companion.y + companion.h;
      const playerBottom = player.y + player.h;
      if (companionBottom - playerBottom > maxVerticalLag) {
        companion.y = playerBottom - companion.h - 2;
        companion.dy = 0;
      }
      if (player.onGround && companion.onGround && companionLockToCenter) {
        companionLockToCenter = false;
        companion.state = "idle";
      }
    }
    
    let currentDistance = Math.abs(companion.x - player.x);
    let isMoving = Math.abs(companion.x - companion.targetX) > C.COMPANION.MOTION_THRESHOLD;

    if (companionLockToCenter && activeCharacter === "player") {
      const centerX = player.x + (player.w - companion.w) / 2;
      const dxToCenter = centerX - companion.x;
      if (Math.abs(dxToCenter) > C.COMPANION.CENTER_TOLERANCE) {
        companion.state = dxToCenter > 0 ? "walk-right" : "walk-left";
        companion.idleTimer = 0;
      } else {
        companion.state = "idle";
        companion.idleTimer++;
      }
    } else {
      if (isMoving && currentDistance > 15) {
        if (companion.x < companion.targetX) {
          companion.state = "walk-right";
        } else {
          companion.state = "walk-left";
        }
        companion.idleTimer = 0;
      } else {
        companion.state = "idle";
        companion.idleTimer++;
      }
    }

    if (companion.state !== companion.prevState) {
        companion.frameTick = 0;
        companion.frame = 0;
        companion.prevState = companion.state;
    }
    
    companion.frameTick++;
    if (companion.state === "idle") {
        if (companion.frameTick > C.COMPANION.IDLE_FRAME_TICK) {
            companion.frameTick = 0;
            if (companion.idleTimer > C.COMPANION.IDLE_ANIM_DELAY_FRAMES) {
                companion.frame++;
                if (companion.frame > C.COMPANION.IDLE_FRAMES - 1) companion.frame = 0;
            } else {
                companion.frame = 0;
            }
        }
    } else {
        if (companion.frameTick > C.COMPANION.WALK_FRAME_TICK) {
            companion.frameTick = 0;
            companion.frame++;
            if (companion.frame > C.COMPANION.WALK_FRAMES - 1) companion.frame = 0;
        }
    }
    if (!isBossLevel() && (companion.state === "walk-right" || companion.state === "walk-left") && companion.onGround && companion.frameTick % 2 === 0) {
      spawnWalkParticle(companion.x + companion.w / 2, companion.y + companion.h, companion.state === "walk-right" ? 1 : -1);
    }
  }
  
  function updatePlayer() {
    player.dy += C.PLAYER.GRAVITY;
    player.y += player.dy;
    player.onGround = false;
    
    let lvl = levels[currentLevel];
    const platforms = getPlatformsArray(lvl);
    platforms.forEach(p => {
      const py = getPlatformTopY(p);
      if (player.x < p.x + p.w && player.x + player.w > p.x &&
          player.y < py + p.h && player.y + player.h > py) {
        if (player.dy > 0 && player.y + player.h - player.dy <= py) {
          player.y = py - player.h;
          player.dy = 0;
          if (!prevPlayerOnGround) spawnLandParticles(player.x, player.y + player.h, player.w);
          player.onGround = true;
          
          // Обработка подпрыгивающих платформ
          if (p.type === 'bouncy') {
            player.dy = (p.bounceStrength || -20);
            // Воспроизводим звук прыжка на слизи
          }
          
          // Отслеживание движущихся платформ
          if (p.type === 'moving') {
            player.onDynamicPlatform = p;
          } else {
            player.onDynamicPlatform = null;
          }
        }
      }
    });
    
    if (player.y > viewH + C.FALL_OFF.Y_MARGIN || player.x < -C.FALL_OFF.X_MARGIN || player.x > lvl.width + C.FALL_OFF.X_MARGIN) {
      gameOver = true;
      showModal("Игра окончена.","Ты упала в пропасть!", null, ()=>resetPlayer());
    }
    
    player.state = "idle";
    player.idleTimer++;
    
    player.frameTick++;
    if (player.state === "idle") {
        if (player.frameTick > 15) {
            player.frameTick = 0;
            if (player.idleTimer > 600) {
                player.frame++;
                if (player.frame > 15) player.frame = 0;
            } else {
                player.frame = 0;
            }
        }
    } else {
        if (player.frameTick > 3) {
            player.frameTick = 0;
            player.frame++;
            if (player.frame > 9) player.frame = 0;
        }
    }

  }
  
function getGroundY() {
  let lvl = levels[currentLevel];
  let maxY = 0;
  const plats = getPlatformsArray(lvl);
  plats.forEach(p => {
    const py = getPlatformTopY(p);
    if (py > maxY) maxY = py;
  });
  return maxY;
}


function drawDecorations() {
  let lvl = levels[currentLevel];
  const bg = lvl && (lvl.background || "forest");
  const isForest = bg === "forest";
  const swayTypes = { grass1: true, bush: true, flower1: true, flower2: true, three: true };
  const time = (typeof performance !== "undefined" ? performance.now() : Date.now()) * 0.001;

  if (lvl.decorations) {
    lvl.decorations.forEach(dec => {
      let img;

      switch(dec.image) {
        case "flower1": img = imgFlower1; break;
        case "flower2": img = imgFlower2; break;
        case "rock1": img = imgRock1; break;
        case "rock2": img = imgRock2; break;
        case "grass1": img = imgGrass1; break;
        case "bush": img = imgBush; break;
        case "mountain": img = imgMountain; break;
        case "three": img = imgThree; break;
        case "alert": img = imgAlert; break;
        case "house_1": img = imgHouse1; break;
        case "house_2": img = imgHouse2; break;
        case "house_bg": img = imgHouseBg; break;
        case "bake": img = imgBake; break;
        case "bench": img = imgBench; break;
        case "clock": img = imgClock; break;
        case "window": img = imgWindow; break;
        case "vis": img = imgVis; break;
        case "vis2": img = imgVis2; break;
        case "vis3": img = imgVis3; break;
        case "vis4": img = imgVis4; break;
        case "vis5": img = imgVis5; break;
        case "vis6": img = imgVis6; break;
        case "vis7": img = imgVis7; break;
        case "vis8": img = imgVis8; break;
        case "vis9": img = imgVis9; break;
        case "vis10": img = imgVis10; break;
        case "vis11": img = imgVis11; break;
        case "vis12": img = imgVis12; break;
        case "vis13": img = imgVis13; break;
        case "vaz": img = imgVaz; break;
        case "vaz2": img = imgVaz2; break;
        case "vaz3": img = imgVaz3; break;
        case "vaz4": img = imgVaz4; break;
        case "table": img = imgTable; break;
      }

      if (!img) return;

      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = "high";

      const drawX = dec.x - cameraX;
      const drawY = dec.y;

      if (isForest && swayTypes[dec.image]) {
        const phase = dec.x * 0.02 + dec.y * 0.01;
        const swayX = Math.sin(time * 1.4 + phase) * 1.5;
        const swayAngle = Math.sin(time * 1.1 + phase) * 0.025;
        const cx = drawX + dec.w / 2;
        const cy = drawY + dec.h;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(swayAngle);
        ctx.translate(-cx, -cy);
        ctx.drawImage(img, drawX + swayX, drawY, dec.w, dec.h);
        ctx.restore();
      } else {
        ctx.drawImage(img, drawX, drawY, dec.w, dec.h);
      }
    });
  }
}

function drawDecorationsUndo() {
  let lvl = levels[currentLevel];
  const bg = lvl && (lvl.background || "forest");
  const isForest = bg === "forest";
  const swayTypes = { grass1: true, bush: true, flower1: true, flower2: true, three: true };
  const time = (typeof performance !== "undefined" ? performance.now() : Date.now()) * 0.001;

  if (lvl.decorationsUndo) {
    lvl.decorationsUndo.forEach(dec => {
      let img;

      switch(dec.image) {
        case "flower1": img = imgFlower1; break;
        case "flower2": img = imgFlower2; break;
        case "rock1": img = imgRock1; break;
        case "rock2": img = imgRock2; break;
        case "grass1": img = imgGrass1; break;
        case "bush": img = imgBush; break;
        case "mountain": img = imgMountain; break;
        case "three": img = imgThree; break;
        case "alert": img = imgAlert; break;
        case "house_1": img = imgHouse1; break;
        case "house_2": img = imgHouse2; break;
        case "house_bg": img = imgHouseBg; break;
        case "bake": img = imgBake; break;
        case "bench": img = imgBench; break;
        case "clock": img = imgClock; break;
        case "window": img = imgWindow; break;
        case "vis": img = imgVis; break;
        case "vis2": img = imgVis2; break;
        case "vis3": img = imgVis3; break;
        case "vis4": img = imgVis4; break;
        case "vis5": img = imgVis5; break;
        case "vis6": img = imgVis6; break;
        case "vis7": img = imgVis7; break;
        case "vis8": img = imgVis8; break;
        case "vis9": img = imgVis9; break;
        case "vis10": img = imgVis10; break;
        case "vis11": img = imgVis11; break;
        case "vis12": img = imgVis12; break;
        case "vis13": img = imgVis13; break;
        case "vaz": img = imgVaz; break;
        case "vaz2": img = imgVaz2; break;
        case "vaz3": img = imgVaz3; break;
        case "vaz4": img = imgVaz4; break;
        case "table": img = imgTable; break;
      }

      if (!img) return;

      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = "high";

      const drawX = dec.x - cameraX;
      const drawY = dec.y;

      if (isForest && swayTypes[dec.image]) {
        const phase = dec.x * 0.02 + dec.y * 0.01;
        const swayX = Math.sin(time * 1.4 + phase) * 1.5;
        const swayAngle = Math.sin(time * 1.1 + phase) * 0.025;
        const cx = drawX + dec.w / 2;
        const cy = drawY + dec.h;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(swayAngle);
        ctx.translate(-cx, -cy);
        ctx.drawImage(img, drawX + swayX, drawY, dec.w, dec.h);
        ctx.restore();
      } else {
        ctx.drawImage(img, drawX, drawY, dec.w, dec.h);
      }
    });
  }
}

function drawDecorationsUndoPlatform() {
  let lvl = levels[currentLevel];
  const bg = lvl && (lvl.background || "forest");
  const isForest = bg === "forest";
  const swayTypes = { grass1: true, bush: true, flower1: true, flower2: true, three: true };
  const time = (typeof performance !== "undefined" ? performance.now() : Date.now()) * 0.001;

  if (lvl.decorationsUndoPlatform) {
    lvl.decorationsUndoPlatform.forEach(dec => {
      let img;

      switch(dec.image) {
        case "flower1": img = imgFlower1; break;
        case "flower2": img = imgFlower2; break;
        case "rock1": img = imgRock1; break;
        case "rock2": img = imgRock2; break;
        case "grass1": img = imgGrass1; break;
        case "bush": img = imgBush; break;
        case "mountain": img = imgMountain; break;
        case "three": img = imgThree; break;
        case "alert": img = imgAlert; break;
        case "house_1": img = imgHouse1; break;
        case "house_2": img = imgHouse2; break;
        case "house_bg": img = imgHouseBg; break;
        case "bake": img = imgBake; break;
        case "bench": img = imgBench; break;
        case "clock": img = imgClock; break;
        case "window": img = imgWindow; break;
        case "vis": img = imgVis; break;
        case "vis2": img = imgVis2; break;
        case "vis3": img = imgVis3; break;
        case "vis4": img = imgVis4; break;
        case "vis5": img = imgVis5; break;
        case "vis6": img = imgVis6; break;
        case "vis7": img = imgVis7; break;
        case "vis8": img = imgVis8; break;
        case "vis9": img = imgVis9; break;
        case "vis10": img = imgVis10; break;
        case "vis11": img = imgVis11; break;
        case "vis12": img = imgVis12; break;
        case "vis13": img = imgVis13; break;
        case "vaz": img = imgVaz; break;
        case "vaz2": img = imgVaz2; break;
        case "vaz3": img = imgVaz3; break;
        case "vaz4": img = imgVaz4; break;
        case "table": img = imgTable; break;
      }

      if (!img) return;

      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = "high";

      const drawX = dec.x - cameraX;
      const drawY = dec.y;

      if (isForest && swayTypes[dec.image]) {
        const phase = dec.x * 0.02 + dec.y * 0.01;
        const swayX = Math.sin(time * 1.4 + phase) * 1.5;
        const swayAngle = Math.sin(time * 1.1 + phase) * 0.025;
        const cx = drawX + dec.w / 2;
        const cy = drawY + dec.h;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(swayAngle);
        ctx.translate(-cx, -cy);
        ctx.drawImage(img, drawX + swayX, drawY, dec.w, dec.h);
        ctx.restore();
      } else {
        ctx.drawImage(img, drawX, drawY, dec.w, dec.h);
      }
    });
  }
}

function drawCoins() {
  let lvl = levels[currentLevel];
  if (lvl.coins) {
    lvl.coins.forEach(coin => {
      if (!coin.collected) {
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(imgCoin, coin.x - cameraX, coin.y, coin.w, coin.h);
        
        ctx.restore();
      }
    });
  }
}

function getArtifactImageById(id) {
  switch (id) {
    case 1: return typeof imgArtifact1 !== 'undefined' ? imgArtifact1 : null;
    case 2: return typeof imgArtifact2 !== 'undefined' ? imgArtifact2 : null;
    case 3: return typeof imgArtifact3 !== 'undefined' ? imgArtifact3 : null;
    case 4: return typeof imgArtifact4 !== 'undefined' ? imgArtifact4 : null;
    case 5: return typeof imgArtifact5 !== 'undefined' ? imgArtifact5 : null;
    default: return null;
  }
}

function spawnArtifactParticles(art) {
  const cx = art.x + art.w / 2;
  const cy = art.y + art.h / 2;
  const colors = ["#7FFEF5", "#1BFDFA", "#00BBB7"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  particles.push({
    x: cx + (Math.random() - 0.5) * art.w * 0.4,
    y: cy + (Math.random() - 0.3) * art.h * 0.4,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -0.4 - Math.random() * 0.6,
    life: 0,
    maxLife: 18 + Math.floor(Math.random() * 10),
    type: "artifact",
    size: 1.5 + Math.random() * 1.3,
    color
  });
}

function updateArtifactEffects() {
  const lvl = levels[currentLevel];
  if (!lvl.artifacts || !isBossBeatenGlobally()) return;
  lvl.artifacts.forEach(art => {
    if (!art || art.collected) return;
    if (isArtifactUnlockedGlobal(art.id)) return;
    // Небольшое рандомное облако частиц за артефактом
    if (Math.random() < 0.18) {
      spawnArtifactParticles(art);
    }
  });
}

function drawArtifacts() {
  let lvl = levels[currentLevel];
  if (!lvl.artifacts || !isBossBeatenGlobally()) return;
  lvl.artifacts.forEach(art => {
    if (!art || art.collected) return;
    const img = getArtifactImageById(art.id);
    if (!img) return;
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';

    // Небольшая анимация левитации
    const t = performance.now() / 600;
    if (typeof art._phase === "undefined") {
      art._phase = (art.x + art.y) * 0.01;
    }
    const bob = Math.sin(t + art._phase) * 3; // амплитуда ~3px

    ctx.drawImage(img, art.x - cameraX, art.y + bob, art.w, art.h);
  });
}

function updateBossProjectiles() {
  if (playerShootCooldown > 0) playerShootCooldown--;
  if (bossShootCooldown > 0) bossShootCooldown--;

  const lvl = levels[currentLevel];
  const lvlWidth = lvl.width;
  const bossLevelNow = isBossLevel();

  // Движение снарядов игрока
  playerProjectiles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
  });
  playerProjectiles = playerProjectiles.filter(p =>
    p.x + p.w > 0 &&
    p.x < lvlWidth &&
    p.y + p.h > -100 &&
    p.y < LOGIC_HEIGHT + 100
  );

  // Движение снарядов босса
  bossProjectiles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
  });
  bossProjectiles = bossProjectiles.filter(p =>
    p.x + p.w > 0 &&
    p.x < lvlWidth &&
    p.y + p.h > -100 &&
    p.y < LOGIC_HEIGHT + 100
  );

  if (bossLevelNow) {
    // Попадания по миньонам
    playerProjectiles.forEach(p => {
      bossMinions.forEach(enemy => {
        if (!enemy.hp) return;
        if (p.x < enemy.x + enemy.w && p.x + p.w > enemy.x &&
            p.y < enemy.y + enemy.h && p.y + p.h > enemy.y) {
          enemy.hp--;
          p._hit = true;
          if (enemy.hp > 0) spawnEnemyHitParticles(enemy.x, enemy.y, enemy.w, enemy.h);
          if (enemy.hp <= 0) {
            enemy.deathAnim = true;
            enemy.deathAnimTimer = 0;
          }
        }
      });

      // Попадание по боссу
      if (boss && bossVisible && bossHp > 0) {
        if (p.x < boss.x + boss.w && p.x + p.w > boss.x &&
            p.y < boss.y + boss.h && p.y + p.h > boss.y) {
          bossHp--;
          p._hit = true;
          spawnEnemyHitParticles(boss.x, boss.y, boss.w, boss.h);
          if (bossHp <= 0) {
            bossHp = 0;
          }
        }
      }
    });

    playerProjectiles = playerProjectiles.filter(p => !p._hit);
    bossMinions = bossMinions.filter(e => !e._dead);
    enemies = enemies.filter(e => !e._dead);

    // Выстрелы миньонов босса
    bossMinions.forEach(enemy => {
      if (!enemy.active || enemy.deathAnim) return;
      if (!enemy.shootCooldownBase) return;
      enemy.shootCooldownTimer--;
      if (enemy.shootCooldownTimer <= 0) {
        enemy.shootCooldownTimer = enemy.shootCooldownBase;
        // Стреляем в игрока тем же шаром, что и босс
        const startX = enemy.x + enemy.w / 2;
        const startY = enemy.y + enemy.h / 2;
        const targetX = player.x + player.w / 2;
        const targetY = player.y + player.h / 2;
        const dx = targetX - startX;
        const dy = targetY - startY;
        const len = Math.hypot(dx, dy) || 1;
        const speed = 6;

        bossProjectiles.push({
          x: startX - 7,
          y: startY - 7,
          w: 14,
          h: 14,
          vx: (dx / len) * speed,
          vy: (dy / len) * speed
        });
      }
    });
  }

  // Попадания по игроку от босса
  bossProjectiles.forEach(p => {
    if (p.x < player.x + player.w && p.x + p.w > player.x &&
        p.y < player.y + player.h && p.y + p.h > player.y) {
      p._hit = true;
      if (!bossLevelNow) {
        gameOver = true;
        showModal("Игра окончена.","Ты попала под атаку босса!", null, ()=>resetPlayer());
      } else {
        if (playerBossMaxHp <= 0) {
          gameOver = true;
          showModal("Игра окончена.","Ты попала под атаку босса!", null, ()=>resetPlayer());
        } else {
          playerBossHp = Math.max(0, playerBossHp - 1);
          if (playerBossHp <= 0) {
            gameOver = true;
            showModal("Игра окончена.","Ты попала под атаку босса!", null, ()=>resetPlayer());
          }
        }
      }
    }
  });
  bossProjectiles = bossProjectiles.filter(p => !p._hit);
}

function completeBossLevel() {
  const lvl = levels[currentLevel];
  if (!isBossLevel() || gameOver) return;
  gameOver = true;

  const finishTime = stopLevelTimer();
  const currentStats = getLevelStats(currentLevel);

  let isNewBestTime = !currentStats.bestTime || finishTime < currentStats.bestTime;
  let isNewBestCoins = totalCoins > currentStats.bestCoins;

  if (isNewBestTime || isNewBestCoins) {
    const newStats = {
      bestTime: isNewBestTime ? finishTime : currentStats.bestTime,
      bestCoins: isNewBestCoins ? totalCoins : currentStats.bestCoins
    };
    saveLevelStats(currentLevel, newStats);
  }

  // Сохраняем рекорды по сложностям только для босс-уровня
  const bossCfg = getCurrentBossConfig();
  const allBossStats = loadBossDifficultyStats();
  const levelBossStats = allBossStats[currentLevel] || {};
  const prevDiffStats = levelBossStats[bossCfg.key] || { bestTime: null };
  const isNewBestForDifficulty = !prevDiffStats.bestTime || finishTime < prevDiffStats.bestTime;
  if (isNewBestForDifficulty) {
    saveBossDifficultyStats(currentLevel, bossCfg.key, { bestTime: finishTime });
  }

  try { localStorage.setItem('love_game_dialog_level', String(currentLevel)); } catch (e) {}

  let resultText = `${lvl.gift.desc}\n\n`;
  resultText += `Время прохождения: ${formatTime(finishTime)}\n`;
  resultText += `Собрано морошки: ${totalCoins}/${lvl.coins.length}\n\n`;

  if (isNewBestTime) {
    resultText += `Новый рекорд времени!\n`;
  }

  if (currentStats.bestTime) {
    resultText += `Лучшее время: ${formatTime(currentStats.bestTime)}\n`;
  }

  const editorMode = localStorage.getItem('love_game_editor_mode');
  const showNext = editorMode !== '1';

  showModal(lvl.gift.title, resultText, showNext ? ()=>{} : null, ()=>{
    resetPlayer();
  });
}

const ENEMY_DEATH_ANIM_DURATION = 28;

window.drawEnemies = function() {
  enemies.forEach(enemy => {
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    
    const frameW = imgEnemy.width / 11;
    const frameH = imgEnemy.height;
    const frameX = enemy.frame * frameW;
    
    let drawX = enemy.x - cameraX;
    let drawY = enemy.y;

    // Анимация смерти: сжатие + затухание + лёгкое падение
    if (enemy.deathAnim) {
      const t = enemy.deathAnimTimer || 0;
      const progress = Math.min(1, t / ENEMY_DEATH_ANIM_DURATION);
      const scale = 1 - progress;
      const alpha = 1 - progress;
      const fallY = t * 0.8;
      const w2 = enemy.w / 2;
      const h2 = enemy.h / 2;
      const cx = drawX + w2;
      const cy = drawY + h2 + fallY;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
      if (enemy.direction === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(imgEnemy, frameX, 0, frameW, frameH, -(drawX + enemy.w), drawY + fallY, enemy.w, enemy.h);
      } else {
        ctx.drawImage(imgEnemy, frameX, 0, frameW, frameH, drawX, drawY + fallY, enemy.w, enemy.h);
      }
      ctx.restore();
      return;
    }
    // Исчезновение в конце фазы (как смерть: сжатие + затухание)
    if (enemy.phaseOutAnim) {
      const t = enemy.phaseOutTimer || 0;
      const progress = Math.min(1, t / ENEMY_DEATH_ANIM_DURATION);
      const scale = 1 - progress;
      const alpha = 1 - progress;
      const fallY = t * 0.8;
      const w2 = enemy.w / 2;
      const h2 = enemy.h / 2;
      const cx = drawX + w2;
      const cy = drawY + h2 + fallY;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
      if (enemy.direction === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(imgEnemy, frameX, 0, frameW, frameH, -(drawX + enemy.w), drawY + fallY, enemy.w, enemy.h);
      } else {
        ctx.drawImage(imgEnemy, frameX, 0, frameW, frameH, drawX, drawY + fallY, enemy.w, enemy.h);
      }
      ctx.restore();
      return;
    }

    // Анимация появления миньона при респавне во время боя (масштаб 0.3→1, появление)
    const spawnProgress = enemy.isBossMinion ? (enemy.spawnAnimProgress || 0) : 1;
    if (enemy.isBossMinion && spawnProgress < 1) {
      const easeOut = 1 - Math.pow(1 - spawnProgress, 1.5);
      const scale = 0.25 + 0.75 * easeOut;
      const alpha = 0.4 + 0.6 * easeOut;
      const w2 = enemy.w / 2;
      const h2 = enemy.h / 2;
      const cx = drawX + w2;
      const cy = drawY + h2;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
      if (enemy.direction === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(imgEnemy, frameX, 0, frameW, frameH, -(drawX + enemy.w), drawY, enemy.w, enemy.h);
      } else {
        ctx.drawImage(imgEnemy, frameX, 0, frameW, frameH, drawX, drawY, enemy.w, enemy.h);
      }
      ctx.restore();
      // Полоску HP не показываем во время анимации появления
      return;
    }
    
    if (enemy.direction === -1) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(
        imgEnemy,
        frameX, 0, frameW, frameH,
        -(drawX + enemy.w), drawY, enemy.w, enemy.h
      );
      ctx.restore();
    } else {
      ctx.drawImage(
        imgEnemy,
        frameX, 0, frameW, frameH,
        drawX, drawY, enemy.w, enemy.h
      );
    }

    // Полоска хп над головой только на босс-уровне и только для миньонов
    if (isBossLevel() && enemy.maxHp && enemy.hp !== undefined && enemy.hp > 0) {
      const barW = enemy.w;
      const barH = 4;
      const hpRatio = Math.max(0, Math.min(1, enemy.hp / enemy.maxHp));
      ctx.fillStyle = "#2a1010";
      ctx.fillRect(drawX, drawY - 8, barW, barH);
      ctx.fillStyle = "#cc2244";
      ctx.fillRect(drawX, drawY - 8, barW * hpRatio, barH);
    }
  });
}

function drawBackground() {
  const w = viewW;
  const groundY = getGroundY()+10;
  let lvl = levels[currentLevel];
  const backgroundType = lvl.background || "forest";

  ctx.imageSmoothingEnabled = false;
  ctx.imageSmoothingQuality = 'high';

  if (backgroundType === "home" || backgroundType === "house") {
    // Однослойный фон для home
    const bgW = imgBackgroundAnother.width;
    const bgH = imgBackgroundAnother.height;
    if (bgW && bgH) {
      const targetH = Math.max(groundY, 1);
      const scale = targetH / bgH;
      const tileW = Math.max(1, Math.round(bgW * scale));
      let startX = Math.floor(cameraX / tileW) * tileW - cameraX;
      for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
        ctx.drawImage(imgBackgroundAnother, startX + i * tileW, 0, tileW, targetH);
      }
    }

    // Пол из floor.png для home
    const floorW = imgFloor.width;
    const floorH = imgFloor.height;
    if (floorW && floorH) {
      let startX = Math.floor(cameraX / floorW) * floorW - cameraX;
      for (let x = startX; x < w; x += floorW) {
        for (let r = 0; r < C.DIRT.ROWS; r++) {
          let y = groundY + r * floorH;

          ctx.save();
          ctx.translate(x + floorW / 2, y + floorH / 2);
          ctx.drawImage(imgFloor, -floorW / 2, -floorH / 2);
          ctx.restore();
        }
      }
    }
  } else {
    // Многослойный фон для forest (по умолчанию)
    const baseW = C.BACKGROUND.BASE_W;
    const baseH = C.BACKGROUND.BASE_H;
    const targetH = Math.max(groundY, 1);
    const scale = targetH / baseH;
    const tileW = Math.max(1, Math.round(baseW * scale));

    let x0 = -(cameraX * C.PARALLAX[0]) % tileW;
    for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
      ctx.drawImage(bgLayer0, x0 + i * tileW, 0, tileW, targetH);
    }

    let x1 = -(cameraX * C.PARALLAX[1]) % tileW;
    for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
      ctx.drawImage(bgLayer1, x1 + i * tileW, 0, tileW, targetH);
    }

    let x2 = -(cameraX * C.PARALLAX[2]) % tileW;
    for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
      ctx.drawImage(bgLayer2, x2 + i * tileW, 0, tileW, targetH);
    }

    let x3 = -(cameraX * C.PARALLAX[3]) % tileW;
    for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
      ctx.drawImage(bgLayer3, x3 + i * tileW, 0, tileW, targetH);
    }

    let x4 = -(cameraX * C.PARALLAX[4]) % tileW;
    for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
      ctx.drawImage(bgLayer4, x4 + i * tileW, 0, tileW, targetH);
    }

    let x5 = -(cameraX * C.PARALLAX[5]) % tileW;
    for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
      ctx.drawImage(bgLayer5, x5 + i * tileW, 0, tileW, targetH);
    }

    let x6 = -(cameraX * C.PARALLAX[6]) % tileW;
    for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
      ctx.drawImage(bgLayer6, x6 + i * tileW, 0, tileW, targetH);
    }

    // Пол из dirt.png для forest
    const dirtW = imgDirt.width;
    const dirtH = imgDirt.height;
    if (dirtW && dirtH) {
      let startX = Math.floor(cameraX / dirtW) * dirtW - cameraX;
      for (let x = startX; x < w; x += dirtW) {
        const worldX = x + cameraX;
        const tileXIndex = Math.floor(worldX / dirtW);
        for (let r = 0; r < C.DIRT.ROWS; r++) {
          let y = groundY + r * dirtH;
          let seed = (tileXIndex * 73856093) ^ (r * 19349663);
          let idx = (seed >>> 0) & 3;
          let angle = 0;
          if (idx === 1) angle = Math.PI / 2;
          else if (idx === 2) angle = Math.PI;
          else if (idx === 3) angle = 3 * Math.PI / 2;

          ctx.save();
          ctx.translate(x + dirtW / 2, y + dirtH / 2);
          ctx.rotate(angle);
          ctx.drawImage(imgDirt, -dirtW / 2, -dirtH / 2);
          ctx.restore();
        }
      }
    }
  }
}





  function getPlatformsArray(lvl){
    let arr = (lvl.platforms||[]).slice();
    if (lvl.dynamicPlatforms) {
      lvl.dynamicPlatforms.forEach(dp=>{ 
        // Для платформ с переключателями проверяем open
        if (dp.group !== undefined && dp.group !== null) {
          if(dp.open) arr.push(dp);
        } 
        // Для движущихся платформ всегда добавляем
        else if (dp.type === 'moving') {
          arr.push(dp);
        }
        // Для подпрыгивающих платформ всегда добавляем
        else if (dp.type === 'bouncy') {
          arr.push(dp);
        }
        // Для старых платформ без типа проверяем open
        else if(dp.open) {
          arr.push(dp);
        }
      });
    }
    return arr;
  }

  function getObstaclesArray(lvl){
    let arr = (lvl.walls||[]).slice();
    if (lvl.doors) {
      lvl.doors.forEach(d=>{ if(!d.open) arr.push(d); });
    }
    return arr;
  }

  function getGroundArray(lvl){
    let arr = getPlatformsArray(lvl);
    if (lvl.walls) arr = arr.concat(lvl.walls);
    if (lvl.doors) arr = arr.concat(lvl.doors.filter(d=>!d.open));
    return arr;
  }

  function processSwitchesAndDynamics(){
    const lvl = levels[currentLevel];
    if(!lvl.switches) return;
    lvl.switches.forEach(sw=>{ sw.pressed = false; });
    const entities = [
      {x: player.x, y: player.y, w: player.w, h: player.h},
      {x: companion.x, y: companion.y, w: companion.w, h: companion.h}
    ];
    lvl.switches.forEach(sw=>{
      for (let e of entities){
        if (e.x < sw.x + sw.w && e.x + e.w > sw.x && e.y < sw.y + sw.h && e.y + e.h > sw.y) {
          sw.pressed = true;
          break;
        }
      }
    });
    if (lvl.dynamicPlatforms) {
      lvl.dynamicPlatforms.forEach(dp=>{
        // Обработка платформ с переключателями (старая логика)
        if (dp.group !== undefined && dp.group !== null) {
          const related = lvl.switches.filter(sw=> sw.group === dp.group);
          if (related.length > 0) {
            const anyPressed = related.some(sw=> sw.pressed);
            if (dp.mode === 'hold') {
              dp.open = anyPressed;
            } else {
              if (anyPressed) dp.open = true;
            }
          }
        }
      });
    }
    if (lvl.doors) {
      lvl.doors.forEach(door=>{
        const related = lvl.switches.filter(sw=> sw.group === door.group);
        if (related.length === 0) return;
        const anyPressed = related.some(sw=> sw.pressed);
        if (door.mode === 'hold') {
          door.open = anyPressed;
        } else {
          if (anyPressed) door.open = true;
        }
      });
    }
  }

  function updateDynamicPlatforms() {
    const lvl = levels[currentLevel];
    if (!lvl.dynamicPlatforms) return;
    
    const entities = [
      {x: player.x, y: player.y, w: player.w, h: player.h, obj: player},
      {x: companion.x, y: companion.y, w: companion.w, h: companion.h, obj: companion}
    ];
    
    lvl.dynamicPlatforms.forEach(dp => {
      // Инициализация для новых типов платформ
      if (!dp.initialized) {
        dp.initialized = true;
        if (dp.type === 'moving') {
          dp.startX = dp.x;
          dp.startY = dp.y;
          dp.offsetX = 0;
          dp.offsetY = 0;
          dp.directionX = dp.directionX || 1;
          dp.directionY = dp.directionY || 0;
          dp.speed = dp.speed || 1;
          dp.distanceX = dp.distanceX || 100;
          dp.distanceY = dp.distanceY || 0;
        } else if (dp.type === 'bouncy') {
          // Платформа-пружина уже готова
        }
      }
      
      // Движущиеся платформы
      if (dp.type === 'moving' && dp.open !== false) {
        const oldX = dp.x;
        const oldY = dp.y;
        
        if (dp.distanceX > 0) {
          dp.offsetX += dp.directionX * dp.speed;
          if (dp.offsetX >= dp.distanceX) {
            dp.offsetX = dp.distanceX;
            dp.directionX = -1;
          } else if (dp.offsetX <= 0) {
            dp.offsetX = 0;
            dp.directionX = 1;
          }
        }
        if (dp.distanceY > 0) {
          dp.offsetY += dp.directionY * dp.speed;
          if (dp.offsetY >= dp.distanceY) {
            dp.offsetY = dp.distanceY;
            dp.directionY = -1;
          } else if (dp.offsetY <= 0) {
            dp.offsetY = 0;
            dp.directionY = 1;
          }
        }
        dp.x = dp.startX + dp.offsetX;
        dp.y = dp.startY + dp.offsetY;
        
        // Перемещаем персонажей вместе с платформой, если они на ней стоят
        const deltaX = dp.x - oldX;
        const deltaY = dp.y - oldY;
        entities.forEach(e => {
          const entity = e.obj;
          if (entity.onDynamicPlatform === dp) {
            entity.x += deltaX;
            entity.y += deltaY;
          }
        });
      }
      
    });
  }
  function drawParticles() {
    particles.forEach(p => {
      const t = p.life / p.maxLife;
      const alpha = 1 - t;
      const sz = (p.size || 2) * (1 - t * 0.5);
      const px = p.x - cameraX;
      if (p.type === "wind") {
        const hex = (p.color || "#b8c4ce").replace("#", "");
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.4})`;
        const w = Math.max(2, sz * 2.2);
        const h = Math.max(0.5, sz * 0.4);
        ctx.fillRect(px - w / 2, p.y - h / 2, w, h);
        return;
      }
      if (p.type === "light") {
        const hex = (p.color || "#fff8dc").replace("#", "");
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.38})`;
        const glow = sz * 1.1;
        ctx.fillRect(px - glow, p.y - glow, glow * 2, glow * 2);
        return;
      }
      if (p.color) {
        const hex = p.color.replace("#", "");
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.95})`;
      } else {
        ctx.fillStyle = p.type === "land" ? `rgba(180,160,140,${alpha * 0.9})` : `rgba(200,180,160,${alpha * 0.8})`;
      }
      ctx.fillRect(px - sz, p.y - sz, sz * 2, sz * 2);
    });
  }

  function drawPlayer() {
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    
    const isHighlight = activeCharacter === "player" && (typeof highlightUntil !== "undefined" && performance.now() < highlightUntil);
    if (isHighlight) {
      ctx.save();
      ctx.shadowColor = "rgba(255, 210, 158, 0.9)";
      ctx.shadowBlur = 5;
    }
    
    let sprite, frames, frameW, frameH;
  
    if (player.state === "idle") {
      sprite = imgPlayerIdle;
      frames = 16;
    } else {
      sprite = imgPlayerWalk;
      frames = 10;
    }
  
    frameW = sprite.width / frames;
    frameH = sprite.height;
  
    let frameX = player.frame * frameW;
  
    let drawX = player.x - cameraX;
    let drawY = player.y;
    
    if (player.state === "walk-left") {
      ctx.save();
      ctx.scale(-1,1);
      ctx.drawImage(
        sprite,
        frameX, 0, frameW, frameH,
        -(drawX + player.w), drawY, player.w, player.h
      );
      ctx.restore();
    } else {
      ctx.drawImage(
        sprite,
        frameX, 0, frameW, frameH,
        drawX, drawY, player.w, player.h
      );
    }
    if (isHighlight) ctx.restore();
  }
  
  function drawCompanion() {
    if (isBossLevel()) return; // На босс-уровне компаньон не рисуется
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    
    const isHighlight = activeCharacter === "companion" && (typeof highlightUntil !== "undefined" && performance.now() < highlightUntil);
    if (isHighlight) {
      ctx.save();
      ctx.shadowColor = "rgba(255, 210, 158, 0.9)";
      ctx.shadowBlur = 5;
    }
    
    let sprite, frames, frameW, frameH;
  
    if (companion.state === "idle") {
      sprite = imgCompanionIdle;
      frames = C.COMPANION.IDLE_FRAMES;
    } else {
      sprite = imgCompanionWalk;
      frames = C.COMPANION.WALK_FRAMES;
    }
  
    frameW = sprite.width / frames;
    frameH = sprite.height;
  
    let frameX = companion.frame * frameW;
    let drawX = companion.x - cameraX;
    let drawY = companion.y;
    
    if (companion.state === "walk-left") {
      ctx.save();
      ctx.scale(-1,1);
      ctx.drawImage(
        sprite,
        frameX, 0, frameW, frameH,
        -(drawX + companion.w), drawY, companion.w, companion.h
      );
      ctx.restore();
    } else {
      ctx.drawImage(
        sprite,
        frameX, 0, frameW, frameH,
        drawX, drawY, companion.w, companion.h
      );
    }
    if (isHighlight) ctx.restore();
    ctx.globalAlpha = 1.0;
  }
  

  function updateCamera(currentTime) {
    // Система dead zone - камера двигается только когда персонаж выходит за зону
    const activeChar = activeCharacter === "player" ? player : companion;
    const charCenterX = activeChar.x + activeChar.w / 2;
    
    if (isCameraTransitioning) {
      // При переключении персонажей - быстро устанавливаем камеру с учетом dead zone
      const cameraCenterX = cameraX + viewW / 2;
      const deadZoneLeft = cameraCenterX - C.CAMERA.DEAD_ZONE_WIDTH / 2;
      const deadZoneRight = cameraCenterX + C.CAMERA.DEAD_ZONE_WIDTH / 2;
      
      // Если новый персонаж уже в dead zone - просто завершаем переход
      if (charCenterX >= deadZoneLeft && charCenterX <= deadZoneRight) {
        isCameraTransitioning = false;
      } else {
        // Если новый персонаж вне dead zone - быстро центрируем камеру с учетом dead zone
        let targetX;
        if (charCenterX < deadZoneLeft) {
          targetX = charCenterX - viewW / 2 + C.CAMERA.DEAD_ZONE_WIDTH / 2;
        } else {
          targetX = charCenterX - viewW / 2 - C.CAMERA.DEAD_ZONE_WIDTH / 2;
        }
        
        const elapsed = currentTime - cameraTransitionStart;
        const transitionDuration = 2500; // Быстрый переход 200ms
        const progress = Math.min(elapsed / transitionDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        cameraX = cameraX + (targetX - cameraX) * easedProgress;
        
        if (progress >= 1) {
          isCameraTransitioning = false;
          cameraX = targetX;
        }
      }
    } else {
      // Обычный режим с dead zone
      const cameraCenterX = cameraX + viewW / 2;
      const deadZoneLeft = cameraCenterX - C.CAMERA.DEAD_ZONE_WIDTH / 2;
      const deadZoneRight = cameraCenterX + C.CAMERA.DEAD_ZONE_WIDTH / 2;
      
      // Проверяем, вышел ли персонаж за границы зоны
      if (charCenterX < deadZoneLeft) {
        // Персонаж слева от зоны - двигаем камеру влево
        const targetX = charCenterX - viewW / 2 + C.CAMERA.DEAD_ZONE_WIDTH / 2;
        const followSpeed = C.CAMERA.FOLLOW_SPEED;
        cameraX = cameraX + (targetX - cameraX) * followSpeed;
      } else if (charCenterX > deadZoneRight) {
        // Персонаж справа от зоны - двигаем камеру вправо
        const targetX = charCenterX - viewW / 2 - C.CAMERA.DEAD_ZONE_WIDTH / 2;
        const followSpeed = C.CAMERA.FOLLOW_SPEED;
        cameraX = cameraX + (targetX - cameraX) * followSpeed;
      }
      // Если персонаж в зоне - камера не двигается
    }
    
    // Ограничиваем камеру границами уровня
    let lvl = levels[currentLevel];
    if (cameraX < 0) cameraX = 0;
    if (cameraX > lvl.width - viewW) cameraX = lvl.width - viewW;
    
    cameraX = Math.round(cameraX);
  }

  function draw() {
    try {
      if (typeof window.drawFrame === "function") window.drawFrame();
    } catch (e) {
      console.warn("drawFrame error:", e);
    }
  }

   function loop(currentTime) {
  if (lastTime === 0) {
    lastTime = currentTime;
  }

  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  if (!gamePaused) {
    accumulator += deltaTime;

    while (accumulator >= fixedTimeStep) {
      try {
        update();
      } catch (e) {
        console.warn("update error:", e);
      }
      accumulator -= fixedTimeStep;
    }
  }

  updateLevelTimer();
  updateCamera(currentTime);
  draw();
  requestAnimationFrame(loop);
}

let loaded = 0;
let gameLoopStarted = false;
const bgImages = [bgLayer0, bgLayer1, bgLayer2, bgLayer3, bgLayer4, bgLayer5, bgLayer6, imgBackgroundAnother];
const decorationImages = [imgRock1, imgRock2, imgGrass1, imgFlower1, imgFlower2, imgMountain, imgThree, imgAlert, imgBush, imgHouse1, imgHouse2, imgHouseBg];
const platformImages = [imgPlatformGrass, imgPlatformStone, imgPlatformWood, imgPlatformStone2, imgPlatformDanger, imgPlatformSlime, imgDoorDanger, imgPlatformHouse];
const groundImages = [imgDirt, imgFloor];
const artifactImages = [imgArtifact1, imgArtifact2, imgArtifact3, imgArtifact4, imgArtifact5];
const allImages = [
  ...bgImages,
  ...decorationImages,
  ...platformImages,
  ...groundImages,
  ...artifactImages,
  imgPlayerIdle,
  imgPlayerWalk,
  imgCompanionIdle,
  imgCompanionWalk,
  imgTrap,
  imgFinish,
  imgBackgroundAll,
  imgEnemy,
  imgBossWalk,
  imgBossAttack,
  imgBossOrb
];

function startGameAfterLoad() {
  if (gameLoopStarted) return;
  gameLoopStarted = true;

  // Обновляем уровень из редактора, если режим активен
  const editorMode = localStorage.getItem('love_game_editor_mode');
  if (editorMode === '1') {
    const editorLevelJson = localStorage.getItem('love_game_editor_level');
    if (editorLevelJson) {
      try {
        const editorLevel = JSON.parse(editorLevelJson);
        if (levels.length > 0) {
          levels[0] = editorLevel;
        } else {
          levels.push(editorLevel);
        }
        currentLevel = 0;
      } catch(e) {}
    }
  }

  let lvl = levels[currentLevel];
  if (!lvl) return;

  // На босс-уровне спавним игрока по центру карты и скрываем оверлей «Нажми чтобы начать»
  if (lvl.isBossLevel && lvl.width) {
    const centerX = Math.round(lvl.width / 2 - player.w / 2);
    player.x = centerX;
    player.y = 350;
    companion.x = centerX;
    companion.y = 100;
    companion.targetX = centerX;
    companion.targetY = 250;
    if (typeof window.hideTapToStartOverlay === 'function') {
      window.hideTapToStartOverlay();
    }
  }
  // Инициализируем камеру с учетом dead zone
  const activeChar = activeCharacter === "player" ? player : companion;
  const charCenterX = activeChar.x + activeChar.w / 2;
  cameraX = charCenterX - viewW / 2;
  if (cameraX < 0) cameraX = 0;
  if (cameraX > lvl.width - viewW) cameraX = lvl.width - viewW;
  cameraX = Math.round(cameraX);
  isCameraTransitioning = false;
  previousActiveCharacter = activeCharacter;

  enemies = [];
  if (lvl.enemies) {
    lvl.enemies.forEach(enemyData => {
      const platform = lvl.platforms.find(p =>
        p.x === enemyData.platformX && p.y === enemyData.platformY
      );
      if (platform) {
        enemies.push(createEnemy(platform.x, platform.y, platform.w));
      }
    });
  }

  resetBossStateForLevel(lvl);
  if (isBossLevel()) {
    showBossDifficultyModalIfNeeded(lvl);
  }
  loop(0);
}

allImages.forEach(img => {
  if (img.complete && img.naturalWidth > 0) {
    loaded++;
  } else {
    img.onload = function () {
      loaded++;
      if (loaded >= allImages.length) startGameAfterLoad();
    };
    img.onerror = function () {
      loaded++;
      if (loaded >= allImages.length) startGameAfterLoad();
    };
  }
});
if (loaded >= allImages.length) startGameAfterLoad();

// Если загрузка зависла или что-то не вызвало onload/onerror — через 10 сек запускаем игру в любом случае
setTimeout(function () {
  startGameAfterLoad();
}, 10000);
