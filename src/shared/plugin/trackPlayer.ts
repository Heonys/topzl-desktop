import Hls from "hls.js";
import { MusicItem, PlayerState } from "./type";
import playerEventEmitter from "./eventEmitter";

class TrackPlayer {
  private audioContext: AudioContext;
  private audio: HTMLAudioElement;
  private hls: Hls;
  private currentMusic!: MusicItem;
  private playerState!: PlayerState;

  constructor() {
    this.audioContext = new AudioContext();
    this.audio = new Audio();
    this.audio.preload = "auto";
    this.audio.controls = false;
    this.audio.volume = 0.1;
    this.hls = new Hls();
    this.hls.attachMedia(this.audio);

    this.hls.on(Hls.Events.ERROR, (e, data) => {
      console.log("hls error", e, data);
    });

    this.registerEvents();
  }

  private hasSource() {
    return !!this.audio.src;
  }

  private setPlayerState(state: PlayerState) {
    this.playerState = state;
    playerEventEmitter.emit("play-state-changed", state);
  }

  private registerEvents() {
    this.audio.onplaying = () => {
      this.setPlayerState(PlayerState.Playing);
      navigator.mediaSession.playbackState = "playing";
    };

    this.audio.onpause = () => {
      this.setPlayerState(PlayerState.Paused);
      navigator.mediaSession.playbackState = "paused";
    };

    this.audio.onerror = (event) => {
      this.setPlayerState(PlayerState.Paused);
      playerEventEmitter.emit("play-back-error", event);
    };

    this.audio.ontimeupdate = () => {
      playerEventEmitter.emit("time-updated", {
        currentTime: this.audio.currentTime,
        duration: this.audio.duration,
      });
    };

    this.audio.onended = () => {
      playerEventEmitter.emit("play-end");
    };

    this.audio.onvolumechange = () => {
      playerEventEmitter.emit("volume-changed", this.audio.volume);
    };

    this.audio.onratechange = () => {
      playerEventEmitter.emit("speed-changed", this.audio.playbackRate);
    };
  }

  setTrackSource(
    trackSource: {
      headers?: Record<string, string>;
      url: string;
      userAgent?: string;
    },
    musicItem: MusicItem,
  ) {
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

    const urlObj = new URL(trackSource.url);
    if (urlObj.username && urlObj.password) {
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

  async setLocalTrackSource(musicItem: MusicItem) {
    const buffer = await window.fs.readFile(musicItem.localPath!);
    this.setTrackSource(
      { url: URL.createObjectURL(new Blob([buffer], { type: "audio/*" })) },
      musicItem,
    );
  }

  pause() {
    if (this.hasSource()) {
      this.audio.pause();
    }
  }
  play() {
    if (this.hasSource()) {
      this.audio.play().catch((err) => {
        console.error(err);
      });
    }
  }
  setVolume(volume: number) {
    this.audio.volume = volume;
  }
  getAudioElement() {
    return this.audio;
  }

  seekTo(seconds: number) {
    if (this.hasSource() && isFinite(seconds)) {
      const duration = this.audio.duration;
      this.audio.currentTime = Math.min(seconds, isNaN(duration) ? Infinity : duration);
    }
  }

  isPlaying() {
    return !this.audio.paused;
  }

  clear() {
    this.setPlayerState(PlayerState.Paused);
    this.audio.src = "";
    this.audio.removeAttribute("src");
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = "none";
  }

  setSpeed(speed: number) {
    this.audio.defaultPlaybackRate = speed;
    this.audio.playbackRate = speed;
  }

  async setSinkId(deviceId: string) {
    return (this.audio as any).setSinkId(deviceId);
  }

  skipToPrev() {
    if (this.audio.currentTime < 3) {
      playerEventEmitter.emit("play-prev");
    } else {
      this.audio.currentTime = 0;
    }
  }

  skipToNext() {
    playerEventEmitter.emit("play-next");
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
