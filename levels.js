const levels = [
  {
    width: 3800,
    platforms: [
      {x: 0, y: 260, w: 200, h: 20, texture: "grass"},
      {x: 0, y: 340, w: 850, h: 20, texture: "grass"},
      {x: 850, y: 340, w: 450, h: 20, texture: "grass"},
      {x: 1400, y: 340, w: 500, h: 20, texture: "grass"},
      // ступени вверх
      {x: 1980, y: 310, w: 66, h: 20, texture: "stone2"},
      {x: 2090, y: 280, w: 66, h: 20, texture: "stone2"},
      {x: 2200, y: 250, w: 66, h: 20, texture: "stone2"},
      // полка над ямой с шипами
      {x: 2350, y: 230, w: 220, h: 20, texture: "grass"},
      // длинная полка с разрывами
      {x: 2650, y: 260, w: 180, h: 20, texture: "wood"},
      {x: 2880, y: 240, w: 180, h: 20, texture: "wood"},
      {x: 3110, y: 220, w: 180, h: 20, texture: "wood"},
      // финальная площадка
      {x: 3350, y: 320, w: 350, h: 20, texture: "grass"}
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
    finish: {x: 3660, y: 260, w: 24, h: 63},
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
    ]
  },
  {
    width: 3800,
    platforms: [
      {x: 0, y: 340, w: 850, h: 20, texture: "grass"},
      {x: 850, y: 340, w: 450, h: 20, texture: "grass"},
      {x: 1400, y: 340, w: 500, h: 20, texture: "grass"},
      // ступени вверх
      {x: 1980, y: 310, w: 66, h: 20, texture: "stone2"},
      {x: 2090, y: 280, w: 66, h: 20, texture: "stone2"},
      {x: 2200, y: 250, w: 66, h: 20, texture: "stone2"},
      // полка над ямой с шипами
      {x: 2350, y: 230, w: 220, h: 20, texture: "grass"},
      // длинная полка с разрывами
      {x: 2650, y: 260, w: 180, h: 20, texture: "wood"},
      {x: 2880, y: 240, w: 180, h: 20, texture: "wood"},
      {x: 3110, y: 220, w: 180, h: 20, texture: "wood"},
      // финальная площадка
      {x: 3350, y: 320, w: 350, h: 20, texture: "grass"}
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
      {x: 120, y: 300, w: 20, h: 20, collected: false},
      {x: 170, y: 300, w: 20, h: 20, collected: false},
      {x: 220, y: 300, w: 20, h: 20, collected: false},
      // над первой ямой
      {x: 830, y: 200, w: 20, h: 20, collected: false},
      // серия над ступенями
      {x: 2005, y: 260, w: 20, h: 20, collected: false},
      {x: 2115, y: 230, w: 20, h: 20, collected: false},
      {x: 2225, y: 200, w: 20, h: 20, collected: false},
      // над полкой с разрывами
      {x: 2700, y: 210, w: 20, h: 20, collected: false},
      {x: 2930, y: 190, w: 20, h: 20, collected: false},
      {x: 3160, y: 170, w: 20, h: 20, collected: false}
    ],
    finish: {x: 3660, y: 260, w: 24, h: 63},
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
      {x: 610, y: 330, w: 73, h: 19, type: "grass", image: "grass1"},
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
    ]
  }
];
  