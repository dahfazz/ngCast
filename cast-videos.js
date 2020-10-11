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
    if (castPlayer.playerState == PLAYER_STATE.IDLE ||
      !this.target.isMediaLoaded(castPlayer.currentMediaIndex)) {
      this.load(castPlayer.currentMediaIndex);
      return;
    }

    castPlayer.playerState = PLAYER_STATE.PLAYING;
    this.target.play();

    document.getElementById('play').style.display = 'none';
    document.getElementById('pause').style.display = 'block';
  };

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

  playerTarget.play = function () {
    localPlayer.play();

    var vi = document.getElementById('video_image');
    vi.style.display = 'none';
    localPlayer.style.display = 'block';
  };

  playerTarget.pause = function () {
    localPlayer.pause();
  };

  playerTarget.stop = function () {
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
  // Triggers when the media info or the player state changes
  castPlayer.remotePlayerController.addEventListener(
    cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED,
    function (event) {
      let session = cast.framework.CastContext.getInstance().getCurrentSession();
      if (!session) {
        castPlayer.mediaInfo = null;
        castPlayer.isLiveContent = false;
        castPlayer.playerHandler.updateDisplay();
        return;
      }

      let media = session.getMediaSession();
      if (!media) {
        castPlayer.mediaInfo = null;
        castPlayer.isLiveContent = false;
        castPlayer.playerHandler.updateDisplay();
        return;
      }

      castPlayer.mediaInfo = media.media;

      if (castPlayer.mediaInfo) {
        castPlayer.isLiveContent = (castPlayer.mediaInfo.streamType ==
          chrome.cast.media.StreamType.LIVE);
      } else {
        castPlayer.isLiveContent = false;
      }

      if (media.playerState == PLAYER_STATE.PLAYING && castPlayer.playerState !== PLAYER_STATE.PLAYING) {
        castPlayer.playerHandler.prepareToPlay();
      }

      castPlayer.removeAdMarkers();
      castPlayer.updateAdMarkers();

      castPlayer.playerHandler.updateDisplay();
    }.bind(castPlayer)
  );

  castPlayer.remotePlayerController.addEventListener(
    cast.framework.RemotePlayerEventType.CAN_SEEK_CHANGED,
    function (event) {
      castPlayer.enableProgressBar(event.value);
    }.bind(castPlayer)
  );

  castPlayer.remotePlayerController.addEventListener(
    cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
    function () {
      if (castPlayer.remotePlayer.isPaused) {
        castPlayer.playerHandler.pause();
      } else if (castPlayer.playerState !== PLAYER_STATE.PLAYING) {
        // If currently not playing, start to play.
        // This occurs if starting to play from local, but this check is
        // required if the state is changed remotely.
        castPlayer.playerHandler.play();
      }
    }.bind(castPlayer)
  );

  castPlayer.remotePlayerController.addEventListener(
    cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED,
    function () {
      if (castPlayer.remotePlayer.isMuted) {
        castPlayer.playerHandler.mute();
      } else {
        castPlayer.playerHandler.unMute();
      }
    }.bind(castPlayer)
  );

  castPlayer.remotePlayerController.addEventListener(
    cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED,
    function () {
      var newVolume = castPlayer.remotePlayer.volumeLevel * FULL_VOLUME_HEIGHT;
      var p = document.getElementById('audio_bg_level');
      p.style.height = newVolume + 'px';
      p.style.marginTop = -newVolume + 'px';
    }.bind(castPlayer)
  );

  castPlayer.remotePlayerController.addEventListener(
    cast.framework.RemotePlayerEventType.IS_PLAYING_BREAK_CHANGED,
    function (event) {
      castPlayer.isPlayingBreak(event.value);
    }.bind(castPlayer)
  );

  castPlayer.remotePlayerController.addEventListener(
    cast.framework.RemotePlayerEventType.WHEN_SKIPPABLE_CHANGED,
    function (event) {
      castPlayer.onWhenSkippableChanged(event.value);
    }.bind(castPlayer)
  );

  castPlayer.remotePlayerController.addEventListener(
    cast.framework.RemotePlayerEventType.CURRENT_BREAK_CLIP_TIME_CHANGED,
    function (event) {
      castPlayer.onCurrentBreakClipTimeChanged(event.value);
    }.bind(castPlayer)
  );

  castPlayer.remotePlayerController.addEventListener(
    cast.framework.RemotePlayerEventType.BREAK_CLIP_ID_CHANGED,
    function (event) {
      castPlayer.onBreakClipIdChanged(event.value);
    }.bind(castPlayer)
  );

  castPlayer.remotePlayerController.addEventListener(
    cast.framework.RemotePlayerEventType.LIVE_SEEKABLE_RANGE_CHANGED,
    function (event) {
      console.log('LIVE_SEEKABLE_RANGE_CHANGED');
      castPlayer.liveSeekableRange = event.value;
    }.bind(castPlayer)
  );

  // This object will implement PlayerHandler callbacks with
  // remotePlayerController, and makes necessary UI updates specific
  // to remote playback.
  var playerTarget = {};

  playerTarget.play = function () {
    if (castPlayer.remotePlayer.isPaused) {
      castPlayer.remotePlayerController.playOrPause();
    }

    var vi = document.getElementById('video_image');
    vi.style.display = '';
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

  // Load request for local -> remote
  playerTarget.load = function (mediaIndex) {
    console.log('Loading...' + this.mediaContents[mediaIndex]['title']);
    var mediaInfo = new chrome.cast.media.MediaInfo(
        this.mediaContents[mediaIndex]['sources'][0], 'video/mp4');

    mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
    mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
    mediaInfo.metadata.title = this.mediaContents[mediaIndex]['title'];
    mediaInfo.metadata.images = [
        {'url': MEDIA_SOURCE_ROOT + this.mediaContents[mediaIndex]['thumb']}];

    var request = new chrome.cast.media.LoadRequest(mediaInfo);
    castSession.loadMedia(request).then(
        this.playerHandler.loaded.bind(this.playerHandler),
        function (errorCode) {
            this.playerState = PLAYER_STATE.ERROR;
            console.log('Remote media load error: ' +
                CastPlayer.getErrorMessage(errorCode));
        }.bind(castPlayer));
  }.bind(castPlayer);

  playerTarget.isMediaLoaded = function (mediaIndex) {
    let session = cast.framework.CastContext.getInstance().getCurrentSession();
    if (!session) return false;

    let media = session.getMediaSession();
    if (!media) return false;

    if (media.playerState == PLAYER_STATE.IDLE) {
      return false;
    }

    // No need to verify local mediaIndex content.
    return true;
  }.bind(castPlayer);

  /**
   * @return {number?} Current media time for the content. Always returns
   *      media time even if in clock time (conversion done when displaying).
   */
  playerTarget.getCurrentMediaTime = function () {
    if (castPlayer.isLiveContent && castPlayer.mediaInfo.metadata &&
      castPlayer.mediaInfo.metadata.sectionStartTimeInMedia) {
      return castPlayer.remotePlayer.currentTime - castPlayer.mediaInfo.metadata.sectionStartTimeInMedia;
    } else {
      // VOD and live scenerios where live metadata is not provided.
      return castPlayer.remotePlayer.currentTime;
    }
  }.bind(castPlayer);

  /**
   * @return {number?} media time duration for the content. Always returns
   *      media time even if in clock time (conversion done when displaying).
   */
  playerTarget.getMediaDuration = function () {
    if (castPlayer.isLiveContent) {
      // Scenerios when live metadata is not provided.
      if (castPlayer.mediaInfo.metadata == undefined ||
        castPlayer.mediaInfo.metadata.sectionDuration == undefined ||
        castPlayer.mediaInfo.metadata.sectionStartTimeInMedia == undefined) {
        return null;
      }

      return castPlayer.mediaInfo.metadata.sectionDuration;
    } else {
      return castPlayer.remotePlayer.duration;
    }
  }.bind(castPlayer);

  playerTarget.updateDisplay = function () {
    let castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    if (castSession && castSession.getMediaSession() && castSession.getMediaSession().media) {
      let media = castSession.getMediaSession();
      let mediaInfo = media.media;

      // image placeholder for video view
      var vi = document.getElementById('video_image');
      if (mediaInfo.metadata && mediaInfo.metadata.images &&
        mediaInfo.metadata.images.length > 0) {
        vi.src = mediaInfo.metadata.images[0].url;
      }

      // playerstate view
      document.getElementById('playerstate').style.display = 'block';
      document.getElementById('playerstatebg').style.display = 'block';
      document.getElementById('video_image_overlay').style.display = 'block';

      let mediaTitle = '';
      let mediaEpisodeTitle = '';
      let mediaSubtitle = '';

      if (mediaInfo.metadata) {
        mediaTitle = mediaInfo.metadata.title;
        mediaEpisodeTitle = mediaInfo.metadata.episodeTitle;
        // Append episode title if present
        mediaTitle = mediaEpisodeTitle ? mediaTitle + ': ' + mediaEpisodeTitle : mediaTitle;
        // Do not display mediaTitle if not defined.
        mediaTitle = (mediaTitle) ? mediaTitle + ' ' : '';
        mediaSubtitle = mediaInfo.metadata.subtitle;
        mediaSubtitle = (mediaSubtitle) ? mediaSubtitle + ' ' : '';
      }

      if (DEMO_MODE) {
        document.getElementById('playerstate').innerHTML =
          (ENABLE_LIVE ? 'Live Content ' : 'Sample Video ') + media.playerState + ' on Chromecast';

        // media_info view
        document.getElementById('media_title').innerHTML = (ENABLE_LIVE ? 'Live Content' : 'Sample Video');
        document.getElementById('media_subtitle').innerHTML = '';
      } else {
        document.getElementById('playerstate').innerHTML =
          mediaTitle + media.playerState + ' on ' +
          castSession.getCastDevice().friendlyName;

        // media_info view
        document.getElementById('media_title').innerHTML = mediaTitle;
        document.getElementById('media_subtitle').innerHTML = mediaSubtitle;
      }

      // live information
      if (mediaInfo.streamType == chrome.cast.media.StreamType.LIVE) {
        castPlayer.liveSeekableRange = media.liveSeekableRange;

        let live_indicator = document.getElementById('live_indicator');
        live_indicator.style.display = 'block';

        // Display indicator if current time is close to the end of
        // the seekable range.
        if (castPlayer.liveSeekableRange && (Math.abs(media.getEstimatedTime() - castPlayer.liveSeekableRange.end) < LIVE_INDICATOR_BUFFER)) {
          live_indicator.src = "imagefiles/live_indicator_active.png";
        } else {
          live_indicator.src = "imagefiles/live_indicator_inactive.png";
        }
      } else {
        document.getElementById('live_indicator').style.display = 'none';
      }
    } else {
      // playerstate view
      document.getElementById('playerstate').style.display = 'none';
      document.getElementById('playerstatebg').style.display = 'none';
      document.getElementById('video_image_overlay').style.display = 'none';

      // media_info view
      document.getElementById('media_title').innerHTML = "";
      document.getElementById('media_subtitle').innerHTML = "";
    }
  }.bind(castPlayer);

  playerTarget.updateCurrentTimeDisplay = function () {
    castPlayer.playerHandler.setTimeString(document.getElementById('currentTime'), castPlayer.playerHandler.getCurrentMediaTime());
  }.bind(castPlayer);

  playerTarget.setTimeString = function (element, time) {
    let currentTimeString = castPlayer.getMediaTimeString(time);

    if (castPlayer.isLiveContent) {
      if (currentTimeString == null) {
        element.style.display = 'none';
        return;
      }

      // clock time
      if (castPlayer.mediaInfo.metadata && castPlayer.mediaInfo.metadata.sectionStartAbsoluteTime !== undefined) {
        element.style.display = 'flex';
        element.innerHTML = castPlayer.getClockTimeString(time + castPlayer.mediaInfo.metadata.sectionStartAbsoluteTime);
      } else {
        // media time
        element.style.display = 'flex';
        element.innerHTML = currentTimeString;
      }
    } else {
      if (currentTimeString !== null) {
        element.style.display = 'flex';
        element.innerHTML = currentTimeString;
      } else {
        element.style.display = 'none';
      }
    }
  }.bind(castPlayer);

  playerTarget.setVolume = function (volumeSliderPosition) {
    var currentVolume = castPlayer.remotePlayer.volumeLevel;
    var p = document.getElementById('audio_bg_level');
    if (volumeSliderPosition < FULL_VOLUME_HEIGHT) {
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

  playerTarget.isMuted = function () {
    return castPlayer.remotePlayer.isMuted;
  }.bind(castPlayer);

  playerTarget.seekTo = function (time) {
    castPlayer.remotePlayer.currentTime = time;
    castPlayer.remotePlayerController.seek();
  }.bind(castPlayer);

  castPlayer.playerHandler.setTarget(playerTarget);

  // Setup remote player properties on setup
  if (castPlayer.remotePlayer.isMuted) {
    castPlayer.playerHandler.mute();
  }
  castPlayer.enableProgressBar(castPlayer.remotePlayer.canSeek);
  // The remote player may have had a volume set from previous playback
  var currentVolume = castPlayer.remotePlayer.volumeLevel * FULL_VOLUME_HEIGHT;
  var p = document.getElementById('audio_bg_level');
  p.style.height = currentVolume + 'px';
  p.style.marginTop = -currentVolume + 'px';

  // Show media_control
  document.getElementById('media_control').style.opacity = 0.7;

  castPlayer.hideFullscreenButton();

  // If resuming a session, take the remote properties and continue the existing
  // playback. Otherwise, load local content.
  if (cast.framework.CastContext.getInstance().getCurrentSession().getSessionState() ==
    cast.framework.SessionState.SESSION_RESUMED) {
    console.log('Resuming session');
    castPlayer.playerHandler.prepareToPlay();

    // New media has been loaded so the previous ad markers should
    // be removed.
    castPlayer.removeAdMarkers();
    castPlayer.updateAdMarkers();
  } else {
    castPlayer.playerHandler.load();
  }
};

/**
 * Callback when media is loaded in local player
 */
CastPlayer.prototype.onMediaLoadedLocally = function () {
  var localPlayer = document.getElementById('video_element');
  localPlayer.currentTime = castPlayer.currentMediaTime;

  castPlayer.playerHandler.prepareToPlay();
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
CastPlayer.prototype.incrementMediaTime = function () {
  // First sync with the current player's time
  castPlayer.currentMediaTime = castPlayer.playerHandler.getCurrentMediaTime();
  castPlayer.mediaDuration = castPlayer.playerHandler.getMediaDuration();

  castPlayer.playerHandler.updateDurationDisplay();

  if (castPlayer.mediaDuration == null || castPlayer.currentMediaTime < castPlayer.mediaDuration || castPlayer.isLiveContent) {
    castPlayer.playerHandler.updateCurrentTimeDisplay();
    castPlayer.updateProgressBarByTimer();
  } else if (castPlayer.mediaDuration > 0) {
    castPlayer.endPlayback();
  }
};

/**
 * Update progress bar and currentTime based on timer
 */
CastPlayer.prototype.updateProgressBarByTimer = function () {
  var progressBar = document.getElementById('progress');
  var pi = document.getElementById('progress_indicator');

  // Live situation where the progress and duration is unknown.
  if (castPlayer.mediaDuration == null) {
    if (!castPlayer.isLiveContent) {
      console.log('Error - Duration is not defined for a VOD stream.');
    }

    progressBar.style.width = '0px';

    let skip = document.getElementById('skip');
    if (skip && skip.style && skip.style.display) {
      skip.style.display = 'none';
    }

    pi.style.display = 'none';

    let seekable_window = document.getElementById('seekable_window');
    if (seekable_window && seekable_window.style && seekable_window.style.width)
      seekable_window.style.width = '0px';

    let unseekable_overlay = document.getElementById('unseekable_overlay');
    if (unseekable_overlay && unseekable_overlay.style && unseekable_overlay.style.width)
      unseekable_overlay.style.width = '0px';

    return;
  } else {
    pi.style.display = '';
  }

  if (isNaN(parseInt(progressBar.style.width, 10))) {
    progressBar.style.width = '0px';
  }

  // Prevent indicator from exceeding the max width. Happens during
  // short media when each progress step is large
  var pp = Math.floor(PROGRESS_BAR_WIDTH * castPlayer.currentMediaTime / castPlayer.mediaDuration);
  if (pp > PROGRESS_BAR_WIDTH) {
    pp = PROGRESS_BAR_WIDTH;
  } else if (pp < 0) {
    pp = 0;
  }

  progressBar.style.width = pp + 'px';
  pi.style.marginLeft = pp + 'px';

  let seekable_window = document.getElementById('seekable_window');
  let unseekable_overlay = document.getElementById('unseekable_overlay');
  if (castPlayer.isLiveContent) {
    if (castPlayer.liveSeekableRange) {
      // Use the liveSeekableRange to draw the seekable and unseekable windows
      let seekableMediaPosition = Math.max(castPlayer.mediaInfo.metadata.sectionStartTimeInMedia, castPlayer.liveSeekableRange.end) -
        castPlayer.mediaInfo.metadata.sectionStartTimeInMedia;
      let seekableWidth = Math.floor(PROGRESS_BAR_WIDTH * seekableMediaPosition / castPlayer.mediaDuration);
      if (seekableWidth > PROGRESS_BAR_WIDTH) {
        seekableWidth = PROGRESS_BAR_WIDTH;
      } else if (seekableWidth < 0) {
        seekableWidth = 0;
      }
      seekable_window.style.width = seekableWidth + 'px';

      let unseekableMediaPosition = Math.max(castPlayer.mediaInfo.metadata.sectionStartTimeInMedia, castPlayer.liveSeekableRange.start) -
        castPlayer.mediaInfo.metadata.sectionStartTimeInMedia;
      let unseekableWidth = Math.floor(PROGRESS_BAR_WIDTH * unseekableMediaPosition / castPlayer.mediaDuration);
      if (unseekableWidth > PROGRESS_BAR_WIDTH) {
        unseekableWidth = PROGRESS_BAR_WIDTH;
      } else if (unseekableWidth < 0) {
        unseekableWidth = 0;
      }
      unseekable_overlay.style.width = unseekableWidth + 'px';
    } else {
      // Nothing is seekable if no liveSeekableRange
      seekable_window.style.width = '0px';
      unseekable_overlay.style.width = PROGRESS_BAR_WIDTH + 'px';
    }
  } else {
    // Default to everything seekable
    seekable_window.style.width = PROGRESS_BAR_WIDTH + 'px';
    unseekable_overlay.style.width = '0px';
  }

  if (pp >= PROGRESS_BAR_WIDTH && !castPlayer.isLiveContent) {
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
  if (media_control && media_control.style && media_control.opacity)
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
  document.getElementById('media_desc').innerHTML =
    castPlayer.mediaContents[castPlayer.currentMediaIndex]['description'];

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
  document.getElementById('fullscreen_expand').addEventListener(
    'click', castPlayer.requestFullScreen.bind(castPlayer));
  document.getElementById('fullscreen_collapse').addEventListener(
    'click', castPlayer.cancelFullScreen.bind(castPlayer));
  document.addEventListener(
    'fullscreenchange', castPlayer.fullscreenChangeHandler.bind(castPlayer), false);
  document.addEventListener(
    'webkitfullscreenchange', castPlayer.fullscreenChangeHandler.bind(castPlayer), false);

  // Enable play/pause buttons
  document.getElementById('play').addEventListener(
    'click', castPlayer.playerHandler.play.bind(castPlayer.playerHandler));
  document.getElementById('pause').addEventListener(
    'click', castPlayer.playerHandler.pause.bind(castPlayer.playerHandler));
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
      newdiv.addEventListener('click', castPlayer.selectMedia.bind(this, i));
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
