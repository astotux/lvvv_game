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
  const jumpBtn = document.getElementById("jump");
  const switchBtn = document.getElementById("switch");
  const followBtn = document.getElementById("follow");

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
      window.activeCharacter = window.activeCharacter === "player" ? "companion" : "player";
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
})();

