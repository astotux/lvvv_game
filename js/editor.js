(function(){
  const canvas = document.getElementById('ed');
  const ctx = canvas.getContext('2d');
  let screenW = 0, screenH = 0;
  function resize(){
    const dpr = window.devicePixelRatio||1;
    screenW = canvas.clientWidth || canvas.parentElement.clientWidth;
    screenH = canvas.clientHeight || canvas.parentElement.clientHeight;
    canvas.width = Math.max(1, Math.floor(screenW * dpr));
    canvas.height = Math.max(1, Math.floor(screenH * dpr));
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
  }
  window.addEventListener('resize', resize);
  resize();

  let cameraX = 0, cameraY = 0, zoom = 1;
  const grid = 1;

  let level = {
    width: 3800,
    platforms: [],
    walls: [],
    switches: [],
    dynamicPlatforms: [],
    doors: [],
    traps: [],
    coins: [],
    finish: {x: 200, y: 300, w: 24, h: 63},
    gift: {title: "Новый уровень", desc: "Отличная работа!"},
    decorations: [],
    decorationsUndo: [],
    decorationsUndoPlatform: []
  };

  try {
    if (Array.isArray(window.levels) && window.levels[0]) {
      level.width = window.levels[0].width || level.width;
    }
  } catch(e){}

  const tools = [
    { id:'platform_grass', label:'Платформа grass', type:'platform', payload:{texture:'grass'} },
    { id:'platform_stone', label:'Платформа stone', type:'platform', payload:{texture:'stone'} },
    { id:'platform_stone2', label:'Платформа stone2', type:'platform', payload:{texture:'stone2'} },
    { id:'platform_wood', label:'Платформа wood', type:'platform', payload:{texture:'wood'} },
    { id:'trap', label:'Шипы', type:'trap' },
    { id:'coin', label:'Морошка', type:'coin' },
    { id:'wall', label:'Стена', type:'wall', payload:{texture:'stone'} },
    { id:'door', label:'Дверь', type:'door', payload:{texture:'danger_door', group:1, mode:'hold', open:false} },
    { id:'switch', label:'Кнопка', type:'switch', payload:{group:1} },
    { id:'dyn_plat', label:'Дин.платф.', type:'dynamicPlatform', payload:{texture:'danger_platform', group:1, mode:'hold', open:false} },
    { id:'finish', label:'Финиш', type:'finish' },
    { id:'decor_flower1', label:'Декор flower1', type:'decor', payload:{image:'flower1'} },
    { id:'decor_flower2', label:'Декор flower2', type:'decor', payload:{image:'flower2'} },
    { id:'decor_rock1', label:'Декор rock1', type:'decor', payload:{image:'rock1'} },
    { id:'decor_rock2', label:'Декор rock2', type:'decor', payload:{image:'rock2'} },
    { id:'decor_grass1', label:'Декор grass1', type:'decor', payload:{image:'grass1'} },
    { id:'decor_bush', label:'Декор bush', type:'decor', payload:{image:'bush'} },
    { id:'decor_three', label:'Декор three', type:'decor', payload:{image:'three'} },
    { id:'decor_alert', label:'Декор alert', type:'decor', payload:{image:'alert'} }
  ];

  const toolGrid = document.getElementById('toolGrid');
  let currentTool = tools[0];
  function renderPalette(){
    toolGrid.innerHTML = '';
    tools.forEach(t=>{
      const d = document.createElement('div');
      d.className = 'tile' + (t===currentTool?' active':'');
      d.textContent = t.label;
      d.title = t.label;
      d.onclick = ()=>{ currentTool=t; applyBrushFromTool(currentTool); renderPalette(); };
      toolGrid.appendChild(d);
    });
  }
  renderPalette();

  const brushWEl = document.getElementById('brushW');
  const brushHEl = document.getElementById('brushH');
  function getBrushSize(){
    return { w: Math.max(1, parseInt(brushWEl.value||'1',10)), h: Math.max(1, parseInt(brushHEl.value||'1',10)) };
  }

  function applyBrushFromTool(tool){
    const size = getDefaultSizeForTool(tool);
    if (!size) return;
    if (typeof size.w === 'number') brushWEl.value = String(Math.max(1, Math.round(size.w)));
    if (typeof size.h === 'number') brushHEl.value = String(Math.max(1, Math.round(size.h)));
  }
  function getDefaultSizeForTool(tool){
    if (!tool) return null;
    let img = null;
    switch (tool.type){
      case 'platform':
        img = pickPlatformTexture(tool.payload && tool.payload.texture);
        return { w: (img && img.width) || 100, h: (img && img.height) || 20 };
      case 'wall':
        img = pickPlatformTexture((tool.payload && tool.payload.texture) || 'stone');
        return { w: (img && img.width) || 40, h: (img && img.height) || 120 };
      case 'door': {
        const tex = tool.payload && tool.payload.texture;
        if (tex === 'wood') img = window.imgPlatformWood;
        else if (tex === 'grass') img = window.imgPlatformGrass;
        else img = window.imgDoorDanger;
        return { w: (img && img.width) || 24, h: (img && img.height) || 63 };
      }
      case 'switch':
        img = window.imgButton; return { w: (img && img.width) || 26, h: (img && img.height) || 11 };
      case 'dynamicPlatform':
        img = pickPlatformTexture((tool.payload && tool.payload.texture) || 'danger_platform');
        return { w: (img && img.width) || 111, h: (img && img.height) || 22 };
      case 'trap':
        img = window.imgTrap; return { w: (img && img.width) || 20, h: (img && img.height) || 22 };
      case 'coin':
        img = window.imgCoin; return { w: (img && img.width) || 20, h: (img && img.height) || 20 };
      case 'finish':
        img = window.imgFinish; return { w: (img && img.width) || 24, h: (img && img.height) || 63 };
      case 'decor':
        img = pickDecor(tool.payload && tool.payload.image);
        return { w: (img && img.width) || 32, h: (img && img.height) || 32 };
      default:
        return null;
    }
  }

  const inpWidth = document.getElementById('inpWidth');
  const btnNew = document.getElementById('btnNew');
  const btnClear = document.getElementById('btnClear');
  const btnExport = document.getElementById('btnExport');
  const out = document.getElementById('out');
  const inText = document.getElementById('in');
  const btnImport = document.getElementById('btnImport');
  const inpLevelIndex = document.getElementById('inpLevelIndex');
  const btnImportFromGame = document.getElementById('btnImportFromGame');
  const btnFit = document.getElementById('btnFit');
  const coordEl = document.getElementById('coord');
  inpWidth.addEventListener('change', ()=>{ level.width = Math.max(200, parseInt(inpWidth.value||'200',10)); draw(); });
  btnNew.onclick = ()=>{ resetLevel(); draw(); };
  btnClear.onclick = ()=>{ clearActiveLayer(); draw(); };
  btnExport.onclick = ()=>{ out.value = exportLevelJSON(level); out.select(); document.execCommand('copy'); };
  btnFit.onclick = ()=>{ fitToLevel(); draw(); };
  btnImport.onclick = ()=>{ tryImportFromText(); };
  btnImportFromGame.onclick = ()=>{ tryImportFromLevelsArray(); };

  function resetLevel(){
    level = { width: Math.max(200, parseInt(inpWidth.value||'3800',10)), platforms: [], walls: [], doors: [], switches: [], dynamicPlatforms: [], traps: [], coins: [], finish: {x:200,y:300,w:24,h:63}, gift:{title:"Новый уровень", desc:"Отличная работа!"}, decorations: [], decorationsUndo: [], decorationsUndoPlatform: [] };
  }
  function normalizeLevel(obj){
    const safe = {
      width: Math.max(200, Number(obj.width)||3800),
      platforms: Array.isArray(obj.platforms)? obj.platforms:[],
      walls: Array.isArray(obj.walls)? obj.walls:[],
      doors: Array.isArray(obj.doors)? obj.doors:[],
      switches: Array.isArray(obj.switches)? obj.switches:[],
      dynamicPlatforms: Array.isArray(obj.dynamicPlatforms)? obj.dynamicPlatforms:[],
      traps: Array.isArray(obj.traps)? obj.traps:[],
      coins: Array.isArray(obj.coins)? obj.coins:[],
      finish: obj.finish && typeof obj.finish==='object' ? obj.finish : {x:200,y:300,w:24,h:63},
      gift: obj.gift && typeof obj.gift==='object' ? obj.gift : {title:"Импортированный уровень", desc:"Удачи!"},
      decorations: Array.isArray(obj.decorations)? obj.decorations:[],
      decorationsUndo: Array.isArray(obj.decorationsUndo)? obj.decorationsUndo:[],
      decorationsUndoPlatform: Array.isArray(obj.decorationsUndoPlatform)? obj.decorationsUndoPlatform:[]
    };
    safe.platforms.forEach(p=>{ if (p.texture==null) p.texture='grass'; });
    safe.walls.forEach(w=>{ if (w.texture==null) w.texture='stone'; });
    safe.doors.forEach(d=>{ if (d.texture==null) d.texture='danger_door'; if (d.group==null) d.group=1; if (d.mode==null) d.mode='hold'; d.open = !!d.open; });
    safe.switches.forEach(s=>{ if (s.w==null) s.w=26; if (s.h==null) s.h=11; if (s.group==null) s.group=1; });
    safe.dynamicPlatforms.forEach(dp=>{ if (dp.texture==null) dp.texture='danger_platform'; if (dp.group==null) dp.group=1; if (dp.mode==null) dp.mode='hold'; dp.open = !!dp.open; });
    safe.traps.forEach(t=>{ if (t.w==null) t.w=20; if (t.h==null) t.h=22; });
    safe.coins.forEach(c=>{ if (c.w==null) c.w=20; if (c.h==null) c.h=20; if (c.collected==null) c.collected=false; });
    safe.decorations.forEach(d=>{ if (d.image==null) d.image='flower1'; });
    safe.decorationsUndo.forEach(d=>{ if (d.image==null) d.image='flower1'; });
    safe.decorationsUndoPlatform.forEach(d=>{ if (d.image==null) d.image='flower1'; });
    return safe;
  }
  function tryImportFromText(){
    const txt = (inText.value||'').trim();
    if (!txt) return;
    try {
      const obj = JSON.parse(txt);
      level = normalizeLevel(obj);
      inpWidth.value = String(level.width);
      draw();
    } catch(e){
      try {
        const val = Function('return ('+txt+')')();
        level = normalizeLevel(val);
        inpWidth.value = String(level.width);
        draw();
      } catch(_){}
    }
  }
  function tryImportFromLevelsArray(){
    try {
      const idx = Math.max(0, parseInt(inpLevelIndex.value||'0',10));
      if (Array.isArray(window.levels) && window.levels[idx]){
        level = normalizeLevel(window.levels[idx]);
        inpWidth.value = String(level.width);
        draw();
      }
    } catch(e){}
  }
  function clearActiveLayer(){
    switch(currentTool.type){
      case 'platform': level.platforms = []; break;
      case 'wall': level.walls = []; break;
      case 'door': level.doors = []; break;
      case 'switch': level.switches = []; break;
      case 'dynamicPlatform': level.dynamicPlatforms = []; break;
      case 'trap': level.traps = []; break;
      case 'coin': level.coins = []; break;
      case 'decor': level.decorations = []; level.decorationsUndo = []; level.decorationsUndoPlatform = []; break;
      case 'finish': break;
    }
  }

  let isPanning = false; let panStartX=0, panStartY=0; let camStartX=0, camStartY=0;
  canvas.addEventListener('mousedown', (e)=>{
    if (e.button === 1 || e.shiftKey) {
      isPanning = true; panStartX = e.clientX; panStartY = e.clientY; camStartX = cameraX; camStartY = cameraY; return;
    }
    const world = screenToWorld(e.offsetX, e.offsetY);
    if (e.button === 2) { removeAt(world.x, world.y); draw(); return; }
    placeAt(world.x, world.y); draw();
  });
  canvas.addEventListener('mousemove', (e)=>{
    if (isPanning){ cameraX = camStartX - (e.clientX - panStartX)/zoom; cameraY = camStartY - (e.clientY - panStartY)/zoom; draw(); }
  });
  window.addEventListener('mouseup', ()=>{ isPanning = false; });
  canvas.addEventListener('contextmenu', (e)=> e.preventDefault());
  canvas.addEventListener('wheel', (e)=>{
    if (e.ctrlKey) {
      const mz = Math.max(0.25, Math.min(4, zoom * (e.deltaY < 0 ? 1.1 : 0.9)));
      zoom = mz; draw();
    } else {
      const sz = getBrushSize();
      if (e.shiftKey) {
        if (e.deltaY < 0) { brushHEl.value = String(sz.h + 1); } else { brushHEl.value = String(Math.max(1, sz.h - 1)); }
      } else {
        if (e.deltaY < 0) { brushWEl.value = String(sz.w + 5); } else { brushWEl.value = String(Math.max(1, sz.w - 5)); }
      }
      draw();
    }
  }, { passive: true });

  function screenToWorld(sx, sy){
    const x = cameraX + sx/zoom; const y = cameraY + sy/zoom; return { x: snap(x), y: snap(y) };
  }
  function snap(v){ return Math.round(v / grid) * grid; }

  function placeAt(x, y){
    const { w, h } = getBrushSize();
    switch(currentTool.type){
      case 'platform': level.platforms.push({ x, y, w, h, texture: currentTool.payload.texture }); break;
      case 'wall': level.walls.push({ x, y, w, h, texture: currentTool.payload.texture }); break;
      case 'door': level.doors.push({ x, y, w, h, texture: currentTool.payload.texture, group: currentTool.payload.group, mode: currentTool.payload.mode, open:false }); break;
      case 'switch': level.switches.push({ x, y, w: 26, h: 11, group: currentTool.payload.group }); break;
      case 'dynamicPlatform': level.dynamicPlatforms.push({ x, y, w, h, texture: currentTool.payload.texture, group: currentTool.payload.group, mode: currentTool.payload.mode, open:false }); break;
      case 'trap': level.traps.push({ x, y, w: 20, h: 22 }); break;
      case 'coin': level.coins.push({ x, y, w: 20, h: 20, collected: false }); break;
      case 'finish': level.finish = { x, y, w: 24, h: 63 }; break;
      case 'decor': level.decorations.push({ x, y, w, h, image: currentTool.payload.image }); break;
    }
  }
  function removeAt(x, y){
    function removeFrom(arr){
      for (let i=arr.length-1;i>=0;i--){ const o=arr[i]; if (x>=o.x && x<=o.x+o.w && y>=o.y && y<=o.y+o.h){ arr.splice(i,1); return true; } }
      return false;
    }
    switch(currentTool.type){
      case 'platform': removeFrom(level.platforms); break;
      case 'wall': removeFrom(level.walls); break;
      case 'door': removeFrom(level.doors); break;
      case 'switch': removeFrom(level.switches); break;
      case 'dynamicPlatform': removeFrom(level.dynamicPlatforms); break;
      case 'trap': removeFrom(level.traps); break;
      case 'coin': removeFrom(level.coins); break;
      case 'decor': if(!removeFrom(level.decorations)) if(!removeFrom(level.decorationsUndo)) removeFrom(level.decorationsUndoPlatform); break;
      case 'finish': break;
    }
  }

  function fitToLevel(){
    cameraX = 0; cameraY = 0; zoom = Math.max(0.25, Math.min(2, (canvas.clientWidth||screenW) / Math.max(1, level.width)));
  }

  function draw(){
    ctx.clearRect(0,0,screenW,screenH);
    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.translate(-cameraX, -cameraY);

    ctx.fillStyle = '#111';
    ctx.fillRect(cameraX-1000, cameraY-1000, screenW/zoom+2000, screenH/zoom+2000);

    ctx.fillStyle = '#202020';
    ctx.fillRect(0, 0, Math.max(level.width, 1), C.LOGIC_HEIGHT);

    drawPlatforms(level.platforms);
    drawWalls(level.walls);
    drawDoors(level.doors);
    drawDynamicPlatforms(level.dynamicPlatforms);

    level.switches.forEach(sw=>{ ctx.drawImage(window.imgButton || new Image(), sw.x, sw.y, sw.w||26, sw.h||11); });

    level.traps.forEach(t=>{ ctx.drawImage(window.imgTrap || new Image(), t.x, t.y, t.w, t.h); });
    level.coins.forEach(c=>{ ctx.drawImage(window.imgCoin || new Image(), c.x, c.y, c.w, c.h); });
    const f = level.finish; if (f) ctx.drawImage(window.imgFinish || new Image(), f.x, f.y, f.w, f.h);

    drawDecorArray(level.decorationsUndoPlatform);
    drawDecorArray(level.decorationsUndo);
    drawDecorArray(level.decorations);

    const mx = lastMouse.x, my = lastMouse.y;
    if (mx !== null) {
      const world = screenToWorld(mx, my);
      const { w, h } = getBrushSize();
      ctx.fillStyle = 'rgba(100,200,255,0.25)';
      ctx.fillRect(world.x, world.y, w, h);
      ctx.strokeStyle = 'rgba(100,200,255,0.65)';
      ctx.strokeRect(world.x+0.5, world.y+0.5, w-1, h-1);
    }

    ctx.strokeStyle = '#555';
    ctx.strokeRect(0.5, 0.5, Math.max(level.width,1)-1, C.LOGIC_HEIGHT-1);

    ctx.restore();
  }

  function drawPlatforms(arr){
    arr.forEach(p=>{
      const tex = pickPlatformTexture(p.texture);
      if (tex && tex.width && tex.height){
        tileRect(tex, p.x, p.y, p.w, p.h);
      } else {
        ctx.fillStyle = '#4d7'; ctx.fillRect(p.x, p.y, p.w, p.h);
      }
    });
  }
  function drawWalls(arr){
    arr.forEach(w=>{
      const tex = pickPlatformTexture(w.texture||'stone');
      if (tex && tex.width && tex.height){ tileRect(tex, w.x, w.y, w.w, w.h); }
      else { ctx.fillStyle = '#888'; ctx.fillRect(w.x, w.y, w.w, w.h); }
    });
  }
  function drawDoors(arr){
    arr.forEach(d=>{
      if (d.open) return;
      const tex = (d.texture==='wood')? window.imgPlatformWood : (d.texture==='grass')? window.imgPlatformGrass : window.imgDoorDanger;
      if (tex && tex.width && tex.height){ tileRect(tex, d.x, d.y, d.w, d.h); }
      else { ctx.fillStyle = '#a44'; ctx.fillRect(d.x, d.y, d.w, d.h); }
    });
  }
  function drawDynamicPlatforms(arr){
    arr.forEach(p=>{
      const tex = pickPlatformTexture(p.texture||'danger_platform');
      if (!p.open) { ctx.save(); ctx.globalAlpha = 0.6; }
      if (tex && tex.width && tex.height){ tileRect(tex, p.x, p.y, p.w, p.h); }
      else { ctx.fillStyle = '#c77'; ctx.fillRect(p.x, p.y, p.w, p.h); }
      if (!p.open) { ctx.restore(); }
    });
  }
  function drawDecorArray(arr){
    arr.forEach(dec=>{
      const img = pickDecor(dec.image);
      if (img && img.width) ctx.drawImage(img, dec.x, dec.y, dec.w, dec.h);
      else { ctx.fillStyle = '#6a6'; ctx.fillRect(dec.x, dec.y, dec.w, dec.h); }
    });
  }

  function tileRect(img, x, y, w, h){
    const tw = img.width||32, th = img.height||32;
    for (let ix=0; ix<w; ix+=tw){
      for (let iy=0; iy<h; iy+=th){
        const dw = Math.min(tw, w-ix), dh = Math.min(th, h-iy);
        ctx.drawImage(img, 0,0,dw,dh, x+ix, y+iy, dw, dh);
      }
    }
  }

  function pickPlatformTexture(name){
    switch(name){
      case 'grass': return window.imgPlatformGrass;
      case 'stone': return window.imgPlatformStone;
      case 'stone2': return window.imgPlatformStone2;
      case 'wood': return window.imgPlatformWood;
      case 'danger_platform': return window.imgPlatformDanger;
      default: return window.imgPlatformGrass;
    }
  }
  function pickDecor(name){
    switch(name){
      case 'flower1': return window.imgFlower1;
      case 'flower2': return window.imgFlower2;
      case 'rock1': return window.imgRock1;
      case 'rock2': return window.imgRock2;
      case 'grass1': return window.imgGrass1;
      case 'bush': return window.imgBush;
      case 'mountain': return window.imgMountain;
      case 'three': return window.imgThree;
      case 'alert': return window.imgAlert;
      default: return null;
    }
  }

  function exportLevelJSON(lvl){
    const clone = JSON.parse(JSON.stringify(lvl));
    if (clone.dynamicPlatforms){ clone.dynamicPlatforms.forEach(p=>{ delete p.open; }); }
    if (clone.doors){ clone.doors.forEach(d=>{ delete d.open; }); }
    return JSON.stringify(clone, null, 2);
  }

  const lastMouse = { x: null, y: null };
  canvas.addEventListener('mousemove', (e)=>{ 
    lastMouse.x = e.offsetX; lastMouse.y = e.offsetY; 
    if (coordEl){ const w = screenToWorld(lastMouse.x, lastMouse.y); coordEl.textContent = `X: ${w.x} Y: ${w.y}`; }
    draw(); 
  });
  canvas.addEventListener('mouseleave', ()=>{ lastMouse.x = null; lastMouse.y = null; draw(); });

  fitToLevel();
  draw();
})();


