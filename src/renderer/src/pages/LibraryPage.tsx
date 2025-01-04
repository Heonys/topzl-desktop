// import { useState } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import fallbackImage from "@/assets/images/fallback.webp";
import { AlbumCover } from "@/components";
import { useLibrary } from "@/hooks";
import { useModal } from "@/components/Modal/useModal";
import { IconButton } from "@/common";

export const LibraryPage = () => {
  const { playLists } = useLibrary();
  const { showModal } = useModal();

  return (
    <div className="">
      <div className="flex gap-2">
        <img className="size-52 rounded-xl object-cover" src={fallbackImage} alt="fallback-image" />
        <div className="m-2 mx-4 flex w-full flex-col gap-2 font-sans font-normal">
          <div className="flex items-center gap-4 pb-3">
            <h1 className="text-2xl font-bold">현재 재생목록</h1>
            <IconButton iconName="rename" opacity />
          </div>
          <div className="">설명: 현재 재생중인 재생목록 입니다</div>
          <div className="">생성일: 2025-01-02</div>
          <div>음악: 총16곡</div>
        </div>
      </div>

      <div className="relative my-4 w-full">
        <TabGroup>
          <TabList className="flex gap-4 font-sans font-semibold">
            <Tab className="border-b-4 border-blue-300 transition-all">보관함</Tab>
          </TabList>
          <div className="grid max-h-[320px] grid-cols-6 place-items-center gap-1 overflow-y-auto pt-4">
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
