import db from "@/db";

export const GuidelinePage = () => {
  const handleClick = async () => {
    const id = await db.users.add({ name: "Alice" });
    console.log(`새 유저 추가됨, ID: ${id}`);
  };

  const handleRead = async () => {
    const users = await db.users.toArray();
    console.log("전체 유저 목록:", users);
  };

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleClick}>Add</button>
      <button onClick={handleRead}>Read</button>
      <button
        onClick={() => {
          db.delete();
        }}
      >
        clear
      </button>
    </div>
  );
};
