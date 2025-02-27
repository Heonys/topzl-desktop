import { useAppConfig, useAudioOutpuDevice } from "@/hooks";
import { RadioGroupItem, SelectBoxItem } from "@/components/setting/common";

const Playback = () => {
  const { appConfig } = useAppConfig();
  const { devices, defaultDevice } = useAudioOutpuDevice();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
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

      {/* Previous Track Behavior  */}
      <RadioGroupItem
        keyPath="playback.previousTrackBehavior"
        label="이전 곡 재생방식"
        description={`이전 곡 버튼을 눌렀을 때, 현재 곡의 진행 상태에 따라 어떻게 동작할지 설정합니다. \n(설정된 시간이 지나면, 곡이 처음부터 다시 재생됩니다)`}
        iconName="skip-previous"
        value={appConfig.playback?.previousTrackBehavior}
        direction="vertical"
        options={[
          { value: "under-3", title: "3초 초과" },
          { value: "under-5", title: "5초 초과" },
          { value: "always-previous", title: "항상 이전 곡 재생" },
        ]}
      />
    </div>
  );
};

export default Playback;
