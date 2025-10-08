const levels = [
  {
    width: 3800,
    platforms: [
      {x: 0, y: 260, w: 200, h: 20, texture: "grass"},
      {x: 0, y: 340, w: 850, h: 20, texture: "grass"},
      {x: 850, y: 340, w: 450, h: 20, texture: "grass"},
      {x: 1400, y: 340, w: 500, h: 20, texture: "grass"},

      {x: 1980, y: 310, w: 66, h: 22, texture: "stone2"},
      {x: 2090, y: 280, w: 66, h: 22, texture: "stone2"},
      {x: 2200, y: 250, w: 66, h: 22, texture: "stone2"},

      {x: 2350, y: 230, w: 220, h: 20, texture: "grass"},

      {x: 2650, y: 260, w: 66, h: 22, texture: "stone2"},
      {x: 2800, y: 240, w: 66, h: 22, texture: "stone2"},
      {x: 2950, y: 220, w: 66, h: 22, texture: "stone2"},
      {x: 3100, y: 200, w: 66, h: 22, texture: "stone2"}, 

      {x: 3300, y: 340, w: 500, h: 20, texture: "grass"},
      {x: 3500, y: 260, w: 300, h: 20, texture: "grass"},

    ],
    traps: [

      {x: 800, y: 325, w: 20, h: 22},
      {x: 820, y: 325, w: 20, h: 22},

      {x: 2425, y: 215, w: 20, h: 22},
      {x: 2450, y: 215, w: 20, h: 22},
      {x: 2475, y: 215, w: 20, h: 22},
    ],
    coins: [

      {x: 120, y: 220, w: 20, h: 20, collected: false},
      {x: 170, y: 220, w: 20, h: 20, collected: false},
      {x: 270, y: 300, w: 20, h: 20, collected: false},
      {x: 320, y: 300, w: 20, h: 20, collected: false},
      {x: 370, y: 300, w: 20, h: 20, collected: false},

      {x: 810, y: 230, w: 20, h: 20, collected: false},

      {x: 1335, y: 230, w: 20, h: 20, collected: false},
      {x: 1635, y: 300, w: 20, h: 20, collected: false},
      {x: 1685, y: 300, w: 20, h: 20, collected: false},
      {x: 1735, y: 300, w: 20, h: 20, collected: false},

      {x: 2005, y: 260, w: 20, h: 20, collected: false},
      {x: 2115, y: 230, w: 20, h: 20, collected: false},
      {x: 2225, y: 200, w: 20, h: 20, collected: false},

      {x: 2825, y: 190, w: 20, h: 20, collected: false},
      {x: 3125, y: 150, w: 20, h: 20, collected: false}
    ],
    finish: {x: 3660, y: 200, w: 24, h: 63},
    gift: {title: "Уровень 1", desc: "Супер! Первый пройден!"},
    decorations: [
      {x: 330, y: 330, w: 29, h: 15, image: "rock2"},
      {x: 350, y: 328, w: 55, h: 18, image: "flower2"},
      {x: 410, y: 328, w: 55, h: 18, image: "flower1"},
      {x: 465, y: 328, w: 55, h: 18, image: "flower2"},
      {x: 550, y: 328, w: 55, h: 18, image: "flower1"},
      {x: 1500, y: 322, w: 38, h: 20, image: "rock1"},
      {x: 200, y: 330, w: 38, h: 20, image: "rock1"},
      {x: 680, y: 330, w: 73, h: 19, image: "grass1"},
      {x: 680, y: 330, w: 73, h: 19, image: "grass1"},
      {x: 840, y: 334, w: 73, h: 19, image: "grass1"},

      {x: -10, y: 270, w: 73, h: 19, image: "grass1"},
      {x: 60, y: 270, w: 73, h: 19, image: "grass1"},
      {x: 120, y: 270, w: 80, h: 19, image: "grass1"},
      {x: 970, y: 330, w: 38, h: 20, image: "rock1"},
      {x: 1000, y: 328, w: 55, h: 18, image: "flower1"},
      {x: 1055, y: 328, w: 55, h: 18, image: "flower2"},
      {x: 1110, y: 328, w: 55, h: 18, image: "flower1"},
      {x: 1165, y: 330, w: 80, h: 19, image: "grass1"},
      {x: 1600, y: 328, w: 55, h: 18, image: "flower1"},
      {x: 1655, y: 328, w: 55, h: 18, image: "flower2"},
      {x: 1710, y: 328, w: 55, h: 18, image: "flower1"},
      {x: 1765, y: 330, w: 80, h: 19, image: "grass1"},

      {x: 3350, y: 328, w: 55, h: 18, image: "flower1"},
      {x: 3405, y: 328, w: 55, h: 18, image: "flower2"},
      {x: 3460, y: 328, w: 55, h: 18, image: "flower1"},
      {x: 3515, y: 330, w: 80, h: 19, image: "grass1"},
      {x: 3595, y: 330, w: 80, h: 19, image: "grass1"},
      {x: 3675, y: 330, w: 80, h: 19, image: "grass1"},

    ],
    decorationsUndo: [
      {x: 315, y: 330, w: 29, h: 15, type: "rock2", image: "rock2"},
      {x: 280, y: 328, w: 55, h: 18, type: "rock", image: "flower2"},
      {x: 127, y: 328, w: 55, h: 18, type: "rock", image: "flower1"},
      {x: 180, y: 328, w: 55, h: 18, type: "rock", image: "flower2"},
      {x: 225, y: 328, w: 55, h: 18, type: "rock", image: "flower1"},
      {x: 920, y: 330, w: 29, h: 15, type: "rock2", image: "rock2"},

      {x: 520, y: 328, w: 55, h: 18, type: "rock", image: "flower1"},
      {x: 730, y: 330, w: 73, h: 19, type: "grass", image: "grass1"},
      {x: 1470, y: 334, w: 73, h: 19, type: "grass", image: "grass1"},
    ],
    decorationsUndoPlatform: [


      {x: 320, y: 215, w: 85, h: 130, image: "three"},

      {x: 450, y: 235, w: 78, h: 110, image: "three"},
      {x: 700, y: 195, w: 100, h: 150, image: "three"},
      {x: 190, y: 195, w: 100, h: 150, image: "three"},

      {x: 590, y: 215, w: 85, h: 130, image: "three"},
      {x: 830, y: 235, w: 78, h: 110, image: "three"},
      {x: 970, y: 235, w: 78, h: 110, image: "three"},
      {x: 1230, y: 235, w: 78, h: 110, image: "three"},

      {x: 1420, y: 235, w: 78, h: 110, image: "three"},
      {x: 1550, y: 235, w: 78, h: 110, image: "three"},
      {x: 1780, y: 235, w: 78, h: 110, image: "three"},

      {x: 3350, y: 235, w: 78, h: 110, image: "three"},

      {x: 1280, y: 310, w: 20, h: 35, image: "alert"},
      {x: 1880, y: 310, w: 20, h: 35, image: "alert"},
    ]
  },
  {
    "width": 6000,
    "platforms": [
      {
        "x": 0,
        "y": 360,
        "w": 400,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 450,
        "y": 320,
        "w": 66,
        "h": 22,
        "texture": "stone2"
      },
      {
        "x": 700,
        "y": 260,
        "w": 66,
        "h": 22,
        "texture": "stone2"
      },
      {
        "x": 820,
        "y": 280,
        "w": 250,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1310,
        "y": 247,
        "w": 66,
        "h": 22,
        "texture": "stone2"
      },
      {
        "x": 1420,
        "y": 155,
        "w": 66,
        "h": 22,
        "texture": "stone2"
      },
      {
        "x": 1720,
        "y": 270,
        "w": 400,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2168,
        "y": 356,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1869,
        "y": 438,
        "w": 256,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2364,
        "y": 163,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2522,
        "y": 259,
        "w": 381,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2898,
        "y": 259,
        "w": 191,
        "h": 20,
        "texture": "grass"
      }
    ],
    "walls": [
      {
        "x": 1488,
        "y": 0,
        "w": 40,
        "h": 152,
        "texture": "stone"
      }
    ],
    "doors": [],
    "switches": [
      {
        "x": 330,
        "y": 355,
        "w": 26,
        "h": 11,
        "group": 1
      },
      {
        "x": 1030,
        "y": 277,
        "w": 26,
        "h": 11,
        "group": 2
      },
      {
        "x": 1443,
        "y": 149,
        "w": 26,
        "h": 11,
        "group": 3
      },
      {
        "x": 1880,
        "y": 433,
        "w": 26,
        "h": 11,
        "group": 4
      }
    ],
    "dynamicPlatforms": [
      {
        "x": 550,
        "y": 290,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 1,
        "mode": "hold"
      },
      {
        "x": 1120,
        "y": 250,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 2,
        "mode": "hold"
      },
      {
        "x": 1420,
        "y": 330,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 3,
        "mode": "hold"
      },
      {
        "x": 1565,
        "y": 330,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 3,
        "mode": "hold"
      },
      {
        "x": 2164,
        "y": 167,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 4,
        "mode": "hold"
      }
    ],
    "traps": [
      {
        "x": 910,
        "y": 268,
        "w": 20,
        "h": 18
      },
      {
        "x": 930,
        "y": 268,
        "w": 20,
        "h": 18
      },
      {
        "x": 1511,
        "y": 315,
        "w": 20,
        "h": 18
      },
      {
        "x": 1565,
        "y": 315,
        "w": 20,
        "h": 18
      },
      {
        "x": 1900,
        "y": 257,
        "w": 20,
        "h": 18
      },
      {
        "x": 1920,
        "y": 257,
        "w": 20,
        "h": 18
      },
      {
        "x": 1986,
        "y": 427,
        "w": 20,
        "h": 22
      },
      {
        "x": 2008,
        "y": 427,
        "w": 20,
        "h": 22
      }
    ],
    "coins": [
      {
        "x": 120,
        "y": 320,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 170,
        "y": 320,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 220,
        "y": 320,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 270,
        "y": 320,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 5150,
        "y": 280,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 5250,
        "y": 280,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 5350,
        "y": 280,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 5450,
        "y": 280,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1447,
        "y": 108,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1882,
        "y": 387,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2894,
        "y": 213,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2942,
        "y": 213,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2989,
        "y": 213,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1537,
        "y": 229,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1907,
        "y": 165,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 919,
        "y": 191,
        "w": 20,
        "h": 20,
        "collected": false
      }
    ],
    "finish": {
      "x": 3041,
      "y": 198,
      "w": 24,
      "h": 63
    },
    "gift": {
      "title": "Ты прошла 2 уровень!",
      "desc": "Умница, так держать! <3"
    },
    "decorations": [
      {
        "x": 205,
        "y": 348,
        "w": 55,
        "h": 18,
        "type": "rock",
        "image": "flower2"
      },
      {
        "x": 260,
        "y": 348,
        "w": 55,
        "h": 18,
        "type": "rock",
        "image": "flower1"
      },
      {
        "x": 950,
        "y": 272,
        "w": 73,
        "h": 19,
        "type": "grass",
        "image": "grass1"
      },
      {
        "x": 1922,
        "y": 429,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 2032,
        "y": 431,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 2067,
        "y": 433,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2390,
        "y": 152,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 708,
        "y": 251,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 1346,
        "y": 240,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      
      {
        "x": 1977,
        "y": 145,
        "w": 98,
        "h": 132,
        "image": "three"
      },
      {
        "x": 1788,
        "y": 257,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1940,
        "y": 257,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1843,
        "y": 257,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 1720,
        "y": 262,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2540,
        "y": 227,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 2591,
        "y": 251,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2661,
        "y": 251,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2733,
        "y": 251,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      
      {
        "x": 290,
        "y": 255,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      
      {
        "x": 2826,
        "y": 156,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 2815,
        "y": 248,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 2885,
        "y": 248,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2940,
        "y": 248,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 2995,
        "y": 248,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2030,
        "y": 238,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 2094,
        "y": 242,
        "w": 20,
        "h": 35,
        "image": "alert"
      }
    ],
    "decorationsUndo": [
      {
        "x": 150,
        "y": 350,
        "w": 55,
        "h": 18,
        "type": "rock",
        "image": "flower1"
      }
    ],
    "decorationsUndoPlatform": [
      {
        "x": 380,
        "y": 330,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 100,
        "y": 255,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 20,
        "y": 220,
        "w": 100,
        "h": 150,
        "image": "three"
      },
      {
        "x": 820,
        "y": 140,
        "w": 100,
        "h": 150,
        "image": "three"
      },
      {
        "x": 2777,
        "y": 191,
        "w": 48,
        "h": 73,
        "image": "three"
      },
      {
        "x": 2608,
        "y": 156,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 2678,
        "y": 132,
        "w": 103,
        "h": 137,
        "image": "three"
      },
      {
        "x": 1735,
        "y": 169,
        "w": 78,
        "h": 110,
        "image": "three"
      },
    ]
  }
];
  