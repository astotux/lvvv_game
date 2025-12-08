window.C = {
  LOGIC_WIDTH: 960,
  LOGIC_HEIGHT: 540,
  FIXED_TIMESTEP_MS: 1000 / 60,
  IMAGE_SMOOTHING_QUALITY: 'high',

  PLAYER: {
    W: 38,
    H: 64,
    SPEED: 5,
    GRAVITY: 1,
    JUMP_VY: -15,
    IDLE_ANIM_DELAY_FRAMES: 600,
    IDLE_FRAME_TICK: 15,
    WALK_FRAME_TICK: 3,
    WALK_FRAMES: 10,
    IDLE_FRAMES: 16
  },

  COMPANION: {
    W: 46,
    H: 38,
    SPEED: 4,
    GRAVITY: 1,
    JUMP_VY: -15,
    FOLLOW_DELAY: 0.09,
    MAX_HORIZONTAL_DISTANCE: 40,
    MAX_VERTICAL_LAG: 140,
    MOTION_THRESHOLD: 3,
    CENTER_TOLERANCE: 1,
    FOLLOW_STRENGTH_AIR: 0.15,
    IDLE_ANIM_DELAY_FRAMES: 600,
    IDLE_FRAME_TICK: 24,
    WALK_FRAME_TICK: 2,
    WALK_FRAMES: 11,
    IDLE_FRAMES: 11
  },

  BACKGROUND: {
    BASE_W: 323,
    BASE_H: 302
  },

  PARALLAX: [0.2, 0.25, 0.35, 0.5, 0.65, 0.72, 0.8],

  DIRT: {
    ROWS: 5
  },

  FALL_OFF: {
    Y_MARGIN: 100,
    X_MARGIN: 200
  },

  CAMERA: {
    DEAD_ZONE_WIDTH: 150, // Ширина зоны, в которой камера не двигается
    DEAD_ZONE_HEIGHT: 100, // Высота зоны, в которой камера не двигается
    FOLLOW_SPEED: 0.15 // Скорость следования камеры при выходе за зону (0-1)
  }
};


