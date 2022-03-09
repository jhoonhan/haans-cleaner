import { useEffect, useState } from "react";

const useOrderSearch = (
  fetched,
  acceptId,
  type,
  selectedDate,
  pageNumber,
  setPageNumber,
  driverFetchOrder,
  driverClearOrder,
  coords
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!fetched || !coords) return;
    setLoading(true);
    setError(false);
    console.log(`search fireds`);
    const query = {
      acceptId,
      type,
      coords,
      selectedDate,
      pageNumber,
    };

    const fetchData = async () => {
      const res = await driverFetchOrder(query);
      return res;
    };
    fetchData()
      .then((res) => {
        if (res.status === 200) {
          setHasMore(res.data.data.length > 0);
          setLoading(false);
        }
      })
      .catch((e) => {
        setError(true);
        console.log(e);
      });
  }, [fetched, coords, selectedDate, pageNumber]);

  useEffect(() => {
    if (!fetched) return;
    setPageNumber(1);
  }, [selectedDate]);

  useEffect(() => {
    if (!fetched) return;
    driverClearOrder();
  }, [selectedDate]);

  return { loading, error, hasMore };
};

export default useOrderSearch;
