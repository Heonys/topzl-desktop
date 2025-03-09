import { useEffect, useRef, useState } from "react";
import hotkeys from "hotkeys-js";
import { nanoid } from "nanoid";
import { capitalized, cn, getModifierKeyFlag, removeModiferKey } from "@/utils";
import StaticIcon from "@/icons/StaticIcon";

type Props = {
  enable: boolean;
  value: string[];
  onChange: (keymap: string[]) => void;
  onClear: () => void;
  isGlobal?: boolean;
};

export const ShortcutInput = ({ value, enable, onChange, onClear, isGlobal }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [recordedValue, setRecoredValue] = useState<string[] | null>(null);
  const inputValue = (recordedValue ?? value).join(" + ") || "None";

  const scopeRef = useRef(nanoid());
  const isFocusedRef = useRef(false);
  const isRecordingRef = useRef(false);
  const recordedRef = useRef(new Set<string>());

  useEffect(() => {
    const scope = scopeRef.current;
    hotkeys("*", { scope, keyup: true }, (event) => {
      let key = event.key.toLowerCase();
      if (key === " ") key = "space";

      if (event.type === "keydown") {
        isRecordingRef.current = true;
        if (key === "meta") {
          setRecoredValue(null);
          recordedRef.current.clear();
          isRecordingRef.current = false;
        } else {
          key = capitalized(key);
          if (!recordedRef.current.has(key)) {
            recordedRef.current.add(key);
            setRecoredValue([...recordedRef.current].map((it) => keycodeMap(capitalized(it))));
          }
        }
      } else if (event.type === "keyup" && isRecordingRef.current) {
        isRecordingRef.current = false;
        const keymap = [...recordedRef.current];
        const filteredKeymap = removeModiferKey(keymap);
        const modifierFlag = getModifierKeyFlag(keymap);

        if (filteredKeymap.length === 1 && (isGlobal ? modifierFlag : true)) {
          onChange(keymap.map((it) => keycodeMap(capitalized(it))));
        } else {
          setRecoredValue(null);
        }
        recordedRef.current.clear();
      }
    });
    return () => hotkeys.deleteScope(scope);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("p-1 relative", !enable && "opacity-40")}>
      <input
        type="text"
        className="w-44 rounded-md bg-black/15 p-2 text-center tracking-wider outline-blue-400"
        value={inputValue}
        title={inputValue}
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
            isFocusedRef.current = false;
            onClear();
          }}
        >
          <StaticIcon iconName="x-mark" size={14} />
        </div>
      )}
    </div>
  );
};

const keycodeMap = (key: string) => {
  switch (key) {
    case " ":
      return "Space";
    case "Arrowup":
      return "Up";
    case "Arrowdown":
      return "Down";
    case "Arrowleft":
      return "Left";
    case "Arrowright":
      return "Right";
    case "Control": {
      return "Ctrl";
    }
    case "Escape": {
      return "ESC";
    }
    default:
      return key;
  }
};
