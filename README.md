![NexPlayer demo home ](images/nexplayer-logo.png)

# NexPlayer™ HTML5 Mux Data Integration
Integration of NexPlayer HTML5 with Mux Data

[NexPlayer™ HTML5](https://nexplayersdk.com/nexplayer-html5/) is a multi-screen streaming player that enables HLS and DASH live streaming across all browsers and platforms with the highest video quality. NexPlayer™ HTML5 supports an advanced feature set that includes DRM, Closed Captioning, Time Shifting and 360 video playback among many others.

This repository contains the sample demo code of NexPlayer™ HTML5 with the integration of [Mux Data](https://docs.mux.com/guides/data).

## Quick Start

- You must import the next version of Mux into the head  and set the muxPlayerInitTime.

```html
<head>
	<script type="text/javascript" src="https://src.litix.io/core/4/mux.js"></script>
    <script>window.muxPlayerInitTime = Date.now()</script>
</head>
```

- The folders "app" include the script that should be included in the HTML file:

```html
<script type="text/javascript" src="app/NexMuxHandShake.js"></script>
<script type="text/javascript" src="app/config.js"></script>
```

- Get your ENV_KEY from the [Mux environments dashboard](https://dashboard.mux.com/login).

- Configure your settings in "app/configs.js".

- By default, Mux use a cookie to track playback across subsequent page views. This cookie includes information about the tracking of the viewer, such as an anonymized viewer ID that Mux generates for each user. None of this information is personally-identifiable, but you can disable the use of this cookie if desired.
```javascript
  disableCookies: true,
```

- By default, mux does not respect Do Not Track when set within browsers. This can be enabled in the options passed to Mux, via a setting named respectDoNotTrack. The default for this is false.
```javascript
  respectDoNotTrack: true,
```

- In the case that you want to disable automatic error tracking completely use:
```javascript
  automaticErrorTracking: false,
```

- NexMuxHandshake should be created in the callBackWithPlayers after the event "loadeddata" is fired. This object links Nexplayer and Mux events and functions.

```javascript

    var callBackWithPlayers = function (nexplayerInstance, videoElement) {
      player = nexplayerInstance;
      videoElem = videoElement;

      videoElem.addEventListener("loadeddata", function() {
        NexMux = new NexMuxHandShake();
        // To use ad metrics, set useAdMetrics to true, it is set to false by default.
        NexMux.useAdMetrics = true;
        NexMux.initMuxData();
      });
    }
```

- If your application plays multiple videos back-to-back in the same video player, you should modify the muxConfig variable created in config.js an then use the following code.

```javascript
NexMux.videoChange(muxConfig);
```

- In some cases, you may have the program change within a stream, and you may want to track each program as a view on its own. To do so you should modify the muxConfig variable created in config.js an then use the following code.

```javascript
NexMux.programChange(muxConfig);
```

-------------------

## Request demo
Product page [NexPlayer™ HTML5](https://nexplayersdk.com/html5-player/)

## Contact
[supportmadrid@nexplayer.com](mailto:supportmadrid@nexplayer.com)

## License
[NexPlayer™ HTML5 Product License](License.txt)