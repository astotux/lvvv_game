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
  screenW = window.innerWidth;
  screenH = window.innerHeight;
  canvas.width = Math.floor(screenW * dpr);
  canvas.height = Math.floor(screenH * dpr);
  canvas.style.width = screenW + "px";
  canvas.style.height = screenH + "px";

  screenCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  screenCtx.imageSmoothingEnabled = false;
  screenCtx.imageSmoothingQuality = 'high';
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let lastTime = 0;
let accumulator = 0;
const fixedTimeStep = C.FIXED_TIMESTEP_MS;

let currentLevel = 0;
const STORAGE_KEY_LEVEL = 'love_game_unlocked_level';
const STORAGE_KEY_STATS = 'love_game_level_stats';

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
  try {
    const stored = localStorage.getItem(STORAGE_KEY_STATS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {}
  return {};
}

function saveLevelStats(levelIndex, stats) {
  try {
    const allStats = loadLevelStats();
    allStats[levelIndex] = stats;
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(allStats));
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
  if (levelTimerActive && !gamePaused) {
    levelElapsedTime = performance.now() - levelStartTime;
  }
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
Object.defineProperty(window, 'activeCharacter', { 
  get(){ return activeCharacter; }, 
  set(v){ 
    if (activeCharacter !== v) {
      // Запускаем анимацию камеры при переключении персонажа
      cameraTransitionStart = performance.now();
      isCameraTransitioning = true;
      previousActiveCharacter = activeCharacter;
    }
    activeCharacter = v; 
  } 
});
Object.defineProperty(window, 'companionLockToCenter', { get(){ return companionLockToCenter; }, set(v){ companionLockToCenter = v; } });
Object.defineProperty(window, 'cameraX', { get(){ return cameraX; } });

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

        playerShootCooldown = 25; // небольшой кулдаун
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
  clearBossPlatforms(level);
}

function spawnBossPlatform(level, x, y, w, h) {
  if (!level.dynamicPlatforms) level.dynamicPlatforms = [];
  const p = { x, y, w, h, texture: "wood", open: true, type: "boss" };
  level.dynamicPlatforms.push(p);
  bossPlatforms.push(p);
  return p;
}

function spawnBossMinionOnPlatform(platform, opts) {
  const options = opts || {};
  const enemy = {
    x: platform.x + 10,
    y: platform.y - 38,
    w: 46,
    h: 38,
    dx: 1,
    direction: 1,
    platformX: platform.x,
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
    shootCooldownBase: options.shootCooldown || 0, // базовый кулдаун выстрела
    shootCooldownTimer: options.shootCooldown || 0
  };
  enemies.push(enemy);
  bossMinions.push(enemy);
}

function initBossPhase1(level) {
  clearBossPlatforms(level);
  enemies = [];
  bossMinions = [];

  // Несколько фиксированных платформ
  const p1 = spawnBossPlatform(level, 247, 352, 164, 20);
  const p2 = spawnBossPlatform(level, 139, 200, 164, 20);
  const p3 = spawnBossPlatform(level, 195, 68, 164, 20);
  const p4 = spawnBossPlatform(level, 559, 68, 164, 20);
  const p5 = spawnBossPlatform(level, 655, 200, 164, 20);
  const p6 = spawnBossPlatform(level, 539, 352, 164, 20);

  // Задержки появления и кулдауны выстрелов миньонов
  // Эти числа можно свободно менять под баланс:
  spawnBossMinionOnPlatform(p1, { spawnDelay: 0,   shootCooldown: 120 });
  spawnBossMinionOnPlatform(p2, { spawnDelay: 30,  shootCooldown: 150 });
  spawnBossMinionOnPlatform(p3, { spawnDelay: 60,  shootCooldown: 180 });
  spawnBossMinionOnPlatform(p4, { spawnDelay: 90,  shootCooldown: 120 });
  spawnBossMinionOnPlatform(p5, { spawnDelay: 120, shootCooldown: 150 });
  spawnBossMinionOnPlatform(p6, { spawnDelay: 150, shootCooldown: 180 });

  bossVisible = false; // Босс пропадает после призыва
}

function initBossPhase2(level) {
  clearBossPlatforms(level);
  enemies = [];
  bossMinions = [];

  const p1 = spawnBossPlatform(level, 75, 420, 82, 20);
  const p2 = spawnBossPlatform(level, 195, 368, 82, 20);
  const p3 = spawnBossPlatform(level, 75, 312, 82, 20);
  const p4 = spawnBossPlatform(level, 195, 244, 82, 20);
  const p5 = spawnBossPlatform(level, 75, 180, 82, 20);
  const p6 = spawnBossPlatform(level, 215, 136, 492, 20);
  const p7 = spawnBossPlatform(level, 800, 180, 82, 20);
  const p8 = spawnBossPlatform(level, 700, 244, 82, 20);
  const p9 = spawnBossPlatform(level, 800, 312, 82, 20);
  const p10 = spawnBossPlatform(level, 700, 368, 82, 20);
  const p11 = spawnBossPlatform(level, 800, 420, 82, 20);
  const p12 = spawnBossPlatform(level, 335, 320, 246, 20);


  // Босс стоит на средней платформе
  boss = {
    x: p12.x + (p12.w - 53) / 2,
    y: p12.y - 65,
    w: 53,
    h: 65
  };
  bossMaxHp = 25;
  bossHp = bossMaxHp;
  bossVisible = true;
  bossDirection = 1;
  bossState = "walk";
  bossFrame = 0;
  bossFrameTick = 0;
  bossShootCooldown = 70;
}

function initBossPhase3(level) {
  clearBossPlatforms(level);
  enemies = [];
  bossMinions = [];
  
  const p1 = spawnBossPlatform(level, 47, 352, 164, 20);
  const p2 = spawnBossPlatform(level, 139, 200, 164, 20);
  const p3 = spawnBossPlatform(level, 655, 200, 164, 20);
  const p4 = spawnBossPlatform(level, 739, 352, 164, 20);
  const p5 = spawnBossPlatform(level, 215, 136, 492, 20);

  // В третьей фазе тоже можно задать разные задержки и кулдауны
  spawnBossMinionOnPlatform(p1, { spawnDelay: 0,   shootCooldown: 90 });
  spawnBossMinionOnPlatform(p2, { spawnDelay: 20,  shootCooldown: 110 });
  spawnBossMinionOnPlatform(p3, { spawnDelay: 40,  shootCooldown: 130 });
  spawnBossMinionOnPlatform(p4, { spawnDelay: 60,  shootCooldown: 90 });

  boss = {
    x: p5.x + (p5.w - 53) / 2,
    y: p5.y - 65,
    w: 53,
    h: 65
  };
  bossMaxHp = 100;
  bossHp = bossMaxHp;
  bossVisible = true;
  bossDirection = 1;
  bossState = "walk";
  bossFrame = 0;
  bossFrameTick = 0;
  bossShootCooldown = 60;
}

function updateBossLogic() {
  if (!isBossLevel()) return;
  const lvl = levels[currentLevel];

  if (bossPhase === 0) return;

  // Инициализация фаз
  if (bossPhase === 1 && bossPlatforms.length === 0 && bossMinions.length === 0) {
    initBossPhase1(lvl);
  } else if (bossPhase === 2 && !bossVisible && !boss) {
    initBossPhase2(lvl);
  } else if (bossPhase === 3 && !bossVisible && !boss) {
    initBossPhase3(lvl);
  }

  // Переходы между фазами
  if (bossPhase === 1) {
    // Переход ко второй фазе, когда все миньоны уничтожены
    const anyAlive = bossMinions.some(e => e.hp > 0);
    if (!anyAlive) {
      clearBossPlatforms(lvl);
      bossMinions = [];
      enemies = [];
      bossPhase = 2;
      bossVisible = false;
      boss = null;
      initBossPhase2(lvl);
    }
  } else if (bossPhase === 2) {
    if (bossHp <= 0) {
      // Переход к третьей фазе
      clearBossPlatforms(lvl);
      bossPhase = 3;
      bossVisible = false;
      boss = null;
      initBossPhase3(lvl);
    }
  } else if (bossPhase === 3) {
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
      if (bossDeathTimer > 120) {
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
      if (boss.y + boss.h <= p.y + 1 && boss.y + boss.h >= p.y - 70) {
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
const modalBtn = document.getElementById("modalBtn");
const modalNextBtn = document.getElementById("modalNextBtn");
const modalRestartBtn = document.getElementById("modalRestartBtn");
const modalResumeBtn = document.getElementById("modalResumeBtn");
const modalHomeBtn = document.getElementById("modalHomeBtn");

let modalNextCallback = ()=>{};
let modalRestartCallback = ()=>{};

function showModal(title, text, nextCallback = null, restartCallback = null, showHome = false, showResume = false) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.style.display = "flex";
  modalRestartCallback = restartCallback || (()=>{});
  
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
    // Задержка появления для миньонов босса
    if (enemy.isBossMinion && enemy.spawnDelay && !enemy.active) {
      enemy.spawnTimer++;
      if (enemy.spawnTimer >= enemy.spawnDelay) {
        enemy.active = true;
      } else {
        // Пока не активен – не двигаем и не проверяем столкновения
        return;
      }
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
    
    if (player.x < enemy.x + enemy.w && player.x + player.w > enemy.x &&
        player.y < enemy.y + enemy.h && player.y + player.h > enemy.y) {
      gameOver = true;
      showModal("Игра окончена.", "Ты столкнулась с врагом!", null, ()=>resetPlayer());
    }
    
    if (activeCharacter === "companion" && 
        companion.x < enemy.x + enemy.w && companion.x + companion.w > enemy.x &&
        companion.y < enemy.y + enemy.h && companion.y + companion.h > enemy.y) {
      gameOver = true;
      showModal("Игра окончена.", "Арчик столкнулся с врагом!", null, ()=>resetPlayer());
    }
  });
}

function resetPlayer() {
  // Запускаем музыку уровня заново при перезапуске
  
  player.x=50; player.y=100; player.dy=0;
  player.idleTimer = 0;
  player.onDynamicPlatform = null;
  gameOver=false;
  gamePaused = false;
  totalCoins = 0;
  
  companion.x = 50; companion.y = 100; companion.dy = 0;
  companion.idleTimer = 0;
  companion.onDynamicPlatform = null;
  companion.targetX = 50; companion.targetY = 250;
  
  enemies = [];
  let lvl = levels[currentLevel];

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

function updateStatsDisplay() {
  document.getElementById('totalCoins').innerText = `${totalCoins} | ${levels[currentLevel].coins.length}`;
}

function update() {
  if(gameOver || gamePaused) return;
  
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
      if(player.x < p.x+p.w && player.x+player.w > p.x &&
         player.y < p.y+p.h && player.y+player.h > p.y){
           if(player.dy > 0 && player.y + player.h - player.dy <= p.y){
             player.y = p.y - player.h; 
             player.dy = 0; 
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
      if(companion.x < p.x+p.w && companion.x+companion.w > p.x &&
         companion.y < p.y+p.h && companion.y+companion.h > p.y){
           if(companion.dy > 0 && companion.y + companion.h - companion.dy <= p.y){ 
             companion.y = p.y - companion.h; 
             companion.dy = 0; 
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

    if (companion.y > viewH + C.FALL_OFF.Y_MARGIN || companion.x < -C.FALL_OFF.X_MARGIN || companion.x > lvl.width + C.FALL_OFF.X_MARGIN) {
      gameOver = true;
      showModal("Игра окончена.","Арчик упал в пропасть!", null, ()=>resetPlayer());
    }
  }

  if (isBossLevel()) {
    updateBossLogic();
  }
  
  if (activeCharacter === "player") {
    updateCompanion();
  } else {
    updatePlayer();
  }
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
      if (companion.x < p.x + p.w && companion.x + companion.w > p.x &&
          companion.y < p.y + p.h && companion.y + companion.h > p.y) {
        if (companion.dy > 0 && companion.y + companion.h - companion.dy <= p.y) {
          companion.y = p.y - companion.h;
          companion.dy = 0;
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
  }
  
  function updatePlayer() {
    player.dy += C.PLAYER.GRAVITY;
    player.y += player.dy;
    player.onGround = false;
    
    let lvl = levels[currentLevel];
    const platforms = getPlatformsArray(lvl);
    platforms.forEach(p => {
      if (player.x < p.x + p.w && player.x + player.w > p.x &&
          player.y < p.y + p.h && player.y + player.h > p.y) {
        if (player.dy > 0 && player.y + player.h - player.dy <= p.y) {
          player.y = p.y - player.h;
          player.dy = 0;
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
    if (p.y > maxY) maxY = p.y;
  });
  return maxY;
}


function drawDecorations() {
  let lvl = levels[currentLevel];
  
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
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, dec.x - cameraX, dec.y, dec.w, dec.h);
    });
  }
}

function drawDecorationsUndo() {
  let lvl = levels[currentLevel];
  
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
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, dec.x - cameraX, dec.y, dec.w, dec.h);
    });
  }
}

function drawDecorationsUndoPlatform() {
  let lvl = levels[currentLevel];
  
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
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, dec.x - cameraX, dec.y, dec.w, dec.h);
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

function updateBossProjectiles() {
  if (playerShootCooldown > 0) playerShootCooldown--;
  if (bossShootCooldown > 0) bossShootCooldown--;

  // Движение снарядов игрока
  playerProjectiles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
  });
  playerProjectiles = playerProjectiles.filter(p =>
    p.x + p.w > 0 &&
    p.x < levels[currentLevel].width &&
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
    p.x < levels[currentLevel].width &&
    p.y + p.h > -100 &&
    p.y < LOGIC_HEIGHT + 100
  );

  if (isBossLevel()) {
    // Попадания по миньонам
    playerProjectiles.forEach(p => {
      bossMinions.forEach(enemy => {
        if (!enemy.hp) return;
        if (p.x < enemy.x + enemy.w && p.x + p.w > enemy.x &&
            p.y < enemy.y + enemy.h && p.y + p.h > enemy.y) {
          enemy.hp--;
          p._hit = true;
          if (enemy.hp <= 0) {
            enemy._dead = true;
          }
        }
      });

      // Попадание по боссу
      if (boss && bossVisible && bossHp > 0) {
        if (p.x < boss.x + boss.w && p.x + p.w > boss.x &&
            p.y < boss.y + boss.h && p.y + p.h > boss.y) {
          bossHp--;
          p._hit = true;
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
      if (!enemy.active) return;
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
      gameOver = true;
      showModal("Игра окончена.","Ты попала под атаку босса!", null, ()=>resetPlayer());
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

window.drawEnemies = function() {
  enemies.forEach(enemy => {
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    
    const frameW = imgEnemy.width / 11;
    const frameH = imgEnemy.height;
    const frameX = enemy.frame * frameW;
    
    let drawX = enemy.x - cameraX;
    let drawY = enemy.y;
    
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
    if (isBossLevel() && enemy.maxHp && enemy.hp !== undefined) {
      const barW = enemy.w;
      const barH = 4;
      const hpRatio = Math.max(0, Math.min(1, enemy.hp / enemy.maxHp));
      ctx.fillStyle = "#000000";
      ctx.fillRect(drawX, drawY - 8, barW, barH);
      ctx.fillStyle = "#ff3344";
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
  function drawPlayer() {
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    
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
  }
  
  function drawCompanion() {
    if (isBossLevel()) return; // На босс-уровне компаньон не рисуется
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    
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

  function draw() { window.drawFrame(); }

   function loop(currentTime) {
  if (lastTime === 0) {
    lastTime = currentTime;
  }
  
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  
  if (!gamePaused) {
    accumulator += deltaTime;
    
    while (accumulator >= fixedTimeStep) {
      update();
      accumulator -= fixedTimeStep;
    }
  }
  
  updateLevelTimer();
  updateCamera(currentTime);
  draw();
  requestAnimationFrame(loop);
}

let loaded = 0;
const bgImages = [bgLayer0, bgLayer1, bgLayer2, bgLayer3, bgLayer4, bgLayer5, bgLayer6, imgBackgroundAnother];
const decorationImages = [imgRock1, imgRock2, imgGrass1, imgFlower1, imgFlower2, imgMountain, imgThree, imgAlert, imgBush, imgHouse1, imgHouse2, imgHouseBg];
const platformImages = [imgPlatformGrass, imgPlatformStone, imgPlatformWood, imgPlatformStone2, imgPlatformDanger, imgPlatformSlime, imgDoorDanger, imgPlatformHouse];
const groundImages = [imgDirt, imgFloor];
const allImages = [
  ...bgImages,
  ...decorationImages,
  ...platformImages,
  ...groundImages,
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
allImages.forEach(img => {
  img.onload = () => {
    loaded++;
    if (loaded === allImages.length) {
      
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
      // Инициализируем камеру с учетом dead zone
      const activeChar = activeCharacter === "player" ? player : companion;
      const charCenterX = activeChar.x + activeChar.w / 2;
      cameraX = charCenterX - viewW / 2;
      if(cameraX < 0) cameraX = 0;
      if(cameraX > lvl.width - viewW) cameraX = lvl.width - viewW;
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

      // Инициализируем состояние босса, если текущий уровень – босс-уровень
      resetBossStateForLevel(lvl);
      
      loop(0);
    }
  };
});
