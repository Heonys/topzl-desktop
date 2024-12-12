import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}
