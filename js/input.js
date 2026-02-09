(function(){
  window.jump = function(){
    if(window.activeCharacter === "player" && window.player.onGround && !window.gameOver) {
      window.player.dy = C.PLAYER.JUMP_VY;
      if (window.followEnabled) {
        window.companion.dy = C.COMPANION.JUMP_VY;
        window.companionLockToCenter = true;
      }
      window.player.idleTimer = 0;
    } else if(window.activeCharacter === "companion" && window.companion.onGround && !window.gameOver) {
      window.companion.dy = C.COMPANION.JUMP_VY;
      window.companion.idleTimer = 0;
    }
  };

  document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyA') {
      window.keys.left = true;
    }
    if (event.code === 'KeyD') {
      window.keys.right = true;
    }
    if (event.code === 'KeyW' || event.code === 'Space') {
      window.jump();
    }
    if (event.code === 'KeyQ') {
        const toggleFollow = ()=>{
            window.followEnabled = !window.followEnabled;
            if (window.followEnabled) followBtn.classList.add('active');
            else followBtn.classList.remove('active');
          };
          toggleFollow()
    }
    if (event.code === 'KeyE') {
      window.activeCharacter = window.activeCharacter === "player" ? "companion" : "player";
    }
  });
  document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyA') {
      window.keys.left = false;
    }
    if (event.code === 'KeyD') {
      window.keys.right = false;
    }
  });
  const joystick = document.getElementById("joystick");
  const joystickStick = document.getElementById("joystickStick");
  const sliderCounter = document.getElementById("sliderCounter");
  const shootJoystick = document.getElementById("shootJoystick");
  const shootJoystickStick = document.getElementById("shootJoystickStick");
  const shootSliderCounter = document.getElementById("shootSliderCounter");
  const jumpBtn = document.getElementById("jump");
  const switchBtn = document.getElementById("switch");
  const followBtn = document.getElementById("follow");
  const gameCanvas = document.getElementById("game");

  // Показываем/скрываем джойстик стрельбы в зависимости от уровня
  function updateShootJoystickVisibility() {
    if (shootJoystick) {
      if (window.isBossLevel && window.isBossLevel()) {
        shootJoystick.style.display = 'flex';
      } else {
        shootJoystick.style.display = 'none';
        // Сбрасываем состояние при скрытии
        if (typeof window.getShootDirection === "function") {
          const dir = window.getShootDirection();
          if (dir.x !== 0 || dir.y !== 0) {
            // Принудительно сбрасываем через resetShootJoystick если она доступна
          }
        }
      }
    }
  }
  // Проверяем видимость при загрузке и периодически
  window.addEventListener('load', updateShootJoystickVisibility);
  setInterval(updateShootJoystickVisibility, 500);
  
  // Экспортируем функцию обновления видимости для вызова из game.js при смене уровня
  window.updateShootJoystickVisibility = updateShootJoystickVisibility;

  // Горизонтальный слайдер
  if (joystick && joystickStick) {
    // Инициализация: устанавливаем ручку в центр при загрузке
    window.addEventListener('load', () => {
      joystickStick.style.transform = 'translate(-50%, -50%)';
    });
    
    let joystickActive = false;
    let joystickBaseRect = null;
    const stickWidth = 64; // Фиксированная ширина ручки из CSS

    function updateJoystick(x, y) {
      // Всегда используем sliderCounter для расчета границ
      const baseElement = sliderCounter || joystick;
      if (!joystickBaseRect) {
        joystickBaseRect = baseElement.getBoundingClientRect();
      }
      
      const centerX = joystickBaseRect.left + joystickBaseRect.width / 2;
      const baseWidth = joystickBaseRect.width;
      
      // Максимальное расстояние от центра (половина ширины базы минус половина ширины ручки)
      // Учитываем, что ручка центрирована, поэтому нужно вычесть половину её ширины с каждой стороны
      const maxDistance = Math.max(0, (baseWidth / 2) - (stickWidth / 2));
      
      const deltaX = x - centerX;
      
      // Ограничиваем движение только по горизонтали
      let stickX = deltaX;
      if (Math.abs(stickX) > maxDistance) {
        stickX = stickX > 0 ? maxDistance : -maxDistance;
      }
      
      // Применяем transform только если есть реальное движение
      if (Math.abs(stickX) > 0.1) {
        joystickStick.style.transform = `translate(calc(-50% + ${stickX}px), -50%)`;
      } else {
        joystickStick.style.transform = 'translate(-50%, -50%)';
      }
      
      // Определяем направление движения
      const threshold = 10; // Порог для активации движения
      if (Math.abs(stickX) > threshold) {
        window.keys.left = stickX < 0;
        window.keys.right = stickX > 0;
      } else {
        window.keys.left = false;
        window.keys.right = false;
      }
    }

    function resetJoystick() {
      joystickActive = false;
      joystick.classList.remove('active');
      joystickStick.style.transform = 'translate(-50%, -50%)';
      window.keys.left = false;
      window.keys.right = false;
      joystickBaseRect = null;
    }

    // Обработка мыши (для тестирования на ПК)
    const sliderElement = sliderCounter || joystick;
    sliderElement.onmousedown = (e) => {
      e.preventDefault();
      joystickActive = true;
      joystick.classList.add('active');
      joystickBaseRect = null; // Сбрасываем, чтобы пересчитать
      updateJoystick(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', (e) => {
      if (joystickActive) {
        updateJoystick(e.clientX, e.clientY);
      }
    });

    document.addEventListener('mouseup', () => {
      if (joystickActive) {
        resetJoystick();
      }
    });

    // Обработка касаний
    sliderElement.ontouchstart = (e) => {
      e.preventDefault(); 
      joystickActive = true;
      joystick.classList.add('active');
      joystickBaseRect = null; // Сбрасываем, чтобы пересчитать
      // Убеждаемся, что ручка в центре перед началом движения
      joystickStick.style.transform = 'translate(-50%, -50%)';
      const touch = e.touches[0];
      updateJoystick(touch.clientX, touch.clientY);
    };

    sliderElement.ontouchmove = (e) => {
      e.preventDefault();
      if (joystickActive) {
        const touch = e.touches[0];
        updateJoystick(touch.clientX, touch.clientY);
      }
    };

    sliderElement.ontouchend = (e) => {
      e.preventDefault();
      if (joystickActive) {
        resetJoystick();
      }
    };

    sliderElement.ontouchcancel = (e) => {
      e.preventDefault();
      if (joystickActive) {
        resetJoystick();
      }
    };
  }
  if (jumpBtn) {
    jumpBtn.onmousedown = ()=>{ window.jump(); };
    jumpBtn.ontouchstart = ()=>{ window.jump(); };
  }
  if (switchBtn) {
    switchBtn.ontouchstart = ()=>{
      if (!window.isBossLevel || !window.isBossLevel()) {
        window.activeCharacter = window.activeCharacter === "player" ? "companion" : "player";
      }
    };
  }
  if (followBtn) {
    const toggleFollow = ()=>{
      window.followEnabled = !window.followEnabled;
      if (window.followEnabled) followBtn.classList.add('active');
      else followBtn.classList.remove('active');
    };
    followBtn.ontouchstart = toggleFollow;
  }

  // Джойстик стрельбы (справа, под кнопкой прыжка) - создан с нуля
  let shootJoystickActive = false;
  let shootJoystickCenterX = 0;
  let shootJoystickCenterY = 0;
  let shootJoystickRadius = 0;
  let shootDirectionX = 0;
  let shootDirectionY = 0;
  let currentTouchId = null;

  function initShootJoystick() {
    if (!shootJoystick || !shootJoystickStick) return;
    
    const rect = shootJoystick.getBoundingClientRect();
    shootJoystickCenterX = rect.left + rect.width / 2;
    shootJoystickCenterY = rect.top + rect.height / 2;
    shootJoystickRadius = Math.min(rect.width, rect.height) / 2 - 32; // минус половина ширины ручки
  }

  function updateShootJoystickPosition(clientX, clientY) {
    if (!shootJoystick || !shootJoystickStick) return;
    
    // Пересчитываем центр при каждом обновлении (на случай изменения размера)
    const rect = shootJoystick.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = Math.min(rect.width, rect.height) / 2 - 32;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);
    
    let stickX = deltaX;
    let stickY = deltaY;
    
    // Ограничиваем кругом
    if (distance > radius) {
      stickX = (deltaX / distance) * radius;
      stickY = (deltaY / distance) * radius;
    }
    
    // Обновляем визуальное положение
    shootJoystickStick.style.transform = `translate(calc(-50% + ${stickX}px), calc(-50% + ${stickY}px))`;
    
    // Нормализуем направление для стрельбы
    const finalDistance = Math.hypot(stickX, stickY);
    if (finalDistance > 3) {
      shootDirectionX = stickX / finalDistance;
      shootDirectionY = stickY / finalDistance;
    } else {
      shootDirectionX = 0;
      shootDirectionY = 0;
    }
  }

  function resetShootJoystick() {
    shootJoystickActive = false;
    currentTouchId = null;
    if (shootJoystick) shootJoystick.classList.remove('active');
    if (shootJoystickStick) {
      shootJoystickStick.style.transform = 'translate(-50%, -50%)';
    }
    shootDirectionX = 0;
    shootDirectionY = 0;
  }

  // Обработка мыши
  if (shootJoystick) {
    shootJoystick.onmousedown = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!window.isBossLevel || !window.isBossLevel()) return;
      shootJoystickActive = true;
      shootJoystick.classList.add('active');
      initShootJoystick();
      updateShootJoystickPosition(e.clientX, e.clientY);
    };
  }

  document.addEventListener('mousemove', function(e) {
    if (shootJoystickActive && shootJoystick) {
      e.preventDefault();
      updateShootJoystickPosition(e.clientX, e.clientY);
    }
  });

  document.addEventListener('mouseup', function(e) {
    if (shootJoystickActive) {
      resetShootJoystick();
    }
  });

  // Обработка касаний
  if (shootJoystick) {
    shootJoystick.ontouchstart = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!window.isBossLevel || !window.isBossLevel()) return;
      if (currentTouchId !== null) return; // Уже обрабатываем касание
      
      const touch = e.touches[0];
      currentTouchId = touch.identifier;
      shootJoystickActive = true;
      shootJoystick.classList.add('active');
      initShootJoystick();
      updateShootJoystickPosition(touch.clientX, touch.clientY);
    };

    shootJoystick.ontouchmove = function(e) {
      if (!shootJoystickActive || currentTouchId === null) return;
      e.preventDefault();
      e.stopPropagation();
      
      // Находим нужное касание
      let touch = null;
      for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].identifier === currentTouchId) {
          touch = e.touches[i];
          break;
        }
      }
      
      if (touch) {
        updateShootJoystickPosition(touch.clientX, touch.clientY);
      }
    };

    shootJoystick.ontouchend = function(e) {
      if (currentTouchId === null) return;
      e.preventDefault();
      e.stopPropagation();
      
      // Проверяем, закончилось ли наше касание
      let touchEnded = true;
      for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].identifier === currentTouchId) {
          touchEnded = false;
          break;
        }
      }
      
      if (touchEnded) {
        resetShootJoystick();
      }
    };

    shootJoystick.ontouchcancel = function(e) {
      if (currentTouchId === null) return;
      e.preventDefault();
      e.stopPropagation();
      resetShootJoystick();
    };
  }

  // Экспортируем направление стрельбы для game.js
  window.getShootDirection = function() {
    if (!shootJoystickActive || !window.isBossLevel || !window.isBossLevel()) {
      return { x: 0, y: 0 };
    }
    return { x: shootDirectionX, y: shootDirectionY };
  };

  // Инициализация при загрузке
  window.addEventListener('load', function() {
    if (shootJoystickStick) {
      shootJoystickStick.style.transform = 'translate(-50%, -50%)';
    }
    initShootJoystick();
  });

})();

