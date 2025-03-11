import { useLocation, useParams } from "react-router-dom";
import { AlbumView, ArtistView, PlaylistView } from "@/components/searchView";
import { Case, Switch } from "@/common";
import { SupportMediaItemMap } from "@shared/plugin/type";

type Props = {
  mediaType: keyof SupportMediaItemMap;
};

export const SearchViewPage = ({ mediaType }: Props) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const item = location.state?.item ?? {};

  return (
    <>
      {id && (
        <Switch switch={mediaType}>
          <Case case="album">
            <AlbumView albumItem={item} />
          </Case>
          <Case case="artist">
            <ArtistView artistItem={item} />
          </Case>
          <Case case="playlist">
            <PlaylistView playlistItem={item} />
          </Case>
        </Switch>
      )}
    </>
  );
};
