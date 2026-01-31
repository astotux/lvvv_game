// Аудиосистема игры
(function() {
  // Создаем глобальный объект для управления звуками
  window.AudioManager = {
    // Фоновая музыка
    menuMusic: null,
    levelMusic: null,
    currentMusic: null,
    // Предзагруженные треки музыки уровней (1–3)
    levelMusicTracks: [null, null, null],
    
    // Пул предзагруженных HTML Audio для звуков (без fetch — нет CORS, один запрос при load())
    soundPools: {},
    SOUND_URLS: {
      jump: 'sounds/sound_jump.mp3',
      money: 'sounds/sound_money.mp3',
      slime: 'sounds/sound_slime.mp3',
      defeat: 'sounds/sound_defeat.mp3',
      victory: 'sounds/sound_victory.mp3',
      walk1: 'sounds/sound_walk_1.mp3',
      walk2: 'sounds/sound_walk_2.mp3',
      button: 'sounds/sound_button.mp3'
    },
    SOUND_POOL_SIZE: 1,
    _heavyAudioScheduled: false,
    
    _isIOS: function() {
      return /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    },
    // На iOS — один общий Audio для всех эффектов (макс. 3 элемента: меню, уровень, эффекты). Без пулов — без лагов.
    _singleSfxEl: null,
    
    // Флаги состояния
    musicEnabled: true,
    soundEnabled: true,
    currentWalkSound: 1,
    isWalking: false,
    walkSoundPlaying: false,
    _lastWalkTime: 0, // на iOS — троттлинг, чтобы не фризить
    
    // Громкость 0..1 (сохраняется в localStorage)
    musicVolume: 0.5,
    soundVolume: 0.8,
    STORAGE_MUSIC_VOL: 'love_game_music_volume',
    STORAGE_SOUND_VOL: 'love_game_sound_volume',
    
    // Инициализация аудиосистемы (минимум при загрузке — без лагов на iPhone)
    init: function() {
      var self = this;
      try {
        var mv = localStorage.getItem(this.STORAGE_MUSIC_VOL);
        if (mv !== null) { var v = parseFloat(mv); if (!isNaN(v)) this.musicVolume = Math.max(0, Math.min(1, v)); }
        var sv = localStorage.getItem(this.STORAGE_SOUND_VOL);
        if (sv !== null) { v = parseFloat(sv); if (!isNaN(v)) this.soundVolume = Math.max(0, Math.min(1, v)); }
      } catch (e) {}
      
      // На iOS при загрузке не создаём ни одного Audio — нулевая нагрузка, без фризов
      if (!this._isIOS() && this.isMenuPage()) {
        this.menuMusic = new Audio('sounds/music_menu.mp3');
        this.menuMusic.loop = true;
        this.menuMusic.volume = this.musicVolume;
        this.menuMusic.preload = 'auto';
        this.menuMusic.load();
      }
      
      this.setupButtonSound();
      this.setupAudioUnlock();
      this.setupMenuMusicPersist();
    },
    
    // На iOS: preload="none" и без load() — декодировка только при первом play(), без фризов
    _createSoundPool: function(src, count) {
      var list = [];
      var noPreload = this._isIOS();
      for (var i = 0; i < count; i++) {
        var a = new Audio(src);
        a.preload = noPreload ? 'none' : 'auto';
        if (!noPreload) a.load();
        a.volume = this.soundVolume;
        list.push(a);
      }
      return list;
    },
    
    applySoundVolume: function() {
      var v = this.soundVolume;
      if (this._isIOS() && this._singleSfxEl) this._singleSfxEl.volume = v;
      var pools = this.soundPools;
      Object.keys(pools || {}).forEach(function(name) {
        var arr = pools[name];
        if (arr) arr.forEach(function(a) { a.volume = v; });
      });
    },
    
    getMusicVolume: function() { return this.musicVolume; },
    getSoundVolume: function() { return this.soundVolume; },
    
    setMusicVolume: function(v) {
      this.musicVolume = Math.max(0, Math.min(1, v));
      if (this.menuMusic) this.menuMusic.volume = this.musicVolume;
      if (this.levelMusic) this.levelMusic.volume = this.musicVolume;
      for (var i = 0; i < (this.levelMusicTracks && this.levelMusicTracks.length); i++) {
        if (this.levelMusicTracks[i]) this.levelMusicTracks[i].volume = this.musicVolume;
      }
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
    
    // Отложенная загрузка (только не-iOS): по одному элементу за раз
    _staggerLoadHeavyAudio: function() {
      if (this._isIOS()) return;
      var self = this;
      if (self._heavyAudioScheduled) return;
      self._heavyAudioScheduled = true;
      var list = [];
      for (var i = 0; i < 3; i++) list.push({ type: 'level', index: i });
      Object.keys(self.SOUND_URLS).forEach(function(name) { list.push({ type: 'sound', name: name }); });
      var idx = 0;
      function next() {
        if (idx >= list.length) { self.applySoundVolume(); return; }
        var item = list[idx++];
        if (item.type === 'level') {
          var track = new Audio('sounds/music_' + (item.index + 1) + '.mp3');
          track.loop = true;
          track.volume = self.musicVolume;
          track.preload = 'auto';
          track.load();
          self.levelMusicTracks[item.index] = track;
        } else {
          self.soundPools[item.name] = self._createSoundPool(self.SOUND_URLS[item.name], self.SOUND_POOL_SIZE);
        }
        setTimeout(next, 0);
      }
      setTimeout(next, 0);
    },
    
    setupAudioUnlock: function() {
      var self = this;
      function unlockAudio() {
        if (self.isMenuPage() && self.menuMusic) {
          self.menuMusic.play().then(function() {
            if (!self.currentMusic) {
              self.menuMusic.pause();
              self.menuMusic.currentTime = 0;
            }
          }).catch(function() {});
        }
        if (!self._isIOS()) self._staggerLoadHeavyAudio();
        document.removeEventListener('touchstart', unlockAudio);
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('keydown', unlockAudio);
      }
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
    
    playMenuMusic: function() {
      if (!this.musicEnabled) return;
      this.stopCurrentMusic();
      if (!this.menuMusic) {
        this.menuMusic = new Audio('sounds/music_menu.mp3');
        this.menuMusic.loop = true;
        this.menuMusic.volume = this.musicVolume;
        this.menuMusic.preload = this._isIOS() ? 'none' : 'auto';
        if (!this._isIOS()) this.menuMusic.load();
      }
      try {
        var saved = sessionStorage.getItem('menuMusicTime');
        if (saved !== null) {
          var t = parseFloat(saved);
          if (!isNaN(t) && t >= 0) this.menuMusic.currentTime = t;
        }
      } catch (e) {}
      this.menuMusic.play().catch(function() {});
      this.currentMusic = this.menuMusic;
    },
    
    // На iOS: один трек (music_1), без предзагрузки — меньше декодировки и фризов
    playLevelMusic: function() {
      if (!this.musicEnabled) return;
      this.stopCurrentMusic();
      var trackNum = this._isIOS() ? 0 : Math.floor(Math.random() * 3);
      if (!this.levelMusicTracks[trackNum]) {
        var track = new Audio('sounds/music_' + (trackNum + 1) + '.mp3');
        track.loop = true;
        track.volume = this.musicVolume;
        track.preload = this._isIOS() ? 'none' : 'auto';
        if (!this._isIOS()) track.load();
        this.levelMusicTracks[trackNum] = track;
      }
      this.levelMusic = this.levelMusicTracks[trackNum];
      this.levelMusic.currentTime = 0;
      this.levelMusic.volume = this.musicVolume;
      this.levelMusic.play().catch(function() {});
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
    
    // Воспроизведение звуков ходьбы; на iOS — троттлинг (не чаще раз в 180 ms)
    playWalk: function() {
      if (!this.soundEnabled || this.walkSoundPlaying) return;
      if (this._isIOS()) {
        var now = Date.now();
        if (now - this._lastWalkTime < 180) return;
        this._lastWalkTime = now;
      }
      this.walkSoundPlaying = true;
      var name = this.currentWalkSound === 1 ? 'walk1' : 'walk2';
      this.currentWalkSound = this.currentWalkSound === 1 ? 2 : 1;
      var self = this;
      this._playFromPool(name, function() { self.walkSoundPlaying = false; });
    },
    
    // Остановка звуков ходьбы
    stopWalk: function() {
      this.isWalking = false;
    },
    
    _ensureSoundPool: function(name) {
      if (!this.soundPools[name] || !this.soundPools[name].length) {
        this.soundPools[name] = this._createSoundPool(this.SOUND_URLS[name], this.SOUND_POOL_SIZE);
      }
    },
    
    // На iOS: один общий Audio — меняем src и play(). Нет пулов, нет множества декодеров — без фризов.
    _playFromPool: function(name, onEnded) {
      if (this._isIOS()) {
        var url = this.SOUND_URLS[name];
        if (!url) return;
        if (!this._singleSfxEl) {
          this._singleSfxEl = new Audio();
          this._singleSfxEl.preload = 'none';
          this._singleSfxEl.volume = this.soundVolume;
        }
        this._singleSfxEl.onended = onEnded || null;
        this._singleSfxEl.src = url;
        this._singleSfxEl.currentTime = 0;
        this._singleSfxEl.volume = this.soundVolume;
        this._singleSfxEl.play().catch(function() { if (onEnded) onEnded(); });
        return;
      }
      this._ensureSoundPool(name);
      var pool = this.soundPools[name];
      if (!pool || !pool.length) return;
      var chosen = pool[0];
      chosen.currentTime = 0;
      chosen.volume = this.soundVolume;
      if (onEnded) chosen.onended = onEnded;
      chosen.play().catch(function() { if (onEnded) onEnded(); });
    },
    
    playSound: function(name) {
      if (!this.soundEnabled) return;
      this._playFromPool(name);
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
