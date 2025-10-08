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
    enemies: [
      {platformX: 0, platformY: 340},
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
    "width": 3100,
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
  },
  {
    "width": 6900,
    "platforms": [
      {
        "x": 0,
        "y": 333,
        "w": 591,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 596,
        "y": 417,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 741,
        "y": 417,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 883,
        "y": 414,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 191,
        "y": 489,
        "w": 251,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 492,
        "y": 486,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 877,
        "y": 148,
        "w": 371,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1322,
        "y": 362,
        "w": 366,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1244,
        "y": 150,
        "w": 436,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2190,
        "y": 150,
        "w": 406,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2205,
        "y": 460,
        "w": 406,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2815,
        "y": 298,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2691,
        "y": 205,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2703,
        "y": 399,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 3111,
        "y": 298,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 3582,
        "y": 298,
        "w": 241,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 3906,
        "y": 298,
        "w": 321,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 3435,
        "y": 211,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 3113,
        "y": 136,
        "w": 251,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 4752,
        "y": 144,
        "w": 431,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 5224,
        "y": 244,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 5344,
        "y": 356,
        "w": 546,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 6184,
        "y": 356,
        "w": 721,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 5948,
        "y": 352,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 6060,
        "y": 352,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1728,
        "y": 292,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1732,
        "y": 208,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      }
    ],
    "walls": [
      {
        "x": 1247,
        "y": 3,
        "w": 66,
        "h": 157,
        "texture": "stone"
      },
      {
        "x": 3047,
        "y": 3,
        "w": 66,
        "h": 141,
        "texture": "stone"
      }
    ],
    "doors": [],
    "switches": [
      {
        "x": 298,
        "y": 486,
        "w": 26,
        "h": 11,
        "group": 1
      },
      {
        "x": 1209,
        "y": 142,
        "w": 26,
        "h": 11,
        "group": 2
      },
      {
        "x": 1325,
        "y": 148,
        "w": 26,
        "h": 11,
        "group": 3
      },
      {
        "x": 2286,
        "y": 457,
        "w": 26,
        "h": 11,
        "group": 4
      },
      {
        "x": 3134,
        "y": 295,
        "w": 26,
        "h": 11,
        "group": 5
      },
      {
        "x": 3134,
        "y": 133,
        "w": 26,
        "h": 11,
        "group": 6
      }
    ],
    "dynamicPlatforms": [
      {
        "x": 596,
        "y": 243,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 1,
        "mode": "hold"
      },
      {
        "x": 747,
        "y": 200,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 1,
        "mode": "hold"
      },
      {
        "x": 1004,
        "y": 417,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 2,
        "mode": "hold"
      },
      {
        "x": 1149,
        "y": 362,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 2,
        "mode": "hold"
      },
      {
        "x": 1846,
        "y": 150,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 3,
        "mode": "hold"
      },
      {
        "x": 2017,
        "y": 148,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 3,
        "mode": "hold"
      },
      {
        "x": 2946,
        "y": 399,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 4,
        "mode": "hold"
      },
      {
        "x": 3252,
        "y": 298,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 5,
        "mode": "hold"
      },
      {
        "x": 4285,
        "y": 295,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 6,
        "mode": "hold"
      },
      {
        "x": 4421,
        "y": 217,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 6,
        "mode": "hold"
      },
      {
        "x": 4578,
        "y": 142,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 6,
        "mode": "hold"
      }
    ],
    "traps": [
      {
        "x": 231,
        "y": 321,
        "w": 20,
        "h": 22
      },
      {
        "x": 249,
        "y": 321,
        "w": 20,
        "h": 22
      },
      {
        "x": 266,
        "y": 321,
        "w": 20,
        "h": 22
      },
      {
        "x": 420,
        "y": 477,
        "w": 20,
        "h": 22
      },
      {
        "x": 1450,
        "y": 136,
        "w": 20,
        "h": 22
      },
      {
        "x": 1476,
        "y": 136,
        "w": 20,
        "h": 22
      },
      {
        "x": 1386,
        "y": 350,
        "w": 20,
        "h": 22
      },
      {
        "x": 1406,
        "y": 350,
        "w": 20,
        "h": 22
      },
      {
        "x": 1421,
        "y": 350,
        "w": 20,
        "h": 22
      },
      {
        "x": 3675,
        "y": 284,
        "w": 20,
        "h": 22
      },
      {
        "x": 3698,
        "y": 284,
        "w": 20,
        "h": 22
      },
      {
        "x": 3718,
        "y": 286,
        "w": 20,
        "h": 22
      },
      {
        "x": 6509,
        "y": 343,
        "w": 20,
        "h": 22
      },
      {
        "x": 6533,
        "y": 343,
        "w": 20,
        "h": 22
      }
    ],
    "coins": [
      {
        "x": 251,
        "y": 227,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 301,
        "y": 446,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1328,
        "y": 101,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 770,
        "y": 374,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1535,
        "y": 321,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1619,
        "y": 319,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1579,
        "y": 321,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2291,
        "y": 416,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2329,
        "y": 108,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2379,
        "y": 108,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3138,
        "y": 90,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3138,
        "y": 251,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 919,
        "y": 99,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2841,
        "y": 251,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 5415,
        "y": 307,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 5502,
        "y": 307,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 5463,
        "y": 307,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 6728,
        "y": 307,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 6776,
        "y": 307,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 6820,
        "y": 307,
        "w": 20,
        "h": 20,
        "collected": false
      }
    ],
    "finish": {
      "x": 6864,
      "y": 300,
      "w": 24,
      "h": 63
    },
    "gift": {
      "title": "Третий пройден",
      "desc": "Ты большая молодец!"
    },
    "decorations": [
      {
        "x": 95,
        "y": 234,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 12,
        "y": 301,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 966,
        "y": 136,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 1140,
        "y": 136,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 1053,
        "y": 136,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1001,
        "y": 46,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 1160,
        "y": 20,
        "w": 93,
        "h": 136,
        "image": "three"
      },
      {
        "x": 894,
        "y": 139,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1114,
        "y": 139,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 764,
        "y": 408,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 498,
        "y": 480,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 1325,
        "y": 333,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 1444,
        "y": 263,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 1597,
        "y": 52,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 1493,
        "y": 356,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1568,
        "y": 356,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2407,
        "y": 52,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 2222,
        "y": 26,
        "w": 98,
        "h": 133,
        "image": "three"
      },
      {
        "x": 2321,
        "y": 454,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2390,
        "y": 451,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2448,
        "y": 451,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1574,
        "y": 145,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 1499,
        "y": 145,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2512,
        "y": 142,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 2729,
        "y": 388,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 2697,
        "y": 197,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 2193,
        "y": 142,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2274,
        "y": 142,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2347,
        "y": 142,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2454,
        "y": 142,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 567,
        "y": 307,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 1664,
        "y": 336,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 2575,
        "y": 127,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 3805,
        "y": 272,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 6440,
        "y": 220,
        "w": 103,
        "h": 142,
        "image": "three"
      },
      {
        "x": 4060,
        "y": 264,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 5352,
        "y": 324,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 6304,
        "y": 324,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 3208,
        "y": 100,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 3904,
        "y": 292,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 4868,
        "y": 136,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 4936,
        "y": 136,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 5804,
        "y": 352,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 5128,
        "y": 136,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 6728,
        "y": 344,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 6792,
        "y": 344,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 3628,
        "y": 288,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 6064,
        "y": 344,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 3258,
        "y": 128,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 5590,
        "y": 351,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 5678,
        "y": 347,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 3741,
        "y": 295,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 6620,
        "y": 347,
        "w": 56,
        "h": 18,
        "image": "flower1"
      }
    ],
    "decorationsUndo": [
      {
        "x": 5416,
        "y": 348,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 5480,
        "y": 348,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 6184,
        "y": 348,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 4020,
        "y": 292,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 4752,
        "y": 132,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 6252,
        "y": 348,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 6428,
        "y": 348,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 3162,
        "y": 128,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 153,
        "y": 324,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 292,
        "y": 324,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 52,
        "y": 324,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 475,
        "y": 324,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 405,
        "y": 327,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 356,
        "y": 304,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 347,
        "y": 483,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 194,
        "y": 480,
        "w": 73,
        "h": 19,
        "image": "grass1"
      }
    ],
    "decorationsUndoPlatform": [
      {
        "x": 3284,
        "y": 36,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 3584,
        "y": 220,
        "w": 58,
        "h": 82,
        "image": "three"
      },
      {
        "x": 4140,
        "y": 224,
        "w": 58,
        "h": 82,
        "image": "three"
      },
      {
        "x": 5736,
        "y": 284,
        "w": 58,
        "h": 82,
        "image": "three"
      },
      {
        "x": 6376,
        "y": 280,
        "w": 58,
        "h": 82,
        "image": "three"
      },
      {
        "x": 5064,
        "y": 72,
        "w": 58,
        "h": 82,
        "image": "three"
      },
      {
        "x": 4804,
        "y": 72,
        "w": 58,
        "h": 82,
        "image": "three"
      },
      {
        "x": 6668,
        "y": 284,
        "w": 58,
        "h": 82,
        "image": "three"
      },
      {
        "x": 3964,
        "y": 196,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 5532,
        "y": 252,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 4976,
        "y": 44,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 6556,
        "y": 256,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 5620,
        "y": 220,
        "w": 103,
        "h": 142,
        "image": "three"
      },
      {
        "x": 2494,
        "y": 341,
        "w": 98,
        "h": 133,
        "image": "three"
      },
      {
        "x": 2214,
        "y": 391,
        "w": 58,
        "h": 79,
        "image": "three"
      },
      {
        "x": 252,
        "y": 417,
        "w": 58,
        "h": 79,
        "image": "three"
      },
      {
        "x": 1386,
        "y": 78,
        "w": 58,
        "h": 79,
        "image": "three"
      },
      {
        "x": 446,
        "y": 185,
        "w": 118,
        "h": 157,
        "image": "three"
      }
    ]
  }
];
  