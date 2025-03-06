import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Case, Condition, Droppable, IconButton, Switch } from "@/common";
import { Empty } from "@/common/Empty";
import { useContextMenu, useCurrentMusic, useFavorite, useDownload } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
import { assignToDrag, formatTime } from "@/utils";
import { MusicItem } from "@shared/plugin/type";
import { FavoriteButton, DownloadButton } from "@/components/playlist";
import { ContextMenuItem } from "@/atom";
import { useModal } from "../modal/useModal";

const TAG = "playlist-table";
const columnHelper = createColumnHelper<MusicItem>();

type ColumnProps = {
  onRemove?: (id: string) => void;
};

const createColumns = ({ onRemove }: ColumnProps) => {
  return [
    columnHelper.display({
      id: "like",
      size: 55,
      cell: (info) => {
        const origin = info.row.original;
        return (
          <div className="flex items-center justify-start gap-2">
            <FavoriteButton musicItem={origin} />
            <DownloadButton musicItem={origin} />
          </div>
        );
      },
      enableResizing: false,
      enableSorting: false,
    }),

    columnHelper.accessor((_, index) => index + 1, {
      header: "#",
      cell: (info) => <div>{info.getValue()}</div>,
      id: "index",
      size: 40,
      enableResizing: false,
      enableSorting: true,
    }),

    columnHelper.accessor("title", {
      header: "Track",
      size: 250,
      cell: (info) => <div className="truncate pr-1">{info.getValue()}</div>,
      enableResizing: false,
      enableSorting: true,
    }),

    columnHelper.accessor("artist", {
      header: () => <div className="px-1">Artist</div>,
      size: 200,
      cell: (info) => <div className="truncate px-1">{info.renderValue()}</div>,
      enableResizing: false,
      enableSorting: true,
    }),
    columnHelper.accessor("album", {
      header: () => <div className="pl-1">Album</div>,
      size: 200,
      enableResizing: false,
      enableSorting: true,
      cell: (info) => (
        <div className="truncate pl-1" title={info.getValue()}>
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("duration", {
      header: () => <span className="flex justify-center">Time</span>,
      size: 80,
      enableResizing: false,
      enableSorting: false,
      cell: (info) => (
        <div className="flex justify-center">
          {info.getValue() ? formatTime(info.getValue()) : "-"}
        </div>
      ),
    }),
    ...(onRemove
      ? [
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
        ]
      : []),
  ];
};

type Props = {
  playlist: MusicItem[];
  setPlaylist?: (item: MusicItem[]) => void;
  removePlaylist?: (id: string) => void;
  maxheight?: string;
  draggable?: boolean;
};

export const PlayListTable = ({
  playlist,
  setPlaylist,
  removePlaylist,
  maxheight,
  draggable,
}: Props) => {
  const { addNextTrack, playWithAddPlaylist } = useCurrentMusic();
  const [sorting, setSorting] = useState<SortingState>([]);
  const { showContextMenu } = useContextMenu();
  const { favorite } = useFavorite();
  const { download, isDownloaded } = useDownload();
  const { showModal } = useModal();

  const table = useReactTable({
    debugAll: false,
    data: playlist,
    state: { sorting },
    onSortingChange: setSorting,
    columns: createColumns({ onRemove: removePlaylist }),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const onDrop = (from: number, to: number) => {
    if (from === to) return;
    const newData = [...playlist.slice(0, from), ...playlist.slice(from + 1)];
    newData.splice(from > to ? to : to - 1, 0, playlist[from]);
    setPlaylist?.(newData);
  };

  return (
    <div
      tabIndex={-1}
      className="relative overflow-y-auto overflow-x-hidden p-2 font-sans"
      style={{
        height: maxheight ?? "45vh",
      }}
    >
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
              draggable={draggable}
              onDoubleClick={() => {
                playWithAddPlaylist(row.original);
              }}
              onDragStart={(e) => {
                assignToDrag(e, TAG, index);
              }}
              onContextMenu={(e) => {
                showContextMenu({
                  x: e.clientX,
                  y: e.clientY,
                  musicInfo: row.original,
                  menuItems: [
                    {
                      type: "menu",
                      icon: "next-playlist",
                      title: "다음 곡으로 추가",
                      onClick: () => addNextTrack(row.original),
                    },
                    {
                      type: "menu",
                      icon: "add-playlist",
                      title: "재생목록에 저장",
                      onClick: () => {
                        showModal("SelectPlaylist", { selectedItem: row.original });
                      },
                    },
                    ...(removePlaylist
                      ? [
                          {
                            type: "menu",
                            icon: "remove-playlist",
                            title: "현재 재생목록에서 삭제",
                            onClick: () => removePlaylist(row.original.id),
                          } as ContextMenuItem,
                        ]
                      : []),
                    {
                      type: "menu",
                      icon: "heart",
                      title: "좋아요 목록에 추가",
                      onClick: () => favorite(row.original),
                    },
                    ...(!isDownloaded(row.original.id)
                      ? [
                          {
                            type: "menu",
                            icon: "download",
                            title: "다운로드",
                            onClick: () => download(row.original),
                          } as ContextMenuItem,
                        ]
                      : []),
                  ],
                });
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
      <Condition condition={playlist.length === 0}>
        <Empty message="재생목록이 비어있습니다" />
      </Condition>
    </div>
  );
};
