const canvas = document.getElementById("game");
const screenCtx = canvas.getContext("2d");
let viewW = C.LOGIC_WIDTH; // логическая ширина
let viewH = C.LOGIC_HEIGHT; // логическая высота
let screenW = window.innerWidth;  // физическая ширина экрана (CSS px)
let screenH = window.innerHeight; // физическая высота экрана (CSS px)

const LOGIC_WIDTH = C.LOGIC_WIDTH;
const LOGIC_HEIGHT = C.LOGIC_HEIGHT;
const offscreen = document.createElement("canvas");
offscreen.width = LOGIC_WIDTH;
offscreen.height = LOGIC_HEIGHT;
const ctx = offscreen.getContext("2d");

// Настройки качества рендеринга
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

  // Настройки качества рендеринга
  screenCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  screenCtx.imageSmoothingEnabled = false;
  screenCtx.imageSmoothingQuality = 'high';
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Добавляем переменные для фиксированного временного шага
let lastTime = 0;
let accumulator = 0;
const fixedTimeStep = C.FIXED_TIMESTEP_MS; // 60 FPS = ~16.67ms

let currentLevel = 0;
// Хранилище прогресса уровней в localStorage
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
    // Сохраняем следующий доступный уровень (или последний, если прошли всё)
    const toStore = Math.min(Math.max(0, nextLevelIndex), levels.length - 1);
    localStorage.setItem(STORAGE_KEY_LEVEL, String(toStore));
  } catch (e) {}
}

// Функции для работы со статистикой уровней
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

// Функции для работы с таймером
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
  if (levelTimerActive) {
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
    frame: 0,         // текущий кадр анимации
    frameTick: 0,     // счётчик кадров для скорости анимации
    state: "idle",    // idle | walk-left | walk-right
    idleTimer: 0,     // таймер для анимации стояния
    prevState: "idle",
  };

// Компаньон, следующий за игроком
let companion = {
    x: 50, y: 100, w: C.COMPANION.W, h: C.COMPANION.H,
    dx: 0, dy: 0, onGround: false,
    frame: 0,         // текущий кадр анимации
    frameTick: 0,     // счётчик кадров для скорости анимации
    state: "idle",    // idle | walk-left | walk-right
    idleTimer: 0,     // таймер для анимации стояния
    targetX: 50,      // целевая позиция X
    targetY: 300,     // целевая позиция Y
    followDelay: C.COMPANION.FOLLOW_DELAY, // задержка следования (0.15 = быстрее, 0.1 = медленнее)
    prevState: "idle",
  };
  
let keys = {left:false,right:false};
let cameraX = 0;
let gameOver = false;
let activeCharacter = "player"; // начальное управление игроком

// Экспорт общих сущностей для использования в js/input.js
window.player = player;
window.companion = companion;
window.keys = keys;
let followEnabled = true;
Object.defineProperty(window, 'followEnabled', { get(){ return followEnabled; }, set(v){ followEnabled = !!v; } });
Object.defineProperty(window, 'gameOver', { get(){ return gameOver; }, set(v){ gameOver = v; } });
Object.defineProperty(window, 'activeCharacter', { get(){ return activeCharacter; }, set(v){ activeCharacter = v; } });
Object.defineProperty(window, 'companionLockToCenter', { get(){ return companionLockToCenter; }, set(v){ companionLockToCenter = v; } });

let totalCoins = 0; // общее количество собранных монеток
let coinAnimation = 0; // анимация монеток

// Система таймера и статистики
let levelStartTime = 0; // время начала уровня
let levelElapsedTime = 0; // прошедшее время уровня
let levelTimerActive = false; // активен ли таймер
let levelStats = {
  time: 0,
  coins: 0,
  bestTime: null,
  bestCoins: 0
};

// Флаг фиксации компаньона к центру игрока во время совместного прыжка
let companionLockToCenter = false;

// модальное окно
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalBtn = document.getElementById("modalBtn");
const modalNextBtn = document.getElementById("modalNextBtn");
const modalRestartBtn = document.getElementById("modalRestartBtn");

let modalNextCallback = ()=>{};
let modalRestartCallback = ()=>{};

function showModal(title, text, nextCallback = null, restartCallback = null) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.style.display = "flex";
  modalRestartCallback = restartCallback || (()=>{});
  
  if (nextCallback) {
    modalNextBtn.style.display = "inline-block";
    // Ссылка на страницу диалога
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
  
  // Кнопка OK показывается только если нет других кнопок
  if (!nextCallback && !restartCallback) {
    modalBtn.style.display = "inline-block";
  } else {
    modalBtn.style.display = "none";
  }
  // После показа модалки пересчитываем размеры краёв таблички, если контейнер есть
  if (typeof window.updateCounterEdges === 'function') {
    setTimeout(()=>window.updateCounterEdges(), 0);
  }
}

modalBtn.onclick = ()=>{
  modal.style.display = "none";
};

modalRestartBtn.onclick = ()=>{
  modal.style.display = "none";
  modalRestartCallback();
};

// управление вынесено в js/input.js
loadLevelProgress();
// Если с диалоговой страницы пришёл запрос перейти на следующий уровень
try {
  const goNext = localStorage.getItem('love_game_go_next');
  if (goNext === '1') {
    localStorage.removeItem('love_game_go_next');
    const nextLevel = Math.min(currentLevel + 1, levels.length - 1);
    currentLevel = nextLevel;
    // Синхронизируем прогресс
    saveLevelProgress(nextLevel);
  }
} catch (e) {}

// Загружаем статистику для текущего уровня
const stats = getLevelStats(currentLevel);
levelStats.bestTime = stats.bestTime;
levelStats.bestCoins = stats.bestCoins;

document.getElementById("level").innerText = currentLevel+1;

// Запускаем таймер при инициализации игры
startLevelTimer();
updateStatsDisplay();

function resetPlayer() {
  player.x=50; player.y=100; player.dy=0;
  player.idleTimer = 0; // сбрасываем таймер
  gameOver=false;
  totalCoins = 0;
  
  // Сбрасываем компаньона
  companion.x = 50; companion.y = 100; companion.dy = 0;
  companion.idleTimer = 0;
  companion.targetX = 50; companion.targetY = 250;

  let lvl = levels[currentLevel];
  if (lvl.coins) {
    lvl.coins.forEach(coin => {
      coin.collected = false;
    });
  }

  // Загружаем статистику уровня
  const stats = getLevelStats(currentLevel);
  levelStats.bestTime = stats.bestTime;
  levelStats.bestCoins = stats.bestCoins;

  // Останавливаем текущий таймер и запускаем новый
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
  // Обновляем отображение монет
  document.getElementById('totalCoins').innerText = `${totalCoins} | ${levels[currentLevel].coins.length}`;
}

function update() {
  if(gameOver) return;
  
  // обработка кнопок/динамических платформ до расчета физики
  processSwitchesAndDynamics();

  // Управление в зависимости от активного персонажа
  if (activeCharacter === "player") {
    // Управляем игроком
    player.dx = 0;
    if (keys.left) player.dx = -C.PLAYER.SPEED; // фиксированная скорость
    if (keys.right) player.dx = C.PLAYER.SPEED;
    player.dy += C.PLAYER.GRAVITY; // фиксированная гравитация

    player.x += player.dx;
    player.y += player.dy;
    player.onGround = false;

    let lvl = levels[currentLevel];
    const ground = getGroundArray(lvl);

    // приземление на платформы/стены/закрытые двери (вертикальная коллизия)
    ground.forEach(p=>{
      if(player.x < p.x+p.w && player.x+player.w > p.x &&
         player.y < p.y+p.h && player.y+player.h > p.y){
           if(player.dy > 0 && player.y + player.h - player.dy <= p.y){
             player.y = p.y - player.h; 
             player.dy = 0; 
             player.onGround = true; 
           }
      }
    });
    // стены и закрытые двери (горизонтальная блокировка)
    const obstacles = getObstaclesArray(lvl);
    obstacles.forEach(o=>{
      if(player.x < o.x+o.w && player.x+player.w > o.x &&
         player.y < o.y+o.h && player.y+player.h > o.y){
           // если персонаж строго над верхней кромкой стены — не толкать по X
           if (player.y + player.h <= o.y + 1) return;
           // если персонаж строго ниже низа — тоже не толкать
           if (player.y >= o.y + o.h - 1) return;
           if (player.dx > 0) player.x = o.x - player.w;
           else if (player.dx < 0) player.x = o.x + o.w;
      }
    });

    // ловушки для игрока
    lvl.traps.forEach(t=>{
      if(player.x < t.x+t.w && player.x+player.w > t.x &&
         player.y < t.y+t.h && player.y+player.h > t.y){
           gameOver = true;
           showModal("Игра окончена.","Ты наступила на шипы!", null, ()=>resetPlayer());
      }
    });

    // финиш для игрока
    let f = lvl.finish;
    if(player.x < f.x+f.w && player.x+player.w > f.x &&
       player.y < f.y+f.h && player.y+player.h > f.y){
         // Устанавливаем gameOver чтобы остановить обновления
         gameOver = true;
         
         // Останавливаем таймер и сохраняем результаты
         const finishTime = stopLevelTimer();
         const currentStats = getLevelStats(currentLevel);
         
         // Проверяем, является ли это лучшим результатом
         let isNewBestTime = !currentStats.bestTime || finishTime < currentStats.bestTime;
         let isNewBestCoins = totalCoins > currentStats.bestCoins;
         
         // Сохраняем новые лучшие результаты
         if (isNewBestTime || isNewBestCoins) {
           const newStats = {
             bestTime: isNewBestTime ? finishTime : currentStats.bestTime,
             bestCoins: isNewBestCoins ? totalCoins : currentStats.bestCoins
           };
           saveLevelStats(currentLevel, newStats);
         }
         
         // Сохраняем пройденный уровень для страницы диалога
         try { localStorage.setItem('love_game_dialog_level', String(currentLevel)); } catch (e) {}
         
         // Формируем текст с результатами
         let resultText = `${lvl.gift.desc}\n\n`;
         resultText += `⏱️: ${formatTime(finishTime)}\n`;
         resultText += `🪙: ${totalCoins}/${lvl.coins.length}\n\n`;
         
         if (isNewBestTime) {
           resultText += `🏆 Новый рекорд времени!\n`;
         }
         if (isNewBestCoins) {
           resultText += `🏆 Новый рекорд монет!\n`;
         }
         
         if (currentStats.bestTime) {
           resultText += `Лучшее ⏱️: ${formatTime(currentStats.bestTime)}\n`;
         }
         resultText += `Лучшие 🪙: ${currentStats.bestCoins}/${lvl.coins.length}`;
         
         showModal(lvl.gift.title, resultText, ()=>{
           // Кнопка "Далее" - пустая ссылка без логики
         }, ()=>{
           // Кнопка "Начать заново" - перезапускаем текущий уровень
           resetPlayer();
         });
    }

    // Проверка сбора монеток игроком
    if (lvl.coins) {
      lvl.coins.forEach(coin => {
        if (!coin.collected && 
            player.x < coin.x + coin.w && player.x + player.w > coin.x &&
            player.y < coin.y + coin.h && player.y + player.h > coin.y) {
          coin.collected = true;
          updateCoins()
          // Анимация сбора монетки
          coinAnimation = 30; // 30 кадров анимации
        }
      });
    }

    // обновляем состояние анимации игрока
    if (player.dx > 0) {
        player.state = "walk-right";
        player.idleTimer = 0; // сбрасываем таймер при движении
    } else if (player.dx < 0) {
        player.state = "walk-left";
        player.idleTimer = 0; // сбрасываем таймер при движении
    } else {
        player.state = "idle";
        player.idleTimer++; // увеличиваем таймер стояния
    }

    // Сброс кадра/тика только при смене состояния
    if (player.state !== player.prevState) {
        player.frameTick = 0;
        player.frame = 0;
        player.prevState = player.state;
    }
    
    // обновляем кадры игрока
    player.frameTick += 1 // используем простой счетчик кадров
    if (player.state === "idle") {
        // Анимация стояния медленнее (12 кадров = 5 FPS)
        if (player.frameTick > C.PLAYER.IDLE_FRAME_TICK) {
            player.frameTick = 0;
            // Анимация стояния только после 10 секунд (600 кадров при 60 FPS)
            if (player.idleTimer > C.PLAYER.IDLE_ANIM_DELAY_FRAMES) {
                player.frame++;
                if (player.frame > C.PLAYER.IDLE_FRAMES - 1) player.frame = 0; // idle 16 кадров
            } else {
                player.frame = 0; // всегда первый кадр до 10 секунд
            }
        }
    } else {
        // Анимация ходьбы быстрее (3 кадра = 20 FPS)
        if (player.frameTick > C.PLAYER.WALK_FRAME_TICK) {
            player.frameTick = 0;
            player.frame++;
            if (player.frame > C.PLAYER.WALK_FRAMES - 1) player.frame = 0; // walk 10 кадров
        }
    }

    // камера следует за игроком (логические размеры окна)
    cameraX = player.x - viewW/2;
    if(cameraX < 0) cameraX = 0;
    if(cameraX > lvl.width - viewW) cameraX = lvl.width - viewW;
    cameraX = Math.round(cameraX);

    // 🔹 Проверка: игрок выпал за пределы экрана (логическая высота)
    if (player.y > viewH + C.FALL_OFF.Y_MARGIN || player.x < -C.FALL_OFF.X_MARGIN || player.x > lvl.width + C.FALL_OFF.X_MARGIN) {
      gameOver = true;
      showModal("Игра окончена.","Ты упала в пропасть!", null, ()=>resetPlayer());
    }
  } else {
    // Управляем компаньоном
    companion.dx = 0;
    if (keys.left) companion.dx = -C.COMPANION.SPEED; // фиксированная скорость
    if (keys.right) companion.dx = C.COMPANION.SPEED;
    companion.dy += C.COMPANION.GRAVITY; // фиксированная гравитация

    companion.x += companion.dx;
    companion.y += companion.dy;
    companion.onGround = false;

    let lvl = levels[currentLevel];
    const groundC = getGroundArray(lvl);

    // приземление на платформы/стены/закрытые двери (вертикальная коллизия)
    groundC.forEach(p=>{
      if(companion.x < p.x+p.w && companion.x+companion.w > p.x &&
         companion.y < p.y+p.h && companion.y+companion.h > p.y){
           if(companion.dy > 0 && companion.y + companion.h - companion.dy <= p.y){ 
             companion.y = p.y - companion.h; 
             companion.dy = 0; 
             companion.onGround = true; 
           }
      }
    });
    // стены и закрытые двери (горизонтальная блокировка)
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

    // ловушки для компаньона
    lvl.traps.forEach(t=>{
      if(companion.x < t.x+t.w && companion.x+companion.w > t.x &&
         companion.y < t.y+t.h && companion.y+companion.h > t.y){
           gameOver = true;
           showModal("Игра окончена.","Арчик наступил на шипы!", null, ()=>resetPlayer());
      }
    });

    // финиш для компаньона
    let f = lvl.finish;
    if(companion.x < f.x+f.w && companion.x+companion.w > f.x &&
       companion.y < f.y+f.h && companion.y+companion.h > f.y){
         // Устанавливаем gameOver чтобы остановить обновления
         gameOver = true;
         
         // Останавливаем таймер и сохраняем результаты
         const finishTime = stopLevelTimer();
         const currentStats = getLevelStats(currentLevel);
         
         // Проверяем, является ли это лучшим результатом
         let isNewBestTime = !currentStats.bestTime || finishTime < currentStats.bestTime;
         let isNewBestCoins = totalCoins > currentStats.bestCoins;
         
         // Сохраняем новые лучшие результаты
         if (isNewBestTime || isNewBestCoins) {
           const newStats = {
             bestTime: isNewBestTime ? finishTime : currentStats.bestTime,
             bestCoins: isNewBestCoins ? totalCoins : currentStats.bestCoins
           };
           saveLevelStats(currentLevel, newStats);
         }
         
         // Сохраняем пройденный уровень для страницы диалога
         try { localStorage.setItem('love_game_dialog_level', String(currentLevel)); } catch (e) {}
         
         // Формируем текст с результатами
         let resultText = `${lvl.gift.desc}\n\n`;
         resultText += `⏱️ Время: ${formatTime(finishTime)}\n`;
         resultText += `🪙 Монеты: ${totalCoins}/${lvl.coins.length}\n\n`;
         
         if (isNewBestTime) {
           resultText += `🏆 Новый рекорд времени!\n`;
         }
         if (isNewBestCoins) {
           resultText += `🏆 Новый рекорд монет!\n`;
         }
         
         if (currentStats.bestTime) {
           resultText += `Лучшее время: ${formatTime(currentStats.bestTime)}\n`;
         }
         resultText += `Лучшие монеты: ${currentStats.bestCoins}/${lvl.coins.length}`;
         
         showModal(lvl.gift.title, resultText, ()=>{
           // Кнопка "Далее" - пустая ссылка без логики
         }, ()=>{
           // Кнопка "Начать заново" - перезапускаем текущий уровень
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
          // Анимация сбора монетки
          coinAnimation = 30; // 30 кадров анимации
        }
      });
    }

    // обновляем состояние анимации компаньона
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

    // Сброс кадра/тика только при смене состояния
    if (companion.state !== companion.prevState) {
        companion.frameTick = 0;
        companion.frame = 0;
        companion.prevState = companion.state;
    }
    
    companion.frameTick++; // используем простой счетчик кадров
    if (companion.state === "idle") {
        // Анимация стояния медленнее (6 кадров = 10 FPS)
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
        // Анимация ходьбы быстрее (2 кадра = 30 FPS)
        if (companion.frameTick > 2) {
            companion.frameTick = 0;
            companion.frame++;
            if (companion.frame > 10) companion.frame = 0;
        }
    }

    // камера следует за компаньоном (логические размеры окна)
    cameraX = companion.x - viewW/2;
    if(cameraX < 0) cameraX = 0;
    if(cameraX > lvl.width - viewW) cameraX = lvl.width - viewW;
    cameraX = Math.round(cameraX);

    // 🔹 Проверка: компаньон выпал за пределы экрана (логическая высота)
    if (companion.y > viewH + C.FALL_OFF.Y_MARGIN || companion.x < -C.FALL_OFF.X_MARGIN || companion.x > lvl.width + C.FALL_OFF.X_MARGIN) {
      gameOver = true;
      showModal("Игра окончена.","Арчик упал в пропасть!", null, ()=>resetPlayer());
    }
  }
  
  // 🔹 Обновление неактивного персонажа
  if (activeCharacter === "player") {
    updateCompanion();
  } else {
    updatePlayer();
  }
}
  
  // 🔹 Функция обновления компаньона
  function updateCompanion() {
    // Если следование отключено — фиксируем цели на текущих позициях и не притягиваемся
    if (!followEnabled) {
      companion.targetX = companion.x;
      companion.targetY = companion.y;
      companionLockToCenter = false;
    }
    // Проверяем расстояние от игрока до компаньона
    let distanceToPlayer = Math.abs(companion.x - player.x);
    let maxDistance = C.COMPANION.MAX_HORIZONTAL_DISTANCE; // максимальное расстояние
    if (followEnabled) companion.targetY = player.y;
    
    // Если компаньон слишком далеко от игрока, определяем направление движения
    if (followEnabled && distanceToPlayer > maxDistance) {
      if (companion.x < player.x) {
        // Компаньон слева от игрока - идем вправо
        companion.targetX = player.x - maxDistance;
      } else {
        // Компаньон справа от игрока - идем влево
        companion.targetX = player.x + maxDistance;
      }
    } else {
      // Компаньон в пределах радиуса - оставляем его на месте
      companion.targetX = companion.x;
    }
    
    // Плавно двигаем компаньона к цели по X
    if (followEnabled) companion.x += (companion.targetX - companion.x) * companion.followDelay;
    
    // Плавно двигаем компаньона к цели по Y 
    if (followEnabled) companion.y += (companion.targetY - companion.y) * companion.followDelay;
    
    // Гравитация для компаньона (уменьшили для более плавного движения)
    companion.dy += C.COMPANION.GRAVITY; // фиксированная гравитация без deltaTime
    companion.y += companion.dy;
    companion.onGround = false;
    
    // Коллизия с поверхностями (платформы/стены/закрытые двери) для компаньона
    let lvl = levels[currentLevel];
    const groundF = getGroundArray(lvl);
    groundF.forEach(p => {
      if (companion.x < p.x + p.w && companion.x + companion.w > p.x &&
          companion.y < p.y + p.h && companion.y + companion.h > p.y) {
        // Проверяем, что компаньон падает вниз и находится выше поверхности
        if (companion.dy > 0 && companion.y + companion.h - companion.dy <= p.y) {
          companion.y = p.y - companion.h;
          companion.dy = 0;
          companion.onGround = true;
        }
      }
    });

    // Мягкое притяжение к центру игрока в воздухе, чтобы приземлиться в одной точке
    if (activeCharacter === "player" && followEnabled) {
      const centerX = player.x + (player.w - companion.w) / 2;
      if (companionLockToCenter) {
        const followStrength = C.COMPANION.FOLLOW_STRENGTH_AIR; // плавность притяжения по X
        companion.x += (centerX - companion.x) * followStrength;
      }
      // Защита от падения: если компаньон сильно ниже игрока, ускоряем подтяжку по Y
      const maxVerticalLag = C.COMPANION.MAX_VERTICAL_LAG;
      if (companion.y - player.y > maxVerticalLag) {
        companion.y = player.y - 2;
        companion.dy = 0;
      }
      // Снятие фиксации: когда оба на земле, выравниваем по центру один раз
      if (player.onGround && companion.onGround && companionLockToCenter) {
        companionLockToCenter = false;
        companion.state = "idle";
      }
    }
    
    // Определяем состояние анимации компаньона
    let currentDistance = Math.abs(companion.x - player.x);
    let isMoving = Math.abs(companion.x - companion.targetX) > C.COMPANION.MOTION_THRESHOLD; // уменьшили порог для более чувствительной анимации

    if (companionLockToCenter && activeCharacter === "player") {
      // Во время воздушного притяжения поворачиваемся к центру игрока
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
        // Компаньон движется к игроку
        if (companion.x < companion.targetX) {
          companion.state = "walk-right";
        } else {
          companion.state = "walk-left";
        }
        companion.idleTimer = 0;
      } else {
        // Компаньон стоит на месте
        companion.state = "idle";
        companion.idleTimer++;
      }
    }

    // Сброс кадра/тика только при смене состояния
    if (companion.state !== companion.prevState) {
        companion.frameTick = 0;
        companion.frame = 0;
        companion.prevState = companion.state;
    }
    
    // Обновляем анимацию компаньона
    companion.frameTick++; // используем простой счетчик кадров
    if (companion.state === "idle") {
        // Анимация стояния медленнее (6 кадров = 10 FPS)
        if (companion.frameTick > C.COMPANION.IDLE_FRAME_TICK) {
            companion.frameTick = 0;
            // Анимация стояния только после 10 секунд
            if (companion.idleTimer > C.COMPANION.IDLE_ANIM_DELAY_FRAMES) {
                companion.frame++;
                if (companion.frame > C.COMPANION.IDLE_FRAMES - 1) companion.frame = 0;
            } else {
                companion.frame = 0;
            }
        }
    } else {
        // Анимация ходьбы быстрее (2 кадра = 30 FPS)
        if (companion.frameTick > C.COMPANION.WALK_FRAME_TICK) {
            companion.frameTick = 0;
            companion.frame++;
            if (companion.frame > C.COMPANION.WALK_FRAMES - 1) companion.frame = 0;
        }
    }
  }
  
  // 🔹 Функция обновления игрока (когда он неактивен)
  function updatePlayer() {
    // Игрок остается на месте, но применяется гравитация
    player.dy += 0.1; // фиксированная гравитация без deltaTime
    player.y += player.dy;
    player.onGround = false;
    
    // Коллизия с платформами для игрока
    let lvl = levels[currentLevel];
    const platforms = getPlatformsArray(lvl);
    platforms.forEach(p => {
      if (player.x < p.x + p.w && player.x + player.w > p.x &&
          player.y < p.y + p.h && player.y + player.h > p.y) {
        // Проверяем, что игрок падает вниз и находится выше платформы
        if (player.dy > 0 && player.y + player.h - player.dy <= p.y) {
          player.y = p.y - player.h;
          player.dy = 0;
          player.onGround = true;
        }
      }
    });
    
    // Анимация стояния для неактивного игрока
    player.state = "idle";
    player.idleTimer++;
    
    // Обновляем анимацию игрока
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
  
  // ассеты вынесены в js/assets.js

function getGroundY() {
  let lvl = levels[currentLevel];
  let maxY = 0;
  const plats = getPlatformsArray(lvl);
  plats.forEach(p => {
    if (p.y > maxY) maxY = p.y; // ищем самую нижнюю платформу
  });
  return maxY; // +50 чтобы фон немного «заходил» вниз
}


// функция отрисовки декораций
function drawDecorations() {
  let lvl = levels[currentLevel];
  
  if (lvl.decorations) {
    lvl.decorations.forEach(dec => {
      let img;
      
      // Выбираем изображение в зависимости от типа декорации
      switch(dec.image) {
        case "flower1": img = imgFlower1; break;
        case "flower2": img = imgFlower2; break;
        // case "flower3": img = imgFlower3; break;
        // case "flower4": img = imgFlower4; break;
        // case "bush1": img = imgBush1; break;
        // case "bush2": img = imgBush2; break;
        // case "bush3": img = imgBush3; break;
        // case "bush4": img = imgBush4; break;
        case "rock1": img = imgRock1; break;
        case "rock2": img = imgRock2; break;
        case "grass1": img = imgGrass1; break;
        case "mountain": img = imgMountain; break;
        case "three": img = imgThree; break;
        case "alert": img = imgAlert; break;
        // default: img = imgFlower1; // изображение по умолчанию
      }
      
      // Отключаем сглаживание для пиксельной графики
      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = 'high';
      
      // Рисуем декорацию с учетом камеры
      ctx.drawImage(img, dec.x - cameraX, dec.y, dec.w, dec.h);
    });
  }
}

function drawDecorationsUndo() {
  let lvl = levels[currentLevel];
  
  if (lvl.decorationsUndo) {
    lvl.decorationsUndo.forEach(dec => {
      let img;
      
      // Выбираем изображение в зависимости от типа декорации
      switch(dec.image) {
        case "flower1": img = imgFlower1; break;
        case "flower2": img = imgFlower2; break;
        // case "flower3": img = imgFlower3; break;
        // case "flower4": img = imgFlower4; break;
        // case "bush1": img = imgBush1; break;
        // case "bush2": img = imgBush2; break;
        // case "bush3": img = imgBush3; break;
        // case "bush4": img = imgBush4; break;
        case "rock1": img = imgRock1; break;
        case "rock2": img = imgRock2; break;

        case "grass1": img = imgGrass1; break;
        case "mountain": img = imgMountain; break;
        case "three": img = imgThree; break;
        // default: img = imgFlower1; // изображение по умолчанию
      }
      
      // Отключаем сглаживание для пиксельной графики
      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = 'high';
      
      // Рисуем декорацию с учетом камеры
      ctx.drawImage(img, dec.x - cameraX, dec.y, dec.w, dec.h);
    });
  }
}

function drawDecorationsUndoPlatform() {
  let lvl = levels[currentLevel];
  
  if (lvl.decorationsUndoPlatform) {
    lvl.decorationsUndoPlatform.forEach(dec => {
      let img;
      
      // Выбираем изображение в зависимости от типа декорации
      switch(dec.image) {
        case "flower1": img = imgFlower1; break;
        case "flower2": img = imgFlower2; break;
        // case "flower3": img = imgFlower3; break;
        // case "flower4": img = imgFlower4; break;
        // case "bush1": img = imgBush1; break;
        // case "bush2": img = imgBush2; break;
        // case "bush3": img = imgBush3; break;
        // case "bush4": img = imgBush4; break;
        case "rock1": img = imgRock1; break;
        case "rock2": img = imgRock2; break;

        case "grass1": img = imgGrass1; break;
        case "mountain": img = imgMountain; break;
        case "three": img = imgThree; break;
        case "alert": img = imgAlert; break;
        // default: img = imgFlower1; // изображение по умолчанию
      }
      
      // Отключаем сглаживание для пиксельной графики
      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = 'high';
      
      // Рисуем декорацию с учетом камеры
      ctx.drawImage(img, dec.x - cameraX, dec.y, dec.w, dec.h);
    });
  }
}

// Функция отрисовки монеток
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

// функция отрисовки фона с параллаксом
function drawBackground() {
  const w = viewW; // логическая ширина экрана
  const groundY = getGroundY()+10; // низ фона совмещаем с нижней платформой
  const baseW = C.BACKGROUND.BASE_W;
  const baseH = C.BACKGROUND.BASE_H;
  const targetH = Math.max(groundY, 1); // растягиваем до верха экрана (y=0)
  const scale = targetH / baseH;
  const tileW = Math.max(1, Math.round(baseW * scale));

  // Отключаем сглаживание для пиксельной графики
  ctx.imageSmoothingEnabled = false;
  ctx.imageSmoothingQuality = 'high';

  // 🔹 Дальний слой
  let x0 = -(cameraX * C.PARALLAX[0]) % tileW;
  for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
    ctx.drawImage(bgLayer0, x0 + i * tileW, 0, tileW, targetH);
  }

  let x1 = -(cameraX * C.PARALLAX[1]) % tileW;
  for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
    ctx.drawImage(bgLayer1, x1 + i * tileW, 0, tileW, targetH);
  }

  // 🔹 Средний слой
  let x2 = -(cameraX * C.PARALLAX[2]) % tileW;
  for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
    ctx.drawImage(bgLayer2, x2 + i * tileW, 0, tileW, targetH);
  }

  // 🔹 Ближний слой
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

  // 🔹 Заполнение ниже нижней платформы: 5 рядов тайлами dirt (без растяжения) с рандомным поворотом 0/90/180/270
  const dirtW = imgDirt.width;
  const dirtH = imgDirt.height;
  if (dirtW && dirtH) {
    // начальная X с учётом камеры кратно ширине тайла, чтобы не дёргалось при скролле
    let startX = Math.floor(cameraX / dirtW) * dirtW - cameraX;
    for (let x = startX; x < w; x += dirtW) {
      // мировой индекс тайла по X для стабильного рандома
      const worldX = x + cameraX;
      const tileXIndex = Math.floor(worldX / dirtW);
      for (let r = 0; r < C.DIRT.ROWS; r++) {
        let y = groundY + r * dirtH;
        // стабильный псевдослучайный выбор угла на основе индексов (tileXIndex, r)
        let seed = (tileXIndex * 73856093) ^ (r * 19349663);
        // приводим к 0..3
        let idx = (seed >>> 0) & 3;
        let angle = 0;
        if (idx === 1) angle = Math.PI / 2;       // 90
        else if (idx === 2) angle = Math.PI;      // 180
        else if (idx === 3) angle = 3 * Math.PI / 2; // 270

        // рисуем с поворотом вокруг центра тайла
        ctx.save();
        ctx.translate(x + dirtW / 2, y + dirtH / 2);
        ctx.rotate(angle);
        ctx.drawImage(imgDirt, -dirtW / 2, -dirtH / 2);
        ctx.restore();
      }
    }
  }
}





  // утилита: получить массив платформ с учетом открытых динамических
  function getPlatformsArray(lvl){
    let arr = (lvl.platforms||[]).slice();
    if (lvl.dynamicPlatforms) {
      lvl.dynamicPlatforms.forEach(dp=>{ if(dp.open) arr.push(dp); });
    }
    return arr;
  }

  // утилита: получить препятствия для боковых коллизий (стены + закрытые двери)
  function getObstaclesArray(lvl){
    let arr = (lvl.walls||[]).slice();
    if (lvl.doors) {
      lvl.doors.forEach(d=>{ if(!d.open) arr.push(d); });
    }
    return arr;
  }

  // утилита: поверхности для приземления (платформы + стены + закрытые двери)
  function getGroundArray(lvl){
    let arr = getPlatformsArray(lvl);
    if (lvl.walls) arr = arr.concat(lvl.walls);
    if (lvl.doors) arr = arr.concat(lvl.doors.filter(d=>!d.open));
    return arr;
  }

  // обновление кнопок и связанных динамических платформ/дверей
  function processSwitchesAndDynamics(){
    const lvl = levels[currentLevel];
    if(!lvl.switches) return;
    // сбрасываем текущее состояние нажатий
    lvl.switches.forEach(sw=>{ sw.pressed = false; });
    // проверяем пересечения с игроками
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
    // применяем к динамическим платформам
    if (lvl.dynamicPlatforms) {
      lvl.dynamicPlatforms.forEach(dp=>{
        const related = lvl.switches.filter(sw=> sw.group === dp.group);
        if (related.length === 0) return;
        const anyPressed = related.some(sw=> sw.pressed);
        if (dp.mode === 'hold') {
          dp.open = anyPressed;
        } else {
          // latch: однократно открылось и остается открытым
          if (anyPressed) dp.open = true;
        }
      });
    }
    // применяем к дверям
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
  function drawPlayer() {
    // Отключаем сглаживание для пиксельной графики
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    
    let sprite, frames, frameW, frameH;
  
    if (player.state === "idle") {
      sprite = imgPlayerIdle;
      frames = 16; // кадров в idle
    } else {
      sprite = imgPlayerWalk;
      frames = 10; // кадров в walk
    }
  
    frameW = sprite.width / frames;
    frameH = sprite.height;
  
    // какой кадр рисуем
    let frameX = player.frame * frameW;
  
    // 🔹 Центрируем спрайт по размеру персонажа
    let drawX = player.x - cameraX;
    let drawY = player.y;
    
    // если идёт влево → зеркалим
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
  
  // 🔹 Функция отрисовки компаньона
  function drawCompanion() {
    // Отключаем сглаживание для пиксельной графики
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    
    let sprite, frames, frameW, frameH;
  
    if (companion.state === "idle") {
      sprite = imgCompanionIdle; // используем спрайты компаньона
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
    
    // Возвращаем прозрачность
    ctx.globalAlpha = 1.0;
  }
  

  function draw() { window.drawFrame(); }

function loop(currentTime) {
  // Фиксированный временной шаг для стабильной работы
  if (lastTime === 0) {
    lastTime = currentTime;
  }
  
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  
  // Накапливаем время
  accumulator += deltaTime;
  
  // Обновляем игру с фиксированным временным шагом
  while (accumulator >= fixedTimeStep) {
    update();
    accumulator -= fixedTimeStep;
  }
  
  // Отрисовка происходит с частотой обновления экрана
  draw();
  requestAnimationFrame(loop);
}
// ждём загрузки всех картинок
let loaded = 0;
const bgImages = [bgLayer0, bgLayer1, bgLayer2, bgLayer3, bgLayer4, bgLayer5, bgLayer6];
const decorationImages = [imgRock1, imgRock2, imgGrass1, imgFlower1, imgFlower2, imgMountain, imgThree, imgAlert];
const platformImages = [imgPlatformGrass, imgPlatformStone, imgPlatformWood, imgPlatformStone2];
const groundImages = [imgDirt];
const allImages = [...bgImages, ...decorationImages, ...platformImages, ...groundImages, imgPlayerIdle, imgPlayerWalk, imgCompanionIdle, imgCompanionWalk, imgTrap, imgFinish, imgBackgroundAll];
allImages.forEach(img => {
  img.onload = () => {
    loaded++;
    if (loaded === allImages.length) {
      // когда все картинки загружены → запускаем игру
      // Инициализируем камеру при запуске
      let lvl = levels[currentLevel];
      cameraX = player.x - viewW/2;
      if(cameraX < 0) cameraX = 0;
      if(cameraX > lvl.width - viewW) cameraX = lvl.width - viewW;
      cameraX = Math.round(cameraX);
      
      loop(0);
    }
  };
});
