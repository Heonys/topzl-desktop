import Backdrop, { Contents } from "./Layout";

const PrivacyPolicy = () => {
  return (
    <Backdrop>
      <div
        className="flex h-[60vh] w-[60vw] flex-col rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Contents>
          <div className="size-full">컨텐츠</div>
        </Contents>
      </div>
    </Backdrop>
  );
};

export default PrivacyPolicy;
