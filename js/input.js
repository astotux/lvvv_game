(function(){
  // Функция прыжка доступна глобально
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

  // Клавиатура
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

  // Кнопки на экране
  const leftBtn = document.getElementById("left");
  const rightBtn = document.getElementById("right");
  const jumpBtn = document.getElementById("jump");
  const switchBtn = document.getElementById("switch");
  const followBtn = document.getElementById("follow");

  if (leftBtn) {
    leftBtn.onmousedown = ()=>{ window.keys.left = true; };
    leftBtn.onmouseup = ()=>{ window.keys.left = false; };
    leftBtn.ontouchstart = ()=>{ window.keys.left = true; };
    leftBtn.ontouchend = ()=>{ window.keys.left = false; };
  }
  if (rightBtn) {
    rightBtn.onmousedown = ()=>{ window.keys.right = true; };
    rightBtn.onmouseup = ()=>{ window.keys.right = false; };
    rightBtn.ontouchstart = ()=>{ window.keys.right = true; };
    rightBtn.ontouchend = ()=>{ window.keys.right = false; };
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
    followBtn.onmousedown = toggleFollow;
    followBtn.ontouchstart = toggleFollow;
  }
})();


