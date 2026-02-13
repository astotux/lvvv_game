(function(){
  // Игрок и компаньон
  window.imgPlayerIdle = new Image();
  imgPlayerIdle.src = "img/player_idle.png";
  window.imgPlayerWalk = new Image();
  imgPlayerWalk.src = "img/player_walk2.png";
  window.imgCompanionIdle = new Image();
  imgCompanionIdle.src = "img/cato_idle.png";
  window.imgCompanionWalk = new Image();
  imgCompanionWalk.src = "img/cato_walk.png";

  // Босс
  window.imgBossWalk = new Image();
  imgBossWalk.src = "img/ioma_walk.png";
  window.imgBossAttack = new Image();
  imgBossAttack.src = "img/ioma_attack.png";
  window.imgBossOrb = new Image();
  imgBossOrb.src = "img/ioma_orb.png";

  // Платформы
  window.imgPlatformGrass = new Image();
  imgPlatformGrass.src = "img/platform_grass.png";
  window.imgPlatformStone = new Image();
  imgPlatformStone.src = "img/platform_stone.png";
  window.imgPlatformStone2 = new Image();
  imgPlatformStone2.src = "img/platform_stone3.png";
  window.imgPlatformWood = new Image();
  imgPlatformWood.src = "img/platform_wood.png";
  window.imgPlatformDanger = new Image();
  imgPlatformDanger.src = "img/danger_platform.png";
  window.imgPlatformSlime = new Image();
  imgPlatformSlime.src = "img/slime_platform.png";
  window.imgDoorDanger = new Image();
  imgDoorDanger.src = "img/danger_door.png";

  // Ловушки/финиш/земля/кнопки
  window.imgTrap = new Image();
  imgTrap.src = "img/trap.png";
  window.imgFinish = new Image();
  imgFinish.src = "img/finish.png";
  window.imgDirt = new Image();
  imgDirt.src = "img/dirt.png";
  window.imgButton = new Image();
  imgButton.src = "img/button.png";
  window.imgButtonActive = new Image();
  imgButtonActive.src = "img/button_active.png";

  // Декор
  window.imgFlower1 = new Image();
  imgFlower1.src = "img/flower1.png";
  window.imgFlower2 = new Image();
  imgFlower2.src = "img/flower2.png";
  window.imgRock1 = new Image();
  imgRock1.src = "img/rock1.png";
  window.imgRock2 = new Image();
  imgRock2.src = "img/rock2.png";
  window.imgGrass1 = new Image();
  imgGrass1.src = "img/grass1.png";
  window.imgBush = new Image();
  imgBush.src = "img/bush.png";
  window.imgMountain = new Image();
  imgMountain.src = "img/mountain.png";
  window.imgThree = new Image();
  imgThree.src = "img/three.png";
  window.imgAlert = new Image();
  imgAlert.src = "img/alert.png";
  window.imgHouse1 = new Image();
  imgHouse1.src = "img/house_1.png";
  window.imgHouse2 = new Image();
  imgHouse2.src = "img/house_2.png";
  window.imgHouseBg = new Image();
  imgHouseBg.src = "img/house_bg.png";
  window.imgPlatformHouse = new Image();
  imgPlatformHouse.src = "img/platform_house.png";
  window.imgBake = new Image();
  imgBake.src = "img/bake.png";
  window.imgBench = new Image();
  imgBench.src = "img/bench.png";
  window.imgClock = new Image();
  imgClock.src = "img/clock.png";
  window.imgWindow = new Image();
  imgWindow.src = "img/window.png";
  window.imgVis = new Image();
  imgVis.src = "img/vis.png";
  window.imgVis2 = new Image();
  imgVis2.src = "img/vis_2.png";
  window.imgVis3 = new Image();
  imgVis3.src = "img/vis_3.png";
  window.imgVis4 = new Image();
  imgVis4.src = "img/vis_4.png";
  window.imgVis5 = new Image();
  imgVis5.src = "img/vis_5.png";
  window.imgVis6 = new Image();
  imgVis6.src = "img/vis_6.png";
  window.imgVis7 = new Image();
  imgVis7.src = "img/vis_7.png";
  window.imgVis8 = new Image();
  imgVis8.src = "img/vis_8.png";
  window.imgVis9 = new Image();
  imgVis9.src = "img/vis_9.png";
  window.imgVis10 = new Image();
  imgVis10.src = "img/vis_10.png";
  window.imgVis11 = new Image();
  imgVis11.src = "img/vis_11.png";
  window.imgVis12 = new Image();
  imgVis12.src = "img/vis_12.png";
  window.imgVis13 = new Image();
  imgVis13.src = "img/vis_13.png";
  window.imgVaz = new Image();
  imgVaz.src = "img/vaz.png";
  window.imgVaz2 = new Image();
  imgVaz2.src = "img/vaz_2.png";
  window.imgVaz3 = new Image();
  imgVaz3.src = "img/vaz_3.png";
  window.imgVaz4 = new Image();
  imgVaz4.src = "img/vaz_4.png";
  window.imgTable = new Image();
  imgTable.src = "img/table.png";

  // Фоны
  window.bgLayer0 = new Image(); bgLayer0.src = "img/background_0.png";
  window.bgLayer1 = new Image(); bgLayer1.src = "img/background_1.png";
  window.bgLayer2 = new Image(); bgLayer2.src = "img/background_2.png";
  window.bgLayer3 = new Image(); bgLayer3.src = "img/background_3.png";
  window.bgLayer4 = new Image(); bgLayer4.src = "img/background_4.png";
  window.bgLayer5 = new Image(); bgLayer5.src = "img/background_6.png";
  window.bgLayer6 = new Image(); bgLayer6.src = "img/background_5.png";
  window.imgBackgroundAnother = new Image();
  imgBackgroundAnother.src = "img/background_another.png";
  window.imgFloor = new Image();
  imgFloor.src = "img/floor.png";

  // Монета
  window.imgCoin = new Image();
  imgCoin.src = "img/mini_coin.png";

  // Враг
  window.imgEnemy = new Image();
  imgEnemy.src = "img/enemy.png";

  // Общий фон
  window.imgBackgroundAll = new Image();
  imgBackgroundAll.src = "img/background_all.png";

  // Артефакты (малые иконки для уровней и меню)
  window.imgArtifact1 = new Image();
  imgArtifact1.src = "img/art_1.png";
  window.imgArtifact2 = new Image();
  imgArtifact2.src = "img/art_2.png";
  window.imgArtifact3 = new Image();
  imgArtifact3.src = "img/art_3.png";
  window.imgArtifact4 = new Image();
  imgArtifact4.src = "img/art_4.png";
  window.imgArtifact5 = new Image();
  imgArtifact5.src = "img/art_5.png";
})();


