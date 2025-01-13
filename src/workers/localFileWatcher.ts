// nodeIntegration 필요함  -> 그래야 파일시스템 접근 가능
// 필요한 패키지 Comlink, chokidar

onmessage = ({ data }) => {
  console.log(data);
  postMessage("world");
};
