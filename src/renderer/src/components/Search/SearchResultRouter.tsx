import { Case, Switch } from "@/common";
import { ArtistItem, AlbumItem, MusicSheetItem } from "@shared/plugin/type";
import { MusicResult, AlbumResult, ArtistResult, PlaylistResult } from "@/components/Search";

type Props = {
  type: SupportMediaType;
  searchResult: SearchResult;
};

export const SearchResultRouter = ({ searchResult, type }: Props) => {
  return (
    <Switch switch={type}>
      <Case case="music">
        <MusicResult musicItems={searchResult.data} mediaType={type} />
      </Case>
      <Case case="album">
        <AlbumResult searchResult={searchResult.data as unknown as AlbumItem[]} mediaType={type} />
      </Case>
      <Case case="artist">
        <ArtistResult
          searchResult={searchResult.data as unknown as ArtistItem[]}
          mediaType={type}
        />
      </Case>
      <Case case="playlist">
        <PlaylistResult
          searchResult={searchResult.data as unknown as MusicSheetItem[]}
          mediaType={type}
        />
      </Case>
    </Switch>
  );
};
