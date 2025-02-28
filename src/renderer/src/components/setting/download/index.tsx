import { RadioGroupItem, SelectDirectoryItem, SwitchBoxItem } from "@/components/setting/common";
import { useAppConfig } from "@/hooks";

const Download = () => {
  const { appConfig, getGlobalContext } = useAppConfig();
  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* Download Path */}
      <SelectDirectoryItem
        keyPath="download.path"
        label="다운로드 위치 지정"
        description="다운로드한 파일이 저장될 위치를 설정합니다."
        iconName="push-pin"
        value={appConfig.download?.path ?? getGlobalContext().appPath.downloads}
      />
      {/* Max Concurrent Downloads */}
      <RadioGroupItem
        keyPath="download.concurrency"
        label="최대 동시 다운로드 수"
        description="동시에 다운로드할 수 있는 최대 파일 수를 설정합니다."
        iconName="download"
        value={appConfig.download?.concurrency}
        options={[
          { value: 5, title: "5개" },
          { value: 10, title: "10개" },
          { value: 15, title: "15개" },
        ]}
      />
      {/* Download Notification */}
      <SwitchBoxItem
        keyPath="download.notification"
        label="다운로드 알림"
        description="다운로드 완료시 데스크탑 알림을 보냅니다. (데스크탑 알림을 사용중일 경우에만 유효)"
        iconName="notification"
        value={appConfig.download?.notification}
      />
    </div>
  );
};

export default Download;
