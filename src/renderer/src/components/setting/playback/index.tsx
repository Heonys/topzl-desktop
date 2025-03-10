import { useTranslation } from "react-i18next";
import { useAppConfig, useAudioOutpuDevice } from "@/hooks";
import { RadioGroupOption, SelectOption } from "@/components/setting/common";
import { setAudioOutputDevice } from "@shared/plugin/trackPlayer";

const Playback = () => {
  const { appConfig, setAppConfig } = useAppConfig();
  const { devices, defaultDevice } = useAudioOutpuDevice();
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* Audio Output Device */}
      <SelectOption
        keyPath="playback.audioOutputDevice"
        label={t("settings.playback.audio_output_device_label")}
        description={t("settings.playback.audio_output_device_description")}
        iconName="headset"
        value={appConfig.playback?.audioOutputDevice ?? defaultDevice}
        options={devices}
        convertToLabel={(value) => value?.label ?? ""}
        width="320px"
        onChange={async (device) => {
          const result = await setAudioOutputDevice(device?.deviceId);
          if (result) {
            setAppConfig({ keyPath: "playback.audioOutputDevice", value: device?.toJSON() });
          }
        }}
      />

      {/* When play error */}
      <RadioGroupOption
        keyPath="playback.playError"
        label={t("settings.playback.play_error_label")}
        description={t("settings.playback.play_error_description")}
        iconName="error"
        value={appConfig.playback?.playError}
        options={[
          { value: "pause", title: t("settings.playback.play_error_pause") },
          { value: "skip-next", title: t("settings.playback.play_error_skip_next") },
        ]}
      />

      {/* Previous Track Behavior  */}
      <RadioGroupOption
        keyPath="playback.previousTrackBehavior"
        label={t("settings.playback.previous_track_behavior_label")}
        description={t("settings.playback.previous_track_behavior_description")}
        iconName="skip-previous"
        value={appConfig.playback?.previousTrackBehavior}
        direction="vertical"
        options={[
          { value: "under-3", title: t("settings.playback.previous_track_under_3") },
          { value: "under-5", title: t("settings.playback.previous_track_under_5") },
          {
            value: "always-previous",
            title: t("settings.playback.previous_track_always_previous"),
          },
        ]}
      />
    </div>
  );
};

export default Playback;
