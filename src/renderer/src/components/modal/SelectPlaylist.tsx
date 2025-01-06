import { useCurrentMusic, useLibrary } from "@/hooks";
import { Backdrop, Contents, Header } from "./Layout";
import { useModal } from "./useModal";
import { PlaylistCover } from "../Playlist";
import { MusicItem } from "@shared/plugin/type";

type Props = {
  selectedItem: MusicItem;
};

const SelectPlaylist = ({ selectedItem }: Props) => {
  const { hideModal } = useModal();
  const { playlist, addPlaylist } = useCurrentMusic();
  const { playLists, addPlaylistByTitle } = useLibrary();

  const addPlaylistBy = (title: string) => {
    return () => {
      addPlaylistByTitle(title, selectedItem);
      hideModal();
    };
  };

  return (
    <Backdrop>
      <div
        className="flex h-[50vh] w-[35vw] flex-col rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <div className="font-sans font-semibold">재생목록에 저장</div>
        </Header>
        <Contents>
          <div className="mx-3 flex h-full flex-1 flex-col gap-2">
            <PlaylistCover
              title="현재 재생목록"
              playlist={playlist}
              date="2025.1.5"
              onClick={() => {
                addPlaylist(selectedItem);
                hideModal();
              }}
            />
            {playLists.map(({ title, date, data }) => {
              return (
                <PlaylistCover
                  key={title}
                  title={title}
                  playlist={data}
                  date={date!}
                  onClick={addPlaylistBy(title)}
                />
              );
            })}
          </div>
        </Contents>
      </div>
    </Backdrop>
  );
};

export default SelectPlaylist;