// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import axios from "axios";
import { load } from "cheerio";

async function search(query) {
  const result = (
    await axios.get("https://so.lrcgc.com/", {
      params: {
        q: query,
      },
    })
  ).data;

  const $ = load(result);
  const results = $(".resultWrap").children();
  const data = [];

  if (results.first().prop("tagName") === "DL") {
    const title = results.first().find("dt > a");
    const desc = results.first().find("dd > small");
    const descText = desc
      .text()
      .replace(/[\s|\n]/g, "")
      .split(/[歌手：|专辑:]/)
      .filter((it) => it.trim() !== "");

    data.push({
      title: title.text(),
      id: title.attr("href"),
      artist: descText?.[0],
      album: descText?.[1],
    });
  }

  return {
    isEnd: true,
    data,
  };
}

async function getLyric(searchUrl: string) {
  const res = (await axios.get(searchUrl)).data;

  const $ = load(res);

  const rawLrc = $("p#J_lyric").text().replace(/\n/g, "");

  return {
    rawLrc: rawLrc,
  };
}

export default {
  search,
  getLyric,
};
