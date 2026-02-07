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
    background: "forest",
    platforms: [],
    walls: [],
    switches: [],
    dynamicPlatforms: [],
    doors: [],
    traps: [],
    coins: [],
    enemies: [],
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
    { id:'platform_house', label:'Платформа house', type:'platform', payload:{texture:'house'} },
    { id:'trap', label:'Шипы', type:'trap' },
    { id:'coin', label:'Морошка', type:'coin' },
    { id:'wall', label:'Стена', type:'wall', payload:{texture:'stone'} },
    { id:'door', label:'Дверь', type:'door', payload:{texture:'danger_door', group:1, mode:'hold', open:false} },
    { id:'switch', label:'Кнопка', type:'switch', payload:{group:1} },
    { id:'dyn_plat', label:'Дин.платф.', type:'dynamicPlatform', payload:{texture:'danger_platform', group:1, mode:'hold', open:false} },
    { id:'moving_platform', label:'Движ. платф.', type:'movingPlatform', payload:{texture:'danger_platform', distanceX:100, distanceY:0, speed:1} },
    { id:'slime_platform', label:'Слизь', type:'slimePlatform', payload:{texture:'slime_platform', bounceStrength:-22} },
    { id:'enemy', label:'Враг', type:'enemy' },
    { id:'finish', label:'Финиш', type:'finish' },
    { id:'decor_flower1', label:'Декор flower1', type:'decor', payload:{image:'flower1'} },
    { id:'decor_flower2', label:'Декор flower2', type:'decor', payload:{image:'flower2'} },
    { id:'decor_rock1', label:'Декор rock1', type:'decor', payload:{image:'rock1'} },
    { id:'decor_rock2', label:'Декор rock2', type:'decor', payload:{image:'rock2'} },
    { id:'decor_grass1', label:'Декор grass1', type:'decor', payload:{image:'grass1'} },
    { id:'decor_bush', label:'Декор bush', type:'decor', payload:{image:'bush'} },
    { id:'decor_three', label:'Декор three', type:'decor', payload:{image:'three'} },
    { id:'decor_alert', label:'Декор alert', type:'decor', payload:{image:'alert'} },
    { id:'decor_house1', label:'Декор house_1', type:'decor', payload:{image:'house_1'} },
    { id:'decor_house2', label:'Декор house_2', type:'decor', payload:{image:'house_2'} },
    { id:'decor_house_bg', label:'Декор house_bg', type:'decor', payload:{image:'house_bg'} },
    { id:'decor_bake', label:'Декор bake', type:'decor', payload:{image:'bake'} },
    { id:'decor_bench', label:'Декор bench', type:'decor', payload:{image:'bench'} },
    { id:'decor_clock', label:'Декор clock', type:'decor', payload:{image:'clock'} },
    { id:'decor_window', label:'Декор window', type:'decor', payload:{image:'window'} },
    { id:'decor_vis', label:'Декор vis', type:'decor', payload:{image:'vis'} },
    { id:'decor_vis2', label:'Декор vis2', type:'decor', payload:{image:'vis2'} },
    { id:'decor_vis3', label:'Декор vis3', type:'decor', payload:{image:'vis3'} },
    { id:'decor_vis4', label:'Декор vis4', type:'decor', payload:{image:'vis4'} },
    { id:'decor_vis5', label:'Декор vis5', type:'decor', payload:{image:'vis5'} },
    { id:'decor_vis6', label:'Декор vis6', type:'decor', payload:{image:'vis6'} },
    { id:'decor_vis7', label:'Декор vis7', type:'decor', payload:{image:'vis7'} },
    { id:'decor_vis8', label:'Декор vis8', type:'decor', payload:{image:'vis8'} },
    { id:'decor_vis9', label:'Декор vis9', type:'decor', payload:{image:'vis9'} },
    { id:'decor_vis10', label:'Декор vis10', type:'decor', payload:{image:'vis10'} },
    { id:'decor_vis11', label:'Декор vis11', type:'decor', payload:{image:'vis11'} },
    { id:'decor_vis12', label:'Декор vis12', type:'decor', payload:{image:'vis12'} },
    { id:'decor_vis13', label:'Декор vis13', type:'decor', payload:{image:'vis13'} },
    { id:'decor_vaz', label:'Декор vaz', type:'decor', payload:{image:'vaz'} },
    { id:'decor_vaz2', label:'Декор vaz2', type:'decor', payload:{image:'vaz2'} },
    { id:'decor_vaz3', label:'Декор vaz3', type:'decor', payload:{image:'vaz3'} },
    { id:'decor_vaz4', label:'Декор vaz4', type:'decor', payload:{image:'vaz4'} },
  ];

  const toolGrid = document.getElementById('toolGrid');
  let currentTool = tools[0];
  let decorLayer = 'decorations'; // Текущий слой для декораций
  const movingPlatformParams = document.getElementById('movingPlatformParams');
  const slimePlatformParams = document.getElementById('slimePlatformParams');
  const decorLayerParams = document.getElementById('decorLayerParams');
  const movingDistanceX = document.getElementById('movingDistanceX');
  const movingDistanceY = document.getElementById('movingDistanceY');
  const movingSpeed = document.getElementById('movingSpeed');
  const slimeBounceStrength = document.getElementById('slimeBounceStrength');
  const decorLayerSelect = document.getElementById('decorLayer');
  
  function renderPalette(){
    toolGrid.innerHTML = '';
    tools.forEach(t=>{
      const d = document.createElement('div');
      d.className = 'tile' + (t===currentTool?' active':'');
      d.textContent = t.label;
      d.title = t.label;
      d.onclick = ()=>{ 
        currentTool=t; 
        applyBrushFromTool(currentTool); 
        updateParamsVisibility();
        renderPalette(); 
      };
      toolGrid.appendChild(d);
    });
  }
  
  function updateParamsVisibility(){
    if (currentTool.type === 'movingPlatform') {
      movingPlatformParams.style.display = 'block';
      slimePlatformParams.style.display = 'none';
      decorLayerParams.style.display = 'none';
      if (currentTool.payload) {
        movingDistanceX.value = currentTool.payload.distanceX || 100;
        movingDistanceY.value = currentTool.payload.distanceY || 0;
        movingSpeed.value = currentTool.payload.speed || 1;
      }
    } else if (currentTool.type === 'slimePlatform') {
      movingPlatformParams.style.display = 'none';
      slimePlatformParams.style.display = 'block';
      decorLayerParams.style.display = 'none';
      if (currentTool.payload) {
        slimeBounceStrength.value = currentTool.payload.bounceStrength || -22;
      }
    } else if (currentTool.type === 'decor') {
      movingPlatformParams.style.display = 'none';
      slimePlatformParams.style.display = 'none';
      decorLayerParams.style.display = 'block';
      decorLayerSelect.value = decorLayer;
    } else {
      movingPlatformParams.style.display = 'none';
      slimePlatformParams.style.display = 'none';
      decorLayerParams.style.display = 'none';
    }
  }
  
  decorLayerSelect.addEventListener('change', ()=>{
    decorLayer = decorLayerSelect.value;
  });
  
  movingDistanceX.addEventListener('change', ()=>{
    if (currentTool.type === 'movingPlatform' && currentTool.payload) {
      currentTool.payload.distanceX = parseFloat(movingDistanceX.value) || 100;
    }
  });
  movingDistanceY.addEventListener('change', ()=>{
    if (currentTool.type === 'movingPlatform' && currentTool.payload) {
      currentTool.payload.distanceY = parseFloat(movingDistanceY.value) || 0;
    }
  });
  movingSpeed.addEventListener('change', ()=>{
    if (currentTool.type === 'movingPlatform' && currentTool.payload) {
      currentTool.payload.speed = parseFloat(movingSpeed.value) || 1;
    }
  });
  slimeBounceStrength.addEventListener('change', ()=>{
    if (currentTool.type === 'slimePlatform' && currentTool.payload) {
      currentTool.payload.bounceStrength = parseFloat(slimeBounceStrength.value) || -22;
    }
  });
  
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
        const platformTexture = tool.payload && tool.payload.texture;
        // Автоматические размеры для platform_house
        if (platformTexture === 'house') return { w: 100, h: 20 };
        img = pickPlatformTexture(platformTexture);
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
      case 'movingPlatform':
        img = pickPlatformTexture((tool.payload && tool.payload.texture) || 'danger_platform');
        return { w: (img && img.width) || 111, h: (img && img.height) || 22 };
      case 'slimePlatform':
        img = window.imgPlatformSlime;
        return { w: (img && img.width) || 46, h: (img && img.height) || 16 };
      case 'enemy':
        img = window.imgEnemy;
        return { w: 46, h: 38 };
      case 'trap':
        img = window.imgTrap; return { w: (img && img.width) || 20, h: (img && img.height) || 22 };
      case 'coin':
        img = window.imgCoin; return { w: (img && img.width) || 20, h: (img && img.height) || 20 };
      case 'finish':
        img = window.imgFinish; return { w: (img && img.width) || 24, h: (img && img.height) || 63 };
      case 'decor':
        const decorName = tool.payload && tool.payload.image;
        // Автоматические размеры для новых декораций
        if (decorName === 'house_1') return { w: 244.5, h: 413 };
        if (decorName === 'house_2') return { w: 72.5, h: 406.5 };
        if (decorName === 'house_bg') return { w: 305, h: 406.5 };
        if (decorName === 'bake') return { w: 125, h: 362.3 };
        if (decorName === 'bench') return { w: 285, h: 88 };
        if (decorName === 'clock') return { w: 76, h: 168 };
        if (decorName === 'window') return { w: 139, h: 157 };
        if (decorName === 'vis') return { w: 368, h: 291 };
        if (decorName === 'vis2') return { w: 192, h: 59 };
        if (decorName === 'vis3') return { w: 30, h: 82 };
        if (decorName === 'vis4') return { w: 47, h: 58 };
        if (decorName === 'vis5') return { w: 132, h: 100 };
        if (decorName === 'vis6') return { w: 86, h: 13 };
        if (decorName === 'vis7') return { w: 40, h: 9 };
        if (decorName === 'vis8') return { w: 43, h: 7 };
        if (decorName === 'vis9') return { w: 176, h: 109 };
        if (decorName === 'vis10') return { w: 48, h: 47 };
        if (decorName === 'vis11') return { w: 173, h: 104 };
        if (decorName === 'vis12') return { w: 191, h: 64 };
        if (decorName === 'vis13') return { w: 24, h: 64 };
        if (decorName === 'vaz') return { w: 170, h: 72 };
        if (decorName === 'vaz2') return { w: 170, h: 46 };
        if (decorName === 'vaz3') return { w: 181, h: 72 };
        if (decorName === 'vaz4') return { w: 168, h: 49 };
        img = pickDecor(decorName);
        return { w: (img && img.width) || 32, h: (img && img.height) || 32 };
      default:
        return null;
    }
  }

  const inpWidth = document.getElementById('inpWidth');
  const backgroundSelect = document.getElementById('backgroundSelect');
  const btnNew = document.getElementById('btnNew');
  const btnClear = document.getElementById('btnClear');
  const btnExport = document.getElementById('btnExport');
  const out = document.getElementById('out');
  const inText = document.getElementById('in');
  const btnImport = document.getElementById('btnImport');
  const inpLevelIndex = document.getElementById('inpLevelIndex');
  const btnImportFromGame = document.getElementById('btnImportFromGame');
  const btnFit = document.getElementById('btnFit');
  const btnPlay = document.getElementById('btnPlay');
  const coordEl = document.getElementById('coord');
  inpWidth.addEventListener('change', ()=>{ level.width = Math.max(200, parseInt(inpWidth.value||'200',10)); draw(); });
  backgroundSelect.addEventListener('change', ()=>{ level.background = backgroundSelect.value; draw(); });
  btnNew.onclick = ()=>{ resetLevel(); draw(); };
  btnClear.onclick = ()=>{ clearActiveLayer(); draw(); };
  btnExport.onclick = ()=>{ out.value = exportLevelJSON(level); out.select(); document.execCommand('copy'); };
  btnFit.onclick = ()=>{ fitToLevel(); draw(); };
  btnImport.onclick = ()=>{ tryImportFromText(); };
  btnImportFromGame.onclick = ()=>{ tryImportFromLevelsArray(); };
  
  function updatePlayButton() {
    const editorMode = localStorage.getItem('love_game_editor_mode');
    if (editorMode === '1') {
      btnPlay.textContent = 'Прекратить проверку';
    } else {
      btnPlay.textContent = 'Запустить игру';
    }
  }
  
  btnPlay.onclick = ()=>{ 
    try {
      const editorMode = localStorage.getItem('love_game_editor_mode');
      if (editorMode === '1') {
        // Прекращаем проверку - очищаем флаг
        localStorage.removeItem('love_game_editor_mode');
        localStorage.removeItem('love_game_editor_level');
        updatePlayButton();
        alert('Режим проверки отключен. Теперь можно проходить обычные уровни.');
      } else {
        // Запускаем проверку - сохраняем уровень
        const levelToPlay = normalizeLevel(level);
        localStorage.setItem('love_game_editor_level', JSON.stringify(levelToPlay));
        localStorage.setItem('love_game_editor_mode', '1');
        updatePlayButton();
        // Открываем игру в новой вкладке
        window.open('index.html', '_blank');
      }
    } catch(e) {
      alert('Ошибка: ' + e.message);
    }
  };
  
  // Обновляем кнопку при загрузке
  updatePlayButton();

  function resetLevel(){
    level = { width: Math.max(200, parseInt(inpWidth.value||'3800',10)), background: backgroundSelect.value || "forest", platforms: [], walls: [], doors: [], switches: [], dynamicPlatforms: [], traps: [], coins: [], enemies: [], finish: {x:200,y:300,w:24,h:63}, gift:{title:"Новый уровень", desc:"Отличная работа!"}, decorations: [], decorationsUndo: [], decorationsUndoPlatform: [] };
  }
  function normalizeLevel(obj){
    const safe = {
      width: Math.max(200, Number(obj.width)||3800),
      background: obj.background === "house" || obj.background === "home" ? "house" : "forest",
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
    safe.enemies = Array.isArray(obj.enemies)? obj.enemies:[];
    safe.dynamicPlatforms.forEach(dp=>{ 
      if (dp.texture==null) dp.texture='danger_platform'; 
      if (dp.type === 'moving') {
        if (dp.distanceX==null) dp.distanceX=100;
        if (dp.distanceY==null) dp.distanceY=0;
        if (dp.speed==null) dp.speed=1;
      } else if (dp.type === 'bouncy') {
        if (dp.bounceStrength==null) dp.bounceStrength=-22;
      } else {
        if (dp.group==null) dp.group=1; 
        if (dp.mode==null) dp.mode='hold'; 
        dp.open = !!dp.open; 
      }
    });
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
      backgroundSelect.value = level.background || "forest";
      draw();
    } catch(e){
      try {
        const val = Function('return ('+txt+')')();
        level = normalizeLevel(val);
        inpWidth.value = String(level.width);
        backgroundSelect.value = level.background || "forest";
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
        backgroundSelect.value = level.background || "forest";
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
      case 'dynamicPlatform': 
      case 'movingPlatform': 
      case 'slimePlatform': 
        level.dynamicPlatforms = []; 
        break;
      case 'enemy': level.enemies = []; break;
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
    
    // Для декораций: если клик по существующей декорации - переключаем слой
    if (currentTool.type === 'decor') {
      const existingDecor = findDecorAt(world.x, world.y);
      if (existingDecor) {
        moveDecorToLayer(existingDecor.decor, existingDecor.layer);
        draw();
        return;
      }
    }
    
    placeAt(world.x, world.y); draw();
  });
  
  function findDecorAt(x, y) {
    // Ищем декорацию во всех слоях
    const allLayers = [
      { arr: level.decorations, name: 'decorations' },
      { arr: level.decorationsUndo, name: 'decorationsUndo' },
      { arr: level.decorationsUndoPlatform, name: 'decorationsUndoPlatform' }
    ];
    
    for (let layer of allLayers) {
      for (let decor of layer.arr) {
        if (x >= decor.x && x <= decor.x + decor.w && 
            y >= decor.y && y <= decor.y + decor.h) {
          return { decor, layer: layer.name };
        }
      }
    }
    return null;
  }
  
  function moveDecorToLayer(decor, fromLayer) {
    // Удаляем из текущего слоя
    const fromArr = level[fromLayer];
    const index = fromArr.indexOf(decor);
    if (index !== -1) {
      fromArr.splice(index, 1);
    }
    
    // Добавляем в новый слой
    const toArr = level[decorLayer];
    toArr.push(decor);
  }
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
      case 'movingPlatform': {
        const payload = currentTool.payload || {};
        level.dynamicPlatforms.push({ 
          x, y, w, h, 
          texture: payload.texture || 'danger_platform',
          type: 'moving',
          distanceX: payload.distanceX || 100,
          distanceY: payload.distanceY || 0,
          speed: payload.speed || 1
        }); 
        break;
      }
      case 'slimePlatform': {
        const payload = currentTool.payload || {};
        level.dynamicPlatforms.push({ 
          x, y, w, h, 
          texture: payload.texture || 'slime_platform',
          type: 'bouncy',
          bounceStrength: payload.bounceStrength || -22
        }); 
        break;
      }
      case 'enemy': {
        // Находим ближайшую платформу для прикрепления врага
        let nearestPlatform = null;
        let minDist = Infinity;
        level.platforms.forEach(p => {
          const dist = Math.abs(y - (p.y - 38));
          if (dist < minDist && x >= p.x && x <= p.x + p.w) {
            minDist = dist;
            nearestPlatform = p;
          }
        });
        if (nearestPlatform) {
          level.enemies.push({ 
            platformX: nearestPlatform.x, 
            platformY: nearestPlatform.y,
            platformW: nearestPlatform.w
          });
        }
        break;
      }
      case 'trap': level.traps.push({ x, y, w: 20, h: 22 }); break;
      case 'coin': level.coins.push({ x, y, w: 20, h: 20, collected: false }); break;
      case 'finish': level.finish = { x, y, w: 24, h: 63 }; break;
      case 'decor': {
        const decor = { x, y, w, h, image: currentTool.payload.image };
        level[decorLayer].push(decor);
        break;
      }
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
      case 'dynamicPlatform': 
      case 'movingPlatform': 
      case 'slimePlatform': 
        removeFrom(level.dynamicPlatforms); 
        break;
      case 'enemy': {
        // Удаляем врага по позиции платформы
        for (let i=level.enemies.length-1;i>=0;i--){
          const e = level.enemies[i];
          const platform = level.platforms.find(p => p.x === e.platformX && p.y === e.platformY);
          if (platform && x >= platform.x && x <= platform.x + platform.w && y >= platform.y - 38 && y <= platform.y) {
            level.enemies.splice(i, 1);
            break;
          }
        }
        break;
      }
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

    // Декорации под платформами (decorationsUndoPlatform) должны отрисовываться ДО платформ
    drawDecorArray(level.decorationsUndoPlatform, 'decorationsUndoPlatform');

    drawPlatforms(level.platforms);
    drawWalls(level.walls);
    drawDoors(level.doors);
    drawDynamicPlatforms(level.dynamicPlatforms);
    drawEnemies(level.enemies);

    level.switches.forEach(sw=>{ ctx.drawImage(window.imgButton || new Image(), sw.x, sw.y, sw.w||26, sw.h||11); });

    level.traps.forEach(t=>{ ctx.drawImage(window.imgTrap || new Image(), t.x, t.y, t.w, t.h); });
    level.coins.forEach(c=>{ ctx.drawImage(window.imgCoin || new Image(), c.x, c.y, c.w, c.h); });
    const f = level.finish; if (f) ctx.drawImage(window.imgFinish || new Image(), f.x, f.y, f.w, f.h);

    // Декорации за игроком и перед всем
    drawDecorArray(level.decorationsUndo, 'decorationsUndo');
    drawDecorArray(level.decorations, 'decorations');

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
      if (p.type === 'moving') {
        // Рисуем платформу
        const tex = pickPlatformTexture(p.texture||'danger_platform');
        if (tex && tex.width && tex.height){ tileRect(tex, p.x, p.y, p.w, p.h); }
        else { ctx.fillStyle = '#c77'; ctx.fillRect(p.x, p.y, p.w, p.h); }
        
        // Рисуем траекторию движения
        const distanceX = p.distanceX || 100;
        const distanceY = p.distanceY || 0;
        ctx.strokeStyle = '#ff6';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(p.x + p.w/2, p.y + p.h/2);
        ctx.lineTo(p.x + p.w/2 + distanceX, p.y + p.h/2 + distanceY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Рисуем конечную точку
        ctx.fillStyle = '#ff6';
        ctx.fillRect(p.x + distanceX - 2, p.y + distanceY - 2, 4, 4);
      } else if (p.type === 'bouncy') {
        // Рисуем слизь
        const tex = window.imgPlatformSlime;
        if (tex && tex.width && tex.height){ tileRect(tex, p.x, p.y, p.w, p.h); }
        else { ctx.fillStyle = '#6c6'; ctx.fillRect(p.x, p.y, p.w, p.h); }
        
        // Визуальная индикация подпрыгивания
        ctx.strokeStyle = '#6f6';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(p.x - 2, p.y - 2, p.w + 4, p.h + 4);
        ctx.setLineDash([]);
      } else {
        // Старые динамические платформы с переключателями
        const tex = pickPlatformTexture(p.texture||'danger_platform');
        if (!p.open) { ctx.save(); ctx.globalAlpha = 0.6; }
        if (tex && tex.width && tex.height){ tileRect(tex, p.x, p.y, p.w, p.h); }
        else { ctx.fillStyle = '#c77'; ctx.fillRect(p.x, p.y, p.w, p.h); }
        if (!p.open) { ctx.restore(); }
      }
    });
  }
  
  function drawEnemies(arr){
    arr.forEach(e=>{
      const platform = level.platforms.find(p => p.x === e.platformX && p.y === e.platformY);
      if (platform) {
        const enemyX = platform.x + 10;
        const enemyY = platform.y - 38;
        const img = window.imgEnemy;
        if (img && img.width) {
          const frameW = img.width / 11;
          const frameH = img.height;
          ctx.drawImage(img, 0, 0, frameW, frameH, enemyX, enemyY, 46, 38);
        } else {
          ctx.fillStyle = '#f44';
          ctx.fillRect(enemyX, enemyY, 46, 38);
        }
      }
    });
  }
  function drawDecorArray(arr, layerName){
    arr.forEach(dec=>{
      const img = pickDecor(dec.image);
      if (img && img.width) {
        ctx.drawImage(img, dec.x, dec.y, dec.w, dec.h);
        // Визуальная индикация слоя
        if (currentTool.type === 'decor') {
          let color = '#6a6';
          if (layerName === 'decorations') color = '#6f6'; // Зеленый - перед всем
          else if (layerName === 'decorationsUndo') color = '#ff6'; // Желтый - за игроком
          else if (layerName === 'decorationsUndoPlatform') color = '#f66'; // Красный - за платформами
          
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(dec.x - 1, dec.y - 1, dec.w + 2, dec.h + 2);
          ctx.setLineDash([]);
        }
      } else { 
        ctx.fillStyle = '#6a6'; 
        ctx.fillRect(dec.x, dec.y, dec.w, dec.h); 
      }
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
      case 'house': return window.imgPlatformHouse;
      case 'danger_platform': return window.imgPlatformDanger;
      case 'slime_platform': return window.imgPlatformSlime;
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
      case 'house_1': return window.imgHouse1;
      case 'house_2': return window.imgHouse2;
      case 'house_bg': return window.imgHouseBg;
      case 'bake': return window.imgBake;
      case 'bench': return window.imgBench;
      case 'clock': return window.imgClock;
      case 'window': return window.imgWindow;
      case 'vis': return window.imgVis;
      case 'vis2': return window.imgVis2;
      case 'vis3': return window.imgVis3;
      case 'vis4': return window.imgVis4;
      case 'vis5': return window.imgVis5;
      case 'vis6': return window.imgVis6;
      case 'vis7': return window.imgVis7;
      case 'vis8': return window.imgVis8;
      case 'vis9': return window.imgVis9;
      case 'vis10': return window.imgVis10;
      case 'vis11': return window.imgVis11;
      case 'vis12': return window.imgVis12;
      case 'vis13': return window.imgVis13;
      case 'vaz': return window.imgVaz;
      case 'vaz2': return window.imgVaz2;
      case 'vaz3': return window.imgVaz3;
      case 'vaz4': return window.imgVaz4;
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

  // Инициализация селекта фона
  backgroundSelect.value = level.background || "forest";
  
  updateParamsVisibility();
  fitToLevel();
  draw();
})();


