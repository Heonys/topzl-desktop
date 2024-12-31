import { useState } from "react";
import { Condition } from "@/common";

type Props = {
  position: "top" | "bottom";
  rowIndex: number;
  tag: string;
  onDrop: (from: number, to: number) => void;
};

export const Droppable = ({ position, tag, rowIndex, onDrop }: Props) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div
      className="absolute left-0 flex h-3 w-full items-center"
      style={{ [position]: "-6px" }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const _tag = e.dataTransfer.getData("tag");
        const fromIndex = parseInt(e.dataTransfer.getData("rowIndex"));
        if (_tag !== tag) return;
        if (fromIndex > -1) {
          onDrop(fromIndex, rowIndex);
        }
      }}
    >
      <Condition condition={isDragOver}>
        <div className="pointer-events-none absolute h-0.5 w-full bg-red-500" />
      </Condition>
    </div>
  );
};
