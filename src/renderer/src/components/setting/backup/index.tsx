import { ButtonsOption } from "@/components/setting/common";

const Backup = () => {
  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      <ButtonsOption
        label="재생목록 백업 및 복원"
        description={`현재 재생목록을 백업하거나 복원할 수 있습니다. \n백업 시 다운로드 경로에 백업 파일이 저장되며 복원 시 기존 재생목록과 합쳐집니다.`}
        iconName="playlist"
        buttons={[
          { children: "재생목록 백업", onClick: () => console.log("백업 실행") },
          { children: "재생목록 복원", onClick: () => console.log("복원 실행") },
        ]}
      />
      <ButtonsOption
        label="로컬 데이터 초기화"
        description="어플리케이션에서 관리하는 모든 로컬 데이터를 초기화 합니다. 이 작업은 되돌릴 수 없습니다."
        iconName="database"
        buttons={[
          { children: "초기화", onClick: () => console.log("백업 실행"), className: "bg-red-200" },
        ]}
      />
    </div>
  );
};

export default Backup;
