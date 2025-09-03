(function(){
  // Платформы + открытые динамические
  window.getPlatformsArray = function(lvl){
    let arr = (lvl.platforms||[]).slice();
    if (lvl.dynamicPlatforms) {
      lvl.dynamicPlatforms.forEach(dp=>{ if(dp.open) arr.push(dp); });
    }
    return arr;
  };

  // Боковые препятствия: стены + закрытые двери
  window.getObstaclesArray = function(lvl){
    let arr = (lvl.walls||[]).slice();
    if (lvl.doors) {
      lvl.doors.forEach(d=>{ if(!d.open) arr.push(d); });
    }
    return arr;
  };

  // Поверхности для приземления: платформы + стены + закрытые двери
  window.getGroundArray = function(lvl){
    let arr = window.getPlatformsArray(lvl);
    if (lvl.walls) arr = arr.concat(lvl.walls);
    if (lvl.doors) arr = arr.concat(lvl.doors.filter(d=>!d.open));
    return arr;
  };

  // Обновление кнопок и связанных динамик/дверей
  window.processSwitchesAndDynamics = function(){
    const lvl = window.levels[window.currentLevel];
    if(!lvl || !lvl.switches) return;
    lvl.switches.forEach(sw=>{ sw.pressed = false; });
    const entities = [
      {x: window.player.x, y: window.player.y, w: window.player.w, h: window.player.h},
      {x: window.companion.x, y: window.companion.y, w: window.companion.w, h: window.companion.h}
    ];
    lvl.switches.forEach(sw=>{
      for (let e of entities){
        if (e.x < sw.x + sw.w && e.x + e.w > sw.x && e.y < sw.y + sw.h && e.y + e.h > sw.y) {
          sw.pressed = true;
          break;
        }
      }
    });
    if (lvl.dynamicPlatforms) {
      lvl.dynamicPlatforms.forEach(dp=>{
        const related = lvl.switches.filter(sw=> sw.group === dp.group);
        if (related.length === 0) return;
        const anyPressed = related.some(sw=> sw.pressed);
        if (dp.mode === 'hold') dp.open = anyPressed; else if (anyPressed) dp.open = true;
      });
    }
    if (lvl.doors) {
      lvl.doors.forEach(door=>{
        const related = lvl.switches.filter(sw=> sw.group === door.group);
        if (related.length === 0) return;
        const anyPressed = related.some(sw=> sw.pressed);
        if (door.mode === 'hold') door.open = anyPressed; else if (anyPressed) door.open = true;
      });
    }
  };
})();


