import { useLocation, useParams } from "react-router-dom";
import { AlbumView, PlaylistView } from "@/components/SearchView";
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
            <AlbumView albumId={id} albumItem={item} />
          </Case>
          {/* <Case case="artist">
            <ArtistView artistId={id} artistItem={selectedAlbum as any} />
          </Case> */}
          <Case case="playlist">
            <PlaylistView playlistId={id} playlistItem={item} />
          </Case>
        </Switch>
      )}
    </>
  );
};
