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
      const appearProgress = (typeof p.appearProgress !== "undefined" && p.appearProgress != null) ? Math.min(1, p.appearProgress) : 1;
      const alpha = disappearProgress > 0 ? (1 - disappearProgress) : appearProgress;
      const useAnim = alpha < 1 || disappearProgress > 0;
      
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
      
      if (useAnim) ctx.save();
      if (useAnim) ctx.globalAlpha = alpha;
      
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
      
      if (useAnim) ctx.restore();
    });
    // Исчезающие динамические платформы (уже убраны из списка коллизий, рисуем только анимацию)
    if (lvl.dynamicPlatforms) {
      lvl.dynamicPlatforms.forEach(dp => {
        if (dp.open === true) return;
        const disp = (dp.disappearProgress != null) ? Math.min(1, dp.disappearProgress) : 1;
        if (disp >= 1) return;
        const platformX = dp.x - cameraX;
        const platformY = (typeof dp.effectiveY !== "undefined" && dp.effectiveY != null) ? dp.effectiveY : dp.y;
        const platformW = dp.w;
        const platformH = dp.h;
        let textureImg = imgPlatformGrass;
        if (dp.type === "bouncy") textureImg = imgPlatformSlime;
        else if (dp.texture === "grass") textureImg = imgPlatformGrass;
        else if (dp.texture === "stone") textureImg = imgPlatformStone;
        else if (dp.texture === "stone2") textureImg = imgPlatformStone2;
        else if (dp.texture === "wood") textureImg = imgPlatformWood;
        else if (dp.texture === "house") textureImg = imgPlatformHouse;
        else if (dp.texture === "danger_platform") textureImg = imgPlatformDanger;
        const textureW = textureImg.width;
        const textureH = textureImg.height;
        ctx.save();
        ctx.globalAlpha = 1 - disp;
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'high';
        for (let x = 0; x < platformW; x += textureW) {
          for (let y = 0; y < platformH; y += textureH) {
            const drawW = Math.min(textureW, platformW - x);
            const drawH = Math.min(textureH, platformH - y);
            ctx.drawImage(textureImg, 0, 0, drawW, drawH, platformX + x, platformY + y, drawW, drawH);
          }
        }
        ctx.restore();
      });
    }
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
        const isOpen = d.open;
        const appearProgress = (d.appearProgress != null) ? Math.min(1, d.appearProgress) : (isOpen ? 0 : 1);
        const disappearProgress = (d.disappearProgress != null) ? Math.min(1, d.disappearProgress) : (isOpen ? 1 : 0);
        const drawWhenClosed = !isOpen && appearProgress > 0;
        const drawWhenOpening = isOpen && disappearProgress < 1;
        if (!drawWhenClosed && !drawWhenOpening) return;
        const alpha = isOpen ? (1 - disappearProgress) : appearProgress;
        const textureImg = d.texture === 'wood' ? imgPlatformWood : (d.texture === 'grass' ? imgPlatformGrass : imgDoorDanger);
        const textureW = textureImg.width;
        const textureH = textureImg.height;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'high';
        for (let x = 0; x < d.w; x += textureW) {
          for (let y = 0; y < d.h; y += textureH) {
            const drawW = Math.min(textureW, d.w - x);
            const drawH = Math.min(textureH, d.h - y);
            ctx.drawImage(textureImg, 0, 0, drawW, drawH, d.x - cameraX + x, d.y + y, drawW, drawH);
          }
        }
        ctx.restore();
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
    drawArtifacts();

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

      // Полоска HP босса сверху экрана — оформление
      if (typeof bossMaxHp !== "undefined" && typeof bossHp !== "undefined" && bossMaxHp > 0) {
        const ratio = Math.max(0, Math.min(1, bossHp / bossMaxHp));
        const barW = 320;
        const barH = 20;
        const padding = 6;
        const x = (LOGIC_WIDTH - barW) / 2;
        const y = 12;
        const totalW = barW + padding * 2;
        const totalH = barH + padding * 2;
        const boxX = x - padding;
        const boxY = y - padding;

        // Тень
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(boxX + 3, boxY + 3, totalW, totalH);

        // Внешняя обводка (тёмная)
        ctx.fillStyle = "#1a0a0a";
        ctx.fillRect(boxX, boxY, totalW, totalH);

        // Внутренняя рамка (бордовый)
        ctx.fillStyle = "#4a1515";
        ctx.fillRect(boxX + 2, boxY + 2, totalW - 4, totalH - 4);

        // Фон полоски (тёмно-красный)
        ctx.fillStyle = "#2a1010";
        ctx.fillRect(x, y, barW, barH);

        // Градиент заполнения HP
        const fillW = barW * ratio;
        if (fillW > 0) {
          const grd = ctx.createLinearGradient(x, 0, x + barW, 0);
          grd.addColorStop(0, "#cc2244");
          grd.addColorStop(0.5, "#ff4466");
          grd.addColorStop(1, "#aa2233");
          ctx.fillStyle = grd;
          ctx.fillRect(x, y, fillW, barH);
          // Лёгкий блик сверху
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          ctx.fillRect(x, y, fillW, 3);
        }

        // Подпись "ЁМА" прямо на полоске
        ctx.save();
        ctx.font = "bold 14px \"Pixelify Sans\", sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.strokeStyle = "#2a0810";
        ctx.lineWidth = 2;
        const labelBoss = "ЁМА";
        const labelBossW = ctx.measureText(labelBoss).width;
        const textX = (LOGIC_WIDTH - labelBossW) / 2;
        const textY = y + barH / 2;
        ctx.strokeText(labelBoss, textX, textY);
        ctx.fillText(labelBoss, textX, textY);
        ctx.restore();
      }

      // Полоска HP игрока по центру снизу — оформление (только на босс-уровне)
      if (typeof window.playerBossMaxHp !== "undefined" && window.playerBossMaxHp > 0) {
        const segments = window.playerBossMaxHp;
        const current = Math.max(0, Math.min(window.playerBossHp || 0, segments));
        const barW = 180;
        const barH = 18;
        const gap = 4;
        const segmentW = (barW - gap * (segments - 1)) / segments;
        const padding = 6;
        const x = (LOGIC_WIDTH - barW) / 2;
        const y = LOGIC_HEIGHT - barH - 28;
        const totalW = barW + padding * 2;
        const totalH = barH + padding * 2;
        const boxX = x - padding;
        const boxY = y - padding;

        // Тень
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(boxX + 3, boxY + 3, totalW, totalH);

        // Внешняя обводка (тёмная)
        ctx.fillStyle = "#0a1a0e";
        ctx.fillRect(boxX, boxY, totalW, totalH);

        // Внутренняя рамка (тёмно-зелёная)
        ctx.fillStyle = "#153a20";
        ctx.fillRect(boxX + 2, boxY + 2, totalW - 4, totalH - 4);

        // Фон каждого сегмента и заполненные сегменты
        for (let i = 0; i < segments; i++) {
          const sx = x + i * (segmentW + gap);
          ctx.fillStyle = "#1a2a1e";
          ctx.fillRect(sx, y, segmentW, barH);
          if (i < current) {
            const grd = ctx.createLinearGradient(sx, 0, sx + segmentW, 0);
            grd.addColorStop(0, "#2a8a4a");
            grd.addColorStop(0.5, "#3fd06a");
            grd.addColorStop(1, "#2a6a3a");
            ctx.fillStyle = grd;
            ctx.fillRect(sx, y, segmentW, barH);
            ctx.fillStyle = "rgba(255,255,255,0.12)";
            ctx.fillRect(sx, y, segmentW, 4);
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

