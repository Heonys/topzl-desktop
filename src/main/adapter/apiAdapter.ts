import { ipcMain } from "electron";

export const apiAdapterOn = <Channel extends keyof ChannelToPayload>(
  channel: Channel,
  handler: (payload: ChannelToPayload[Channel]) => void,
) => {
  ipcMain.on(channel, (event, payload) => {
    // event validation !!
    handler(payload);
  });
};
