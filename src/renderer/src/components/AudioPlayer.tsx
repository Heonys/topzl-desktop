import trackPlayer from "@/assets/internal";

const AudioPlayer = () => {
  const handlePause = () => {
    trackPlayer.pause();
  };

  const handleSetVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    trackPlayer.setVolume(volume);
  };

  const handlePlay = () => {
    trackPlayer.play();
  };

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <input type="range" min="0" max="1" step="0.1" onChange={handleSetVolume} />
    </div>
  );
};

export default AudioPlayer;
