(function(){
  window.drawFrame = function(){
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
    const platforms = getPlatformsArray(lvl);
    platforms.forEach(p=>{
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
    // стены
    if (lvl.walls) {
      lvl.walls.forEach(w=>{
        // рисуем как камень по умолчанию
        const textureImg = w.texture === 'wood' ? imgPlatformWood : (w.texture === 'grass' ? imgPlatformGrass : imgPlatformStone);
        const textureW = textureImg.width;
        const textureH = textureImg.height;
        for (let x = 0; x < w.w; x += textureW) {
          for (let y = 0; y < w.h; y += textureH) {
            const drawW = Math.min(textureW, w.w - x);
            const drawH = Math.min(textureH, w.h - y);
            ctx.drawImage(textureImg, 0, 0, drawW, drawH, w.x - cameraX + x, w.y + y, drawW, drawH);
          }
        }
      });
    }
    // двери
    if (lvl.doors) {
      lvl.doors.forEach(d=>{
        if (d.open) return; // открытая дверь невидима и проходима
        const textureImg = d.texture === 'wood' ? imgPlatformWood : (d.texture === 'grass' ? imgPlatformGrass : imgPlatformStone2);
        const textureW = textureImg.width;
        const textureH = textureImg.height;
        for (let x = 0; x < d.w; x += textureW) {
          for (let y = 0; y < d.h; y += textureH) {
            const drawW = Math.min(textureW, d.w - x);
            const drawH = Math.min(textureH, d.h - y);
            ctx.drawImage(textureImg, 0, 0, drawW, drawH, d.x - cameraX + x, d.y + y, drawW, drawH);
          }
        }
      });
    }
    // кнопки-свитчи
    if (lvl.switches) {
      lvl.switches.forEach(sw=>{
        const img = sw.pressed ? imgButtonActive : imgButton;
        const drawW = sw.w || img.width || 26;
        const drawH = sw.pressed ? (sw.hActive || 7) : (sw.h || 11);
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, sw.x - cameraX, sw.y, drawW, drawH);
      });
    }
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

    // Масштабированная отрисовка offscreen на экранный канвас
    const scale = Math.min(screenW / LOGIC_WIDTH, screenH / LOGIC_HEIGHT);
    const destW = Math.floor(LOGIC_WIDTH * scale);
    const destH = Math.floor(LOGIC_HEIGHT * scale);
    const dx = Math.floor((screenW - destW) / 2);
    const dy = Math.floor((screenH - destH) / 2);

    screenCtx.clearRect(0, 0, screenW, screenH);
    screenCtx.fillStyle = "#282825";
    screenCtx.fillRect(0, 0, screenW, screenH);
    screenCtx.imageSmoothingEnabled = false;
    screenCtx.imageSmoothingQuality = 'high';
    screenCtx.drawImage(offscreen, 0, 0, LOGIC_WIDTH, LOGIC_HEIGHT, dx, dy, destW, destH);
  };
})();


