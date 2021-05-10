var muxConfig = {
  debug: true,
  disableCookies: true,
  respectDoNotTrack: true,
  automaticErrorTracking: true,
  data: {
    env_key: 'ENV_KEY', // required

    // Site Metadata
    viewer_user_id: '', // ex: '12345'
    experiment_name: '', // ex: 'player_test_A'
    sub_property_id: '', // ex: 'cus-1'

    // Player Metadata
    player_name: 'NexPlayer', // ex: 'My Main Player'
    player_version:  '', // ex: '1.0.0'
    player_init_time: window.muxPlayerInitTime, // ex: 1451606400000

    // Video Metadata
    video_id: '', // ex: 'abcd123'
    video_title: '', // ex: 'My Great Video'
    video_series: '', // ex: 'Weekly Great Videos'
    video_duration: '', // in milliseconds, ex: 120000
    video_stream_type: '', // 'live' or 'on-demand'
    video_cdn: '' // ex: 'Fastly', 'Akamai'
  },
};