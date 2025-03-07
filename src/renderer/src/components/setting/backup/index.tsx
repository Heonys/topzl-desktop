import { toast } from "react-toastify";
import { ButtonsOption } from "@/components/setting/common";
import { db, restoreDB, clearDB } from "@/core/indexedDB";
import { useAppConfig } from "@/hooks";

const Backup = () => {
  const { appConfig } = useAppConfig();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      <ButtonsOption
        label="재생목록 백업 및 복원"
        description={`현재 재생목록을 백업하거나 복원할 수 있습니다. \n백업 시 다운로드 경로에 백업 파일이 저장되며 복원 시 기존 재생목록에 덮어씌워 집니다.`}
        iconName="playlist"
        buttons={[
          {
            children: "재생목록 백업",
            onClick: async () => {
              const preference = await db.preference.toArray();
              const result = await window.fs.writeJson(preference);
              if (result) {
                toast.success("백업 완료");
              }
            },
          },
          {
            children: "재생목록 복원",
            onClick: async () => {
              const result = await window.common.showOpenDialog({
                title: "백업 파일 추가",
                defaultPath: appConfig.download?.path,
                filters: [{ name: "JSON Files", extensions: ["json"] }],
                properties: ["openFile"],
              });
              if (!result.canceled) {
                const selected = result.filePaths[0];
                const data = await window.fs.readJson(selected);
                await restoreDB(data);
                toast.success("복원 완료");
              }
            },
          },
        ]}
      />
      <ButtonsOption
        label="로컬 데이터 초기화"
        description="어플리케이션에서 관리하는 모든 로컬 데이터를 초기화 합니다. 이 작업은 되돌릴 수 없습니다."
        iconName="database"
        buttons={[
          {
            children: "초기화",
            onClick: async () => {
              await clearDB();
              toast.success("초기화 완료");
            },
            className: "bg-red-200",
          },
        ]}
      />
    </div>
  );
};

export default Backup;
