var NexMuxHandShake = function(){

  this.useAdMetric = false;

  this.initMuxData = function (player, videoElementId, muxConfig) {

    if (muxConfig.data.env_key !== undefined && muxConfig.data.env_key !== null) {
      // Change the configs values for the corresponding stream properties values
      muxConfig.data.player_name = 'NexPlayer';
      muxConfig.data.player_version = player.getVersion();
      muxConfig.data.player_init_time = window.muxPlayerInitTime;
      muxConfig.data.video_duration = player.getDuration() * 1000;
      muxConfig.data.video_stream_type = (player.isLive() ? 'live' : 'on-demand');

      if (this.useAdMetrics) {
        player.adManager().addImpressionListener(() => {mux.emit(videoElementId, 'adrequest', { ad_tag_url: '"' + player.adManager().getMediaUrl() + '"'})});
        player.adManager().addStartedListener(() => {mux.emit(videoElementId, 'adbreakstart')});
        player.adManager().addPausedListener(() => {mux.emit(videoElementId, 'adpause')});
        player.adManager().addResumedListener(() => {mux.emit(videoElementId, 'adplay')});
        player.adManager().addFirstQuartileListener(() => {mux.emit(videoElementId, 'adfirstquartile')});
        player.adManager().addMidpointListener(() => {mux.emit(videoElementId, 'admidpoint')});
        player.adManager().addThirdQuartileListener(() => {mux.emit(videoElementId, 'adthirdquartile')});
        player.adManager().addCompleteListener(() => {mux.emit(videoElementId, 'adbreakend')});
        player.adManager().addErrorListener(() => {mux.emit(videoElementId, 'aderror')});
      };

      player.on(nexplayer.Player.NexEvent.Track_Change, function() {

        if (player.getCurrentTrack().bitrate > 0) {
          mux.emit(videoElementId, 'renditionchange', { video_source_bitrate: player.getCurrentTrack().bitrate});
        }
      });
      mux.monitor(videoElementId, muxConfig);
    } else {
      console.error("There is not env_key provided");
    }
  };

  this.videoChange = function (videoElementId, data) {

    if (data.env_key !== undefined && data.env_key !== null) {
      mux.emit(videoElementId, 'videochange', data);
    } else {
      console.error("There is not env_key provided");
    }
  };

  this.programChange = function (videoElementId, data) {

    if (data.env_key !== undefined && data.env_key !== null) {
      mux.emit(videoElementId, 'programchange', data);
    } else {
      console.error("There is not env_key provided");
    }
  };

}