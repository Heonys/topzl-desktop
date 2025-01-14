import { parentPort } from "node:worker_threads";

const port = parentPort;
if (!port) throw new Error("IllegalState");

port.on("message", (data) => {
  port.postMessage(`hello ${data}`);
});

// 워커 클래스 만들기 (https://srrymn.tistory.com/41
