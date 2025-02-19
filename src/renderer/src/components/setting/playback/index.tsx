const Playback = () => {
  return (
    <div className="h-96 w-full">
      <div className="my-2 flex flex-col gap-2">
        <div className="text-sm font-bold text-black">오디오 출력 장치</div>
        <div className="text-sm font-bold text-black">
          재생 오류 발생시 (일시정지, 다음곡 자동재생)
        </div>
      </div>
    </div>
  );
};

export default Playback;

// Audio Output Device
{
  /* <div className="my-1 flex items-center justify-between">
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2">
      <StaticIcon iconName="headset" size={17} />
      <div className="text-sm font-bold text-black">오디오 출력 장치</div>
    </div>
    <div className="text-sm text-black/50">기본 오디오 출력 장치를 선택합니다.</div>
  </div>
  <div className="w-80 rounded-lg text-black">
    <Listbox value={selectedLang} onChange={setSelectedLang}>
      <ListboxButton
        className={twMerge(
          "relative block w-full rounded-lg py-1.5 pl-3 pr-8 text-left text-sm/6 border-black/20 border",
        )}
      >
        <div className="font-sans text-sm font-semibold">{`Default - 헤드폰(WH-1000XM5)`}</div>
        <StaticIcon
          iconName="chevron-down"
          className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-black"
        />
      </ListboxButton>
    </Listbox>
  </div>
</div>; */
}
