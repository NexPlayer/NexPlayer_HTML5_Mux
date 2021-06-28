![NexPlayer demo home ](images/nexplayer-logo.png)

# Integration of NexPlayer HTML5 with Mux Data

[NexPlayer™ HTML5](https://nexplayersdk.com/nexplayer-html5/) is a multi-screen streaming player that enables HLS and DASH live streaming across all browsers and platforms with the highest video quality. NexPlayer™ HTML5 supports, an advanced feature set that includes DRM, Closed Captioning, Time Shifting and 360 video playback among many others.

This repository contains the sample demo code of NexPlayer™ HTML5 with the integration of [Mux Data](https://docs.mux.com/guides/data).

## Using with the player

To start, you need to have an ENV_KEY from the <a href="https://dashboard.mux.com/environments">Mux environments dashboard</a>. ENV_KEY is a client-side key used for Mux Data monitoring. These are not to be confused with API tokens which are created in the admin settings dashboard and meant to access the Mux API from a trusted server.

In order to use it, you need to import these files into the HTML and set the muxPlayerInitTime.

```html
<head>
  <script type="text/javascript" src="https://src.litix.io/core/4/mux.js"></script>
  <script>window.muxPlayerInitTime = Date.now()</script>
</head>
<body>
	<script type="text/javascript" src="https://nexplayer.nexplayersdk.com/Mux/NexMuxHandShake.js"></script>
</body>

 ```

 You can find <a href="https://github.com/NexPlayer/NexPlayer_HTML5_Mux/blob/main/app/NexMuxHandShake.js">NexMuxHandShake.js</a> in the following <a href="https://github.com/NexPlayer/NexPlayer_HTML5_Mux">repository</a>.

 First you should create your muxConfiguration variable with the following structure:

```js
var muxConfiguration = {
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
 ```
**Properties**:

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>boolean</code> | Enable or disable debug mode |
| disableCookies | <code>boolean</code> | Disable or enable the cookie that Mux uses to track playback across subsequent page views if desired. |
| respectDoNotTrack | <code>boolean</code> | By default, mux does not respect Do Not Track when set within browsers. This can be enabled or disabled by this property. |
| automaticErrorTracking | <code>boolean</code> | Enable or disable automatic error tracking completely. |
| data | <code>Object</code> | Site, player and video metadata. |


NexMuxHandshake should be created in the callBackWithPlayers after the event “loadeddata” is fired. This object links Nexplayer and Mux events and functions.

```js

  var nexMux = null;

  var callBackWithPlayers = function (nexplayerInstance, videoElement) {

    player = nexplayerInstance;
    videoElem = videoElement;

    videoElem.addEventListener("loadeddata", function() {

      nexMux = new NexMuxHandShake();
      // To use ad metrics, set useAdMetrics to true, it is set to false by default.
      nexMux.useAdMetrics = true;
      nexMux.initMuxData(player, videoElem.id, muxConfiguration);
    });
  }

```

## Changing the video

If your application plays multiple videos back-to-back in the same video player, you should use the following function and pass a data object with the same structure as the muxConfiguration.data object.

```js
nexMux.videoChange(videoElem.id, data);
 ```

In some cases, you may have the program change within a stream, and you may want to track each program as a view on its own. To do so you should use the following function and pass a data object with the same structure as the muxConfiguration.data object.

```js
nexMux.programChange(videoElem.id, data);
```

-------------------

## Request demo
Product page [NexPlayer™ HTML5](https://nexplayersdk.com/html5-player/)

## Contact
[supportmadrid@nexplayer.com](mailto:supportmadrid@nexplayer.com)

## License
[NexPlayer™ HTML5 Product License](License.txt)