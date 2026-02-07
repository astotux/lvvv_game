// Только фоновая музыка во время игры (не в меню)
(function() {
  window.AudioManager = {
    levelMusic: null,
    currentMusic: null,
    levelMusicTracks: [null, null, null],
    musicEnabled: true,
    musicVolume: 0.5,
    STORAGE_MUSIC_VOL: 'love_game_music_volume',
    _levelMusicScheduled: false,
    _iosCtx: null,
    _iosGain: null,
    _iosSource: null,

    _isIOS: function() {
      return /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    },

    init: function() {
      try {
        var mv = localStorage.getItem(this.STORAGE_MUSIC_VOL);
        if (mv !== null) {
          var v = parseFloat(mv);
          if (!isNaN(v)) this.musicVolume = Math.max(0, Math.min(1, v));
        }
      } catch (e) {}
      this._staggerLoadLevelMusic();
    },

    _heavyAudioScheduled: false,
    _staggerLoadLevelMusic: function() {
      var self = this;
      if (self._heavyAudioScheduled) return;
      self._heavyAudioScheduled = true;
      var idx = 0;
      function next() {
        if (idx >= 4) return;
        var track = new Audio('sounds/music_' + (idx + 1) + '.mp3');
        track.loop = true;
        track.volume = self.musicVolume;
        track.preload = 'auto';
        track.load();
        self.levelMusicTracks[idx] = track;
        idx++;
        setTimeout(next, 0);
      }
      setTimeout(next, 0);
    },

    getMusicVolume: function() { return this.musicVolume; },

    setMusicVolume: function(v) {
      this.musicVolume = Math.max(0, Math.min(1, v));
      if (this._isIOS() && this._iosGain) {
        this._iosGain.gain.value = this.musicVolume;
      }
      for (var i = 0; i < 4; i++) {
        if (this.levelMusicTracks[i]) this.levelMusicTracks[i].volume = this.musicVolume;
      }
      if (this.levelMusic) this.levelMusic.volume = this.musicVolume;
      try { localStorage.setItem(this.STORAGE_MUSIC_VOL, String(this.musicVolume)); } catch (e) {}
    },

    _ensureIOSAudioContext: function() {
      if (this._iosCtx) return true;
      try {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return false;
        this._iosCtx = new Ctx();
        this._iosGain = this._iosCtx.createGain();
        this._iosGain.gain.value = this.musicVolume;
        this._iosGain.connect(this._iosCtx.destination);
        if (this._iosCtx.resume) this._iosCtx.resume();
        return true;
      } catch (e) { return false; }
    },

    _connectIOS: function(audioEl) {
      if (!this._isIOS() || !audioEl) return;
      this._ensureIOSAudioContext();
      if (!this._iosCtx || !this._iosGain) return;
      try {
        if (this._iosSource) {
          try { this._iosSource.disconnect(); } catch (e) {}
          this._iosSource = null;
        }
        this._iosSource = this._iosCtx.createMediaElementSource(audioEl);
        this._iosSource.connect(this._iosGain);
        this._iosGain.gain.value = this.musicVolume;
      } catch (e) {}
    },

    _disconnectIOS: function() {
      if (this._iosSource) {
        try { this._iosSource.disconnect(); } catch (e) {}
        this._iosSource = null;
      }
    },

    playLevelMusic: function() {
      if (!this.musicEnabled) return;
      this.stopLevelMusic();
      var trackNum = Math.floor(Math.random() * 4);
      if (!this.levelMusicTracks[trackNum]) {
        var track = new Audio('sounds/music_' + (trackNum + 1) + '.mp3');
        track.loop = true;
        track.volume = this.musicVolume;
        track.preload = 'auto';
        track.load();
        this.levelMusicTracks[trackNum] = track;
      }
      this.levelMusic = this.levelMusicTracks[trackNum];
      this.levelMusic.currentTime = 0;
      this.levelMusic.volume = this.musicVolume;
      if (this._isIOS()) this._connectIOS(this.levelMusic);
      this.levelMusic.play().catch(function() {});
      this.currentMusic = this.levelMusic;
    },

    stopLevelMusic: function() {
      if (this._isIOS()) this._disconnectIOS();
      if (this.levelMusic) {
        this.levelMusic.pause();
        this.levelMusic.currentTime = 0;
        this.currentMusic = null;
        this.levelMusic = null;
      }
    },

    scheduleLevelMusicOnFirstInteraction: function() {
      var self = this;
      if (self._levelMusicScheduled) return;
      self._levelMusicScheduled = true;
      function tryStart() {
        if (!self.musicEnabled) return;
        if (self.currentMusic && !self.currentMusic.paused) return;
        if (self._isIOS()) {
          self._ensureIOSAudioContext();
          if (self._iosCtx && self._iosCtx.resume) self._iosCtx.resume();
          self.playLevelMusic();
        } else {
          self.playLevelMusic();
          document.removeEventListener('touchstart', tryStart, true);
          document.removeEventListener('touchend', tryStart, true);
          document.removeEventListener('click', tryStart, true);
          document.removeEventListener('keydown', tryStart, true);
        }
      }
      document.addEventListener('touchstart', tryStart, { capture: true });
      document.addEventListener('touchend', tryStart, { capture: true });
      document.addEventListener('click', tryStart, { capture: true });
      document.addEventListener('keydown', tryStart, { capture: true });
    },

    startLevelMusicFromUserGesture: function() {
      if (!this.musicEnabled) return;
      if (this._isIOS()) {
        this._ensureIOSAudioContext();
        if (this._iosCtx && this._iosCtx.resume) this._iosCtx.resume();
      }
      this.playLevelMusic();
    },

    toggleMusic: function() {
      this.musicEnabled = !this.musicEnabled;
      if (!this.musicEnabled && this.currentMusic) {
        this.currentMusic.pause();
      } else if (this.musicEnabled && this.currentMusic) {
        this.currentMusic.play().catch(function() {});
      }
      return this.musicEnabled;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.AudioManager.init();
    });
  } else {
    window.AudioManager.init();
  }
})();
