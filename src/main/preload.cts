const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  get: () => console.log("test get"),
});
