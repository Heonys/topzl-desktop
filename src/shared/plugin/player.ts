import trackPlayer from "./internal";

export async function setupPlayer() {
  // const deviceId = await navigator.mediaDevices.enumerateDevices();
  trackPlayer.setTrackSource(
    {
      // headers: undefined,
      url: "https://music.audiomack.com/hq/abeerarora/6738bd5e98d69__1731771763.m4a?Expires=1733879807&Signature=PSZRiae~7GFbec9UxxqnWztoLBHDl0drqLqTK8Bq1lBq75gdcGdj3dXfgd9rT0ZPI7B98NDNilgm5NUWuwk39V-O4fsnQAmiDB262SyOw7bvZSUMHLt7uzCE9CbPTLQTEOJDias~XhrlrQlg2KUI1OK9~GmojQzEfVoMepLvqoI_&Key-Pair-Id=APKAIKAIRXBA2H7FXITA",
      // userAgent: undefined,
    },
    {
      album: "",
      artist: "Abeer Arora",
      artwork:
        "https://assets.audiomack.com/abeerarora/e496c9b8469fe3b7452e5d27790ba8bc3db5381878fd367c6d771716e63051af.jpeg",
      duration: 155,
      id: 47611696,
      platform: "Audiomack",
      title: "Chemistry",
      url_slug: "6738bd5e98d69",
    },
  );
}
