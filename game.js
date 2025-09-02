const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let viewW = window.innerWidth;
let viewH = window.innerHeight;

// Настройки качества рендеринга
ctx.imageSmoothingEnabled = false;
ctx.imageSmoothingQuality = 'high';

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  viewW = window.innerWidth;
  viewH = window.innerHeight;
  canvas.width = Math.floor(viewW * dpr);
  canvas.height = Math.floor(viewH * dpr);
  canvas.style.width = viewW + "px";
  canvas.style.height = viewH + "px";

  // Настройки качества рендеринга
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.imageSmoothingQuality = 'high';
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Добавляем переменные для фиксированного временного шага
let lastTime = 0;
let accumulator = 0;
const fixedTimeStep = 1000 / 60; // 60 FPS = ~16.67ms

let currentLevel = 0;
let player = {
    x: 50, y: 300, w: 38, h: 64,
    dx: 0, dy: 0, onGround: false,
    frame: 0,         // текущий кадр анимации
    frameTick: 0,     // счётчик кадров для скорости анимации
    state: "idle",    // idle | walk-left | walk-right
    idleTimer: 0,     // таймер для анимации стояния
    prevState: "idle",
  };

// Компаньон, следующий за игроком
let companion = {
    x: 50, y: 300, w: 56, h: 49,
    dx: 0, dy: 0, onGround: false,
    frame: 0,         // текущий кадр анимации
    frameTick: 0,     // счётчик кадров для скорости анимации
    state: "idle",    // idle | walk-left | walk-right
    idleTimer: 0,     // таймер для анимации стояния
    targetX: 50,      // целевая позиция X
    targetY: 300,     // целевая позиция Y
    followDelay: 0.09, // задержка следования (0.15 = быстрее, 0.1 = медленнее)
    prevState: "idle",
  };
  
let keys = {left:false,right:false};
let cameraX = 0;
let gameOver = false;
let activeCharacter = "player"; // начальное управление игроком

let totalCoins = 0; // общее количество собранных монеток
let coinAnimation = 0; // анимация монеток

// Флаг фиксации компаньона к центру игрока во время совместного прыжка
let companionLockToCenter = false;

// модальное окно
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalBtn = document.getElementById("modalBtn");

let modalCallback = ()=>{};
function showModal(title, text, callback) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.style.display = "flex";
  modalCallback = callback;
}
modalBtn.onclick = ()=>{
  modal.style.display = "none";
  modalCallback();
};

// управление
document.getElementById("left").onmousedown = ()=>{
    keys.left=true
};
document.getElementById("left").ontouchstart = ()=>{
  keys.left=true
};
document.getElementById("right").onmousedown = ()=>{
    keys.right=true;
};
document.getElementById("right").ontouchstart = ()=>{
  keys.right=true
};


document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyA') {
    keys.left=true;
  }
  if (event.code == 'KeyD') {
    keys.right=true;
  }
  if (event.code == 'KeyW' || event.code == 'Space') {
    jump();
  }
  if (event.code == 'KeyE') {
    activeCharacter = activeCharacter === "player" ? "companion" : "player";
  }
});

document.addEventListener('keyup', function(event) {
  if (event.code == 'KeyA') {
    keys.left=false;
  }
  if (event.code == 'KeyD') {
    keys.right=false;
  }
});


document.getElementById("left").onmouseup = ()=>{
  keys.left=false;
};
document.getElementById("right").onmouseup = ()=>{
  keys.right=false;
};
document.getElementById("left").ontouchend = ()=>{
keys.left=false
};
document.getElementById("right").ontouchend = ()=>{
keys.right=false
};


const jump = ()=>{
  if(player.onGround && !gameOver && activeCharacter === "player") {
    // Фиксированная сила прыжка
    player.dy = -15;
    // Запускаем совместный прыжок: мягко тянем к центру в воздухе, без мгновенного телепорта
    companion.dy = -15;
    companionLockToCenter = true;
    player.idleTimer = 0; // сбрасываем таймер при прыжке
  } else if(companion.onGround && !gameOver && activeCharacter === "companion") {
    companion.dy = -15;
    companion.idleTimer = 0;
  }
};

document.getElementById("jump").onmousedown = ()=>{ 
  jump();
};
document.getElementById("jump").ontouchstart = ()=>{
  jump();
};
// document.getElementById("switch").onclick = ()=>{
//   activeCharacter = activeCharacter === "player" ? "companion" : "player";
// };
document.getElementById("switch").ontouchstart = ()=>{
  activeCharacter = activeCharacter === "player" ? "companion" : "player";
};
document.getElementById("level").innerText = currentLevel+1

function resetPlayer() {
  player.x=50; player.y=250; player.dy=0;
  player.idleTimer = 0; // сбрасываем таймер
  gameOver=false;
  totalCoins = 0
  
  // Сбрасываем компаньона
  companion.x = 50; companion.y = 250; companion.dy = 0;
  companion.idleTimer = 0;
  companion.targetX = 50; companion.targetY = 250;

  let lvl = levels[currentLevel];
  if (lvl.coins) {
    lvl.coins.forEach(coin => {
      coin.collected = false;
    });
  }

  document.getElementById("level").innerText = currentLevel+1
}

function updateCoins () {
  totalCoins++;
  document.getElementById('totalCoins').innerText = `${totalCoins} | ${levels[currentLevel].coins.length}`
}

function update() {
  if(gameOver) return;

  // Управление в зависимости от активного персонажа
  if (activeCharacter === "player") {
    // Управляем игроком
    player.dx = 0;
    if (keys.left) player.dx = -5; // фиксированная скорость
    if (keys.right) player.dx = 5;
    player.dy += 1; // фиксированная гравитация

    player.x += player.dx;
    player.y += player.dy;
    player.onGround = false;

    let lvl = levels[currentLevel];

    // платформы для игрока
    lvl.platforms.forEach(p=>{
      if(player.x < p.x+p.w && player.x+player.w > p.x &&
         player.y < p.y+p.h && player.y+player.h > p.y){
           if(player.dy>0){ 
             // Более точная коллизия - ставим персонажа точно на платформу
             player.y = p.y - player.h; 
             player.dy = 0; 
             player.onGround = true; 
           }
      }
    });

    // ловушки для игрока
    lvl.traps.forEach(t=>{
      if(player.x < t.x+t.w && player.x+player.w > t.x &&
         player.y < t.y+t.h && player.y+player.h > t.y){
           gameOver = true;
           showModal("Игра окончена 💀","Ты наступила на шипы!", ()=>resetPlayer());
      }
    });

    // финиш для игрока
    let f = lvl.finish;
    if(player.x < f.x+f.w && player.x+player.w > f.x &&
       player.y < f.y+f.h && player.y+player.h > f.y){
         showModal(lvl.gift.title, lvl.gift.desc, ()=>{
           currentLevel++;
           if(currentLevel>=levels.length){
             showModal("Поздравляю 🎉","Ты прошла все уровни!", ()=>{currentLevel=0; resetPlayer();});
           } else {
             resetPlayer();
           }
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
        if (player.frameTick > 15) {
            player.frameTick = 0;
            // Анимация стояния только после 10 секунд (600 кадров при 60 FPS)
            if (player.idleTimer > 600) {
                player.frame++;
                if (player.frame > 15) player.frame = 0; // idle 16 кадров
            } else {
                player.frame = 0; // всегда первый кадр до 10 секунд
            }
        }
    } else {
        // Анимация ходьбы быстрее (3 кадра = 20 FPS)
        if (player.frameTick > 3) {
            player.frameTick = 0;
            player.frame++;
            if (player.frame > 9) player.frame = 0; // walk 10 кадров
        }
    }

    // камера следует за игроком (логические размеры окна)
    cameraX = player.x - viewW/2;
    if(cameraX < 0) cameraX = 0;
    if(cameraX > lvl.width - viewW) cameraX = lvl.width - viewW;
    cameraX = Math.round(cameraX);

    // 🔹 Проверка: игрок выпал за пределы экрана (логическая высота)
    if (player.y > viewH + 100 || player.x < -200 || player.x > lvl.width + 200) {
      gameOver = true;
      showModal("Игра окончена 💀","Ты упала в пропасть!", ()=>resetPlayer());
    }
  } else {
    // Управляем компаньоном
    companion.dx = 0;
    if (keys.left) companion.dx = -4; // фиксированная скорость
    if (keys.right) companion.dx = 4;
    companion.dy += 1; // фиксированная гравитация

    companion.x += companion.dx;
    companion.y += companion.dy;
    companion.onGround = false;

    let lvl = levels[currentLevel];

    // платформы для компаньона
    lvl.platforms.forEach(p=>{
      if(companion.x < p.x+p.w && companion.x+companion.w > p.x &&
         companion.y < p.y+p.h && companion.y+companion.h > p.y){
           if(companion.dy>0){ 
             companion.y = p.y - companion.h; 
             companion.dy = 0; 
             companion.onGround = true; 
           }
      }
    });

    // ловушки для компаньона
    lvl.traps.forEach(t=>{
      if(companion.x < t.x+t.w && companion.x+companion.w > t.x &&
         companion.y < t.y+t.h && companion.y+companion.h > t.y){
           gameOver = true;
           showModal("Игра окончена 💀","Компаньон наступил на шипы!", ()=>resetPlayer());
      }
    });

    // финиш для компаньона
    let f = lvl.finish;
    if(companion.x < f.x+f.w && companion.x+companion.w > f.x &&
       companion.y < f.y+f.h && companion.y+companion.h > f.y){
         showModal(lvl.gift.title, lvl.gift.desc, ()=>{
           currentLevel++;
           if(currentLevel>=levels.length){
             showModal("Поздравляю 🎉","Ты прошла все уровни!", ()=>{currentLevel=0; resetPlayer();});
           } else {
             resetPlayer();
           }
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
    if (companion.y > viewH + 100 || companion.x < -200 || companion.x > lvl.width + 200) {
      gameOver = true;
      showModal("Игра окончена 💀","Компаньон упал в пропасть!", ()=>resetPlayer());
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
    // Проверяем расстояние от игрока до компаньона
    let distanceToPlayer = Math.abs(companion.x - player.x);
    let maxDistance = 40; // максимальное расстояние
    companion.targetY = player.y;
    
    // Если компаньон слишком далеко от игрока, определяем направление движения
    if (distanceToPlayer > maxDistance) {
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
    companion.x += (companion.targetX - companion.x) * companion.followDelay;
    
    // Плавно двигаем компаньона к цели по Y 
    companion.y += (companion.targetY - companion.y) * companion.followDelay;
    
    // Гравитация для компаньона (уменьшили для более плавного движения)
    companion.dy += 1; // фиксированная гравитация без deltaTime
    companion.y += companion.dy;
    companion.onGround = false;
    
    // Коллизия с платформами для компаньона
    let lvl = levels[currentLevel];
    lvl.platforms.forEach(p => {
      if (companion.x < p.x + p.w && companion.x + companion.w > p.x &&
          companion.y < p.y + p.h && companion.y + companion.h > p.y) {
        if (companion.dy > 0) {
          companion.y = p.y - companion.h;
          companion.dy = 0;
          companion.onGround = true;
        }
      }
    });

    // Мягкое притяжение к центру игрока в воздухе, чтобы приземлиться в одной точке
    if (activeCharacter === "player") {
      const centerX = player.x + (player.w - companion.w) / 2;
      if (companionLockToCenter) {
        const followStrength = 0.15; // плавность притяжения по X
        companion.x += (centerX - companion.x) * followStrength;
      }
      // Защита от падения: если компаньон сильно ниже игрока, ускоряем подтяжку по Y
      const maxVerticalLag = 140;
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
    let isMoving = Math.abs(companion.x - companion.targetX) > 3; // уменьшили порог для более чувствительной анимации

    if (companionLockToCenter && activeCharacter === "player") {
      // Во время воздушного притяжения поворачиваемся к центру игрока
      const centerX = player.x + (player.w - companion.w) / 2;
      const dxToCenter = centerX - companion.x;
      if (Math.abs(dxToCenter) > 1) {
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
        if (companion.frameTick > 24) {
            companion.frameTick = 0;
            // Анимация стояния только после 10 секунд
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
  }
  
  // 🔹 Функция обновления игрока (когда он неактивен)
  function updatePlayer() {
    // Игрок остается на месте, но применяется гравитация
    player.dy += 0.1; // фиксированная гравитация без deltaTime
    player.y += player.dy;
    player.onGround = false;
    
    // Коллизия с платформами для игрока
    let lvl = levels[currentLevel];
    lvl.platforms.forEach(p => {
      if (player.x < p.x + p.w && player.x + player.w > p.x &&
          player.y < p.y + p.h && player.y + player.h > p.y) {
        if (player.dy > 0) {
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
  
  // загрузка картинок
// const imgPlayer = new Image();
// imgPlayer.src = "img/player.png";

// картинки персонажа
const imgPlayerIdle = new Image();
imgPlayerIdle.src = "img/player_idle.png"; // например, 4 кадра

const imgPlayerWalk = new Image();
imgPlayerWalk.src = "img/player_walk2.png"; // например, 4 кадров

const imgCompanionIdle = new Image();
imgCompanionIdle.src = "img/cato_idle.png"; // например, 4 кадра

const imgCompanionWalk = new Image();
imgCompanionWalk.src = "img/cato_walk.png"; // например, 4 кадров


// Дополнительные текстуры для платформ
const imgPlatformGrass = new Image();
imgPlatformGrass.src = "img/platform_grass.png";

const imgPlatformStone = new Image();
imgPlatformStone.src = "img/platform_stone.png";

const imgPlatformStone2 = new Image();
imgPlatformStone2.src = "img/platform_stone2.png";

const imgPlatformWood = new Image();
imgPlatformWood.src = "img/platform_wood.png";

const imgTrap = new Image();
imgTrap.src = "img/trap.png";

const imgFinish = new Image();
imgFinish.src = "img/finish.png";

// загрузка изображений для декораций
const imgFlower1 = new Image();
imgFlower1.src = "img/flower1.png";

const imgFlower2 = new Image();
imgFlower2.src = "img/flower2.png";

// const imgFlower3 = new Image();
// imgFlower3.src = "img/flower3.png";

// const imgFlower4 = new Image();
// imgFlower4.src = "img/flower4.png";

// const imgBush1 = new Image();
// imgBush1.src = "img/bush1.png";

// const imgBush2 = new Image();
// imgBush2.src = "img/bush2.png";

// const imgBush3 = new Image();
// imgBush3.src = "img/bush3.png";

// const imgBush4 = new Image();
// imgBush4.src = "img/bush4.png";

const imgRock1 = new Image();
imgRock1.src = "img/rock1.png";

const imgRock2 = new Image();
imgRock2.src = "img/rock2.png";

const imgGrass1 = new Image();
imgGrass1.src = "img/grass1.png";

const imgMountain = new Image();
imgMountain.src = "img/mountain.png";

const imgBackgroundAll = new Image();
imgBackgroundAll.src = "img/background_all.png";

// загрузка фоновых картинок
const bgLayer0 = new Image(); // дальний фон
bgLayer0.src = "img/background_0.png";

const bgLayer1 = new Image(); // дальний фон
bgLayer1.src = "img/background_1.png";

const bgLayer2 = new Image();
bgLayer2.src = "img/background_2.png";

const bgLayer3 = new Image();
bgLayer3.src = "img/background_3.png";

const bgLayer4 = new Image();
bgLayer4.src = "img/background_4.png";

const bgLayer5 = new Image();
bgLayer5.src = "img/background_6.png";

const bgLayer6 = new Image();
bgLayer6.src = "img/background_5.png";

const imgCoin = new Image();
imgCoin.src = "img/mini_coin.png";

function getGroundY() {
  let lvl = levels[currentLevel];
  let maxY = 0;
  lvl.platforms.forEach(p => {
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
  document.getElementById('totalCoins').innerText = `${totalCoins} | ${levels[currentLevel].coins.length}`
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
  const baseW = 323;
  const baseH = 302;
  const targetH = Math.max(groundY, 1); // растягиваем до верха экрана (y=0)
  const scale = targetH / baseH;
  const tileW = Math.max(1, Math.round(baseW * scale));

  // Отключаем сглаживание для пиксельной графики
  ctx.imageSmoothingEnabled = false;
  ctx.imageSmoothingQuality = 'high';

  // 🔹 Дальний слой
  let x0 = -(cameraX * 0.2) % tileW;
  for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
    ctx.drawImage(bgLayer0, x0 + i * tileW, 0, tileW, targetH);
  }

  let x1 = -(cameraX * 0.25) % tileW;
  for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
    ctx.drawImage(bgLayer1, x1 + i * tileW, 0, tileW, targetH);
  }

  // 🔹 Средний слой
  let x2 = -(cameraX * 0.35) % tileW;
  for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
    ctx.drawImage(bgLayer2, x2 + i * tileW, 0, tileW, targetH);
  }

  // 🔹 Ближний слой
  let x3 = -(cameraX * 0.5) % tileW;
  for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
    ctx.drawImage(bgLayer3, x3 + i * tileW, 0, tileW, targetH);
  }

  let x4 = -(cameraX * 0.65) % tileW;
  for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
    ctx.drawImage(bgLayer4, x4 + i * tileW, 0, tileW, targetH);
  }

  let x5 = -(cameraX * 0.72) % tileW;
  for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
    ctx.drawImage(bgLayer5, x5 + i * tileW, 0, tileW, targetH);
  }

  let x6 = -(cameraX * 0.8) % tileW;
  for (let i = -1; i <= Math.ceil(w / tileW) + 1; i++) {
    ctx.drawImage(bgLayer6, x6 + i * tileW, 0, tileW, targetH);
  }

  // 🔹 Заполнение ниже нижней платформы

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
  

  function draw() {
    // очищаем по логическим размерам
    ctx.clearRect(0,0,viewW,viewH);
    
    // Отключаем сглаживание для всех изображений
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    
    drawBackground();
    // декорации (рисуем под платформами, но над фоном)
    drawDecorationsUndoPlatform();
    let lvl = levels[currentLevel];
      // ловушки
      lvl.traps.forEach(t=>{
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(imgTrap, t.x - cameraX, t.y, t.w, t.h);
      });
    // платформы (с повторяющейся текстурой)
    lvl.platforms.forEach(p=>{
      const platformX = p.x - cameraX;
      const platformY = p.y;
      const platformW = p.w;
      const platformH = p.h;
      
      // Выбираем текстуру в зависимости от типа платформы
      let textureImg = imgPlatformGrass; // по умолчанию
      if (p.texture === "grass") textureImg = imgPlatformGrass;
      else if (p.texture === "stone") textureImg = imgPlatformStone;
      else if (p.texture === "stone2") textureImg = imgPlatformStone2;
      else if (p.texture === "wood") textureImg = imgPlatformWood;
      
      // Получаем размеры текстуры платформы
      const textureW = textureImg.width;
      const textureH = textureImg.height;
      
      // Отключаем сглаживание для пиксельной графики
      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = 'high';
      
      // Рисуем повторяющуюся текстуру платформы
      for (let x = 0; x < platformW; x += textureW) {
        for (let y = 0; y < platformH; y += textureH) {
          const drawW = Math.min(textureW, platformW - x);
          const drawH = Math.min(textureH, platformH - y);
          
          // Рисуем основную текстуру
          ctx.drawImage(
            textureImg,
            0, 0, drawW, drawH,
            platformX + x, platformY + y, drawW, drawH
          );
        }
      }
    });
    // декорации (рисуем под платформами, но над фоном)
    drawDecorationsUndo();

    // монетки
    drawCoins();


  

  
    // финиш
    let f=lvl.finish;
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(imgFinish, f.x - cameraX, f.y, f.w, f.h);
    
    // игрок
    drawPlayer();
    
    // компаньон
    drawCompanion();
    // декорации (рисуем под платформами, но над фоном)
    drawDecorations();
    // 🔹 Отладочная информация - границы коллизии
    if (false) { // измените на true для включения отладки
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      
      // Границы игрока
      ctx.strokeRect(player.x - cameraX, player.y, player.w, player.h);
      
      // Границы компаньона
      ctx.strokeStyle = "green";
      ctx.strokeRect(companion.x - cameraX, companion.y, companion.w, companion.h);
      
      // Границы платформ
      ctx.strokeStyle = "blue";
      lvl.platforms.forEach(p => {
        ctx.strokeRect(p.x - cameraX, p.y, p.w, p.h);
      });
    }
  }

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
const decorationImages = [imgRock1, imgRock2, imgGrass1, imgFlower1, imgFlower2, imgMountain];
const platformImages = [imgPlatformGrass, imgPlatformStone, imgPlatformWood];
const allImages = [...bgImages, ...decorationImages, ...platformImages, imgPlayerIdle, imgPlayerWalk, imgCompanionIdle, imgCompanionWalk, imgTrap, imgFinish, imgBackgroundAll];
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
