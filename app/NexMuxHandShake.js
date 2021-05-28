var NexMuxHandShake = function(){

  this.useAdMetric = false;

  this.initMuxData = function (muxConfig) {

    if (muxConfig.data.env_key !== undefined && muxConfig.data.env_key !== null) {

      // Change the configs values for the corresponding stream properties values
      muxConfig.data.player_name = 'NexPlayer';
      muxConfig.data.player_version = player.getVersion();
      muxConfig.data.player_init_time = window.muxPlayerInitTime;
      muxConfig.data.video_duration = player.getDuration() * 1000;
      muxConfig.data.video_stream_type = (player.isLive() ? 'live' : 'on-demand');
  
      if (this.useAdMetrics) {
        player.adManager().addImpressionListener(() => {mux.emit('#nexplayer_videoplayer', 'adrequest', { ad_tag_url: '"' + player.adManager().getMediaUrl() + '"'})});
        player.adManager().addStartedListener(() => {mux.emit('#nexplayer_videoplayer', 'adbreakstart')});
        player.adManager().addPausedListener(() => {mux.emit('#nexplayer_videoplayer', 'adpause')});
        player.adManager().addResumedListener(() => {mux.emit('#nexplayer_videoplayer', 'adplay')});
        player.adManager().addFirstQuartileListener(() => {mux.emit('#nexplayer_videoplayer', 'adfirstquartile')});
        player.adManager().addMidpointListener(() => {mux.emit('#nexplayer_videoplayer', 'admidpoint')});
        player.adManager().addThirdQuartileListener(() => {mux.emit('#nexplayer_videoplayer', 'adthirdquartile')});
        player.adManager().addCompleteListener(() => {mux.emit('#nexplayer_videoplayer', 'adbreakend')});
        player.adManager().addErrorListener(() => {mux.emit('#nexplayer_videoplayer', 'aderror')});
      };
  
      player.on(nexplayer.Player.NexEvent.Track_Change, function() {
        if (player.getCurrentTrack().bitrate > 0) {
          mux.emit('#nexplayer_videoplayer', 'renditionchange', { video_source_bitrate: player.getCurrentTrack().bitrate});
        }
      });
  
      mux.monitor('#nexplayer_videoplayer', muxConfig);
    } else {
      console.error("There is not env_key provided");
    }
  };

  this.videoChange = function (data) {
    if (data.env_key !== undefined && data.env_key !== null) {
      mux.emit('#nexplayer_videoplayer', 'videochange', data);
    }
  };

  this.programChange = function (data) {
    if (data.env_key !== undefined && data.env_key !== null) {
      mux.emit('#nexplayer_videoplayer', 'programchange', data);
    }
  };

}