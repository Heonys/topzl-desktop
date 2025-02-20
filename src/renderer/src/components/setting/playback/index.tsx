import { useAppConfig, useAudioOutpuDevice } from "@/hooks";
import { RadioGroupItem, SelectBoxItem } from "@/components/setting/common";

const Playback = () => {
  const { appConfig } = useAppConfig();
  const { devices, defaultDevice } = useAudioOutpuDevice();

  return (
    <div className="flex h-96 w-full flex-col gap-4 py-5 pt-4">
      {/* Audio Output Device */}
      <SelectBoxItem
        keyPath="playback.audioOutputDevice"
        label="오디오 출력 장치"
        description="기본 오디오 출력 장치를 선택합니다."
        iconName="headset"
        value={appConfig.playback?.audioOutputDevice ?? defaultDevice}
        options={devices}
        convertToLabel={(value) => value?.label ?? ""}
        width="320px"
      />

      {/* When play error */}
      <RadioGroupItem
        keyPath="playback.playError"
        label="재생 오류 발생시"
        description="재생 URL을 찾을 수 없을 때의 동작을 선택합니다."
        iconName="error"
        value={appConfig.playback?.playError}
        options={[
          { value: "pause", title: "일시정지" },
          { value: "skip-next", title: "다음 곡 재생" },
        ]}
      />
    </div>
  );
};

export default Playback;
