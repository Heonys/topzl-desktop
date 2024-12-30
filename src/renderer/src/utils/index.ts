import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { SyntheticEvent } from "react";
import fallbackImage from "@/assets/images/fallback.webp";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function setFallbackImage(event: SyntheticEvent<HTMLImageElement>) {
  (event.target as HTMLImageElement).src = fallbackImage;
}

export function getDefaultImage(artwork: string) {
  return artwork || fallbackImage;
}

export function assignToDrag(e: React.DragEvent, tag: string, rowIndex: number) {
  e.dataTransfer?.setData("tag", tag);
  e.dataTransfer?.setData("rowIndex", `${rowIndex}`);
}
