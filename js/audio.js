// Только фоновая музыка во время игры (не в меню)
(function() {
  window.AudioManager = {
    levelMusic: null,
    currentMusic: null,
    levelMusicTracks: [null, null, null],
    musicEnabled: true,
    musicVolume: 0.5,
    STORAGE_MUSIC_VOL: 'love_game_music_volume',

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
      for (var i = 0; i < 4; i++) {
        if (this.levelMusicTracks[i]) this.levelMusicTracks[i].volume = this.musicVolume;
      }
      if (this.levelMusic) this.levelMusic.volume = this.musicVolume;
      try { localStorage.setItem(this.STORAGE_MUSIC_VOL, String(this.musicVolume)); } catch (e) {}
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
      this.levelMusic.play().catch(function() {});
      this.currentMusic = this.levelMusic;
    },

    stopLevelMusic: function() {
      if (this.levelMusic) {
        this.levelMusic.pause();
        this.levelMusic.currentTime = 0;
        this.currentMusic = null;
        this.levelMusic = null;
      }
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
