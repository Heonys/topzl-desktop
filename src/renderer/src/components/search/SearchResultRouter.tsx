import { Case, Switch } from "@/common";
import { ArtistItem, AlbumItem, MusicSheetItem } from "@shared/plugin/type";
import { MusicResult, AlbumResult, ArtistResult, PlaylistResult } from "@/components/search";

type Props = {
  type: SupportMediaType;
  searchResult: SearchResult;
};

export const SearchResultRouter = ({ searchResult, type }: Props) => {
  const { data, isEnd } = searchResult;
  return (
    <Switch switch={type}>
      <Case case="music">
        <MusicResult musicItems={data} isEnd={isEnd} mediaType={type} />
      </Case>
      <Case case="album">
        <AlbumResult searchResult={data as unknown as AlbumItem[]} isEnd={isEnd} mediaType={type} />
      </Case>
      <Case case="artist">
        <ArtistResult
          searchResult={data as unknown as ArtistItem[]}
          isEnd={isEnd}
          mediaType={type}
        />
      </Case>
      <Case case="playlist">
        <PlaylistResult
          searchResult={data as unknown as MusicSheetItem[]}
          isEnd={isEnd}
          mediaType={type}
        />
      </Case>
    </Switch>
  );
};
