import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { defaultAppConfig, shortcutKeyMap, type AppConfigKeymap } from "@shared/config/type";
import { useMemo } from "react";
import { ShortcutInput } from "./ShortcutInput";

type FormattedKeymap = {
  name: string;
  local: string[];
  global: string[];
  onChange?: (keymap: string[]) => void;
};

const columnHelper = createColumnHelper<FormattedKeymap>();

type Props = {
  enableLocal?: boolean;
  enableGlobal?: boolean;
  keymaps?: AppConfigKeymap;
};

const ShortcutTable = ({
  enableLocal = defaultAppConfig["shortcut.enableLocal"]!,
  enableGlobal = defaultAppConfig["shortcut.enableGlobal"]!,
  keymaps = {} as AppConfigKeymap,
}: Props) => {
  // const { appConfig } = useAppConfig();
  // const isRecordingRef = useRef(false);
  // const scropeRef = useRef(nanoid());
  // const recordedKeysRef = useRef(new Set<string>());

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "keymap",
        size: 150,
        cell: (info) => (
          <div className="p-2 font-dh text-sm font-medium text-black/80">
            {shortcutKeyMap[info.row.original.name]}
          </div>
        ),
      }),
      columnHelper.accessor("local", {
        header: () => <div className="p-2 text-xs text-black/70">In-App</div>,
        cell: (info) => <ShortcutInput enable={enableLocal} value={info.getValue()} />,
        enableSorting: false,
      }),
      columnHelper.accessor("global", {
        header: () => <div className="p-2 text-xs text-black/70">Global</div>,
        cell: (info) => <ShortcutInput enable={enableGlobal} value={info.getValue()} />,
        enableSorting: false,
      }),
    ],
    [enableLocal, enableGlobal],
  );

  const data = useMemo(
    () =>
      Object.entries(keymaps).map(([key, value]) => ({
        name: key,
        local: value.local || [],
        global: value.global || [],
      })),
    [keymaps],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-1 px-4">
      <table className="w-3/4">
        <thead>
          <tr className="text-center">
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="text-center font-barlow text-xs font-semibold">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShortcutTable;
