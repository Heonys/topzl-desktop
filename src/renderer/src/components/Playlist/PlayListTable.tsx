import { Case, Condition, Droppable, IconButton, Switch } from "@/common";
import { useCurrentMusic } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
import { assignToDrag, formatTime } from "@/utils";
import { MusicItem } from "@shared/plugin/type";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const TAG = "playlist-table";
const columnHelper = createColumnHelper<MusicItem>();

const createColumns = (onRemove: (id: number) => void) => {
  return [
    columnHelper.display({
      id: "like",
      size: 60,
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
      size: 40,
      enableResizing: false,
      enableSorting: true,
    }),

    columnHelper.accessor("title", {
      header: "title",
      size: 300,
      cell: (info) => <div className="truncate pr-2">{info.getValue()}</div>,
      enableResizing: false,
      enableSorting: true,
    }),

    columnHelper.accessor("artist", {
      header: "Artist",
      size: 250,
      cell: (info) => <div className="truncate px-2">{info.renderValue()}</div>,
      enableResizing: false,
      enableSorting: true,
    }),
    columnHelper.accessor("album", {
      header: "Album",
      size: 200,
      enableResizing: false,
      enableSorting: true,
      cell: (info) => (
        <div className="truncate pl-2" title={info.getValue()}>
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("duration", {
      header: () => <span className="flex justify-center">Duration</span>,
      size: 100,
      enableResizing: false,
      enableSorting: false,
      cell: (info) => (
        <div className="flex justify-center">
          {info.getValue() ? formatTime(info.getValue()) : "-"}
        </div>
      ),
    }),
    columnHelper.display({
      id: "remove",
      size: 20,
      cell: (info) => (
        <div className="flex items-center justify-start">
          <IconButton
            iconName="x-mark"
            size={17}
            onClick={() => {
              onRemove(info.row.original.id);
            }}
          />
        </div>
      ),
      enableResizing: false,
      enableSorting: false,
    }),
  ];
};

export const PlayListTable = () => {
  const { playlist, setPlaylist, setCurrentItem, removePlaylist } = useCurrentMusic();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    debugAll: false,
    data: playlist,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    columns: createColumns(removePlaylist),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const onDrop = (from: number, to: number) => {
    if (from === to) return;
    const newData = [...playlist.slice(0, from), ...playlist.slice(from + 1)];
    newData.splice(from > to ? to : to - 1, 0, playlist[from]);
    setPlaylist(newData);
  };

  return (
    <div className="max-h-[45vh] overflow-y-auto overflow-x-hidden p-2 font-sans">
      <table className="w-full table-fixed border-collapse select-none">
        <thead>
          <tr className="border-b text-left">
            {table.getHeaderGroups()[0].headers.map((header) => (
              <th
                key={header.id}
                className="relative"
                style={{ width: header.column.columnDef.size }}
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
                <Condition condition={header.column.columnDef.enableSorting}>
                  <div className={twMerge("absolute right-2 top-1/2 -translate-y-1/2")}>
                    <Switch switch={header.column.getIsSorted()}>
                      <Case case={"asc"}>
                        <StaticIcon iconName="sort-asc" size={10} />
                      </Case>
                      <Case case={"desc"}>
                        <StaticIcon iconName="sort-desc" size={10} />
                      </Case>
                      <Case case={false}>
                        <StaticIcon iconName="sort" size={10} />
                      </Case>
                    </Switch>
                  </div>
                </Condition>
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
              onDragStart={(e) => {
                assignToDrag(e, TAG, index);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className="text-left"
                  key={cell.id}
                  style={{ width: cell.column.columnDef.size }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <Condition condition={index === 0}>
                <Droppable position="top" rowIndex={index} tag={TAG} onDrop={onDrop} isTable />
              </Condition>
              <Droppable position="bottom" rowIndex={index + 1} tag={TAG} onDrop={onDrop} isTable />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
