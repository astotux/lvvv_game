(function(){
  window.drawFrame = function(){
    ctx.clearRect(0,0,viewW,viewH);
    
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    
    drawBackground();
    drawDecorationsUndoPlatform();
    let lvl = levels[currentLevel];
      lvl.traps.forEach(t=>{
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(imgTrap, t.x - cameraX, t.y, t.w, t.h);
      });
    const platforms = getPlatformsArray(lvl);
    platforms.forEach(p=>{
      const platformX = p.x - cameraX;
      const platformY = p.y;
      const platformW = p.w;
      const platformH = p.h;
      
      let textureImg = imgPlatformGrass;
      if (p.type === "bouncy") textureImg = imgPlatformSlime;
      else if (p.texture === "grass") textureImg = imgPlatformGrass;
      else if (p.texture === "stone") textureImg = imgPlatformStone;
      else if (p.texture === "stone2") textureImg = imgPlatformStone2;
      else if (p.texture === "wood") textureImg = imgPlatformWood;
      else if (p.texture === "house") textureImg = imgPlatformHouse;
      else if (p.texture === "danger_platform") textureImg = imgPlatformDanger;
      
      const textureW = textureImg.width;
      const textureH = textureImg.height;
      
      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = 'high';
      
      for (let x = 0; x < platformW; x += textureW) {
        for (let y = 0; y < platformH; y += textureH) {
          const drawW = Math.min(textureW, platformW - x);
          const drawH = Math.min(textureH, platformH - y);
          
          ctx.drawImage(
            textureImg,
            0, 0, drawW, drawH,
            platformX + x, platformY + y, drawW, drawH
          );
        }
      }
    });
    if (lvl.walls) {
      lvl.walls.forEach(w=>{
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
    if (lvl.doors) {
      lvl.doors.forEach(d=>{
        if (d.open) return;
        const textureImg = d.texture === 'wood' ? imgPlatformWood : (d.texture === 'grass' ? imgPlatformGrass : imgDoorDanger);
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
    drawDecorationsUndo();

    drawCoins();

    // На босс-уровне не рисуем финишный флаг
    if (!(window.isBossLevel && window.isBossLevel())) {
      let f = lvl.finish;
      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(imgFinish, f.x - cameraX, f.y, f.w, f.h);
    }
    
    drawPlayer();
    
    drawCompanion();
    drawEnemies();

    // Рисуем босса, его снаряды и полоску HP только на босс-уровне
    if (window.isBossLevel && window.isBossLevel()) {
      // Снаряды игрока и босса
      if (typeof playerProjectiles !== "undefined" && playerProjectiles.length) {
        playerProjectiles.forEach(p => {
          ctx.imageSmoothingEnabled = false;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(
            imgBossOrb,
            p.x - cameraX,
            p.y,
            p.w,
            p.h
          );
        });
      }
      if (typeof bossProjectiles !== "undefined" && bossProjectiles.length) {
        bossProjectiles.forEach(p => {
          ctx.imageSmoothingEnabled = false;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(
            imgBossOrb,
            p.x - cameraX,
            p.y,
            p.w,
            p.h
          );
        });
      }

      // Сам босс
      if (typeof bossVisible !== "undefined" && bossVisible && typeof boss !== "undefined" && boss && bossHp > 0) {
        const b = boss;
        const state = bossState || "walk";
        const frame = bossFrame || 0;
        const dir = bossDirection || 1;

        const sprite = state === "attack" ? imgBossAttack : imgBossWalk;
        const frames = state === "attack" ? 5 : 7;
        const frameW = sprite.width / frames;
        const frameH = sprite.height;
        const frameX = frame * frameW;

        const drawX = b.x - cameraX;
        const drawY = b.y;

        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'high';

        if (dir === -1) {
          ctx.save();
          ctx.scale(-1, 1);
          ctx.drawImage(
            sprite,
            frameX, 0, frameW, frameH,
            -(drawX + b.w), drawY, b.w, b.h
          );
          ctx.restore();
        } else {
          ctx.drawImage(
            sprite,
            frameX, 0, frameW, frameH,
            drawX, drawY, b.w, b.h
          );
        }
      }

      // Полоска HP босса сверху экрана
      if (typeof bossMaxHp !== "undefined" && typeof bossHp !== "undefined" && bossMaxHp > 0) {
        const ratio = Math.max(0, Math.min(1, bossHp / bossMaxHp));
        const barW = 300;
        const barH = 12;
        const x = (LOGIC_WIDTH - barW) / 2;
        const y = 16;

        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(x - 2, y - 2, barW + 4, barH + 4);

        ctx.fillStyle = "#444";
        ctx.fillRect(x, y, barW, barH);

        ctx.fillStyle = "#ff3344";
        ctx.fillRect(x, y, barW * ratio, barH);
      }
    }
    drawDecorations();

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

