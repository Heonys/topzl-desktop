import { DraggableFrame, RootLayout } from "@/src/components";

const App = () => {
  return (
    <>
      <DraggableFrame />
      <RootLayout>
        <div className="flex justify-center items-center w-full h-full">
          <h1 className="text-blue-400 text-3xl">Hello world!</h1>
          <div className="text-black flex gap-2">
            <button onClick={() => window.api.sendFrameAction("CLOSE")}>close</button>
            <button onClick={() => window.api.sendFrameAction("MINIMIZE")}>minimize</button>
            <button onClick={() => window.api.sendFrameAction("MAXIMIZE")}>maximize</button>
          </div>
        </div>
      </RootLayout>
    </>
  );
};

export default App;
