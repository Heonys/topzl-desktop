import Hls from "hls.js";

class TrackPlayer {
  private audioContext: AudioContext;
  private audio: HTMLAudioElement;
  private hls: Hls;
  private currentMusic: any;

  constructor() {
    this.audioContext = new AudioContext();
    this.audio = new Audio();
    this.audio.preload = "auto";
    this.audio.controls = false;
    this.hls = new Hls();
    this.hls.attachMedia(this.audio);

    this.hls.on(Hls.Events.ERROR, (e, data) => {
      console.log("hls error", e, data);
    });
  }

  private hasSource() {
    return !!this.audio.src;
  }

  /** 设置音源 */
  setTrackSource(trackSource: any, musicItem: any) {
    let url = trackSource.url;
    if (trackSource.headers || trackSource.userAgent) {
      const trackSourceHeaders = trackSource.headers ?? {};
      if (trackSource.userAgent) {
        trackSourceHeaders["user-agent"] = trackSource.userAgent;
      }

      url = encodeUrlHeaders(url, trackSourceHeaders);
    }

    this.currentMusic = musicItem;
    // 更新mediameta
    navigator.mediaSession.metadata = new MediaMetadata({
      title: musicItem.title,
      artist: musicItem.artist,
      album: musicItem.album,
      artwork: [
        {
          src: musicItem.artwork,
        },
      ],
    });
    // 拓展播放功能
    const urlObj = new URL(trackSource.url);
    if (urlObj.username && urlObj.password) {
      // TODO: 这部分逻辑需要抽离出来 特殊逻辑
      const mediaSource = new MediaSource();
      this.audio.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener("sourceopen", () => {
        const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

        const authHeader = `Basic ${btoa(
          `${decodeURIComponent(urlObj.username)}:${decodeURIComponent(urlObj.password)}`,
        )}`;
        urlObj.username = "";
        urlObj.password = "";
        fetch(urlObj.toString(), {
          method: "GET",
          headers: {
            ...trackSource.headers,
            Authorization: authHeader,
          },
        })
          .then((res) => res.arrayBuffer())
          .then((buf) => {
            sourceBuffer.addEventListener("updateend", () => {
              mediaSource.endOfStream();
            });
            sourceBuffer.appendBuffer(buf);
          });
      });
    } else {
      this.audio.src = url;
    }
  }

  /** 暂停播放 */
  pause() {
    if (this.hasSource()) {
      this.audio.pause();
    }
  }
  /** 开始播放 */
  play() {
    if (this.hasSource()) {
      this.audio.play().catch(() => {
        // 播放失败会自动被onerror监控到
        // trackPlayerEventsEmitter.emit(TrackPlayerEvent.Error, e);
      });
      trackPlayer.setVolume(0.5);
    }
  }
  /** 设置音量 */
  setVolume(volume: number) {
    this.audio.volume = volume;
  }
  getAudioElement() {
    return this.audio;
  }

  async setSinkId(deviceId: string) {
    return (this.audio as any).setSinkId(deviceId);
  }
}

const trackPlayer = new TrackPlayer();
export default trackPlayer;

function encodeUrlHeaders(originalUrl: string, headers?: Record<string, string>) {
  let formalizedKey: string;
  const _setHeaders: Record<string, string> = {};

  for (const key in headers) {
    formalizedKey = key.toLowerCase();
    _setHeaders[formalizedKey] = headers[key];
  }
  const encodedUrl = new URL(originalUrl);
  encodedUrl.searchParams.set("_setHeaders", encodeURIComponent(JSON.stringify(_setHeaders)));
  return encodedUrl.toString();
}
