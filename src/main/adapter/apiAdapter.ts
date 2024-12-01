import { ipcMain } from "electron";
import { validationEventFrame } from "../utils";

export const apiAdapterOn = <Channel extends keyof ChannelToPayload>(
  channel: Channel,
  handler: (payload: ChannelToPayload[Channel]) => void,
) => {
  ipcMain.on(channel, (event, payload) => {
    if (!event.senderFrame) return;
    validationEventFrame(event.senderFrame);
    handler(payload);
  });
};
