import { getDefaultStore } from "jotai";
import { MusicItem, PlayerState } from "./type";
import { playerEventEmitter } from "./eventEmitter";
import { appConfigAtom } from "src/renderer/src/atom";

const store = getDefaultStore();

class TrackPlayer {
  private audioContext: AudioContext;
  private audio: HTMLAudioElement;
  private currentMusic!: MusicItem;
  private playerState!: PlayerState;

  constructor() {
    this.audioContext = new AudioContext();
    this.audio = new Audio();
    this.audio.preload = "auto";
    this.audio.controls = false;
    this.audio.volume = 0.1;
    this.registerEvents();
  }

  private hasSource() {
    return !!this.audio.src;
  }

  private setPlayerState(state: PlayerState) {
    this.playerState = state;
    playerEventEmitter.emit("play-state-changed", state);
  }

  getPlayerState() {
    return this.playerState;
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

  seekForward() {
    if (this.hasSource()) {
      const newTime = this.audio.currentTime + 5;
      this.audio.currentTime = Math.min(newTime, this.audio.duration || Infinity);
    }
  }

  seekBackward() {
    if (this.hasSource()) {
      const newTime = this.audio.currentTime - 5;
      this.audio.currentTime = Math.max(newTime, 0);
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
    return this.audio.setSinkId(deviceId);
  }

  skipToPrev() {
    const appConfig = store.get(appConfigAtom);
    const behavior = appConfig.playback?.previousTrackBehavior ?? "under-3";

    if (behavior === "always-previous") {
      playerEventEmitter.emit("play-prev");
    } else {
      let threshold = 0;
      if (behavior === "under-3") threshold = 3;
      if (behavior === "under-5") threshold = 5;
      if (this.audio.currentTime < threshold) {
        playerEventEmitter.emit("play-prev");
      } else {
        this.audio.currentTime = 0;
      }
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

export async function setAudioOutputDevice(deviceId?: string) {
  try {
    await trackPlayer.setSinkId(deviceId ?? "");
    return true;
  } catch {
    return false;
  }
}
