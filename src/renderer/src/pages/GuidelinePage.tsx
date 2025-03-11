import { useModal } from "@/components/modal/useModal";

export const GuidelinePage = () => {
  const { showModal } = useModal();

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => {
          showModal("PrivacyPolicy");
        }}
      >
        이용약관
      </button>
    </div>
  );
};
