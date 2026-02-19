const levels = [
  {
    width: 3800,
    "background": "forest",
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

    // Артефакт 1
    artifacts: [
      { id: 1, x: 2964, y: 168, w: 42, h: 32, collected: false }
    ],

    finish: {x: 3660, y: 200, w: 24, h: 63},
    gift: {title: "Уровень 1", desc: "Супер, первый пройден!"},
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
    "background": "forest",
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
      "title": "Уровень 2",
      "desc": "Так держать! <3"
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
      "title": "Уровень 3",
      "desc": "Арчи, ты тут?"
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
      },
      {
        "x": 5532,
        "y": 252,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 6668,
        "y": 284,
        "w": 58,
        "h": 82,
        "image": "three"
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
      },
      {
        "x": 2407,
        "y": 52,
        "w": 78,
        "h": 110,
        "image": "three"
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
        "x": 3964,
        "y": 196,
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
      },
      {
        "x": 2222,
        "y": 26,
        "w": 98,
        "h": 133,
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
        "x": 1444,
        "y": 263,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 6440,
        "y": 220,
        "w": 103,
        "h": 142,
        "image": "three"
      },
      {
        "x": 6376,
        "y": 280,
        "w": 58,
        "h": 82,
        "image": "three"
      }
    ],
    "enemies": [],
    
    // Артефакт 2
    "artifacts": [
      { "id": 2, "x": 2380, "y": 390, "w": 53, "h": 48, "collected": false }
    ],

  },
  {
    "width": 5000,
    "platforms": [
      {
        "x": 499,
        "y": 145,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 216,
        "y": 306,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 851,
        "y": 286,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 763,
        "y": 205,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 633,
        "y": 147,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 288,
        "y": 365,
        "w": 541,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 0,
        "y": 433,
        "w": 286,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1308,
        "y": 205,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1205,
        "y": 108,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1056,
        "y": 108,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1429,
        "y": 279,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1539,
        "y": 380,
        "w": 291,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 281,
        "y": 240,
        "w": 351,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1823,
        "y": 383,
        "w": 351,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2239,
        "y": 378,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1830,
        "y": 213,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2133,
        "y": 143,
        "w": 451,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2643,
        "y": 139,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2766,
        "y": 139,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2852,
        "y": 248,
        "w": 311,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 4149,
        "y": 420,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 4294,
        "y": 420,
        "w": 706,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 4685,
        "y": 327,
        "w": 311,
        "h": 20,
        "texture": "grass"
      }
    ],
    "walls": [
      {
        "x": 567,
        "y": 2,
        "w": 66,
        "h": 242,
        "texture": "stone"
      },
      {
        "x": 345,
        "y": 2,
        "w": 66,
        "h": 190,
        "texture": "stone"
      },
      {
        "x": 1764,
        "y": 2,
        "w": 66,
        "h": 273,
        "texture": "stone"
      },
      {
        "x": 1764,
        "y": 398,
        "w": 66,
        "h": 142,
        "texture": "stone"
      }
    ],
    "doors": [
      {
        "x": 596,
        "y": 257,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 1,
        "mode": "hold"
      },
      {
        "x": 1792,
        "y": 275,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 3,
        "mode": "hold"
      }
    ],
    "switches": [
      {
        "x": 523,
        "y": 141,
        "w": 26,
        "h": 11,
        "group": 1
      },
      {
        "x": 655,
        "y": 143,
        "w": 26,
        "h": 11,
        "group": 2
      },
      {
        "x": 1080,
        "y": 101,
        "w": 26,
        "h": 11,
        "group": 3
      },
      {
        "x": 2260,
        "y": 373,
        "w": 26,
        "h": 11,
        "group": 4
      },
      {
        "x": 2789,
        "y": 136,
        "w": 26,
        "h": 11,
        "group": 5
      }
    ],
    "dynamicPlatforms": [
      {
        "x": 990,
        "y": 286,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 2,
        "mode": "hold"
      },
      {
        "x": 1161,
        "y": 286,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 2,
        "mode": "hold"
      },
      {
        "x": 1940,
        "y": 288,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 4,
        "mode": "hold"
      },
      {
        "x": 1940,
        "y": 147,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 4,
        "mode": "hold"
      },
      {
        "x": 3796,
        "y": 365,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 5,
        "mode": "hold"
      },
      {
        "x": 3976,
        "y": 420,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 5,
        "mode": "hold"
      },
      {
        "x": 3204,
        "y": 301,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "type": "moving",
        "distanceX": 430,
        "distanceY": 0,
        "speed": 1.5
      }
    ],
    "traps": [

    ],
    "coins": [
      {
        "x": 526,
        "y": 108,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 658,
        "y": 112,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1847,
        "y": 336,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 457,
        "y": 270,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1229,
        "y": 18,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1887,
        "y": 336,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1926,
        "y": 336,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2792,
        "y": 93,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2668,
        "y": 93,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 4766,
        "y": 370,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 4821,
        "y": 370,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 4878,
        "y": 370,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3319,
        "y": 251,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3430,
        "y": 248,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3538,
        "y": 248,
        "w": 20,
        "h": 20,
        "collected": false
      }
    ],
    "finish": {
      "x": 4933,
      "y": 269,
      "w": 24,
      "h": 63
    },
    "gift": {
      "title": "Уровень 4",
      "desc": "Это кто на горизонте?"
    },
    "decorations": [
      {
        "x": 866,
        "y": 275,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 1586,
        "y": 374,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 1889,
        "y": 374,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 1997,
        "y": 372,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2052,
        "y": 372,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 699,
        "y": 251,
        "w": 93,
        "h": 123,
        "image": "three"
      },
      {
        "x": 1515,
        "y": 264,
        "w": 93,
        "h": 123,
        "image": "three"
      },
      {
        "x": 1700,
        "y": 372,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 1227,
        "y": 99,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 40,
        "y": 424,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2879,
        "y": 130,
        "w": 93,
        "h": 126,
        "image": "three"
      },
      {
        "x": 2665,
        "y": 127,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 2326,
        "y": 130,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 2859,
        "y": 234,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 2164,
        "y": 133,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2277,
        "y": 133,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2517,
        "y": 133,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2222,
        "y": 133,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 3038,
        "y": 237,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2986,
        "y": 237,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 4462,
        "y": 350,
        "w": 58,
        "h": 80,
        "image": "three"
      },
      {
        "x": 4554,
        "y": 286,
        "w": 93,
        "h": 143,
        "image": "three"
      },
      {
        "x": 4343,
        "y": 414,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 4913,
        "y": 411,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 4855,
        "y": 411,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 4702,
        "y": 411,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 4401,
        "y": 414,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 4523,
        "y": 411,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 4167,
        "y": 408,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 4612,
        "y": 414,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 3142,
        "y": 222,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 807,
        "y": 340,
        "w": 20,
        "h": 35,
        "image": "alert"
      }
    ],
    "decorationsUndo": [
      {
        "x": 238,
        "y": 297,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 4644,
        "y": 411,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 1638,
        "y": 372,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1944,
        "y": 374,
        "w": 56,
        "h": 20,
        "image": "flower2"
      }
    ],
    "decorationsUndoPlatform": [
      {
        "x": 2431,
        "y": 41,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 4297,
        "y": 321,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 4769,
        "y": 411,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 4690,
        "y": 321,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 4760,
        "y": 321,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 4832,
        "y": 321,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2911,
        "y": 240,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2364,
        "y": 133,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 372,
        "y": 358,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 303,
        "y": 358,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 488,
        "y": 356,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 636,
        "y": 356,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 754,
        "y": 356,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1827,
        "y": 372,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 209,
        "y": 424,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 486,
        "y": 231,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 427,
        "y": 231,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 365,
        "y": 231,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 297,
        "y": 231,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 141,
        "y": 424,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 106,
        "y": 319,
        "w": 93,
        "h": 123,
        "image": "three"
      },
      {
        "x": 2102,
        "y": 284,
        "w": 78,
        "h": 110,
        "image": "three"
      }
    ],
    "enemies": []
  },
  {
    "width": 3800,
    
    // Артефакт 3
    "artifacts": [
      { "id": 3, "x": 1835, "y": 196, "w": 63, "h": 59, "collected": false }
    ],

    "platforms": [
      {
        "x": 0,
        "y": 460,
        "w": 556,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 0,
        "y": 394,
        "w": 201,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 587,
        "y": 394,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 724,
        "y": 394,
        "w": 536,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 954,
        "y": 320,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 853,
        "y": 245,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 557,
        "y": 174,
        "w": 236,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1493,
        "y": 389,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1597,
        "y": 318,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1724,
        "y": 315,
        "w": 336,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2098,
        "y": 313,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2103,
        "y": 457,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2204,
        "y": 386,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2662,
        "y": 152,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2754,
        "y": 72,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2660,
        "y": 254,
        "w": 291,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2984,
        "y": 315,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 3340,
        "y": 313,
        "w": 461,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2321,
        "y": 388,
        "w": 631,
        "h": 20,
        "texture": "grass"
      }
    ],
    "walls": [
      {
        "x": 559,
        "y": -1,
        "w": 66,
        "h": 177,
        "texture": "stone"
      },
      {
        "x": 2597,
        "y": -1,
        "w": 66,
        "h": 284,
        "texture": "stone"
      },
      {
        "x": 2823,
        "y": -1,
        "w": 66,
        "h": 205,
        "texture": "stone"
      },
      {
        "x": 2595,
        "y": 407,
        "w": 66,
        "h": 132,
        "texture": "stone"
      }
    ],
    "doors": [
      {
        "x": 2629,
        "y": 282,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 2,
        "mode": "hold"
      }
    ],
    "switches": [
      {
        "x": 640,
        "y": 169,
        "w": 26,
        "h": 11,
        "group": 1
      },
      {
        "x": 2125,
        "y": 451,
        "w": 26,
        "h": 11,
        "group": 2
      },
      {
        "x": 2777,
        "y": 68,
        "w": 26,
        "h": 11,
        "group": 3
      }
    ],
    "dynamicPlatforms": [
      {
        "x": 1329,
        "y": 394,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 1,
        "mode": "hold"
      },
      {
        "x": 3141,
        "y": 315,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 3,
        "mode": "hold"
      }
    ],
    "traps": [
    ],
    "coins": [
      {
        "x": 376,
        "y": 353,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 644,
        "y": 129,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1519,
        "y": 343,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1622,
        "y": 274,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2781,
        "y": 215,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2779,
        "y": 30,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3517,
        "y": 210,
        "w": 20,
        "h": 20,
        "collected": false
      }
    ],
    "finish": {
      "x": 3756,
      "y": 254,
      "w": 24,
      "h": 63
    },
    "gift": {
      "title": "Уровень 5",
      "desc": "Я вижу еще большк котов..."
    },
    "decorations": [
      {
        "x": 755,
        "y": 321,
        "w": 58,
        "h": 81,
        "image": "three"
      },
      {
        "x": 1738,
        "y": 284,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 490,
        "y": 436,
        "w": 50,
        "h": 31,
        "image": "bush"
      },
      {
        "x": 11,
        "y": 438,
        "w": 50,
        "h": 31,
        "image": "bush"
      },
      {
        "x": 3436,
        "y": 289,
        "w": 50,
        "h": 31,
        "image": "bush"
      },
      {
        "x": 2878,
        "y": 248,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2814,
        "y": 248,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2750,
        "y": 248,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2684,
        "y": 248,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2665,
        "y": 248,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 3552,
        "y": 303,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 3659,
        "y": 305,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 3362,
        "y": 303,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1897,
        "y": 307,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1197,
        "y": 385,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1083,
        "y": 385,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1031,
        "y": 386,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 184,
        "y": 452,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 130,
        "y": 452,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 602,
        "y": 383,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 3006,
        "y": 308,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 1164,
        "y": 386,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 789,
        "y": 388,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 967,
        "y": 388,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 293,
        "y": 452,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 412,
        "y": 452,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 151,
        "y": 385,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 98,
        "y": 386,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 4,
        "y": 317,
        "w": 63,
        "h": 83,
        "image": "three"
      },
      {
        "x": 46,
        "y": 388,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 756,
        "y": 168,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 677,
        "y": 167,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2496,
        "y": 381,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 2553,
        "y": 381,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 2323,
        "y": 381,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2707,
        "y": 378,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 2822,
        "y": 381,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1235,
        "y": 369,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 528,
        "y": 435,
        "w": 20,
        "h": 35,
        "image": "alert"
      }
    ],
    "decorationsUndo": [
      {
        "x": 2395,
        "y": 381,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 862,
        "y": 388,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 933,
        "y": 386,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 56,
        "y": 454,
        "w": 73,
        "h": 19,
        "image": "grass1"
      }
    ],
    "decorationsUndoPlatform": [
      {
        "x": 2867,
        "y": 286,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 3600,
        "y": 213,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 2036,
        "y": 288,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 1960,
        "y": 215,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 1107,
        "y": 241,
        "w": 108,
        "h": 162,
        "image": "three"
      },
      {
        "x": 250,
        "y": 359,
        "w": 78,
        "h": 110,
        "image": "three"
      }
    ],
    "enemies": [
      {
        "platformX": 724,
        "platformY": 394
      }
    ]
  },
  {
    "width": 5000,

    "background": "forest",
    "platforms": [
      {
        "x": 0,
        "y": 376,
        "w": 300,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 0,
        "y": 120,
        "w": 306,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 536,
        "y": 376,
        "w": 216,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 748,
        "y": 376,
        "w": 216,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 797,
        "y": 111,
        "w": 166,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1141,
        "y": 323,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1247,
        "y": 376,
        "w": 496,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1961,
        "y": 280,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2252,
        "y": 174,
        "w": 311,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2301,
        "y": 373,
        "w": 376,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2629,
        "y": 174,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 3049,
        "y": 373,
        "w": 311,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1217,
        "y": 187,
        "w": 521,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 3379,
        "y": 306,
        "w": 421,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 3806,
        "y": 250,
        "w": 376,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 4371,
        "y": 247,
        "w": 326,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 4744,
        "y": 392,
        "w": 256,
        "h": 20,
        "texture": "grass"
      }
    ],
    "walls": [
      {
        "x": 738,
        "y": -1,
        "w": 66,
        "h": 271,
        "texture": "stone"
      },
      {
        "x": 741,
        "y": 392,
        "w": 66,
        "h": 147,
        "texture": "stone"
      },
      {
        "x": 1452,
        "y": -1,
        "w": 66,
        "h": 79,
        "texture": "stone"
      },
      {
        "x": 1455,
        "y": 204,
        "w": 66,
        "h": 70,
        "texture": "stone"
      },
      {
        "x": 1455,
        "y": 392,
        "w": 66,
        "h": 148,
        "texture": "stone"
      },
      {
        "x": 4116,
        "y": -1,
        "w": 66,
        "h": 146,
        "texture": "stone"
      },
      {
        "x": 4116,
        "y": 267,
        "w": 66,
        "h": 273,
        "texture": "stone"
      }
    ],
    "doors": [
      {
        "x": 752,
        "y": 269,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 1,
        "mode": "hold"
      },
      {
        "x": 1468,
        "y": 78,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 3,
        "mode": "hold"
      },
      {
        "x": 1468,
        "y": 273,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 2,
        "mode": "hold"
      },
      {
        "x": 4130,
        "y": 144,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 6,
        "mode": "hold"
      }
    ],
    "switches": [
      {
        "x": 25,
        "y": 116,
        "w": 26,
        "h": 11,
        "group": 1
      },
      {
        "x": 820,
        "y": 108,
        "w": 26,
        "h": 11,
        "group": 2
      },
      {
        "x": 1667,
        "y": 373,
        "w": 26,
        "h": 11,
        "group": 3
      },
      {
        "x": 1667,
        "y": 181,
        "w": 26,
        "h": 11,
        "group": 4
      },
      {
        "x": 2652,
        "y": 168,
        "w": 26,
        "h": 11,
        "group": 5
      },
      {
        "x": 3062,
        "y": 369,
        "w": 26,
        "h": 11,
        "group": 6
      }
    ],
    "dynamicPlatforms": [
      {
        "x": 352,
        "y": 331,
        "w": 46,
        "h": 16,
        "texture": "slime_platform",
        "type": "bouncy",
        "bounceStrength": -22
      },
      {
        "x": 1022,
        "y": 326,
        "w": 46,
        "h": 16,
        "texture": "slime_platform",
        "type": "bouncy",
        "bounceStrength": -22
      },
      {
        "x": 1816,
        "y": 373,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "type": "moving",
        "distanceX": 310,
        "distanceY": 0,
        "speed": 1
      },
      {
        "x": 2083,
        "y": 224,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 4,
        "mode": "hold"
      },
      {
        "x": 2731,
        "y": 373,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 5,
        "mode": "hold"
      },
      {
        "x": 2890,
        "y": 373,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 5,
        "mode": "hold"
      },
      {
        "x": 4265,
        "y": 452,
        "w": 46,
        "h": 16,
        "texture": "slime_platform",
        "type": "bouncy",
        "bounceStrength": -22
      }
    ],
    "traps": [
    ],
    "coins": [
      {
        "x": 824,
        "y": 64,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1668,
        "y": 140,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1668,
        "y": 332,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1344,
        "y": 84,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2656,
        "y": 132,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2772,
        "y": 336,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2928,
        "y": 336,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3064,
        "y": 332,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 4276,
        "y": 408,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 28,
        "y": 80,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1164,
        "y": 284,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3328,
        "y": 288,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3768,
        "y": 208,
        "w": 20,
        "h": 20,
        "collected": false
      }
    ],
    "finish": {
      "x": 4969,
      "y": 333,
      "w": 24,
      "h": 63
    },
    "gift": {
      "title": "Уровень 6",
      "desc": "Остался последний рывок!"
    },
    "decorations": [
      {
        "x": 77,
        "y": 369,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 153,
        "y": 366,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 212,
        "y": 366,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 131,
        "y": 113,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 625,
        "y": 369,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 910,
        "y": 101,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 1977,
        "y": 270,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 1366,
        "y": 178,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1518,
        "y": 174,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1577,
        "y": 174,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 1700,
        "y": 181,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 662,
        "y": 369,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 787,
        "y": 369,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 847,
        "y": 346,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 910,
        "y": 369,
        "w": 53,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1247,
        "y": 366,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 1306,
        "y": 366,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1366,
        "y": 366,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2255,
        "y": 164,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2331,
        "y": 164,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2523,
        "y": 164,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 2301,
        "y": 363,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2361,
        "y": 363,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 2420,
        "y": 363,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2477,
        "y": 366,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2520,
        "y": 343,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 2582,
        "y": 363,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 3118,
        "y": 366,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 3151,
        "y": 366,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 3227,
        "y": 366,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 3303,
        "y": 366,
        "w": 58,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 3630,
        "y": 293,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 3687,
        "y": 293,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 3746,
        "y": 300,
        "w": 53,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 3468,
        "y": 300,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 3392,
        "y": 273,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 3809,
        "y": 240,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 3935,
        "y": 237,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 3994,
        "y": 240,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 4050,
        "y": 237,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 4093,
        "y": 240,
        "w": 33,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 4374,
        "y": 237,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 4454,
        "y": 237,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 4513,
        "y": 237,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 4563,
        "y": 217,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 4625,
        "y": 237,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 4867,
        "y": 382,
        "w": 73,
        "h": 19,
        "image": "grass1"
      }
    ],
    "decorationsUndo": [
      {
        "x": 54,
        "y": 113,
        "w": 73,
        "h": 19,
        "image": "grass1"
      }
    ],
    "decorationsUndoPlatform": [
      {
        "x": 214,
        "y": 15,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 282,
        "y": 346,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 2658,
        "y": 343,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 1564,
        "y": 273,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 2424,
        "y": 32,
        "w": 98,
        "h": 152,
        "image": "three"
      },
      {
        "x": 3528,
        "y": 164,
        "w": 98,
        "h": 152,
        "image": "three"
      },
      {
        "x": 3862,
        "y": 158,
        "w": 68,
        "h": 101,
        "image": "three"
      },
      {
        "x": 7,
        "y": 287,
        "w": 68,
        "h": 98,
        "image": "three"
      },
      {
        "x": 4781,
        "y": 287,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 1220,
        "y": 154,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 1283,
        "y": 178,
        "w": 63,
        "h": 19,
        "image": "grass1"
      }
    ],
    "enemies": [
      {
        "platformX": 536,
        "platformY": 376,
        "platformW": 216
      },
      {
        "platformX": 1247,
        "platformY": 376,
        "platformW": 496
      },
      {
        "platformX": 2301,
        "platformY": 373,
        "platformW": 376
      },
      {
        "platformX": 2252,
        "platformY": 174,
        "platformW": 311
      },
      {
        "platformX": 3379,
        "platformY": 306,
        "platformW": 421
      },
      {
        "platformX": 4371,
        "platformY": 247,
        "platformW": 326
      }
    ]
  },
  {
    "width": 4500,

    "platforms": [
      {
        "x": 1,
        "y": 472,
        "w": 361,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1028,
        "y": 404,
        "w": 301,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1024,
        "y": 136,
        "w": 301,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1552,
        "y": 404,
        "w": 221,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 1404,
        "y": 136,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1956,
        "y": 400,
        "w": 276,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2264,
        "y": 344,
        "w": 256,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2584,
        "y": 344,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 1543,
        "y": 137,
        "w": 531,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2113,
        "y": 137,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 2877,
        "y": 395,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 3317,
        "y": 449,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 4040,
        "y": 380,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 4172,
        "y": 320,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 4320,
        "y": 264,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 3622,
        "y": 452,
        "w": 890,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 3433,
        "y": 452,
        "w": 191,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 3433,
        "y": 466,
        "w": 1066,
        "h": 17,
        "texture": "stone"
      },
      {
        "x": 0,
        "y": 376,
        "w": 206,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 590,
        "y": 397,
        "w": 236,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 3004,
        "y": 422,
        "w": 271,
        "h": 20,
        "texture": "grass"
      }
    ],
    "walls": [
      {
        "x": 1117,
        "y": 151,
        "w": 66,
        "h": 144,
        "texture": "stone"
      },
      {
        "x": 1121,
        "y": 420,
        "w": 66,
        "h": 120,
        "texture": "stone"
      },
      {
        "x": 1117,
        "y": -1,
        "w": 66,
        "h": 30,
        "texture": "stone"
      },
      {
        "x": 1775,
        "y": -1,
        "w": 66,
        "h": 31,
        "texture": "stone"
      }
    ],
    "doors": [
      {
        "x": 1132,
        "y": 28,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 2,
        "mode": "hold"
      },
      {
        "x": 1132,
        "y": 296,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 1,
        "mode": "hold"
      },
      {
        "x": 1790,
        "y": 31,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 4,
        "mode": "hold"
      }
    ],
    "switches": [
      {
        "x": 1204,
        "y": 400,
        "w": 26,
        "h": 11,
        "group": 2
      },
      {
        "x": 1748,
        "y": 132,
        "w": 26,
        "h": 11,
        "group": 3
      },
      {
        "x": 2201,
        "y": 395,
        "w": 26,
        "h": 11,
        "group": 4
      },
      {
        "x": 2135,
        "y": 133,
        "w": 26,
        "h": 11,
        "group": 5
      },
      {
        "x": 655,
        "y": 393,
        "w": 26,
        "h": 11,
        "group": 1
      }
    ],
    "dynamicPlatforms": [
      {
        "x": 880,
        "y": 140,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "type": "moving",
        "distanceX": 0.0001,
        "distanceY": 270,
        "speed": 1
      },
      {
        "x": 1380,
        "y": 404,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 3,
        "mode": "hold"
      },
      {
        "x": 1812,
        "y": 400,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 3,
        "mode": "hold"
      },
      {
        "x": 2710,
        "y": 344,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 5,
        "mode": "hold"
      },
      {
        "x": 393,
        "y": 400,
        "w": 46,
        "h": 16,
        "texture": "slime_platform",
        "type": "bouncy",
        "bounceStrength": -22
      }
    ],
    "traps": [

    ],
    "coins": [
      {
        "x": 1748,
        "y": 88,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2136,
        "y": 96,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1204,
        "y": 352,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1420,
        "y": 352,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1852,
        "y": 348,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2748,
        "y": 296,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 4200,
        "y": 276,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 4072,
        "y": 340,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1428,
        "y": 92,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 924,
        "y": 52,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 659,
        "y": 349,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3135,
        "y": 375,
        "w": 20,
        "h": 20,
        "collected": false
      }
    ],
    "finish": {
      "x": 4348,
      "y": 208,
      "w": 24,
      "h": 63
    },
    "gift": {
      "title": "Уровень 7",
      "desc": "Всёё, мы дома"
    },
    "decorations": [
      {
        "x": 4,
        "y": 464,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 284,
        "y": 460,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 2604,
        "y": 336,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 1420,
        "y": 124,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 2500,
        "y": 320,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 1556,
        "y": 108,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 2268,
        "y": 312,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 2424,
        "y": 336,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 2028,
        "y": 392,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1700,
        "y": 396,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1556,
        "y": 396,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 1612,
        "y": 396,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1664,
        "y": 396,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 1252,
        "y": 396,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1268,
        "y": 124,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1215,
        "y": 126,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 1023,
        "y": 129,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1906,
        "y": 68,
        "w": 53,
        "h": 77,
        "image": "three"
      },
      {
        "x": 1957,
        "y": 129,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2015,
        "y": 129,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 1615,
        "y": 129,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1677,
        "y": 129,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1833,
        "y": 129,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 1906,
        "y": 129,
        "w": 29,
        "h": 15,
        "image": "rock2"
      },
      {
        "x": 3488,
        "y": 442,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 3546,
        "y": 442,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 2321,
        "y": 333,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 3433,
        "y": 420,
        "w": 60,
        "h": 40,
        "image": "bush"
      },
      {
        "x": 3786,
        "y": 47,
        "w": 73,
        "h": 407,
        "image": "house_2"
      },
      {
        "x": 340,
        "y": 444,
        "w": 20,
        "h": 35,
        "image": "alert"
      },
      {
        "x": 60,
        "y": 464,
        "w": 56,
        "h": 20,
        "image": "flower2"
      },
      {
        "x": 120,
        "y": 464,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 180,
        "y": 464,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 3023,
        "y": 411,
        "w": 56,
        "h": 18,
        "image": "flower1"
      },
      {
        "x": 3084,
        "y": 415,
        "w": 133,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 3219,
        "y": 411,
        "w": 56,
        "h": 18,
        "image": "flower1"
      }
    ],
    "decorationsUndo": [
      {
        "x": 1172,
        "y": 122,
        "w": 39,
        "h": 20,
        "image": "rock1"
      },
      {
        "x": 3541,
        "y": 47,
        "w": 245,
        "h": 413,
        "image": "house_1"
      }
    ],
    "decorationsUndoPlatform": [
      {
        "x": 4162,
        "y": 47,
        "w": 305,
        "h": 407,
        "image": "house_bg"
      },
      {
        "x": 4466,
        "y": 47,
        "w": 305,
        "h": 407,
        "image": "house_bg"
      },
      {
        "x": 3857,
        "y": 47,
        "w": 305,
        "h": 407,
        "image": "house_bg"
      },
      {
        "x": 128,
        "y": 276,
        "w": 78,
        "h": 110,
        "image": "three"
      },
      {
        "x": 4,
        "y": 368,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 84,
        "y": 368,
        "w": 73,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 732,
        "y": 268,
        "w": 103,
        "h": 151,
        "image": "three"
      },
      {
        "x": 2108,
        "y": 300,
        "w": 78,
        "h": 110,
        "image": "three"
      }
    ],
    "enemies": [
      {
        "platformX": 1256,
        "platformY": 464,
        "platformW": 361
      },
      {
        "platformX": 1956,
        "platformY": 400,
        "platformW": 276
      },
      {
        "platformX": 3004,
        "platformY": 449,
        "platformW": 271
      },
      {
        "platformX": 3004,
        "platformY": 422,
        "platformW": 271
      }
    ]
  },
  {
    "width": 3800,
    "background": "house",
    
    // Артефакт 4
    "artifacts": [
      { "id": 4, "x": 4508, "y": 140, "w": 46, "h": 70, "collected": false }
    ],
    "platforms": [
      {
        "x": 232,
        "y": 424,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 360,
        "y": 360,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 232,
        "y": 284,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 484,
        "y": 276,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 576,
        "y": 208,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 664,
        "y": 128,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 1156,
        "y": 188,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 1536,
        "y": 488,
        "w": 855,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 1340,
        "y": 336,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 124,
        "y": 220,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 2019,
        "y": 434,
        "w": 77,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 2093,
        "y": 434,
        "w": 77,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 2122,
        "y": 434,
        "w": 77,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 2251,
        "y": 379,
        "w": 77,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 2394,
        "y": 305,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 3341,
        "y": 415,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 3485,
        "y": 368,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 3621,
        "y": 323,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 3701,
        "y": 323,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 0,
        "y": 492,
        "w": 805,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 3152,
        "y": 484,
        "w": 655,
        "h": 20,
        "texture": "house"
      }
    ],
    "walls": [],
    "doors": [],
    "switches": [
      {
        "x": 152,
        "y": 216,
        "w": 26,
        "h": 11,
        "group": 1
      }
    ],
    "dynamicPlatforms": [
      {
        "x": 812,
        "y": 200,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 1,
        "mode": "hold"
      },
      {
        "x": 964,
        "y": 200,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 1,
        "mode": "hold"
      },
      {
        "x": 2541,
        "y": 298,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "type": "moving",
        "distanceX": 380,
        "distanceY": 0,
        "speed": 1
      }
    ],
    "traps": [
    ],
    "coins": [
      {
        "x": 156,
        "y": 172,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2740,
        "y": 248,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3372,
        "y": 368,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3516,
        "y": 320,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1188,
        "y": 148,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1716,
        "y": 388,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1372,
        "y": 296,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2280,
        "y": 340,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2424,
        "y": 268,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 692,
        "y": 84,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 608,
        "y": 168,
        "w": 20,
        "h": 20,
        "collected": false
      }
    ],
    "finish": {
      "x": 3746,
      "y": 261,
      "w": 24,
      "h": 63
    },
    "gift": {
      "title": "Уровень 8",
      "desc": "Да откуда эти коты"
    },
    "decorations": [
      {
        "x": 2020,
        "y": 432,
        "w": 190,
        "h": 59,
        "image": "bench"
      }
    ],
    "decorationsUndo": [],
    "decorationsUndoPlatform": [
      {
        "x": 1128,
        "y": 200,
        "w": 139,
        "h": 157,
        "image": "window"
      },
      {
        "x": 1544,
        "y": 172,
        "w": 239,
        "h": 200,
        "image": "vis"
      },
      {
        "x": 1992,
        "y": 224,
        "w": 187,
        "h": 59,
        "image": "vis2"
      },
      {
        "x": 2504,
        "y": 112,
        "w": 40,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 2556,
        "y": 136,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 2844,
        "y": 96,
        "w": 132,
        "h": 100,
        "image": "vis5"
      },
      {
        "x": 3231,
        "y": 118,
        "w": 71,
        "h": 168,
        "image": "clock"
      },
      {
        "x": 80,
        "y": 368,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 392,
        "y": 108,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 1860,
        "y": 344,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 2656,
        "y": 416,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 3620,
        "y": 100,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 3052,
        "y": 236,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 912,
        "y": 404,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 2280,
        "y": 96,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 88,
        "y": 136,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1360,
        "y": 460,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1780,
        "y": 80,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3364,
        "y": 52,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2640,
        "y": 116,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 3724,
        "y": 400,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 924,
        "y": 104,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 528,
        "y": 424,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 1432,
        "y": 256,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2848,
        "y": 272,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2164,
        "y": 200,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3028,
        "y": 496,
        "w": 45,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2308,
        "y": 444,
        "w": 45,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 332,
        "y": 300,
        "w": 45,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1956,
        "y": 220,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 864,
        "y": 256,
        "w": 191,
        "h": 64,
        "image": "vis12"
      },
      {
        "x": 248,
        "y": 296,
        "w": 48,
        "h": 47,
        "image": "vis10"
      },
      {
        "x": 316,
        "y": 76,
        "w": 170,
        "h": 72,
        "image": "vaz"
      },
      {
        "x": 324,
        "y": 152,
        "w": 158,
        "h": 104,
        "image": "vis11"
      },
      {
        "x": 1108,
        "y": 72,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1036,
        "y": 140,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1136,
        "y": 428,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 804,
        "y": 480,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1980,
        "y": 388,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 208,
        "y": 44,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 716,
        "y": 40,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 548,
        "y": 112,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 848,
        "y": 252,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 3416,
        "y": 148,
        "w": 176,
        "h": 109,
        "image": "vis9"
      },
      {
        "x": 36,
        "y": 64,
        "w": 192,
        "h": 59,
        "image": "vis2"
      },
      {
        "x": 68,
        "y": 368,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 2188,
        "y": 220,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 2004,
        "y": 176,
        "w": 175,
        "h": 46,
        "image": "vaz2"
      },
      {
        "x": 2628,
        "y": 128,
        "w": 191,
        "h": 64,
        "image": "vis12"
      },
      {
        "x": 1340,
        "y": 104,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 1356,
        "y": 180,
        "w": 48,
        "h": 47,
        "image": "vis10"
      },
      {
        "x": 864,
        "y": 48,
        "w": 170,
        "h": 46,
        "image": "vaz2"
      },
      {
        "x": 1012,
        "y": 340,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 1600,
        "y": 104,
        "w": 132,
        "h": 100,
        "image": "vis5"
      },
      {
        "x": 1256,
        "y": 48,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 2264,
        "y": 172,
        "w": 168,
        "h": 49,
        "image": "vaz4"
      },
      {
        "x": 2128,
        "y": 128,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 1948,
        "y": 124,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2148,
        "y": 68,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1840,
        "y": 256,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1556,
        "y": 440,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1776,
        "y": 460,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2192,
        "y": 336,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2480,
        "y": 388,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2912,
        "y": 404,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2576,
        "y": 496,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3052,
        "y": 68,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3268,
        "y": 380,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3388,
        "y": 148,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 3596,
        "y": 144,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 2644,
        "y": 380,
        "w": 193,
        "h": 104,
        "image": "vis11"
      },
      {
        "x": 3020,
        "y": 136,
        "w": 170,
        "h": 72,
        "image": "vaz"
      },
      {
        "x": 3112,
        "y": 324,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3044,
        "y": 408,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 3500,
        "y": 80,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3708,
        "y": 40,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3676,
        "y": 184,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3556,
        "y": 276,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 612,
        "y": 0,
        "w": 195,
        "h": 493,
        "image": "bake"
      },
      {
        "x": 1252,
        "y": 196,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 352,
        "y": 368,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 576,
        "y": 224,
        "w": 19,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 1404,
        "y": 352,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 2236,
        "y": 396,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 3624,
        "y": 336,
        "w": 157,
        "h": 50,
        "image": "vis2"
      },
      {
        "x": 3480,
        "y": 380,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 2632,
        "y": 380,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 2612,
        "y": 124,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 216,
        "y": 60,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 108,
        "y": 240,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 860,
        "y": 84,
        "w": 176,
        "h": 109,
        "image": "vis9"
      },
      {
        "x": 972,
        "y": 456,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1512,
        "y": 96,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2780,
        "y": 48,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3364,
        "y": 308,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2316,
        "y": 284,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 480,
        "y": 356,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 28,
        "y": 240,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2748,
        "y": 312,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2816,
        "y": 92,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 3536,
        "y": 384,
        "w": 48,
        "h": 47,
        "image": "vis10"
      },
      {
        "x": 2244,
        "y": 212,
        "w": 48,
        "h": 47,
        "image": "vis10"
      }
    ],
    "enemies": [
      {
        "platformX": 3150,
        "platformY": 474,
        "platformW": 650
      },
      {
        "platformX": 3152,
        "platformY": 484,
        "platformW": 655
      }
    ]
  },
  {
    "width": 7500,

    // Артефакт 5
    "artifacts": [
      { "id": 5, "x": 6005, "y": 28, "w": 39, "h": 75, "collected": false }
    ],

    "background": "house",
    "platforms": [
      {
        "x": 0,
        "y": 484,
        "w": 330,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 516,
        "y": 268,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 880,
        "y": 484,
        "w": 265,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 1144,
        "y": 484,
        "w": 225,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 1368,
        "y": 484,
        "w": 35,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 1400,
        "y": 484,
        "w": 240,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 872,
        "y": 124,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 1140,
        "y": 124,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 1012,
        "y": 124,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 1556,
        "y": 348,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 1676,
        "y": 416,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 1416,
        "y": 296,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 1948,
        "y": 124,
        "w": 246,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 2300,
        "y": 412,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 2300,
        "y": 124,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 2812,
        "y": 368,
        "w": 222,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 2588,
        "y": 424,
        "w": 202,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 1260,
        "y": 124,
        "w": 246,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 3080,
        "y": 340,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 3356,
        "y": 252,
        "w": 164,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 3160,
        "y": 484,
        "w": 400,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 2440,
        "y": 484,
        "w": 720,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 2708,
        "y": 296,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 2596,
        "y": 240,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 2480,
        "y": 188,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 4244,
        "y": 244,
        "w": 328,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 4620,
        "y": 324,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 4748,
        "y": 404,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 4864,
        "y": 484,
        "w": 500,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 5840,
        "y": 428,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 5728,
        "y": 360,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 6280,
        "y": 124,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 6120,
        "y": 420,
        "w": 328,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 6640,
        "y": 484,
        "w": 350,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 6984,
        "y": 484,
        "w": 265,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 7244,
        "y": 484,
        "w": 255,
        "h": 20,
        "texture": "house"
      },
      {
        "x": 6996,
        "y": 416,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 7120,
        "y": 364,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 7256,
        "y": 308,
        "w": 246,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 16,
        "y": 380,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 248,
        "y": 300,
        "w": 82,
        "h": 20,
        "texture": "wood"
      },
      {
        "x": 132,
        "y": 340,
        "w": 82,
        "h": 20,
        "texture": "wood"
      }
    ],
    "walls": [
      {
        "x": 1352,
        "y": 504,
        "w": 66,
        "h": 37,
        "texture": "stone"
      },
      {
        "x": 1352,
        "y": 140,
        "w": 66,
        "h": 237,
        "texture": "stone"
      },
      {
        "x": 2376,
        "y": 0,
        "w": 66,
        "h": 143,
        "texture": "stone"
      },
      {
        "x": 1352,
        "y": 0,
        "w": 66,
        "h": 17,
        "texture": "stone"
      },
      {
        "x": 6356,
        "y": 0,
        "w": 66,
        "h": 142,
        "texture": "stone"
      }
    ],
    "doors": [
      {
        "x": 1368,
        "y": 376,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 3,
        "mode": "hold"
      },
      {
        "x": 1364,
        "y": 16,
        "w": 36,
        "h": 111,
        "texture": "danger_door",
        "group": 4,
        "mode": "hold"
      }
    ],
    "switches": [
      {
        "x": 1444,
        "y": 292,
        "w": 26,
        "h": 11,
        "group": 4
      },
      {
        "x": 2328,
        "y": 120,
        "w": 26,
        "h": 11,
        "group": 5
      },
      {
        "x": 1288,
        "y": 120,
        "w": 26,
        "h": 11,
        "group": 3
      },
      {
        "x": 2508,
        "y": 184,
        "w": 26,
        "h": 11,
        "group": 6
      },
      {
        "x": 6308,
        "y": 120,
        "w": 26,
        "h": 11,
        "group": 8
      },
      {
        "x": 5756,
        "y": 356,
        "w": 26,
        "h": 11,
        "group": 7
      },
      {
        "x": 44,
        "y": 376,
        "w": 26,
        "h": 11,
        "group": 1
      }
    ],
    "dynamicPlatforms": [
      {
        "x": 700,
        "y": 128,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "type": "moving",
        "distanceX": 0.01,
        "distanceY": 350,
        "speed": 1
      },
      {
        "x": 1820,
        "y": 412,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 5,
        "mode": "hold"
      },
      {
        "x": 1976,
        "y": 412,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 5,
        "mode": "hold"
      },
      {
        "x": 2132,
        "y": 412,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 5,
        "mode": "hold"
      },
      {
        "x": 1568,
        "y": 124,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 4,
        "mode": "hold"
      },
      {
        "x": 1756,
        "y": 124,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 4,
        "mode": "hold"
      },
      {
        "x": 3204,
        "y": 292,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 6,
        "mode": "hold"
      },
      {
        "x": 5972,
        "y": 124,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "type": "moving",
        "distanceX": 0.01,
        "distanceY": 300,
        "speed": 1
      },
      {
        "x": 6128,
        "y": 124,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 7,
        "mode": "hold"
      },
      {
        "x": 6496,
        "y": 420,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 8,
        "mode": "hold"
      },
      {
        "x": 5396,
        "y": 484,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "type": "moving",
        "distanceX": 340,
        "distanceY": 0,
        "speed": 1
      },
      {
        "x": 3592,
        "y": 248,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "type": "moving",
        "distanceX": 500,
        "distanceY": 0,
        "speed": 1
      },
      {
        "x": 360,
        "y": 268,
        "w": 111,
        "h": 22,
        "texture": "danger_platform",
        "group": 1,
        "mode": "hold"
      }
    ],
    "traps": [
    ],
    "coins": [
      {
        "x": 548,
        "y": 232,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 744,
        "y": 76,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1292,
        "y": 76,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 1448,
        "y": 252,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2332,
        "y": 84,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2512,
        "y": 148,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2848,
        "y": 324,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2908,
        "y": 324,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 2964,
        "y": 324,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3756,
        "y": 204,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 3808,
        "y": 204,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 4316,
        "y": 200,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 4480,
        "y": 200,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 5092,
        "y": 432,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 4960,
        "y": 432,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 5220,
        "y": 432,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 5756,
        "y": 320,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 6312,
        "y": 84,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 7024,
        "y": 372,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 7148,
        "y": 320,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 7284,
        "y": 264,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 6228,
        "y": 372,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 6276,
        "y": 372,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 6324,
        "y": 372,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 164,
        "y": 300,
        "w": 20,
        "h": 20,
        "collected": false
      },
      {
        "x": 280,
        "y": 260,
        "w": 20,
        "h": 20,
        "collected": false
      }
    ],
    "finish": {
      "x": 7448,
      "y": 248,
      "w": 24,
      "h": 63
    },
    "gift": {
      "title": "Уровень 9",
      "desc": "Я слышу голос,а ты?"
    },
    "decorations": [
      {
        "x": 2584,
        "y": 424,
        "w": 220,
        "h": 66,
        "image": "bench"
      },
      {
        "x": 2808,
        "y": 348,
        "w": 232,
        "h": 145,
        "image": "table"
      }
    ],
    "decorationsUndo": [],
    "decorationsUndoPlatform": [
      {
        "x": 336,
        "y": 124,
        "w": 132,
        "h": 100,
        "image": "vis5"
      },
      {
        "x": 900,
        "y": 132,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 1976,
        "y": 132,
        "w": 192,
        "h": 59,
        "image": "vis2"
      },
      {
        "x": 1036,
        "y": 136,
        "w": 173,
        "h": 104,
        "image": "vis11"
      },
      {
        "x": 2804,
        "y": 64,
        "w": 238,
        "h": 183,
        "image": "vis"
      },
      {
        "x": 3060,
        "y": 88,
        "w": 191,
        "h": 64,
        "image": "vis12"
      },
      {
        "x": 2604,
        "y": 40,
        "w": 170,
        "h": 72,
        "image": "vaz"
      },
      {
        "x": 1972,
        "y": 92,
        "w": 200,
        "h": 46,
        "image": "vaz2"
      },
      {
        "x": 3800,
        "y": 12,
        "w": 181,
        "h": 72,
        "image": "vaz3"
      },
      {
        "x": 3320,
        "y": 0,
        "w": 240,
        "h": 488,
        "image": "bake"
      },
      {
        "x": 3788,
        "y": 336,
        "w": 176,
        "h": 109,
        "image": "vis9"
      },
      {
        "x": 3756,
        "y": 336,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 3972,
        "y": 336,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 3620,
        "y": 332,
        "w": 132,
        "h": 100,
        "image": "vis5"
      },
      {
        "x": 4000,
        "y": 332,
        "w": 192,
        "h": 59,
        "image": "vis2"
      },
      {
        "x": 4168,
        "y": 328,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 5040,
        "y": 168,
        "w": 139,
        "h": 157,
        "image": "window"
      },
      {
        "x": 6780,
        "y": 184,
        "w": 139,
        "h": 157,
        "image": "window"
      },
      {
        "x": 6764,
        "y": 180,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 316,
        "y": 120,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 5216,
        "y": 220,
        "w": 170,
        "h": 46,
        "image": "vaz2"
      },
      {
        "x": 6756,
        "y": 92,
        "w": 181,
        "h": 72,
        "image": "vaz3"
      },
      {
        "x": 5212,
        "y": 252,
        "w": 176,
        "h": 109,
        "image": "vis9"
      },
      {
        "x": 5632,
        "y": 148,
        "w": 173,
        "h": 104,
        "image": "vis11"
      },
      {
        "x": 5836,
        "y": 444,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 3140,
        "y": 356,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 4548,
        "y": 256,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 6264,
        "y": 136,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 6268,
        "y": 432,
        "w": 177,
        "h": 59,
        "image": "vis2"
      },
      {
        "x": 6124,
        "y": 432,
        "w": 147,
        "h": 100,
        "image": "vis5"
      },
      {
        "x": 4308,
        "y": 260,
        "w": 48,
        "h": 47,
        "image": "vis10"
      },
      {
        "x": 564,
        "y": 280,
        "w": 48,
        "h": 47,
        "image": "vis10"
      },
      {
        "x": 72,
        "y": 120,
        "w": 191,
        "h": 64,
        "image": "vis12"
      },
      {
        "x": 7264,
        "y": 320,
        "w": 196,
        "h": 64,
        "image": "vis12"
      },
      {
        "x": 7480,
        "y": 320,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 4616,
        "y": 340,
        "w": 29,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 2692,
        "y": 312,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 4012,
        "y": 12,
        "w": 170,
        "h": 72,
        "image": "vaz"
      },
      {
        "x": 4008,
        "y": 72,
        "w": 176,
        "h": 64,
        "image": "vis12"
      },
      {
        "x": 3596,
        "y": 80,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 3616,
        "y": 12,
        "w": 170,
        "h": 72,
        "image": "vaz"
      },
      {
        "x": 6584,
        "y": 92,
        "w": 170,
        "h": 72,
        "image": "vaz"
      },
      {
        "x": 6940,
        "y": 116,
        "w": 168,
        "h": 49,
        "image": "vaz4"
      },
      {
        "x": 1472,
        "y": 140,
        "w": 52,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 6952,
        "y": 176,
        "w": 76,
        "h": 168,
        "image": "clock"
      },
      {
        "x": 1688,
        "y": 196,
        "w": 76,
        "h": 168,
        "image": "clock"
      },
      {
        "x": 1792,
        "y": 200,
        "w": 139,
        "h": 157,
        "image": "window"
      },
      {
        "x": 1904,
        "y": 200,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 1780,
        "y": 252,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 4744,
        "y": 132,
        "w": 263,
        "h": 214,
        "image": "vis"
      },
      {
        "x": 4724,
        "y": 164,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 4380,
        "y": 24,
        "w": 173,
        "h": 104,
        "image": "vis11"
      },
      {
        "x": 4368,
        "y": 20,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 4540,
        "y": 20,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 4320,
        "y": 396,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 4332,
        "y": 360,
        "w": 168,
        "h": 49,
        "image": "vaz4"
      },
      {
        "x": 4448,
        "y": 412,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 6204,
        "y": 228,
        "w": 176,
        "h": 109,
        "image": "vis9"
      },
      {
        "x": 6192,
        "y": 224,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 7172,
        "y": 380,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 5232,
        "y": 96,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 5164,
        "y": 164,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 5332,
        "y": 96,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 652,
        "y": 356,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 464,
        "y": 356,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 488,
        "y": 360,
        "w": 176,
        "h": 109,
        "image": "vis9"
      },
      {
        "x": 5788,
        "y": 372,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 1548,
        "y": 356,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 2296,
        "y": 136,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 2588,
        "y": 256,
        "w": 35,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 472,
        "y": 124,
        "w": 132,
        "h": 100,
        "image": "vis5"
      },
      {
        "x": 376,
        "y": 56,
        "w": 192,
        "h": 59,
        "image": "vis2"
      },
      {
        "x": 556,
        "y": 52,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 1016,
        "y": 320,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 1067,
        "y": 316,
        "w": 147,
        "h": 52,
        "image": "vis2"
      },
      {
        "x": 1034,
        "y": 254,
        "w": 185,
        "h": 72,
        "image": "vaz"
      },
      {
        "x": 1262,
        "y": 188,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 1314,
        "y": 188,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 1284,
        "y": 180,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 1284,
        "y": 309,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 46,
        "y": 221,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 263,
        "y": 66,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 303,
        "y": 335,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 1148,
        "y": 78,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 891,
        "y": 397,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 1626,
        "y": 59,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 1589,
        "y": 261,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 2125,
        "y": 327,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 1879,
        "y": 70,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 1993,
        "y": 243,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 2415,
        "y": 257,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 2213,
        "y": 41,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 2680,
        "y": 169,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 2493,
        "y": 55,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 3062,
        "y": 445,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 2790,
        "y": 419,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 3271,
        "y": 52,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 3594,
        "y": 191,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 3580,
        "y": 463,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 4212,
        "y": 74,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 3951,
        "y": 239,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 3822,
        "y": 316,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 4013,
        "y": 423,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 4630,
        "y": 78,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 4414,
        "y": 298,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 4616,
        "y": 452,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 4965,
        "y": 52,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 4954,
        "y": 415,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 5560,
        "y": 346,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 5468,
        "y": 81,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 5258,
        "y": 382,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 5857,
        "y": 368,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 6235,
        "y": 59,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 6566,
        "y": 320,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 7224,
        "y": 85,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 6933,
        "y": 379,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 7396,
        "y": 423,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 5776,
        "y": 85,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 5409,
        "y": 430,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 5556,
        "y": 287,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 6412,
        "y": 272,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 6114,
        "y": 371,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 6022,
        "y": 100,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 6639,
        "y": 232,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 6838,
        "y": 48,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 7168,
        "y": 280,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 7418,
        "y": 136,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 7264,
        "y": 210,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 5148,
        "y": 452,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 5137,
        "y": 85,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 5031,
        "y": 357,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 4807,
        "y": 456,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 4616,
        "y": 221,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 4891,
        "y": 48,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 4785,
        "y": 81,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 4447,
        "y": 180,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 4223,
        "y": 250,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3859,
        "y": 206,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3727,
        "y": 265,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3988,
        "y": 59,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3789,
        "y": 26,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3565,
        "y": 158,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3190,
        "y": 257,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3242,
        "y": 382,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2959,
        "y": 276,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2893,
        "y": 22,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 3102,
        "y": 30,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2636,
        "y": 393,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2441,
        "y": 360,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2291,
        "y": 360,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2419,
        "y": 177,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2092,
        "y": 452,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2155,
        "y": 235,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1626,
        "y": 173,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1508,
        "y": 70,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1031,
        "y": 445,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 718,
        "y": 85,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 237,
        "y": 265,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 105,
        "y": 434,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 50,
        "y": 353,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 83,
        "y": 85,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 432,
        "y": 327,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 241,
        "y": 419,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 814,
        "y": 287,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 950,
        "y": 78,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 935,
        "y": 243,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 957,
        "y": 298,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1251,
        "y": 415,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1460,
        "y": 360,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1453,
        "y": 261,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1699,
        "y": 463,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1934,
        "y": 335,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2030,
        "y": 357,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 689,
        "y": 228,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 204,
        "y": 217,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 61,
        "y": 41,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 1038,
        "y": 37,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 968,
        "y": 452,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 788,
        "y": 379,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 1901,
        "y": 162,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 1648,
        "y": 423,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 2338,
        "y": 287,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 3297,
        "y": 320,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 2757,
        "y": 261,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 2463,
        "y": 401,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 4131,
        "y": 291,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 5457,
        "y": 390,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 5684,
        "y": 66,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 6125,
        "y": 313,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 6562,
        "y": 63,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 6779,
        "y": 430,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 7407,
        "y": 206,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 3881,
        "y": 474,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 2269,
        "y": 482,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1890,
        "y": 471,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 616,
        "y": 474,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 2116,
        "y": 264,
        "w": 176,
        "h": 109,
        "image": "vis9"
      },
      {
        "x": 2104,
        "y": 260,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 2280,
        "y": 260,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 3728,
        "y": 160,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 3780,
        "y": 160,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 3828,
        "y": 160,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 3948,
        "y": 148,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 3980,
        "y": 160,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 5020,
        "y": 324,
        "w": 48,
        "h": 47,
        "image": "vis10"
      },
      {
        "x": 4808,
        "y": 60,
        "w": 142,
        "h": 100,
        "image": "vis5"
      },
      {
        "x": 4780,
        "y": 56,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 4952,
        "y": 56,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 4720,
        "y": 44,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 4288,
        "y": 152,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 4192,
        "y": 456,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 4280,
        "y": 344,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 4896,
        "y": 368,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 5968,
        "y": 260,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 6028,
        "y": 208,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 6120,
        "y": 48,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 6488,
        "y": 180,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 7164,
        "y": 176,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 1608,
        "y": 32,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 1796,
        "y": 32,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 744,
        "y": 40,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 140,
        "y": 84,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 5444,
        "y": 192,
        "w": 170,
        "h": 72,
        "image": "vaz"
      },
      {
        "x": 5440,
        "y": 248,
        "w": 177,
        "h": 59,
        "image": "vis2"
      },
      {
        "x": 5420,
        "y": 188,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 5616,
        "y": 184,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 5436,
        "y": 128,
        "w": 191,
        "h": 64,
        "image": "vis12"
      },
      {
        "x": 5416,
        "y": 152,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 5636,
        "y": 132,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 5548,
        "y": 124,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 6368,
        "y": 224,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 6396,
        "y": 228,
        "w": 132,
        "h": 100,
        "image": "vis5"
      },
      {
        "x": 5880,
        "y": 168,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 7112,
        "y": 152,
        "w": 173,
        "h": 104,
        "image": "vis11"
      },
      {
        "x": 7256,
        "y": 148,
        "w": 181,
        "h": 109,
        "image": "vis9"
      },
      {
        "x": 5928,
        "y": 300,
        "w": 48,
        "h": 47,
        "image": "vis10"
      },
      {
        "x": 6004,
        "y": 232,
        "w": 48,
        "h": 47,
        "image": "vis10"
      },
      {
        "x": 6072,
        "y": 156,
        "w": 48,
        "h": 47,
        "image": "vis10"
      },
      {
        "x": 5908,
        "y": 32,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 5848,
        "y": 32,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 5948,
        "y": 32,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 5216,
        "y": 48,
        "w": 168,
        "h": 49,
        "image": "vaz4"
      },
      {
        "x": 6580,
        "y": 148,
        "w": 177,
        "h": 59,
        "image": "vis2"
      }
    ],
    "enemies": [
      {
        "platformX": 880,
        "platformY": 484,
        "platformW": 265
      },
      {
        "platformX": 1144,
        "platformY": 484,
        "platformW": 225
      },
      {
        "platformX": 1400,
        "platformY": 484,
        "platformW": 240
      },
      {
        "platformX": 1948,
        "platformY": 124,
        "platformW": 246
      },
      {
        "platformX": 2432,
        "platformY": 484,
        "platformW": 730
      },
      {
        "platformX": 2432,
        "platformY": 484,
        "platformW": 730
      },
      {
        "platformX": 2440,
        "platformY": 484,
        "platformW": 720
      },
      {
        "platformX": 4244,
        "platformY": 244,
        "platformW": 328
      },
      {
        "platformX": 4864,
        "platformY": 484,
        "platformW": 500
      },
      {
        "platformX": 6640,
        "platformY": 484,
        "platformW": 350
      },
      {
        "platformX": 6984,
        "platformY": 484,
        "platformW": 265
      },
      {
        "platformX": 7244,
        "platformY": 484,
        "platformW": 255
      }
    ]
  },
  {
    "width": 960,
    "background": "house",
    "isBossLevel": true,
    "platforms": [
      {
        "x": 0,
        "y": 448,
        "w": 960,
        "h": 20,
        "texture": "house"
      }
    ],
    "walls": [
      {
        "x": -68,
        "y": 0,
        "w": 66,
        "h": 540,
        "texture": "stone"
      },
      {
        "x": 964,
        "y": 0,
        "w": 66,
        "h": 540,
        "texture": "stone"
      }
    ],
    "switches": [],
    "dynamicPlatforms": [],
    "doors": [],
    "traps": [],
    "coins": [],
    "enemies": [],
    "finish": {
      "x": 924,
      "y": -88,
      "w": 24,
      "h": 63
    },
    "gift": {
      "title": "Новый уровень",
      "desc": "Отличная работа!"
    },
    "decorations": [],
    "decorationsUndo": [],
    "decorationsUndoPlatform": [
      {
        "x": 388,
        "y": 172,
        "w": 139,
        "h": 157,
        "image": "window"
      },
      {
        "x": 512,
        "y": 168,
        "w": 30,
        "h": 82,
        "image": "vis3"
      },
      {
        "x": 551,
        "y": 100,
        "w": 168,
        "h": 49,
        "image": "vaz4"
      },
      {
        "x": 551,
        "y": 152,
        "w": 171,
        "h": 54,
        "image": "vis12"
      },
      {
        "x": 380,
        "y": 80,
        "w": 170,
        "h": 72,
        "image": "vaz"
      },
      {
        "x": 203,
        "y": 140,
        "w": 172,
        "h": 47,
        "image": "vis2"
      },
      {
        "x": 208,
        "y": 104,
        "w": 170,
        "h": 46,
        "image": "vaz2"
      },
      {
        "x": 379,
        "y": 168,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 567,
        "y": 232,
        "w": 132,
        "h": 100,
        "image": "vis5"
      },
      {
        "x": 435,
        "y": 344,
        "w": 47,
        "h": 58,
        "image": "vis4"
      },
      {
        "x": 395,
        "y": 344,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 499,
        "y": 344,
        "w": 24,
        "h": 64,
        "image": "vis13"
      },
      {
        "x": 155,
        "y": 220,
        "w": 48,
        "h": 47,
        "image": "vis10"
      },
      {
        "x": 179,
        "y": 220,
        "w": 176,
        "h": 109,
        "image": "vis9"
      },
      {
        "x": 75,
        "y": 380,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 243,
        "y": 44,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 779,
        "y": 232,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 635,
        "y": 360,
        "w": 86,
        "h": 13,
        "image": "vis6"
      },
      {
        "x": 71,
        "y": 112,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 839,
        "y": 328,
        "w": 43,
        "h": 7,
        "image": "vis8"
      },
      {
        "x": 279,
        "y": 364,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 127,
        "y": 284,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 39,
        "y": 204,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 751,
        "y": 112,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 547,
        "y": 228,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 467,
        "y": 156,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 303,
        "y": 196,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 619,
        "y": 44,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 911,
        "y": 48,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 783,
        "y": 428,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 447,
        "y": 456,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 239,
        "y": 428,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 651,
        "y": 428,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 39,
        "y": 460,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 359,
        "y": 84,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 791,
        "y": 44,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 871,
        "y": 160,
        "w": 40,
        "h": 9,
        "image": "vis7"
      },
      {
        "x": 663,
        "y": 212,
        "w": 40,
        "h": 9,
        "image": "vis7"
      }
    ]
  }
];
  