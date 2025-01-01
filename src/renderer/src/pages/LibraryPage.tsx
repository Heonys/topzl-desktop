import fallbackImage from "@/assets/images/fallback.webp";
import StaticIcon from "@/icons/StaticIcon";

export const LibraryPage = () => {
  return (
    <div>
      <div className="flex gap-2">
        <img className="size-56 rounded-xl object-cover" src={fallbackImage} alt="fallback-image" />
        <h1 className="text-2xl">Library Page</h1>
        <div>기본 리스트 고정, 새로운 리스트 추가, play-all, 검색, 리스트간 이동 </div>
      </div>

      <div className="mt-4">
        <Album />
      </div>
    </div>
  );
};

function Album() {
  return (
    <div className=" flex size-36 flex-col justify-center gap-1">
      <div className="flex flex-1 items-center justify-center rounded-lg bg-slate-500">
        <StaticIcon
          iconName="apple"
          className="size-1/3 transition-all duration-300 hover:scale-125"
          color="white"
        />
      </div>
      <div className="text-center">좋아요 표시한 음악</div>
    </div>
  );
}
