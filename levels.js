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
    "enemies": []
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
      {
        "x": 446,
        "y": 352,
        "w": 20,
        "h": 22
      },
      {
        "x": 466,
        "y": 352,
        "w": 20,
        "h": 22
      },
      {
        "x": 3101,
        "y": 234,
        "w": 20,
        "h": 22
      }
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
      "title": "Новый уровень",
      "desc": "Отличная работа!"
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
      {
        "x": 2800,
        "y": 374,
        "w": 20,
        "h": 22
      },
      {
        "x": 2452,
        "y": 371,
        "w": 20,
        "h": 22
      },
      {
        "x": 2471,
        "y": 371,
        "w": 20,
        "h": 22
      },
      {
        "x": 364,
        "y": 443,
        "w": 20,
        "h": 22
      },
      {
        "x": 386,
        "y": 443,
        "w": 20,
        "h": 22
      },
      {
        "x": 1830,
        "y": 300,
        "w": 20,
        "h": 22
      },
      {
        "x": 1849,
        "y": 300,
        "w": 20,
        "h": 22
      },
      {
        "x": 1868,
        "y": 300,
        "w": 20,
        "h": 22
      },
      {
        "x": 3507,
        "y": 296,
        "w": 20,
        "h": 22
      },
      {
        "x": 3526,
        "y": 296,
        "w": 20,
        "h": 22
      }
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
      "title": "Новый уровень",
      "desc": "Отличная работа!"
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
        "x": 608,
        "y": 409,
        "w": 226,
        "h": 20,
        "texture": "grass"
      },
      {
        "x": 2877,
        "y": 395,
        "w": 67,
        "h": 23,
        "texture": "stone2"
      },
      {
        "x": 3004,
        "y": 449,
        "w": 271,
        "h": 20,
        "texture": "grass"
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
        "x": 655,
        "y": 406,
        "w": 26,
        "h": 11,
        "group": 1
      },
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
      }
    ],
    "dynamicPlatforms": [
      {
        "x": 376,
        "y": 408,
        "w": 46,
        "h": 16,
        "texture": "slime_platform",
        "type": "bouncy",
        "bounceStrength": -22
      },
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
      }
    ],
    "traps": [
      {
        "x": 2376,
        "y": 332,
        "w": 20,
        "h": 22
      },
      {
        "x": 2396,
        "y": 332,
        "w": 20,
        "h": 22
      },
      {
        "x": 256,
        "y": 456,
        "w": 20,
        "h": 22
      }
    ],
    "coins": [
      {
        "x": 656,
        "y": 360,
        "w": 20,
        "h": 20,
        "collected": false
      },
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
        "x": 3132,
        "y": 380,
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
      }
    ],
    "finish": {
      "x": 4348,
      "y": 208,
      "w": 24,
      "h": 63
    },
    "gift": {
      "title": "Новый уровень",
      "desc": "Отличная работа!"
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
        "x": 3077,
        "y": 442,
        "w": 143,
        "h": 19,
        "image": "grass1"
      },
      {
        "x": 3023,
        "y": 439,
        "w": 56,
        "h": 20,
        "image": "flower2"
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
        "x": 3219,
        "y": 439,
        "w": 56,
        "h": 18,
        "image": "flower1"
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
      }
    ]
  }
];
  