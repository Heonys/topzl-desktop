import { Backdrop, Header } from "./Layout";

const TestModal = () => {
  return (
    <Backdrop>
      <div
        className="flex h-[50vh] w-[50vw] flex-col rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Header></Header>
        {/*  실질적인 컨텐츠 */}
      </div>
    </Backdrop>
  );
};

export default TestModal;
