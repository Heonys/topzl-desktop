import { useState, useEffect, useMemo } from "react";

export const useAudioOutpuDevice = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((res) => {
      setDevices(res.filter((item) => item.kind === "audiooutput"));
    });
  }, []);

  const defaultDevice = useMemo(
    () => devices.find((device) => device.deviceId === "default"),
    [devices],
  );

  return { devices, defaultDevice };
};
