// import { useState } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import fallbackImage from "@/assets/images/fallback.webp";
import { AlbumCover } from "@/components";
import { useLibrary } from "@/hooks";
import { useModal } from "@/components/Modal/useModal";

export const LibraryPage = () => {
  const { playLists } = useLibrary();
  const { showModal } = useModal();

  return (
    <div className="">
      <div className="flex gap-2">
        <img className="size-52 rounded-xl object-cover" src={fallbackImage} alt="fallback-image" />
        <h1 className="text-2xl">Library Page</h1>
        <div className="flex flex-col">
          <div>검색, 리스트간 이동 </div>
          <div>재생목록 선택시 상단에 이름, 설명, 생성날짜, 곡수, paly-all</div>
          <div>컨텍스트 메뉴추가 (삭제, 현재 목록에추가, 이름변경)</div>
        </div>
      </div>

      <div className="relative my-4 w-full">
        <TabGroup>
          <TabList className="flex gap-4 font-sans font-semibold">
            <Tab className="border-b-4 border-blue-300 transition-all">보관함</Tab>
          </TabList>
          <div className="grid max-h-[320px] grid-cols-6 place-items-center gap-1 overflow-y-auto p-2 pt-4">
            <AlbumCover
              title="새 재생목록 추가"
              iconName="plus"
              onClick={() => showModal("CreatePlayList")}
            />
            <AlbumCover title="좋아요 표시한 음악" iconName="apple" />
            <AlbumCover title="현재 재생목록" iconName="playlist" />
            {playLists.map(({ title }) => {
              return <AlbumCover key={title} title={title} iconName="playlist" />;
            })}
          </div>
        </TabGroup>
      </div>
    </div>
  );
};
