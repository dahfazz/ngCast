"use strict";

/** @const {string} Media source root URL */
const MEDIA_SOURCE_ROOT = '';

/**
 * Width of progress bar in pixel
 * @const
 */
var PROGRESS_BAR_WIDTH = 600;

/** @const {number} Time in milliseconds for minimal progress update */
var TIMER_STEP = 1000;

/** @const {number} Cast volume upon initial connection */
var DEFAULT_VOLUME = 0.5;

/** @const {number} Height, in pixels, of volume bar */
var FULL_VOLUME_HEIGHT = 100;

/** @enum {string} Constants of states for media for both local and remote playback */
const PLAYER_STATE = {
  // No media is loaded into the player. For remote playback, maps to
  // the PlayerState.IDLE state.
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  // Player is in PLAY mode but not actively playing content. For remote
  // playback, maps to the PlayerState.BUFFERING state.
  BUFFERING: 'BUFFERING',
  // The media is loaded but not playing.
  LOADED: 'LOADED',
  // The media is playing. For remote playback, maps to the PlayerState.PLAYING state.
  PLAYING: 'PLAYING',
  // The media is paused. For remote playback, maps to the PlayerState.PAUSED state.
  PAUSED: 'PAUSED',
  STOPPED: 'STOPPED',
  ERROR: 'ERROR'
};

/**
 * Cast player object
 * Main variables:
 *  - PlayerHandler object for handling media playback
 *  - Cast player variables for controlling Cast mode media playback
 *  - Current media variables for transition between Cast and local modes
 *  - Current ad variables for controlling UI based on ad playback
 *  - Current live variables for controlling UI based on ad playback
 * @struct @constructor
 */
var CastPlayer = function () {
  /** @type {PlayerHandler} Delegation proxy for media playback */
  this.playerHandler = new PlayerHandler(this);

  /** @type {PLAYER_STATE} A state for media playback */
  this.playerState = PLAYER_STATE.IDLE;

  /**
   * @type {PLAYER_STATE} Player state before switching between local and
   * remote playback.
   */
  this.playerStateBeforeSwitch = null;

  /* Cast player variables */
  /** @type {cast.framework.RemotePlayer} */
  this.remotePlayer = null;
  /** @type {cast.framework.RemotePlayerController} */
  this.remotePlayerController = null;

  /* Local+Remote player variables */
  /** @type {number} A number for current time in seconds. Maintained in media time. */
  this.currentMediaTime = 0;
  /**
   * @type {?number} A number for current duration in seconds. Maintained in media time.
   * Null if duration should not be shown.
   */
  this.mediaDuration = -1;

  /** @type {?number} A timer for tracking progress of media */
  this.timer = null;
  /** @type {function()} Listener for handling current time increments */
  this.incrementMediaTimeHandler = this.incrementMediaTime.bind(this);
  /** @type {function()} Listener to be added/removed for the seek action */
  this.seekMediaListener = this.seekMedia.bind(this);

  /* Local player variables */
  /** @type {number} A number for current media index */
  this.currentMediaIndex = 0;
  /** @type {?Object} media contents from JSON */
  this.mediaContents = null;
  /** @type {boolean} Fullscreen mode on/off */
  this.fullscreen = false;

  /* Remote Player variables */
  /** @type {?chrome.cast.media.MediaInfo} Current mediaInfo */
  this.mediaInfo = null;
  /* Ad variables */
  /**
   * @type {?number} The time in seconds when the break clip becomes skippable.
   * 5 means that the end user can skip this break clip after 5 seconds. If
   * negative or not defined, it means that the current break clip is not skippable.
   */
  this.whenSkippable = null;

  /* Live variables */
  /** @type {?chrome.cast.media.LiveSeekableRange} Seekable range for live content */
  this.liveSeekableRange = null;
  /** @type {boolean} Remote player is playing live content. */
  this.isLiveContent = false;

  this.mediaJSON = {
    'categories': []
  };
};

CastPlayer.prototype.initializeCastPlayer = () => {
  var options = {};

  // Set the receiver application ID to your own (created in the
  // Google Cast Developer Console), or optionally
  // use the chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
  options.receiverApplicationId = '4F8B3483';

  // Auto join policy can be one of the following three:
  // ORIGIN_SCOPED - Auto connect from same appId and page origin
  // TAB_AND_ORIGIN_SCOPED - Auto connect from same appId, page origin, and tab
  // PAGE_SCOPED - No auto connect
  options.autoJoinPolicy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED;

  cast.framework.CastContext.getInstance().setOptions(options);

  castPlayer.remotePlayer = new cast.framework.RemotePlayer();
  castPlayer.remotePlayerController = new cast.framework.RemotePlayerController(castPlayer.remotePlayer);
  castPlayer.remotePlayerController.addEventListener(
      cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
      castPlayer.switchPlayer.bind(castPlayer)
  );
};

/**
 * Switch between the remote and local players.
 */
CastPlayer.prototype.switchPlayer = () => {
  castPlayer.stopProgressTimer();
  castPlayer.resetVolumeSlider();
  castPlayer.playerHandler.stop();
  castPlayer.playerState = PLAYER_STATE.IDLE;
  if (cast && cast.framework) {
      if (castPlayer.remotePlayer.isConnected) {
        castPlayer.setupRemotePlayer();
          return;
      }
  }
  castPlayer.setupLocalPlayer();
};

/**
 * PlayerHandler
 *
 * This is a handler through which the application will interact
 * with both the RemotePlayer and LocalPlayer. Combining these two into
 * one interface is one approach to the dual-player nature of a Cast
 * Chrome application. Otherwise, the state of the RemotePlayer can be
 * queried at any time to decide whether to interact with the local
 * or remote players.
 *
 * To set the player used, implement the following methods for a target object
 * and call setTarget(target).
 *
 * Methods to implement:
 *  - play()
 *  - pause()
 *  - stop()
 *  - seekTo(time)
 *  - load(mediaIndex)
 *  - isMediaLoaded(mediaIndex)
 *  - prepareToPlay()
 *  - getMediaDuration()
 *  - getCurrentMediaTime()
 *  - setVolume(volumeSliderPosition)
 *  - mute()
 *  - unMute()
 *  - isMuted()
 *  - updateDisplay()
 *  - updateCurrentTimeDisplay()
 *  - updateDurationDisplay()
 *  - setTimeString(element, time)
 */
var PlayerHandler = function (castPlayer) {
  this.target = {};

  this.setTarget = function (target) {
    this.target = target;
  };

  this.play = function () {
    if (castPlayer.playerState !== PLAYER_STATE.PLAYING &&
      castPlayer.playerState !== PLAYER_STATE.PAUSED &&
      castPlayer.playerState !== PLAYER_STATE.LOADED) {
      this.load(castPlayer.currentMediaIndex);
      return;
    }

    this.target.play();
    castPlayer.playerState = PLAYER_STATE.PLAYING;
    
    let play = document.getElementById('play');
    if (play && play.style && play.style.display)
      play.style.display = 'none';

    let pause = document.getElementById('pause');
    if (pause && pause.style && pause.style.display)
      pause.style.display = 'block';
      
    this.updateDisplayMessage();
  };

  this.updateDisplayMessage = function () {
    this.target.updateDisplayMessage();
  }

  this.pause = function () {
    this.target.pause();
    castPlayer.playerState = PLAYER_STATE.PAUSED;
    document.getElementById('play').style.display = 'block';
    document.getElementById('pause').style.display = 'none';
  };

  this.stop = function () {
    castPlayer.playerState = PLAYER_STATE.IDLE;
    this.target.stop();
  };

  this.load = function (mediaIndex = null) {
    if (!mediaIndex) {
      mediaIndex = castPlayer.currentMediaIndex;
    }
    castPlayer.playerState = PLAYER_STATE.BUFFERING;
    this.target.load(mediaIndex);
  };

  /**
   * Check if media has been loaded on the target player.
   * @param {number?} mediaIndex The desired media index. If null, verify if
   *  any media is loaded.
   */
  this.isMediaLoaded = function (mediaIndex) {
    return this.target.isMediaLoaded(mediaIndex);
  };

  /**
   * Called after media has been successfully loaded and is ready to start playback.
   * When local, will start playing the video, start the timer, and update the UI.
   * When remote, will set the UI to PLAYING and start the timer to update the
   *   UI based on remote playback.
   */
  this.prepareToPlay = function () {
    castPlayer.mediaDuration = this.getMediaDuration();
    castPlayer.playerHandler.updateDurationDisplay();
    castPlayer.playerState = PLAYER_STATE.LOADED;

    this.play();
    castPlayer.startProgressTimer();
    this.updateDisplay();
  };

  this.loaded = function() {
    castPlayer.currentMediaDuration = this.getMediaDuration();
    castPlayer.updateMediaDuration();
    castPlayer.playerState = PLAYER_STATE.LOADED;
    if (castPlayer.currentMediaTime > 0) {
        this.seekTo(castPlayer.currentMediaTime);
    }
    this.play();
    castPlayer.startProgressTimer();
    this.updateDisplayMessage();
  };

  this.getCurrentMediaTime = function () {
    return this.target.getCurrentMediaTime();
  };

  this.getMediaDuration = function () {
    return this.target.getMediaDuration();
  };

  this.updateDisplay = function () {
    // Update local variables
    this.currentMediaTime = this.target.getCurrentMediaTime();
    this.mediaDuration = this.target.getMediaDuration();

    this.target.updateDisplay();
  };

  this.updateCurrentTimeDisplay = function () {
    this.target.updateCurrentTimeDisplay();
  };

  /**
   * Determines the correct time string (media or clock) and sets it for the given element.
   */
  this.setTimeString = function (element, time) {
    this.target.setTimeString(element, time);
  };

  this.setVolume = function (volumeSliderPosition) {
    this.target.setVolume(volumeSliderPosition);
  };

  this.mute = function () {
    this.target.mute();
    document.getElementById('audio_on').style.display = 'none';
    document.getElementById('audio_off').style.display = 'block';
  };

  this.unMute = function () {
    this.target.unMute();
    document.getElementById('audio_on').style.display = 'block';
    document.getElementById('audio_off').style.display = 'none';
  };

  this.isMuted = function () {
    return this.target.isMuted();
  };

  this.seekTo = function (time) {
    this.target.seekTo(time);
  };
};

/**
 * Set the PlayerHandler target to use the video-element player
 */
CastPlayer.prototype.setupLocalPlayer = () => {
  var localPlayer = document.getElementById('video_element');
  localPlayer.addEventListener(
    'loadeddata', castPlayer.onMediaLoadedLocally.bind(castPlayer));

  // This object will implement PlayerHandler callbacks with localPlayer
  var playerTarget = {};

  playerTarget.play = () => {
    localPlayer.play();

    localPlayer.style.display = 'block';
  };

  playerTarget.pause = function () {
    localPlayer.pause();
  };

  playerTarget.stop = function () {
    if (typeof localPlayer.stop === "function")
      localPlayer.stop();
  };

  playerTarget.load = function (mediaIndex) {
    localPlayer.src =
      castPlayer.mediaContents[mediaIndex]['sources'][0];
    localPlayer.load();
  }.bind(castPlayer);

  playerTarget.getCurrentMediaTime = function () {
    return localPlayer.currentTime;
  };

  playerTarget.getMediaDuration = function () {
    return localPlayer.duration;
  };

  playerTarget.updateDisplayMessage = function () {
    document.getElementById('playerstate').style.display = 'none';
    document.getElementById('playerstatebg').style.display = 'none';
    document.getElementById('video_image_overlay').style.display = 'none';
  };

  playerTarget.setVolume = function (volumeSliderPosition) {
    localPlayer.volume = volumeSliderPosition < FULL_VOLUME_HEIGHT ?
      volumeSliderPosition / FULL_VOLUME_HEIGHT : 1;
    var p = document.getElementById('audio_bg_level');
    p.style.height = volumeSliderPosition + 'px';
    p.style.marginTop = -volumeSliderPosition + 'px';
  };

  playerTarget.mute = function () {
    localPlayer.muted = true;
  };

  playerTarget.unMute = function () {
    localPlayer.muted = false;
  };

  playerTarget.isMuted = function () {
    return localPlayer.muted;
  };

  playerTarget.seekTo = function (time) {
    localPlayer.currentTime = time;
  };

  castPlayer.playerHandler.setTarget(playerTarget);

  castPlayer.playerHandler.setVolume(DEFAULT_VOLUME * FULL_VOLUME_HEIGHT);

  castPlayer.showFullscreenButton();

  if (castPlayer.currentMediaTime > 0) {
    castPlayer.playerHandler.play();
  }
};

/**
 * Set the PlayerHandler target to use the remote player
 * Add event listeners for player changes which may occur outside sender app.
 */
CastPlayer.prototype.setupRemotePlayer = function () {
  var castSession = cast.framework.CastContext.getInstance().getCurrentSession();

  // Add event listeners for player changes which may occur outside sender app
  castPlayer.remotePlayerController.addEventListener(
      cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
      function() {
          if (castPlayer.remotePlayer.isPaused) {
              castPlayer.playerHandler.pause();
          } else {
              castPlayer.playerHandler.play();
          }
      }.bind(castPlayer)
  );

  castPlayer.remotePlayerController.addEventListener(
      cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED,
      function() {
          if (castPlayer.remotePlayer.isMuted) {
              castPlayer.playerHandler.mute();
          } else {
              castPlayer.playerHandler.unMute();
          }
      }.bind(castPlayer)
  );

  castPlayer.remotePlayerController.addEventListener(
      cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED,
      function() {
          var newVolume = castPlayer.remotePlayer.volumeLevel * FULL_VOLUME_HEIGHT;
          var p = document.getElementById('audio_bg_level');
          p.style.height = newVolume + 'px';
          p.style.marginTop = -newVolume + 'px';
      }.bind(castPlayer)
  );

  // castPlayer object will implement PlayerHandler callbacks with
  // remotePlayerController, and makes necessary UI updates specific
  // to remote playback
  var playerTarget = {};

  playerTarget.play = function () {
      if (castPlayer.remotePlayer.isPaused) {
          castPlayer.remotePlayerController.playOrPause();
      }

      var vi = document.getElementById('video_image');
      vi.style.display = 'block';
      var localPlayer = document.getElementById('video_element');
      localPlayer.style.display = 'none';
  }.bind(castPlayer);

  playerTarget.pause = function () {
      if (!castPlayer.remotePlayer.isPaused) {
          castPlayer.remotePlayerController.playOrPause();
      }
  }.bind(castPlayer);

  playerTarget.stop = function () {
       castPlayer.remotePlayerController.stop();
  }.bind(castPlayer);

  playerTarget.load = function (mediaIndex) {
      console.log('Loading...' + castPlayer.mediaContents[mediaIndex]['title']);
      var mediaInfo = new chrome.cast.media.MediaInfo(
          castPlayer.mediaContents[mediaIndex]['sources'][0], 'video/mp4');

      mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
      mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
      mediaInfo.metadata.title = castPlayer.mediaContents[mediaIndex]['title'];
      mediaInfo.metadata.images = [
          {'url': MEDIA_SOURCE_ROOT + castPlayer.mediaContents[mediaIndex]['thumb']}];

      var request = new chrome.cast.media.LoadRequest(mediaInfo);
      castSession.loadMedia(request).then(
          castPlayer.playerHandler.loaded.bind(castPlayer.playerHandler),
          function (errorCode) {
              castPlayer.playerState = PLAYER_STATE.ERROR;
              console.log('Remote media load error: ' +
                  CastPlayer.getErrorMessage(errorCode));
          }.bind(castPlayer));
  }.bind(castPlayer);

  playerTarget.getCurrentMediaTime = function() {
      return castPlayer.remotePlayer.currentTime;
  }.bind(castPlayer);

  playerTarget.getMediaDuration = function() {
      return castPlayer.remotePlayer.duration;
  }.bind(castPlayer);

  playerTarget.updateDisplayMessage = function () {
      document.getElementById('playerstate').style.display = 'block';
      document.getElementById('playerstatebg').style.display = 'block';
      document.getElementById('video_image_overlay').style.display = 'block';
      document.getElementById('playerstate').innerHTML =
          castPlayer.mediaContents[ castPlayer.currentMediaIndex]['title'] + ' ' +
          castPlayer.playerState + ' on ' + castSession.getCastDevice().friendlyName;
  }.bind(castPlayer);

  playerTarget.setVolume = function (volumeSliderPosition) {
      // Add resistance to avoid loud volume
      var currentVolume = castPlayer.remotePlayer.volumeLevel;
      var p = document.getElementById('audio_bg_level');
      if (volumeSliderPosition < FULL_VOLUME_HEIGHT) {
          var vScale =  castPlayer.currentVolume * FULL_VOLUME_HEIGHT;
          if (volumeSliderPosition > vScale) {
              volumeSliderPosition = vScale + (pos - vScale) / 2;
          }
          p.style.height = volumeSliderPosition + 'px';
          p.style.marginTop = -volumeSliderPosition + 'px';
          currentVolume = volumeSliderPosition / FULL_VOLUME_HEIGHT;
      } else {
          currentVolume = 1;
      }
      castPlayer.remotePlayer.volumeLevel = currentVolume;
      castPlayer.remotePlayerController.setVolumeLevel();
  }.bind(castPlayer);

  playerTarget.mute = function () {
      if (!castPlayer.remotePlayer.isMuted) {
          castPlayer.remotePlayerController.muteOrUnmute();
      }
  }.bind(castPlayer);

  playerTarget.unMute = function () {
      if (castPlayer.remotePlayer.isMuted) {
          castPlayer.remotePlayerController.muteOrUnmute();
      }
  }.bind(castPlayer);

  playerTarget.isMuted = function() {
      return castPlayer.remotePlayer.isMuted;
  }.bind(castPlayer);

  playerTarget.seekTo = function (time) {
      castPlayer.remotePlayer.currentTime = time;
      castPlayer.remotePlayerController.seek();
  }.bind(castPlayer);

  castPlayer.playerHandler.setTarget(playerTarget);

  // Setup remote player volume right on setup
  // The remote player may have had a volume set from previous playback
  if (castPlayer.remotePlayer.isMuted) {
      castPlayer.playerHandler.mute();
  }
  var currentVolume = castPlayer.remotePlayer.volumeLevel * FULL_VOLUME_HEIGHT;
  var p = document.getElementById('audio_bg_level');
  p.style.height = currentVolume + 'px';
  p.style.marginTop = -currentVolume + 'px';

  castPlayer.hideFullscreenButton();

  castPlayer.playerHandler.play();
};

/**
 * Callback when media is loaded in local player
 */
CastPlayer.prototype.onMediaLoadedLocally = function () {
  var localPlayer = document.getElementById('video_element');
  localPlayer.currentTime = castPlayer.currentMediaTime;

  castPlayer.playerHandler.loaded();
};

/**
 * Select a media content
 * @param {number} mediaIndex A number for media index
 */
CastPlayer.prototype.selectMedia = function (mediaIndex) {
  console.log('Media index selected: ' + mediaIndex);

  castPlayer.currentMediaIndex = mediaIndex;
  // Clear currentMediaInfo when playing content from the sender.
  castPlayer.playerHandler.currentMediaInfo = undefined;

  // Set video image
  var vi = document.getElementById('video_image');
  vi.src = MEDIA_SOURCE_ROOT + castPlayer.mediaContents[mediaIndex]['thumb'];

  // Reset progress bar
  var pi = document.getElementById('progress_indicator');
  pi.style.marginLeft = '0px';
  var progress = document.getElementById('progress');
  progress.style.width = '0px';

  let seekable_window = document.getElementById('seekable_window');
  let unseekable_overlay = document.getElementById('unseekable_overlay');
  seekable_window.style.width = PROGRESS_BAR_WIDTH;
  unseekable_overlay.style.width = '0px';

  // Stop timer and reset time displays
  castPlayer.stopProgressTimer();
  castPlayer.currentMediaTime = 0;
  castPlayer.playerHandler.setTimeString(document.getElementById('currentTime'), 0);
  castPlayer.playerHandler.setTimeString(document.getElementById('duration'), 0);

  castPlayer.playerState = PLAYER_STATE.IDLE;
  castPlayer.playerHandler.play();
};

/**
 * Media seek function
 * @param {Event} event An event object from seek
 */
CastPlayer.prototype.seekMedia = function (event) {
  if (castPlayer.mediaDuration == null || (cast.framework.CastContext.getInstance().getCurrentSession() && !castPlayer.remotePlayer.canSeek)) {
    console.log('Error - Not seekable');
    return;
  }

  if (castPlayer.isLiveContent && !castPlayer.liveSeekableRange) {
    console.log('Live content has no seekable range.')
    return;
  }

  var position = parseInt(event.offsetX, 10);
  var pi = document.getElementById('progress_indicator');
  var progress = document.getElementById('progress');
  let seekTime = 0;
  let pp = 0;
  let pw = 0;
  if (event.currentTarget.id == 'progress_indicator') {
    seekTime = parseInt(castPlayer.currentMediaTime + castPlayer.mediaDuration * position /
      PROGRESS_BAR_WIDTH, 10);
    pp = parseInt(pi.style.marginLeft, 10) + position;
    pw = parseInt(progress.style.width, 10) + position;
  } else {
    seekTime = parseInt(position * castPlayer.mediaDuration / PROGRESS_BAR_WIDTH, 10);
    pp = position;
    pw = position;
  }

  if (castPlayer.playerState === PLAYER_STATE.PLAYING ||
    castPlayer.playerState === PLAYER_STATE.PAUSED) {
    castPlayer.currentMediaTime = seekTime;
    progress.style.width = pw + 'px';
    pi.style.marginLeft = pp + 'px';
  }

  if (castPlayer.isLiveContent) {
    seekTime += castPlayer.mediaInfo.metadata.sectionStartTimeInMedia;
  }

  castPlayer.playerHandler.seekTo(seekTime);
};

/**
 * Set current player volume
 * @param {Event} mouseEvent
 */
CastPlayer.prototype.setVolume = function (mouseEvent) {
  var p = document.getElementById('audio_bg_level');
  var pos = 0;
  if (mouseEvent.currentTarget.id === 'audio_bg_track') {
    pos = FULL_VOLUME_HEIGHT - parseInt(mouseEvent.offsetY, 10);
  } else {
    pos = parseInt(p.clientHeight, 10) - parseInt(mouseEvent.offsetY, 10);
  }
  castPlayer.playerHandler.setVolume(pos);
};

/**
 * Starts the timer to increment the media progress bar
 */
CastPlayer.prototype.startProgressTimer = function () {
  castPlayer.stopProgressTimer();

  // Start progress timer
  castPlayer.timer = setInterval(castPlayer.incrementMediaTimeHandler, TIMER_STEP);
};

/**
 * Stops the timer to increment the media progress bar
 */
CastPlayer.prototype.stopProgressTimer = function () {
  if (castPlayer.timer) {
    clearInterval(castPlayer.timer);
    castPlayer.timer = null;
  }
};

/**
 * Increment media current time depending on remote or local playback
 */
CastPlayer.prototype.incrementMediaTime = () => {
    // First sync with the current player's time
    castPlayer.currentMediaTime = castPlayer.playerHandler.getCurrentMediaTime();
    castPlayer.currentMediaDuration = castPlayer.playerHandler.getMediaDuration();

    if (castPlayer.playerState === PLAYER_STATE.PLAYING) {
        if (castPlayer.currentMediaTime < castPlayer.currentMediaDuration) {
          castPlayer.currentMediaTime += 1;
          castPlayer.updateProgressBarByTimer();
        } else {
          castPlayer.endPlayback();
        }
    }
};

/**
 * Update progress bar and currentTime based on timer
 */
CastPlayer.prototype.updateProgressBarByTimer = function () {
  var p = document.getElementById('progress');
  if (isNaN(parseInt(p.style.width, 10))) {
      p.style.width = 0;
  }
  if (castPlayer.currentMediaDuration > 0) {
      var pp = Math.floor(
          PROGRESS_BAR_WIDTH * castPlayer.currentMediaTime / castPlayer.currentMediaDuration);
  }

  p.style.width = pp + 'px';
  var pi = document.getElementById('progress_indicator');
  pi.style.marginLeft = -21 - PROGRESS_BAR_WIDTH + pp + 'px';

  if (pp >= PROGRESS_BAR_WIDTH) {
    castPlayer.endPlayback();
  }
};

/**
 *  End playback. Called when media ends.
 */
CastPlayer.prototype.endPlayback = function () {
  castPlayer.currentMediaTime = 0;
  castPlayer.stopProgressTimer();
  castPlayer.playerState = PLAYER_STATE.IDLE;
  castPlayer.playerHandler.updateDisplay();

  let play = document.getElementById('play');
  if (play && play.style && play.display)
    play.style.display = 'block';

  let pause = document.getElementById('pause');
  if (pause && pause.style && pause.style.display)
    pause.style.display = 'none';
};

/**
 * @param {?number} timestamp Linux timestamp
 * @return {?string} media time string. Null if time is invalid.
 */
CastPlayer.prototype.getMediaTimeString = function (timestamp) {
  if (timestamp == undefined || timestamp == null) {
    return null;
  }

  let isNegative = false;
  if (timestamp < 0) {
    isNegative = true;
    timestamp *= -1;
  }

  let hours = Math.floor(timestamp / 3600);
  let minutes = Math.floor((timestamp - (hours * 3600)) / 60);
  let seconds = Math.floor(timestamp - (hours * 3600) - (minutes * 60));

  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;

  return (isNegative ? '-' : '') + hours + ':' + minutes + ':' + seconds;
};

/**
 * @param {number} timestamp Linux timestamp
 * @return {?string} ClockTime string. Null if time is invalid.
 */
CastPlayer.prototype.getClockTimeString = function (timestamp) {
  if (!timestamp) return "0:00:00";

  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  // Hour '0' should be '12'
  hours = hours ? hours : 12;
  minutes = ('0' + minutes).slice(-2);
  seconds = ('0' + seconds).slice(-2);
  let clockTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  return clockTime;
};

/**
 * Updates Ad markers in UI
 */
CastPlayer.prototype.updateAdMarkers = function () {
  let castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  if (!castSession) return;

  let media = castSession.getMediaSession();
  if (!media) return;

  let mediaInfo = media.media;
  if (!mediaInfo) return;

  let breaks = mediaInfo.breaks;
  let contentDuration = mediaInfo.duration;

  if (!breaks) {
    return;
  }

  for (var i = 0; i < breaks.length; i++) {
    let adBreak = breaks[i];

    // Server-side stitched Ads (embedded) are skipped when the position is beyond
    // the duration, so they shouldn't be shown with an ad marker on the UI.
    if (adBreak.position > contentDuration && adBreak.isEmbedded) {
      continue;
    }

    // Place marker if not already set in position
    if (!document.getElementById('ad' + adBreak.position)) {
      var div = document.getElementById('progress')
      div.innerHTML += '<div class="adMarker" id="ad' + adBreak.position +
        '" style="margin-left: ' +
        castPlayer.adPositionToMargin(adBreak.position, contentDuration) + 'px"></div>';
    }
  }
};

/**
 * Remove Ad markers in UI
 */
CastPlayer.prototype.removeAdMarkers = function () {
  document.querySelectorAll('.adMarker').forEach(function (adMarker) {
    adMarker.remove();
  });
};

/**
 * Position of the ad marker from the margin
 */
CastPlayer.prototype.adPositionToMargin = function (position, contentDuration) {
  // Post-roll
  if (position == -1) {
    return PROGRESS_BAR_WIDTH;
  }

  // Client stitched Ads (not embedded) beyond the duration, will play at the
  // end of the content.
  if (position > contentDuration) {
    return PROGRESS_BAR_WIDTH;
  }

  // Convert Ad position to margin
  return (PROGRESS_BAR_WIDTH * position) / contentDuration;
};

/**
 * Handle BREAK_CLIP_ID_CHANGED event
 */
CastPlayer.prototype.onBreakClipIdChanged = function () {
  // Hide skip button when switching to a new breakClip
  let skip = document.getElementById('skip');
  if (skip && skip.style && skip.style.display)
    skip.style.display = 'none';
};

/**
 * Disable progress bar if playing a break.
 */
CastPlayer.prototype.isPlayingBreak = function (isPlayingBreak) {
  castPlayer.enableProgressBar(!isPlayingBreak);
};

/**
 * Handle WHEN_SKIPPABLE_CHANGED event
 */
CastPlayer.prototype.onWhenSkippableChanged = function (whenSkippable) {
  castPlayer.whenSkippable = whenSkippable;
};

/**
 * Handle CURRENT_BREAK_CLIP_TIME_CHANGED event
 */
CastPlayer.prototype.onCurrentBreakClipTimeChanged = function (currentBreakClipTime) {
  let skip = document.getElementById('skip');

  // Unskippable
  if (castPlayer.whenSkippable == undefined || castPlayer.whenSkippable < 0) {
    // Hide skip button    
    if (skip && skip.style && skip.style.display)
      skip.style.display = 'none';
  }
  // Skippable
  else if (castPlayer.whenSkippable !== undefined || currentBreakClipTime >= castPlayer.whenSkippable) {
    // Show skip button    
    if (skip && skip.style && skip.style.display)
      skip.style.display = 'block';
  }
  // Not ready to be skipped
  else {
    // Hide skip button
    if (skip && skip.style && skip.style.display)
      skip.style.display = 'none';
  }
};

/**
 * Skip the current Ad
 */
CastPlayer.prototype.skipAd = function () {
  castPlayer.remotePlayerController.skipAd();
}

/**
 * Enable/disable progress bar
 */
CastPlayer.prototype.enableProgressBar = function (enable) {
  let progress = document.getElementById('progress');
  let progress_indicator = document.getElementById('progress_indicator');
  let seekable_window = document.getElementById('seekable_window');

  if (enable) {
    // Enable UI
    progress.style.backgroundImage = "url('./assets/imagefiles/timeline_bg_progress.png')";
    progress.style.cursor = "pointer";
    seekable_window.style.cursor = "pointer";
    progress_indicator.style.cursor = "pointer";
    progress_indicator.draggable = true;

    // Add listeners
    progress.addEventListener('click', castPlayer.seekMediaListener);
    seekable_window.addEventListener('click', castPlayer.seekMediaListener);
    progress_indicator.addEventListener('dragend', castPlayer.seekMediaListener);
  } else {
    // Disable UI
    progress.style.backgroundImage = "url('./assets/imagefiles/timeline_bg_buffer.png')";
    progress.style.cursor = "default";
    seekable_window.style.cursor = "default";
    progress_indicator.style.cursor = "default";
    progress_indicator.draggable = false;

    // Remove listeners
    progress.removeEventListener('click', castPlayer.seekMediaListener);
    seekable_window.removeEventListener('click', castPlayer.seekMediaListener);
    progress_indicator.removeEventListener('dragend', castPlayer.seekMediaListener);
  }
}

/**
 * Updates media duration text in UI
 */
CastPlayer.prototype.updateMediaDuration = function() {
  document.getElementById('duration').innerHTML =
      CastPlayer.getDurationString(castPlayer.currentMediaDuration);
};

/**
 * @param {number} durationInSec
 * @return {string}
 */
CastPlayer.getDurationString = function(durationInSec) {
  var durationString = '' + Math.floor(durationInSec % 60);
  var durationInMin = Math.floor(durationInSec / 60);
  if (durationInMin === 0) {
      return durationString;
  }
  durationString = (durationInMin % 60) + ':' + durationString;
  var durationInHour = Math.floor(durationInMin / 60);
  if (durationInHour === 0) {
      return durationString;
  }
  return durationInHour + ':' + durationString;
};

/**
 * Request full screen mode
 */
CastPlayer.prototype.requestFullScreen = function () {
  // Supports most browsers and their versions
  var element = document.getElementById('video_element');
  var requestMethod =
    element['requestFullScreen'] || element['webkitRequestFullScreen'];

  if (requestMethod) {
    // Native full screen.
    requestMethod.call(element);
    console.log('Requested fullscreen');
  }
};

/**
 * Exit full screen mode
 */
CastPlayer.prototype.cancelFullScreen = function () {
  // Supports most browsers and their versions.
  var requestMethod =
    document['cancelFullScreen'] || document['webkitCancelFullScreen'];

  if (requestMethod) {
    requestMethod.call(document);
  }
};

/**
 * Exit fullscreen mode by escape
 */
CastPlayer.prototype.fullscreenChangeHandler = function () {
  castPlayer.fullscreen = !castPlayer.fullscreen;
};

/**
 * Show expand/collapse fullscreen button
 */
CastPlayer.prototype.showFullscreenButton = function () {
  let fullscreen_expand = document.getElementById('fullscreen_expand');
  let fullscreen_collapse = document.getElementById('fullscreen_collapse');

  if (castPlayer.fullscreen) {
    if (fullscreen_expand && fullscreen_expand.style && fullscreen_expand.style.display)
      fullscreen_expand.style.display = 'none';

    if (fullscreen_collapse && fullscreen_collapse.style && fullscreen_collapse.style.display)
      fullscreen_collapse.style.display = 'block';
  } else {
    if (fullscreen_expand && fullscreen_expand.style && fullscreen_expand.style.display)
      fullscreen_expand.style.display = 'block';

    if (fullscreen_collapse && fullscreen_collapse.style && fullscreen_collapse.style.display)
      fullscreen_collapse.style.display = 'none';
  }
};

/**
 * Hide expand/collapse fullscreen button
 */
CastPlayer.prototype.hideFullscreenButton = function () {
  let fullscreen_expand = document.getElementById('fullscreen_expand');
  let fullscreen_collapse = document.getElementById('fullscreen_collapse');

  if (fullscreen_expand && fullscreen_expand.style && fullscreen_expand.style.display)
    fullscreen_expand.style.display = 'none';

  if (fullscreen_collapse && fullscreen_collapse.style && fullscreen_collapse.style.display)
    fullscreen_collapse.style.display = 'none';
};

/**
 * Show the media control
 */
CastPlayer.prototype.showMediaControl = function () {
  let media_control = document.getElementById('media_control');
  if (media_control && media_control.style && media_control.style.opacity)
    media_control.style.opacity = 0.7;
};

/**
 * Hide the media control
 */
CastPlayer.prototype.hideMediaControl = function () {
  if (typeof cast !== 'undefined') {
    let context = cast.framework.CastContext.getInstance();
    if (context && context.getCurrentSession()) {
      // Do not hide controls during an active cast session.
      document.getElementById('media_control').style.opacity = 0.7;
    } else {
      document.getElementById('media_control').style.opacity = 0;
    }
  }
};

/**
 * Show the volume slider
 */
CastPlayer.prototype.showVolumeSlider = function () {
  if (!castPlayer.playerHandler.isMuted()) {
    document.getElementById('audio_bg').style.opacity = 1;
    document.getElementById('audio_bg_track').style.opacity = 1;
    document.getElementById('audio_bg_level').style.opacity = 1;
    document.getElementById('audio_indicator').style.opacity = 1;
  }
};

/**
 * Hide the volume slider
 */
CastPlayer.prototype.hideVolumeSlider = function () {
  document.getElementById('audio_bg').style.opacity = 0;
  document.getElementById('audio_bg_track').style.opacity = 0;
  document.getElementById('audio_bg_level').style.opacity = 0;
  document.getElementById('audio_indicator').style.opacity = 0;
};

/**
 * Reset the volume slider
 */
CastPlayer.prototype.resetVolumeSlider = function () {
  var volumeTrackHeight = document.getElementById('audio_bg_track').clientHeight;
  var defaultVolumeSliderHeight = DEFAULT_VOLUME * volumeTrackHeight;
  document.getElementById('audio_bg_level').style.height =
    defaultVolumeSliderHeight + 'px';
  document.getElementById('audio_on').style.display = 'block';
  document.getElementById('audio_off').style.display = 'none';
};

/**
 * Initialize UI components and add event listeners
 */
CastPlayer.prototype.initializeUI = () => {
  // Set initial values for title, subtitle, and description
  document.getElementById('media_title').innerHTML =
    castPlayer.mediaContents[0]['title'];
  document.getElementById('media_subtitle').innerHTML =
    castPlayer.mediaContents[castPlayer.currentMediaIndex]['subtitle'];
  // document.getElementById('media_desc').innerHTML =
  //   castPlayer.mediaContents[castPlayer.currentMediaIndex]['description'];

  // Add event handlers to UI components
  document.getElementById('progress_bg').addEventListener(
    'click', castPlayer.seekMedia.bind(castPlayer));
  document.getElementById('progress').addEventListener(
    'click', castPlayer.seekMedia.bind(castPlayer));
  document.getElementById('progress_indicator').addEventListener(
    'dragend', castPlayer.seekMedia.bind(castPlayer));
  document.getElementById('audio_on').addEventListener(
    'click', castPlayer.playerHandler.mute.bind(castPlayer.playerHandler));
  document.getElementById('audio_off').addEventListener(
    'click', castPlayer.playerHandler.unMute.bind(castPlayer.playerHandler));
  document.getElementById('audio_bg').addEventListener(
    'mouseover', castPlayer.showVolumeSlider.bind(castPlayer));
  document.getElementById('audio_on').addEventListener(
    'mouseover', castPlayer.showVolumeSlider.bind(castPlayer));
  document.getElementById('audio_bg_level').addEventListener(
    'mouseover', castPlayer.showVolumeSlider.bind(castPlayer));
  document.getElementById('audio_bg_track').addEventListener(
    'mouseover', castPlayer.showVolumeSlider.bind(castPlayer));
  document.getElementById('audio_bg_level').addEventListener(
    'click', castPlayer.setVolume.bind(castPlayer));
  document.getElementById('audio_bg_track').addEventListener(
    'click', castPlayer.setVolume.bind(castPlayer));
  document.getElementById('audio_bg').addEventListener(
    'mouseout', castPlayer.hideVolumeSlider.bind(castPlayer));
  document.getElementById('audio_on').addEventListener(
    'mouseout', castPlayer.hideVolumeSlider.bind(castPlayer));
  document.getElementById('main_video').addEventListener(
    'mouseover', castPlayer.showMediaControl.bind(castPlayer));
  document.getElementById('main_video').addEventListener(
    'mouseout', castPlayer.hideMediaControl.bind(castPlayer));
  document.getElementById('media_control').addEventListener(
    'mouseover', castPlayer.showMediaControl.bind(castPlayer));
  document.getElementById('media_control').addEventListener(
    'mouseout', castPlayer.hideMediaControl.bind(castPlayer));
  
  const fullscreen_expand = document.getElementById('fullscreen_expand');
  if (fullscreen_expand){
    fullscreen_expand.addEventListener(
    'click', castPlayer.requestFullScreen.bind(castPlayer));
  }

  const fullscreen_collapse = document.getElementById('fullscreen_collapse');
  if (fullscreen_collapse) {
    fullscreen_collapse.addEventListener(
      'click', castPlayer.cancelFullScreen.bind(castPlayer));
  }

  document.addEventListener(
    'fullscreenchange', castPlayer.fullscreenChangeHandler.bind(castPlayer), false);
  document.addEventListener(
    'webkitfullscreenchange', castPlayer.fullscreenChangeHandler.bind(castPlayer), false);
  // Enable play/pause buttons
  // document.getElementById('play').addEventListener(
  //   'click', castPlayer.playerHandler.play.bind(castPlayer.playerHandler));
  // document.getElementById('pause').addEventListener(
  //   'click', castPlayer.playerHandler.pause.bind(castPlayer.playerHandler));
  document.getElementById('progress_indicator').draggable = true;
};

/**
 * Add video thumbnails div's to UI for media JSON contents
 */
CastPlayer.prototype.addVideoThumbs = function () {
  if (typeof castPlayer.mediaJSON !== 'undefined' && castPlayer.mediaJSON['categories'] && castPlayer.mediaJSON['categories'].length > 0) {
    castPlayer.mediaContents = castPlayer.mediaJSON['categories'][0]['videos'];
    var ni = document.getElementById('carousel');
    var newdiv = null;
    var divIdName = null;
    for (var i = 0; i < castPlayer.mediaContents.length; i++) {
      newdiv = document.createElement('div');
      divIdName = 'thumb' + i + 'Div';
      newdiv.setAttribute('id', divIdName);
      newdiv.setAttribute('class', 'thumb');
      newdiv.innerHTML =
        '<img src="' + MEDIA_SOURCE_ROOT + castPlayer.mediaContents[i]['thumb'] +
        '" class="thumbnail">';
      newdiv.addEventListener('click', castPlayer.selectMedia.bind(castPlayer, i));
      ni.appendChild(newdiv);
    }
  }
};

CastPlayer.prototype.addMediaContents = () => {
  if (typeof castPlayer.mediaJSON !== 'undefined' && castPlayer.mediaJSON['categories'] && castPlayer.mediaJSON['categories'].length > 0) {
    castPlayer.mediaContents = castPlayer.mediaJSON['categories'][0]['videos'];
    return castPlayer.mediaContents;
  } else {
    return null;
  }
};

/**
 * Makes human-readable message from chrome.cast.Error
 * @param {chrome.cast.Error} error
 * @return {string} error message
 */
CastPlayer.getErrorMessage = function (error) {
  switch (error.code) {
    case chrome.cast.ErrorCode.API_NOT_INITIALIZED:
      return 'The API is not initialized.' +
        (error.description ? ' :' + error.description : '');
    case chrome.cast.ErrorCode.CANCEL:
      return 'The operation was canceled by the user' +
        (error.description ? ' :' + error.description : '');
    case chrome.cast.ErrorCode.CHANNEL_ERROR:
      return 'A channel to the receiver is not available.' +
        (error.description ? ' :' + error.description : '');
    case chrome.cast.ErrorCode.EXTENSION_MISSING:
      return 'The Cast extension is not available.' +
        (error.description ? ' :' + error.description : '');
    case chrome.cast.ErrorCode.INVALID_PARAMETER:
      return 'The parameters to the operation were not valid.' +
        (error.description ? ' :' + error.description : '');
    case chrome.cast.ErrorCode.RECEIVER_UNAVAILABLE:
      return 'No receiver was compatible with the session request.' +
        (error.description ? ' :' + error.description : '');
    case chrome.cast.ErrorCode.SESSION_ERROR:
      return 'A session could not be created, or a session was invalid.' +
        (error.description ? ' :' + error.description : '');
    case chrome.cast.ErrorCode.TIMEOUT:
      return 'The operation timed out.' +
        (error.description ? ' :' + error.description : '');
    default:
      return error;
  }
};

var castPlayer = new CastPlayer();
window['__onGCastApiAvailable'] = function (isAvailable) {
  if (isAvailable) {
    castPlayer.initializeCastPlayer();
  }
};

window.CastPlayer = castPlayer;
