import { IconButton } from "@/common";
import { useFavorite } from "@/hooks";
import type { MusicItem } from "@shared/plugin/type";

export function FavoriteButton({ musicItem }: { musicItem: MusicItem }) {
  const { isFavorite, favorite, unfavorite } = useFavorite();

  const toggleFavorite = (item: MusicItem) => {
    if (isFavorite(item.id)) unfavorite(item.id);
    else favorite(item);
  };

  return (
    <IconButton
      iconName={isFavorite(musicItem.id) ? "heart-fill" : "heart"}
      color={isFavorite(musicItem.id) ? "red" : "black"}
      size={17}
      onClick={() => toggleFavorite(musicItem)}
    />
  );
}

export function DownloadButton({ musicItem }: { musicItem: MusicItem }) {
  // 다운로드가 완료되었거나, local 파일인경우
  // const isDownloaded = "";

  return (
    <>
      {musicItem.localPath ? (
        <IconButton
          iconName="check-circle"
          color="dodgerblue"
          title="downloaded"
          size={17}
          opacity
        />
      ) : (
        <IconButton iconName="download" title="download" size={17} />
      )}
    </>
  );
}
