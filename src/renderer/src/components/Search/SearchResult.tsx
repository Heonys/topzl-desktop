import React from "react";
import { Case, Switch } from "@/common";
import { MusicResult, AlbumResult, ArtistResult } from "@/components/Search";

type Props = {
  type: string;
  data: SearchResult;
};

export const MemoizedSearchResult = ({ type, data }: Props) => {
  return (
    <Switch switch={type}>
      <Case case="music">
        <MusicResult searchResult={data} />
      </Case>
      <Case case="album">
        <AlbumResult />
        {/* <MusicResult searchResult={data} /> */}
      </Case>
      <Case case="artist">
        <ArtistResult />
        {/* <MusicResult searchResult={data} /> */}
      </Case>
      {/* <Case case="playlist">
        <PlaylistResult />
      </Case> */}
    </Switch>
  );
};

export const SearchResult = React.memo(MemoizedSearchResult, (prev, next) => {
  return prev.type === next.type;
});
