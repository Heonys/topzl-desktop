import { useEffect, useRef, useState } from "react";
import hotkeys from "hotkeys-js";
import { nanoid } from "nanoid";
import { capitalized, cn, getModifierKeyFlag, removeModiferKey } from "@/utils";
import StaticIcon from "@/icons/StaticIcon";

type Props = {
  enable: boolean;
  value: string[];
  onChange?: (keymap: string[]) => void;
};

const keycodeMap = {};

export const ShortcutInput = ({ value, enable }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [recordedValue, setRecoredValue] = useState<string[] | null>(null);
  const inputValue = (recordedValue ?? value).join(" + ") || "None";

  const scopeRef = useRef(nanoid());
  const isFocusedRef = useRef(false);
  const recordedRef = useRef(new Set<string>());

  useEffect(() => {
    hotkeys("*", { scope: scopeRef.current, keyup: true }, (event) => {
      let key = event.key.toLowerCase();
      if (key === " ") key = "space";

      if (event.type === "keydown") {
        if (key === "meta") {
          setRecoredValue(null);
          recordedRef.current.clear();
        } else {
          key = capitalized(key);
          if (!recordedRef.current.has(key)) {
            recordedRef.current.add(key);
            setRecoredValue([...recordedRef.current].map((it) => capitalized(it)));
          }
        }
      } else if (event.type === "keyup" && key !== "meta") {
        const keymap = [...recordedRef.current];
        const filteredKeymap = removeModiferKey(keymap);
        const modifierFlag = getModifierKeyFlag(keymap);
      }
    });
  }, []);

  return (
    <div className={cn("p-1 relative", !enable && "opacity-40")}>
      <input
        type="text"
        className="w-44 rounded-md bg-black/15 p-2 text-center tracking-wider outline-blue-400"
        value={inputValue}
        readOnly
        disabled={!enable}
        onKeyDown={(e) => e.preventDefault()}
        onFocus={() => {
          setIsFocused(true);
          hotkeys.setScope(scopeRef.current);
        }}
        onBlur={() => {
          setTimeout(() => {
            if (!isFocusedRef.current) setIsFocused(false);
          });
          hotkeys.setScope("all");
        }}
      />
      {isFocused && (
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          tabIndex={-1}
          onFocus={() => {
            isFocusedRef.current = true;
          }}
          onClick={() => {
            setRecoredValue(null);
            setIsFocused(false);
            recordedRef.current.clear();
          }}
        >
          <StaticIcon iconName="x-mark" size={14} />
        </div>
      )}
    </div>
  );
};
