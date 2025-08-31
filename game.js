const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


let currentLevel = 0;
let player = {
    x: 50, y: 300, w: 38, h: 64,
    dx: 0, dy: 0, onGround: false,
    frame: 0,         // текущий кадр анимации
    frameTick: 0,     // счётчик кадров для скорости анимации
    state: "idle",    // idle | walk-left | walk-right
    idleTimer: 0,     // таймер для анимации стояния
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
    followDelay: 0.1, // задержка следования (0.1 = быстро, 0.05 = медленно)
  };
  
let keys = {left:false,right:false};
let cameraX = 0;
let gameOver = false;
let activeCharacter = "player"; // начальное управление игроком

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
document.getElementById("left").ontouchstart = ()=>{
    keys.left=true
};
document.getElementById("left").ontouchend = ()=>{
    keys.left=false;
};
document.getElementById("right").ontouchstart = ()=>{
    keys.right=true;
};
document.getElementById("right").ontouchend = ()=>{
    keys.right=false;
};
document.getElementById("jump").ontouchstart = ()=>{ 
    if(player.onGround && !gameOver && activeCharacter === "player") {
        player.dy=-5; // уменьшили силу прыжка с -8 до -5
        companion.dy=-4.5;
        player.idleTimer = 0; // сбрасываем таймер при прыжке
    } else if(companion.onGround && !gameOver && activeCharacter === "companion") {
        companion.dy=-5;
        companion.idleTimer = 0;
    }
};
document.getElementById("jump").ontouchend = ()=>{
    // Кнопка отпущена - ничего не делаем
};
document.getElementById("switch").ontouchstart = ()=>{
  activeCharacter = activeCharacter === "player" ? "companion" : "player";
};

function resetPlayer(){
  player.x=50; player.y=250; player.dy=0;
  player.idleTimer = 0; // сбрасываем таймер
  gameOver=false;
  
  // Сбрасываем компаньона
  companion.x = 50; companion.y = 250; companion.dy = 0;
  companion.idleTimer = 0;
  companion.targetX = 50; companion.targetY = 250;
}

function update() {
  if(gameOver) return;

  // Управление в зависимости от активного персонажа
  if (activeCharacter === "player") {
    // Управляем игроком
    player.dx = 0;
    if (keys.left) player.dx = -2;
    if (keys.right) player.dx = 2;
    player.dy += 0.1;

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
    
    // обновляем кадры игрока
    player.frameTick++;
    if (player.frameTick > 80) { // чем больше число, тем медленнее анимация
        
        if (player.state === "idle") {
        player.frameTick = 0;

            // Анимация стояния только после 10 секунд (600 кадров при 60 FPS)
            if (player.idleTimer > 1800) {
                player.frame++;
                if (player.frame > 15) player.frame = 0; // idle 16 кадров
            } else {
                player.frame = 0; // всегда первый кадр до 10 секунд
            }
        } else {
        player.frameTick = 70;

          // Анимация ходьбы работает всегда
          player.frame++;
          if (player.frame > 9) player.frame = 0; // walk 4 кадра
        }
    }

    // камера следует за игроком
    cameraX = player.x - canvas.width/2;
    if(cameraX < 0) cameraX = 0;
    if(cameraX > lvl.width - canvas.width) cameraX = lvl.width - canvas.width;

    // 🔹 Проверка: игрок выпал за пределы экрана
    if (player.y > canvas.height + 100 || player.x < -200 || player.x > lvl.width + 200) {
      gameOver = true;
      showModal("Игра окончена 💀","Ты упала в пропасть!", ()=>resetPlayer());
    }
  } else {
    // Управляем компаньоном
    companion.dx = 0;
    if (keys.left) companion.dx = -2;
    if (keys.right) companion.dx = 2;
    companion.dy += 0.1;

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
    
    // обновляем кадры компаньона
    companion.frameTick++;
    if (companion.frameTick > 80) {
        if (companion.state === "idle") {
        companion.frameTick = 0;
            if (companion.idleTimer > 1800) {
                companion.frame++;
                if (companion.frame > 8) companion.frame = 0;
            } else {
                companion.frame = 0;
            }
        } else {
        companion.frameTick = 70;
          companion.frame++;
          if (companion.frame > 10) companion.frame = 0;
        }
    }

    // камера следует за компаньоном
    cameraX = companion.x - canvas.width/2;
    if(cameraX < 0) cameraX = 0;
    if(cameraX > lvl.width - canvas.width) cameraX = lvl.width - canvas.width;

    // 🔹 Проверка: компаньон выпал за пределы экрана
    if (companion.y > canvas.height + 100 || companion.x < -200 || companion.x > lvl.width + 200) {
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
    
    // Плавно двигаем компаньона к цели по X только если игрок на земле
    if (player.onGround) {
      companion.x += (companion.targetX - companion.x) * companion.followDelay;
    }
    companion.y += (companion.targetY - companion.y + 15) * companion.followDelay;
    
    // Гравитация для компаньона
    companion.dy += 0.14;
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
    
    // Определяем состояние анимации компаньона
    let currentDistance = Math.abs(companion.x - player.x);
    let isMoving = Math.abs(companion.x - companion.targetX) > 5; // увеличили порог для более стабильной анимации
    
    if (isMoving && currentDistance > 20) {
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
    
    // Обновляем анимацию компаньона
    companion.frameTick++;
    if (companion.frameTick > 80) {
      companion.frameTick = 0;
      
      if (companion.state === "idle") {
        // Анимация стояния только после 10 секунд
        if (companion.idleTimer > 1800) {
          companion.frame++;
          if (companion.frame > 8) companion.frame = 0;
        } else {
          companion.frame = 0;
        }
      } else {
        companion.frameTick = 70;
        // Анимация ходьбы
        companion.frame++;
        if (companion.frame > 10) companion.frame = 0;
      }
    }
  }
  
  // 🔹 Функция обновления игрока (когда он неактивен)
  function updatePlayer() {
    // Игрок остается на месте, но применяется гравитация
    player.dy += 0.1;
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
    if (player.frameTick > 80) {
      player.frameTick = 0;
      
      if (player.idleTimer > 1800) {
        player.frame++;
        if (player.frame > 15) player.frame = 0;
      } else {
        player.frame = 0;
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


const imgPlatform = new Image();
imgPlatform.src = "img/platform.png";

const imgTrap = new Image();
imgTrap.src = "img/trap.png";

const imgFinish = new Image();
imgFinish.src = "img/finish.png";


// загрузка фоновых картинок
const bgLayer1 = new Image(); // дальний фон
bgLayer1.src = "img/background_far.png";

const bgLayer2 = new Image(); // средний фон
bgLayer2.src = "img/background_mid.png";

const bgLayer3 = new Image(); // ближний фон
bgLayer3.src = "img/background_near.png";

function getGroundY() {
  let lvl = levels[currentLevel];
  let maxY = 0;
  lvl.platforms.forEach(p => {
    if (p.y > maxY) maxY = p.y; // ищем самую нижнюю платформу
  });
  return maxY; // +50 чтобы фон немного «заходил» вниз
}


// функция отрисовки фона с параллаксом
function drawBackground() {
  const w = canvas.width;
  const groundY = getGroundY(); // позиция низа фона по платформам

  // 🔹 Дальний слой
  let x1 = -(cameraX * 0.2) % bgLayer1.width;
  for (let i = -1; i <= Math.ceil(w / bgLayer1.width) + 1; i++) {
    ctx.drawImage(bgLayer1, x1 + i * bgLayer1.width, groundY - bgLayer1.height, bgLayer1.width, bgLayer1.height);
  }

  // 🔹 Средний слой
  let x2 = -(cameraX * 0.5) % bgLayer2.width;
  for (let i = -1; i <= Math.ceil(w / bgLayer2.width) + 1; i++) {
    ctx.drawImage(bgLayer2, x2 + i * bgLayer2.width, groundY - bgLayer2.height, bgLayer2.width, bgLayer2.height);
  }

  // 🔹 Ближний слой
  let x3 = -(cameraX * 0.8) % bgLayer3.width;
  for (let i = -1; i <= Math.ceil(w / bgLayer3.width) + 1; i++) {
    ctx.drawImage(bgLayer3, x3 + i * bgLayer3.width, groundY - bgLayer3.height, bgLayer3.width, bgLayer3.height);
  }
}





  function drawPlayer() {
    // Отключаем сглаживание для пиксельной графики
    ctx.imageSmoothingEnabled = false;
    
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
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    // Отключаем сглаживание для всех изображений
    ctx.imageSmoothingEnabled = false;
    
    drawBackground();

    let lvl = levels[currentLevel];
  
    // платформы
    lvl.platforms.forEach(p=>{
      ctx.drawImage(imgPlatform, p.x - cameraX, p.y, p.w, p.h);
    });
  
    // ловушки
    lvl.traps.forEach(t=>{
      ctx.drawImage(imgTrap, t.x - cameraX, t.y, t.w, t.h);
    });
  
    // финиш
    let f=lvl.finish;
    ctx.drawImage(imgFinish, f.x - cameraX, f.y, f.w, f.h);
    
    // игрок
    drawPlayer();
    
    // компаньон
    drawCompanion();
    
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

function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}
// ждём загрузки всех картинок
let loaded = 0;
const bgImages = [bgLayer1, bgLayer2, bgLayer3];

bgImages.forEach(img => {
  img.onload = () => {
    loaded++;
    if (loaded === bgImages.length) {
      // когда все картинки загружены → запускаем игру
      loop();
    }
  };
});
