const Lyric = () => {
  return (
    <div className="h-96 w-full">
      <div className="my-2 flex flex-col gap-2">
        <div className="text-sm font-bold text-black">가사 활성화/비활성화</div>
        <div className="text-sm font-bold text-black">
          스크랩 사용 여부(스크랩 사용시 좀더 적합한 가사가 제공될 가능성이 높아지지만 더 많은
          시간이 걸립니다)
        </div>
      </div>
    </div>
  );
};

export default Lyric;
