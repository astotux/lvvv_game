const levels = [
    {
        width: 2000,
        platforms: [
          {x:0,y:320,w:2000,h:20, texture: "grass"},
          {x:300,y:250,w:66,h:20, texture: "stone2"},
          {x:600,y:200,w:82,h:20, texture: "wood"},
          {x:1000,y:250,w:66,h:20, texture: "stone2"},
          {x:1500,y:220,w:120,h:20, texture: "grass"}
        ],
        traps: [
            {x:500,y:200,w:20,h:20}
        ],
        finish: {x: 1900, y: 260, w: 40, h: 40},
        gift: {title: "Подарок №1", desc: "Милый брелок из посылки ❤️"},
        decorations: [
            // {x: 100, y: 280, w: 32, h: 32, type: "flower", image: "flower1"},
            // {x: 400, y: 230, w: 24, h: 24, type: "bush", image: "bush1"},
            {x: 600, y: 310, w: 38, h: 20, type: "rock", image: "rock1"},
            // {x: 1100, y: 230, w: 32, h: 32, type: "flower", image: "flower2"},
            // {x: 1600, y: 200, w: 24, h: 24, type: "bush", image: "bush2"}
        ],
        decorationsUndo: [
          // {x: 100, y: 280, w: 32, h: 32, type: "flower", image: "flower1"},
          // {x: 400, y: 230, w: 24, h: 24, type: "bush", image: "bush1"},
          {x: 295, y: 244, w: 73, h: 19, type: "grass", image: "grass1"},
          // {x: 1100, y: 230, w: 32, h: 32, type: "flower", image: "flower2"},
          // {x: 1600, y: 200, w: 24, h: 24, type: "bush", image: "bush2"}
        ],
        decorationsUndoPlatform: [
          // {x: 100, y: 280, w: 32, h: 32, type: "flower", image: "flower1"},
          // {x: 400, y: 230, w: 24, h: 24, type: "bush", image: "bush1"},
          // {x: 295, y: 244, w: 73, h: 19, type: "grass", image: "grass1"},
          // {x: 1100, y: 230, w: 32, h: 32, type: "flower", image: "flower2"},
          // {x: 1600, y: 200, w: 24, h: 24, type: "bush", image: "bush2"}
        ]
      },
    {
        width: 2500, // ширина уровня
        platforms: [
          {x:0,y:300,w:2000,h:20, texture: "stone2"},
          {x:300,y:250,w:82,h:20, texture: "wood"},
          {x:600,y:200,w:100,h:20, texture: "grass"},
          {x:1000,y:250,w:66,h:20, texture: "stone"},
          {x:1500,y:220,w:82,h:20, texture: "wood"}
        ],
        traps: [

        ],
        finish: {x: 2400, y: 260, w: 40, h: 40},
        gift: {title: "Подарок №1", desc: "Милый брелок из посылки ❤️"},
        decorations: [
            // {x: 150, y: 280, w: 32, h: 32, type: "flower", image: "flower3"},
            // {x: 450, y: 230, w: 24, h: 24, type: "bush", image: "bush3"},
            // {x: 750, y: 180, w: 28, h: 28, type: "rock", image: "rock2"},
            // {x: 1200, y: 230, w: 32, h: 32, type: "flower", image: "flower4"},
            // {x: 1700, y: 200, w: 24, h: 24, type: "bush", image: "bush4"}
        ]
      }
  ];
  