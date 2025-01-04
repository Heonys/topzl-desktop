import { Condition, Droppable, IconButton } from "@/common";
import { useCurrentMusic } from "@/hooks";
import { assignToDrag, formatTime } from "@/utils";
import { MusicItem } from "@shared/plugin/type";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const TAG = "playlist-table";
const columnHelper = createColumnHelper<MusicItem>();

const columns = [
  columnHelper.display({
    id: "like",
    size: 42,
    minSize: 42,
    maxSize: 42,
    cell: () => (
      <div className="flex items-center justify-start gap-2">
        <IconButton iconName="heart" size={17} />
        <IconButton iconName="download" size={17} />
      </div>
    ),
    enableResizing: false,
    enableSorting: false,
  }),

  columnHelper.accessor((_, index) => index + 1, {
    cell: (info) => info.getValue(),
    header: "#",
    id: "index",
    minSize: 40,
    maxSize: 40,
    size: 40,
    enableResizing: false,
    enableSorting: false,
  }),

  columnHelper.accessor("title", {
    header: "title",
    size: 200,
    maxSize: 300,
    minSize: 100,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("artist", {
    header: "Artist",
    size: 150,
    maxSize: 200,
    minSize: 60,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("album", {
    header: "Album",
    size: 120,
    maxSize: 200,
    minSize: 60,
    cell: (info) => <span title={info.getValue()}>{info.getValue()}</span>,
  }),
  columnHelper.accessor("duration", {
    header: () => <span className="flex justify-center">Duration</span>,
    size: 80,
    cell: (info) => (
      <span className="flex justify-center">
        {info.getValue() ? formatTime(info.getValue()) : "-"}
      </span>
    ),
  }),
  columnHelper.display({
    id: "remove",
    size: 20,
    minSize: 20,
    maxSize: 20,
    cell: () => (
      <div className="flex items-center justify-start">
        <IconButton iconName="x-mark" size={17} />
      </div>
    ),
    enableResizing: false,
    enableSorting: false,
  }),
];

export const LibraryList = () => {
  const { playlist, setPlaylist, setCurrentItem } = useCurrentMusic();

  const table = useReactTable({
    debugAll: false,
    data: playlist,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onDrop = (from: number, to: number) => {
    if (from === to) return;
    const newData = [...playlist.slice(0, from), ...playlist.slice(from + 1)];
    newData.splice(from > to ? to : to - 1, 0, playlist[from]);
    setPlaylist(newData);
  };

  return (
    <div className="max-h-[45vh] overflow-y-auto p-2 font-sans">
      <table className="w-full table-fixed border-collapse select-none">
        <thead>
          <tr className="border-b text-left">
            {table.getHeaderGroups()[0].headers.map((header) => (
              <th key={header.id} style={{ width: header.column.columnDef.size }}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className="relative h-10 text-sm font-medium even:bg-black/5"
              draggable
              onDoubleClick={() => {
                setCurrentItem(row.original);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="truncate text-left" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              {/* <Condition condition={index === 0}>
                <Droppable position="top" rowIndex={index} tag={TAG} onDrop={onDrop} isTable />
              </Condition>
              <Droppable position="bottom" rowIndex={index + 1} tag={TAG} onDrop={onDrop} isTable /> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
