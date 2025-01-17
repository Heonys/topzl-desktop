import fs from "fs/promises";

async function readFile(filePath: string) {
  return fs.readFile(filePath);
}

export const fsDelegate = {
  readFile,
} satisfies Window["fs"];
