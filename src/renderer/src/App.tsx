import { DraggableFrame, RootLayout } from "@/src/components";

const App = () => {
  return (
    <>
      <DraggableFrame />
      <RootLayout>
        <div className="flex justify-center items-center w-full h-full">
          <h1 className="text-blue-400 text-3xl">Hello world!</h1>
        </div>
      </RootLayout>
    </>
  );
};

export default App;
