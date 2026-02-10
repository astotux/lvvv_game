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
      const platformY = (typeof p.effectiveY !== "undefined" && p.effectiveY != null) ? p.effectiveY : p.y;
      const platformW = p.w;
      const platformH = p.h;
      const disappearProgress = (typeof p.disappearProgress !== "undefined" && p.disappearProgress != null) ? Math.min(1, p.disappearProgress) : 0;
      
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
      
      if (disappearProgress > 0) ctx.save();
      if (disappearProgress > 0) ctx.globalAlpha = 1 - disappearProgress;
      
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
      
      if (disappearProgress > 0) ctx.restore();
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
    
    if (typeof drawParticles === "function") drawParticles();
    drawPlayer();
    drawCompanion();
    drawEnemies();

    // Рисуем босса, его снаряды и полоску HP только на босс-уровне
    if (window.isBossLevel && window.isBossLevel()) {
      // Снаряды игрока (монетки) и босса (шары)
      if (typeof playerProjectiles !== "undefined" && playerProjectiles.length) {
        playerProjectiles.forEach(p => {
          ctx.imageSmoothingEnabled = false;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(
            imgCoin,
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

      // Сам босс (включая анимацию появления с масштабом)
      const bossAppearTimer = typeof window.bossAppearTimer !== "undefined" ? window.bossAppearTimer : 0;
      const showBoss = typeof boss !== "undefined" && boss && bossHp > 0 && (bossVisible || bossAppearTimer > 0);
      if (showBoss) {
        const b = boss;
        const state = bossState || "walk";
        const frame = bossFrame || 0;
        const dir = bossDirection || 1;

        const sprite = state === "attack" ? imgBossAttack : imgBossWalk;
        const frames = state === "attack" ? 5 : 7;
        const frameW = sprite.width / frames;
        const frameH = sprite.height;
        const frameX = frame * frameW;

        const centerX = b.x + b.w / 2 - cameraX;
        const centerY = b.y + b.h / 2;
        const drawX = b.x - cameraX;
        const drawY = b.y;

        const appearScale = bossAppearTimer > 0 ? 1 - bossAppearTimer / 55 : 1;

        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'high';

        if (appearScale < 1) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.scale(appearScale, appearScale);
          ctx.translate(-centerX, -centerY);
        }

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

        if (appearScale < 1) ctx.restore();
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

      // Полоска HP игрока по центру снизу (только на босс-уровне)
      if (typeof window.playerBossMaxHp !== "undefined" && window.playerBossMaxHp > 0) {
        const segments = window.playerBossMaxHp;
        const current = Math.max(0, Math.min(window.playerBossHp || 0, segments));
        const barW = 140;
        const barH = 10;
        const x = (LOGIC_WIDTH - barW) / 2;
        const y = LOGIC_HEIGHT - barH - 20;

        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(x - 2, y - 2, barW + 4, barH + 4);

        const segmentW = barW / segments;
        for (let i = 0; i < segments; i++) {
          const sx = x + i * segmentW;
          ctx.fillStyle = "#444";
          ctx.fillRect(sx + 1, y, segmentW - 2, barH);
          if (i < current) {
            ctx.fillStyle = "#2fd06a";
            ctx.fillRect(sx + 1, y, segmentW - 2, barH);
          }
        }
      }

      // Эффект вспышки экрана при смерти босса в третьей фазе
      if (typeof window.bossDeath !== "undefined" && window.bossDeath && typeof window.bossDeathTimer === "number") {
        const t = Math.min(window.bossDeathTimer / 120, 1);
        // Пульсирующая белая вспышка, затухающая к концу
        const alpha = 0.6 * (1 - t) * (1 + 0.3 * Math.sin(t * Math.PI * 4));
        if (alpha > 0.02) {
          ctx.save();
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.fillRect(0, 0, LOGIC_WIDTH, LOGIC_HEIGHT);
          ctx.restore();
        }
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

