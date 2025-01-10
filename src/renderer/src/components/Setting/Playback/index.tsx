const Playback = () => {
  return (
    <div className="h-96 w-full">
      <div className="my-2 flex flex-col gap-2">
        <div className="text-sm font-bold text-black">
          재생 오류 발생시 (일시정지, 다음곡 자동재생)
        </div>
        <div className="text-sm font-bold text-black">
          재생목록에서 더블클릭시 (선택한 곡을 재생목록에 추가, 교체)
        </div>

        <div className="text-sm font-bold text-black">오디오 출력장치</div>
      </div>
    </div>
  );
};

export default Playback;
