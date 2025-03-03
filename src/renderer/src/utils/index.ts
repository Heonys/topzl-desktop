import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { SyntheticEvent } from "react";
import { FallbackImage } from "@/assets/images";
import { keyModifierFlags } from "@shared/constant";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function setFallbackImage(event: SyntheticEvent<HTMLImageElement>) {
  (event.target as HTMLImageElement).src = FallbackImage;
}

export function getDefaultImage(artwork?: string) {
  return artwork || FallbackImage;
}

export function assignToDrag(e: React.DragEvent, tag: string, rowIndex: number) {
  e.dataTransfer?.setData("tag", tag);
  e.dataTransfer?.setData("rowIndex", `${rowIndex}`);
}

export const capitalized = (word: string) => {
  return word.replace(/\w/, (it) => it.toUpperCase());
};

export const getModifierKeyFlag = (keymap: string[]) => {
  let flag = 0;
  keymap.forEach((key) => {
    if (keyModifierFlags[key]) {
      flag |= keyModifierFlags[key];
    }
  });
  return flag;
};

export const removeModiferKey = (keymap: string[]) => {
  const modifierKeys = Object.keys(keyModifierFlags);
  return keymap.filter((key) => !modifierKeys.includes(key));
};
