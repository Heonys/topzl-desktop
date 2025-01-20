import React from "react";
import { motion } from "motion/react";
import { IconButton, Switch, Case } from "@/common";
import { useFavorite } from "@/hooks";
import { useDownload } from "@/hooks/useDownload";
import type { MusicItem } from "@shared/plugin/type";
import { DownloadState } from "@shared/constant";

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

function MemoizedDownloadButton({ musicItem }: { musicItem: MusicItem }) {
  const { download, status } = useDownload(musicItem);
  // const { status } = useDownloadProgress(musicItem);

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
        <Switch switch={status?.state}>
          <Case case={DownloadState.LOADING}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            >
              <IconButton iconName="loading" title="loading" size={17} />
            </motion.div>
          </Case>
          <Case case={DownloadState.DONE}>
            <IconButton
              iconName="check-circle"
              color="dodgerblue"
              title="downloaded"
              size={17}
              opacity
            />
          </Case>
          <Case case={DownloadState.NONE}>
            <IconButton
              iconName="download"
              title="download"
              size={17}
              onClick={() => {
                download(musicItem);
              }}
            />
          </Case>
          <Case case={DownloadState.ERROR}>
            <IconButton iconName="error" title="error" size={17} color="red" />
          </Case>
        </Switch>
      )}
    </>
  );
}

export const DownloadButton = React.memo(MemoizedDownloadButton, (prev, next) => {
  return prev.musicItem.id === next.musicItem.id;
});
