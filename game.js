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
  document.getElementById('totalCoins').innerText = `${totalCoins} | ${levels[currentLevel].coins.length}`
}

function updateStatsDisplay() {
  document.getElementById('totalCoins').innerText = `${totalCoins} | ${levels[currentLevel].coins.length}`;
}

function update() {
  if(gameOver || gamePaused) return;
  
  processSwitchesAndDynamics();
  updateDynamicPlatforms();
  updateEnemies();

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
    if(player.x < f.x+f.w && player.x+player.w > f.x &&
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
    } else if (player.dx < 0) {
        player.state = "walk-left";
        player.idleTimer = 0;
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
    if(companion.x < f.x+f.w && companion.x+companion.w > f.x &&
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
           resultText += `🏆 Новый рекорд времени!\n`;
         }
         if (isNewBestCoins) {
           resultText += `🏆 Новый рекорд монет!\n`;
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
    } else if (companion.dx < 0) {
        companion.state = "walk-left";
        companion.idleTimer = 0;
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
                if (companion.frame > 8) companion.frame = 0;
            } else {
                companion.frame = 0;
            }
        }
    } else {
        if (companion.frameTick > 2) {
            companion.frameTick = 0;
            companion.frame++;
            if (companion.frame > 10) companion.frame = 0;
        }
    }

    if (companion.y > viewH + C.FALL_OFF.Y_MARGIN || companion.x < -C.FALL_OFF.X_MARGIN || companion.x > lvl.width + C.FALL_OFF.X_MARGIN) {
      gameOver = true;
      showModal("Игра окончена.","Арчик упал в пропасть!", null, ()=>resetPlayer());
    }
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
    if (followEnabled) companion.targetY = player.y;
    
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
      if (companion.y - player.y > maxVerticalLag) {
        companion.y = player.y - 2;
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
  });
}

function drawBackground() {
  const w = viewW;
  const groundY = getGroundY()+10;
  let lvl = levels[currentLevel];
  const backgroundType = lvl.background || "forest";

  ctx.imageSmoothingEnabled = false;
  ctx.imageSmoothingQuality = 'high';

  if (backgroundType === "home") {
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
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    
    let sprite, frames, frameW, frameH;
  
    if (companion.state === "idle") {
      sprite = imgCompanionIdle;
      frames = 9;
    } else {
      sprite = imgCompanionWalk;
      frames = 11;
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
const allImages = [...bgImages, ...decorationImages, ...platformImages, ...groundImages, imgPlayerIdle, imgPlayerWalk, imgCompanionIdle, imgCompanionWalk, imgTrap, imgFinish, imgBackgroundAll, imgEnemy];
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
      
      loop(0);
    }
  };
});
