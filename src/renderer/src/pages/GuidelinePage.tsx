import { useCurrentMusic } from "@/hooks";
import { setIndexedDB } from "@shared/storage/db";

export const GuidelinePage = () => {
  const { playlist } = useCurrentMusic();

  const handleClick = async () => {
    console.log(playlist);
    setIndexedDB("playlist", playlist);
  };

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleClick}>Add</button>
    </div>
  );
};
