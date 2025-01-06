export const ChartPage = () => {
  const handleClick = async () => {
    const data = await window.plugin.getTopLists();
    console.log(data);
  };
  const handleClickDetail = async () => {
    const data = await window.plugin.getTopListDetail({
      title: "Pop",
      url_slug: "pop",
      type: "trending",
      id: "pop",
    });
    console.log(data);
  };

  const handleClickTag = async () => {
    const data = await window.plugin.getRecommendedTag();
    console.log(data);
  };

  return (
    <div className=" flex flex-col gap-2">
      <button onClick={handleClick}>toplist</button>
      <button onClick={handleClickDetail}>toplist detail</button>
      <button onClick={handleClickTag}>recommeded tag</button>
    </div>
  );
};
