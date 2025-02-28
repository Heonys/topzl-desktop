import { ButtonsItem } from "@/components/setting/common";

const Backup = () => {
  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      <ButtonsItem
        label="재생목록 백업 및 복원"
        description="현재 재생목록을 백업하거나 복원할 수 있습니다."
        iconName="playlist"
      />
      <ButtonsItem
        label="로컬 데이터 초기화"
        description="어플리케이션에서 관리하는 모든 로컬 데이터를 초기화 합니다. 이 작업은 되돌릴 수 없습니다."
        iconName="database"
      />
      {/* <div>데이터 크기 xxMB / 초기화 버튼</div> */}
    </div>
  );
};

export default Backup;
