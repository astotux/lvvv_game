const levels = [
  {
    width: 3800,
    platforms: [
      {x: 0, y: 260, w: 200, h: 20, texture: "grass"},
      {x: 0, y: 340, w: 850, h: 20, texture: "grass"},
      {x: 850, y: 340, w: 450, h: 20, texture: "grass"},
      {x: 1400, y: 340, w: 500, h: 20, texture: "grass"},
      // ступени вверх
      {x: 1980, y: 310, w: 66, h: 22, texture: "stone2"},
      {x: 2090, y: 280, w: 66, h: 22, texture: "stone2"},
      {x: 2200, y: 250, w: 66, h: 22, texture: "stone2"},
      // полка над ямой с шипами
      {x: 2350, y: 230, w: 220, h: 20, texture: "grass"},
      // длинная полка с разрывами
      {x: 2650, y: 260, w: 164, h: 20, texture: "wood"},
      {x: 2880, y: 240, w: 164, h: 20, texture: "wood"},
      {x: 3110, y: 220, w: 164, h: 20, texture: "wood"},
      // финальная площадка
      {x: 3350, y: 320, w: 400, h: 20, texture: "grass"},
      {x: 3500, y: 260, w: 250, h: 20, texture: "grass"},

    ],
    traps: [
      // ранняя яма с шипами
      {x: 800, y: 325, w: 20, h: 22},
      {x: 820, y: 325, w: 20, h: 22},
      {x: 840, y: 325, w: 20, h: 22},
      // коридор шипов под полкой
      {x: 2410, y: 215, w: 20, h: 22},
      {x: 2435, y: 215, w: 20, h: 22},
      {x: 2460, y: 215, w: 20, h: 22},
    ],
    coins: [
      // дорожка на старте
      {x: 120, y: 220, w: 20, h: 20, collected: false},
      {x: 170, y: 220, w: 20, h: 20, collected: false},
      {x: 230, y: 300, w: 20, h: 20, collected: false},
      // над первой ямой
      {x: 830, y: 240, w: 20, h: 20, collected: false},
      // серия над ступенями
      {x: 2005, y: 260, w: 20, h: 20, collected: false},
      {x: 2115, y: 230, w: 20, h: 20, collected: false},
      {x: 2225, y: 200, w: 20, h: 20, collected: false},
      // над полкой с разрывами
      {x: 2700, y: 210, w: 20, h: 20, collected: false},
      {x: 2930, y: 190, w: 20, h: 20, collected: false},
      {x: 3160, y: 170, w: 20, h: 20, collected: false}
    ],
    finish: {x: 3660, y: 200, w: 24, h: 63},
    gift: {title: "Уровень: Переправа", desc: "Ты справилась! Двигаемся дальше ❤️"},
    decorations: [
      {x: 330, y: 330, w: 29, h: 15, type: "rock2", image: "rock2"},
      {x: 350, y: 328, w: 55, h: 18, type: "rock", image: "flower2"},
      {x: 410, y: 328, w: 55, h: 18, type: "rock", image: "flower1"},
      {x: 465, y: 328, w: 55, h: 18, type: "rock", image: "flower2"},
      {x: 550, y: 328, w: 55, h: 18, type: "rock", image: "flower1"},
      {x: 1500, y: 322, w: 38, h: 20, type: "rock", image: "rock1"},
      {x: 200, y: 330, w: 38, h: 20, type: "rock2", image: "rock1"},
      {x: 680, y: 330, w: 73, h: 19, type: "grass", image: "grass1"},
      {x: 680, y: 330, w: 73, h: 19, type: "grass", image: "grass1"},
      {x: -10, y: 270, w: 73, h: 19, type: "grass", image: "grass1"},
      {x: 60, y: 270, w: 73, h: 19, type: "grass", image: "grass1"},
      {x: 120, y: 270, w: 80, h: 19, type: "grass", image: "grass1"},
    ],
    decorationsUndo: [
      {x: 315, y: 330, w: 29, h: 15, type: "rock2", image: "rock2"},
      {x: 280, y: 328, w: 55, h: 18, type: "rock", image: "flower2"},
      {x: 127, y: 328, w: 55, h: 18, type: "rock", image: "flower1"},
      {x: 180, y: 328, w: 55, h: 18, type: "rock", image: "flower2"},
      {x: 225, y: 328, w: 55, h: 18, type: "rock", image: "flower1"},

      {x: 520, y: 328, w: 55, h: 18, type: "rock", image: "flower1"},
      {x: 730, y: 330, w: 73, h: 19, type: "grass", image: "grass1"},
      {x: 860, y: 334, w: 73, h: 19, type: "grass", image: "grass1"},
      {x: 1470, y: 334, w: 73, h: 19, type: "grass", image: "grass1"},
      {x: 3380, y: 314, w: 73, h: 19, type: "grass", image: "grass1"}
    ],
    decorationsUndoPlatform: [
      {x: 320, y: 215, w: 85, h: 130, image: "three"},

      {x: 450, y: 235, w: 78, h: 110, image: "three"},
      {x: 700, y: 195, w: 100, h: 150, image: "three"},

      {x: 590, y: 215, w: 85, h: 130, image: "three"},
      {x: 830, y: 235, w: 78, h: 110, image: "three"},
      {x: 970, y: 235, w: 78, h: 110, image: "three"},
    ]
  },
  {
    width: 6000,
    platforms: [
      // стартовая зона
      {x: 0, y: 360, w: 900, h: 24, texture: "grass"},
      {x: 900, y: 360, w: 500, h: 24, texture: "grass"},
      // лесные террасы
      {x: 1500, y: 320, w: 260, h: 20, texture: "wood"},
      {x: 1750, y: 290, w: 220, h: 20, texture: "wood"},
      {x: 1980, y: 260, w: 180, h: 20, texture: "wood"},
      // каменные уступы
      {x: 2200, y: 300, w: 300, h: 22, texture: "stone2"},
      {x: 2550, y: 270, w: 220, h: 22, texture: "stone2"},
      {x: 2800, y: 240, w: 180, h: 22, texture: "stone2"},
      // длинная галерея с разрывами
      {x: 3050, y: 280, w: 200, h: 20, texture: "wood"},
      {x: 3310, y: 260, w: 180, h: 20, texture: "wood"},
      {x: 3550, y: 240, w: 160, h: 20, texture: "wood"},
      // плато перед финишем
      {x: 3800, y: 340, w: 400, h: 24, texture: "grass"},
      {x: 4220, y: 300, w: 260, h: 22, texture: "stone"},
      {x: 4520, y: 280, w: 240, h: 22, texture: "stone"},
      // финальная площадка
      {x: 5100, y: 320, w: 700, h: 24, texture: "grass"}
    ],
    traps: [
      // ранние ловушки
      {x: 820, y: 345, w: 20, h: 22},
      {x: 840, y: 345, w: 20, h: 22},
      // под террасами
      {x: 1620, y: 305, w: 20, h: 22},
      {x: 1890, y: 275, w: 20, h: 22},
      // каменные коридоры
      {x: 2280, y: 285, w: 20, h: 22},
      {x: 2600, y: 255, w: 20, h: 22},
      // перед плато
      {x: 3400, y: 245, w: 20, h: 22},
      {x: 3580, y: 225, w: 20, h: 22},
      // финишная полоса
      {x: 4400, y: 285, w: 20, h: 22},
      {x: 4700, y: 265, w: 20, h: 22}
    ],
    coins: [
      // стартовая дорожка
      {x: 120, y: 320, w: 20, h: 20, collected: false},
      {x: 170, y: 320, w: 20, h: 20, collected: false},
      {x: 220, y: 320, w: 20, h: 20, collected: false},
      {x: 270, y: 320, w: 20, h: 20, collected: false},
      // лесные террасы
      {x: 1550, y: 280, w: 20, h: 20, collected: false},
      {x: 1800, y: 250, w: 20, h: 20, collected: false},
      {x: 2030, y: 220, w: 20, h: 20, collected: false},
      // над каменными уступами
      {x: 2260, y: 260, w: 20, h: 20, collected: false},
      {x: 2600, y: 230, w: 20, h: 20, collected: false},
      {x: 2850, y: 200, w: 20, h: 20, collected: false},
      // галерея
      {x: 3100, y: 240, w: 20, h: 20, collected: false},
      {x: 3360, y: 220, w: 20, h: 20, collected: false},
      {x: 3600, y: 200, w: 20, h: 20, collected: false},
      // финишная дорожка
      {x: 5150, y: 280, w: 20, h: 20, collected: false},
      {x: 5250, y: 280, w: 20, h: 20, collected: false},
      {x: 5350, y: 280, w: 20, h: 20, collected: false},
      {x: 5450, y: 280, w: 20, h: 20, collected: false}
    ],
    finish: {x: 5650, y: 260, w: 24, h: 63},
    gift: {title: "Большое приключение", desc: "Красивый масштабный уровень пройден! ❤️"},
    decorations: [
      // цветы и трава
      {x: 300, y: 348, w: 55, h: 18, type: "rock", image: "flower2"},
      {x: 360, y: 348, w: 55, h: 18, type: "rock", image: "flower1"},
      {x: 600, y: 350, w: 73, h: 19, type: "grass", image: "grass1"},
      // скалы
      {x: 1200, y: 344, w: 38, h: 20, type: "rock", image: "rock1"},
      {x: 1700, y: 300, w: 29, h: 15, type: "rock2", image: "rock2"},
      {x: 2100, y: 280, w: 38, h: 20, type: "rock", image: "rock1"},
      // деревья
      {x: 1450, y: 230, w: 100, h: 150, image: "three"},
      {x: 3200, y: 180, w: 78, h: 110, image: "three"},
      {x: 5000, y: 240, w: 100, h: 150, image: "three"},
      // горы на заднем плане
      {x: 800, y: 240, w: 120, h: 70, image: "mountain"},
      {x: 2600, y: 220, w: 120, h: 70, image: "mountain"}
    ],
    decorationsUndo: [
      {x: 250, y: 350, w: 55, h: 18, type: "rock", image: "flower1"},
      {x: 450, y: 350, w: 55, h: 18, type: "rock", image: "flower2"},
      {x: 950, y: 352, w: 73, h: 19, type: "grass", image: "grass1"},
      {x: 1800, y: 302, w: 73, h: 19, type: "grass", image: "grass1"},
      {x: 3400, y: 262, w: 73, h: 19, type: "grass", image: "grass1"}
    ],
    decorationsUndoPlatform: [
      {x: 760, y: 255, w: 78, h: 110, image: "three"},
      {x: 2100, y: 200, w: 78, h: 110, image: "three"},
      {x: 3900, y: 260, w: 78, h: 110, image: "three"}
    ]
  }
];
  