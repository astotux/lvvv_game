// Аудиосистема игры
(function() {
  // Создаем глобальный объект для управления звуками
  window.AudioManager = {
    // Фоновая музыка
    menuMusic: null,
    levelMusic: null,
    currentMusic: null,
    
    // Звуковые эффекты
    sounds: {
      jump: null,
      money: null,
      slime: null,
      defeat: null,
      victory: null,
      walk1: null,
      walk2: null,
      button: null
    },
    
    // Флаги состояния
    musicEnabled: true,
    soundEnabled: true,
    currentWalkSound: 1, // Для чередования звуков ходьбы
    isWalking: false,
    walkSoundPlaying: false,
    
    // Громкость 0..1 (сохраняется в localStorage)
    musicVolume: 0.5,
    soundVolume: 0.8,
    STORAGE_MUSIC_VOL: 'love_game_music_volume',
    STORAGE_SOUND_VOL: 'love_game_sound_volume',
    
    // Инициализация аудиосистемы
    init: function() {
      // Загружаем сохранённую громкость
      try {
        const mv = localStorage.getItem(this.STORAGE_MUSIC_VOL);
        if (mv !== null) { const v = parseFloat(mv); if (!isNaN(v)) this.musicVolume = Math.max(0, Math.min(1, v)); }
        const sv = localStorage.getItem(this.STORAGE_SOUND_VOL);
        if (sv !== null) { const v = parseFloat(sv); if (!isNaN(v)) this.soundVolume = Math.max(0, Math.min(1, v)); }
      } catch (e) {}
      
      // Загрузка музыки меню
      this.menuMusic = new Audio('sounds/music_menu.mp3');
      this.menuMusic.loop = true;
      this.menuMusic.volume = this.musicVolume;
      
      // Загрузка звуковых эффектов
      this.sounds.jump = new Audio('sounds/sound_jump.mp3');
      this.sounds.money = new Audio('sounds/sound_money.mp3');
      this.sounds.slime = new Audio('sounds/sound_slime.mp3');
      this.sounds.defeat = new Audio('sounds/sound_defeat.mp3');
      this.sounds.victory = new Audio('sounds/sound_victory.mp3');
      this.sounds.walk1 = new Audio('sounds/sound_walk_1.mp3');
      this.sounds.walk2 = new Audio('sounds/sound_walk_2.mp3');
      this.sounds.button = new Audio('sounds/sound_button.mp3');
      this.applySoundVolume();
      
      // Звук при нажатии кнопок
      this.setupButtonSound();
      
      // Разблокировка аудио после взаимодействия пользователя
      this.setupAudioUnlock();
      // Сохранение позиции меню-музыки при переходе между страницами
      this.setupMenuMusicPersist();
    },
    
    applySoundVolume: function() {
      const v = this.soundVolume;
      if (this.sounds.jump) this.sounds.jump.volume = v;
      if (this.sounds.money) this.sounds.money.volume = v;
      if (this.sounds.slime) this.sounds.slime.volume = v;
      if (this.sounds.defeat) this.sounds.defeat.volume = v;
      if (this.sounds.victory) this.sounds.victory.volume = v;
      if (this.sounds.walk1) this.sounds.walk1.volume = v;
      if (this.sounds.walk2) this.sounds.walk2.volume = v;
      if (this.sounds.button) this.sounds.button.volume = v;
    },
    
    getMusicVolume: function() { return this.musicVolume; },
    getSoundVolume: function() { return this.soundVolume; },
    
    setMusicVolume: function(v) {
      this.musicVolume = Math.max(0, Math.min(1, v));
      if (this.menuMusic) this.menuMusic.volume = this.musicVolume;
      if (this.levelMusic) this.levelMusic.volume = this.musicVolume;
      try { localStorage.setItem(this.STORAGE_MUSIC_VOL, String(this.musicVolume)); } catch (e) {}
    },
    
    setSoundVolume: function(v) {
      this.soundVolume = Math.max(0, Math.min(1, v));
      this.applySoundVolume();
      try { localStorage.setItem(this.STORAGE_SOUND_VOL, String(this.soundVolume)); } catch (e) {}
    },
    
    // Звук нажатия кнопки (для UI)
    playButtonSound: function() {
      if (!this.soundEnabled) return;
      this.playSound('button');
    },
    
    // Глобальный обработчик: звук при нажатии любой кнопки/ссылки
    setupButtonSound: function() {
      const self = this;
      document.addEventListener('click', function(e) {
        if (!self.soundEnabled) return;
        if (e.target.closest('input[type=range]')) return;
        const el = e.target.closest('button, a[href], .btn, [role="button"]');
        if (el && !el.closest('input')) self.playSound('button');
      }, true);
    },
    
    // Проверка: находимся ли на странице меню (не игра)
    isMenuPage: function() {
      const href = window.location.href || '';
      return href.includes('play.html') || href.includes('levels.html') || href.includes('dialog.html');
    },
    
    // Разблокировка аудио на мобильных устройствах (только на страницах меню — не запускаем меню-музыку в игре)
    setupAudioUnlock: function() {
      const self = this;
      const unlockAudio = function() {
        // На странице игры (index.html) не трогаем меню-музыку — разблокировка произойдёт при воспроизведении музыки уровня
        if (self.isMenuPage() && self.menuMusic) {
          self.menuMusic.play().then(() => {
            if (!self.currentMusic) {
              self.menuMusic.pause();
              self.menuMusic.currentTime = 0;
            }
          }).catch(() => {});
        }
        
        document.removeEventListener('touchstart', unlockAudio);
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('keydown', unlockAudio);
      };
      
      document.addEventListener('touchstart', unlockAudio, { once: true });
      document.addEventListener('click', unlockAudio, { once: true });
      document.addEventListener('keydown', unlockAudio, { once: true });
    },
    
    // Сохранить позицию меню-музыки при уходе со страницы
    setupMenuMusicPersist: function() {
      const self = this;
      window.addEventListener('beforeunload', function() {
        if (self.currentMusic === self.menuMusic && self.menuMusic) {
          try {
            sessionStorage.setItem('menuMusicTime', String(self.menuMusic.currentTime));
          } catch (e) {}
        }
      });
      window.addEventListener('pagehide', function() {
        if (self.currentMusic === self.menuMusic && self.menuMusic) {
          try {
            sessionStorage.setItem('menuMusicTime', String(self.menuMusic.currentTime));
          } catch (e) {}
        }
      });
    },
    
    // Воспроизведение музыки меню (продолжение с сохранённой позиции при переходах play/levels/dialog)
    playMenuMusic: function() {
      if (!this.musicEnabled) return;
      
      // Останавливаем только если играла музыка уровня (на игре мы не вызываем playMenuMusic)
      this.stopCurrentMusic();
      
      if (this.menuMusic) {
        try {
          const saved = sessionStorage.getItem('menuMusicTime');
          if (saved !== null) {
            const t = parseFloat(saved);
            if (!isNaN(t) && t >= 0) this.menuMusic.currentTime = t;
          }
        } catch (e) {}
        this.menuMusic.play().catch(e => console.log('Menu music autoplay blocked'));
        this.currentMusic = this.menuMusic;
      }
    },
    
    // Воспроизведение музыки уровня (рандомная из 3)
    playLevelMusic: function() {
      if (!this.musicEnabled) return;
      
      // Останавливаем текущую музыку
      this.stopCurrentMusic();
      
      // Выбираем случайный трек
      const trackNum = Math.floor(Math.random() * 3) + 1;
      this.levelMusic = new Audio('sounds/music_' + trackNum + '.mp3');
      this.levelMusic.loop = true;
      this.levelMusic.volume = this.musicVolume;
      this.levelMusic.play().catch(e => console.log('Level music autoplay blocked'));
      this.currentMusic = this.levelMusic;
    },
    
    // Остановка текущей музыки
    stopCurrentMusic: function() {
      if (this.currentMusic) {
        this.currentMusic.pause();
        this.currentMusic.currentTime = 0;
        this.currentMusic = null;
      }
      if (this.levelMusic) {
        this.levelMusic.pause();
        this.levelMusic = null;
      }
    },
    
    // Остановка только музыки уровня (при поражении/победе)
    stopLevelMusic: function() {
      if (this.levelMusic) {
        this.levelMusic.pause();
        this.levelMusic.currentTime = 0;
        if (this.currentMusic === this.levelMusic) this.currentMusic = null;
        this.levelMusic = null;
      }
    },
    
    // Воспроизведение звука прыжка
    playJump: function() {
      if (!this.soundEnabled) return;
      this.playSound('jump');
    },
    
    // Воспроизведение звука сбора монетки
    playMoney: function() {
      if (!this.soundEnabled) return;
      this.playSound('money');
    },
    
    // Воспроизведение звука прыжка на слизи
    playSlime: function() {
      if (!this.soundEnabled) return;
      this.playSound('slime');
    },
    
    // Воспроизведение звука поражения
    playDefeat: function() {
      if (!this.soundEnabled) return;
      this.playSound('defeat');
    },
    
    // Воспроизведение звука победы
    playVictory: function() {
      if (!this.soundEnabled) return;
      this.playSound('victory');
    },
    
    // Воспроизведение звуков ходьбы (чередование)
    playWalk: function() {
      if (!this.soundEnabled || this.walkSoundPlaying) return;
      
      this.walkSoundPlaying = true;
      
      const sound = this.currentWalkSound === 1 ? this.sounds.walk1 : this.sounds.walk2;
      if (sound) {
        sound.currentTime = 0;
        sound.play().then(() => {
          // Переключаем на следующий звук
          this.currentWalkSound = this.currentWalkSound === 1 ? 2 : 1;
        }).catch(() => {});
        
        // Сбрасываем флаг после воспроизведения
        sound.onended = () => {
          this.walkSoundPlaying = false;
        };
      } else {
        this.walkSoundPlaying = false;
      }
    },
    
    // Остановка звуков ходьбы
    stopWalk: function() {
      this.isWalking = false;
    },
    
    // Универсальное воспроизведение звука
    playSound: function(name) {
      const sound = this.sounds[name];
      if (sound) {
        // Создаем клон для возможности воспроизведения нескольких звуков одновременно
        const clone = sound.cloneNode();
        clone.volume = sound.volume;
        clone.play().catch(() => {});
      }
    },
    
    // Включение/выключение музыки
    toggleMusic: function() {
      this.musicEnabled = !this.musicEnabled;
      if (!this.musicEnabled && this.currentMusic) {
        this.currentMusic.pause();
      } else if (this.musicEnabled && this.currentMusic) {
        this.currentMusic.play().catch(() => {});
      }
      return this.musicEnabled;
    },
    
    // Включение/выключение звуков
    toggleSound: function() {
      this.soundEnabled = !this.soundEnabled;
      return this.soundEnabled;
    }
  };
  
  // Автоматическая инициализация
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.AudioManager.init();
    });
  } else {
    window.AudioManager.init();
  }
})();
