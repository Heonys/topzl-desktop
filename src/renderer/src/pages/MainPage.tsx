export const MainPage = () => {
  return (
    <div>
      <div>다시듣기 </div>
      <div>빠른 선곡</div>
      <button
        onClick={() => {
          console.log(window.common.getGlobalContext());
        }}
      >
        test
      </button>
    </div>
  );
};
