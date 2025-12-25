import React, { useEffect, useState } from "react";
type ListItem = {
  id:number,
  list:string
}
const InfiniteScroll = () => {
  const [data,setData] = useState<ListItem[]>([]);
  const [page, setPage] = useState(0);
  const [filteredData, setFilteredData] = useState<ListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const PAGE_LIMIT = 100;
  const UPPER_LIMIT = 1000;

  const handlePageScroll = () => {
    if (
        !isLoading &&
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 20
    ) {
          setIsLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const sampleData = Array.from({ length: UPPER_LIMIT }, (_, i) => ({
      id: i + 1,
      list: `Testing virtualized scroll list for ${i + 1}`,
    }));
    console.log("sampleData ==",sampleData)
    setData(sampleData);
    setPage(1);

  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const start = (page - 1) * PAGE_LIMIT;
    const end = start + PAGE_LIMIT;
    if (start >= data.length) return; //  STOP loading
    setFilteredData((prev) => [
      ...prev,
      ...data.slice(start, end),
    ]);
     setIsLoading(false);
  }, [page, data]);

  useEffect(() => {
    window.addEventListener("scroll", handlePageScroll);
    return () => window.removeEventListener("scroll", handlePageScroll);
  }, []);

  return (
    <ul>
      {filteredData.map((item) => (
        <li key={item.id}>{item.list}</li>
      ))}
    </ul>
  );
};

export default InfiniteScroll;
