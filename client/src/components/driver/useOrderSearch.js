import { useEffect, useState } from "react";

const useOrderSearch = (
  readyForSearch,
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
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!readyForSearch || !coords) return;
    setLoading(true);
    setError(false);

    const query = {
      acceptId,
      type,
      coords,
      selectedDate,
      pageNumber,
    };

    const fetchData = async () => {
      console.log(`fetching data`);
      const res = await driverFetchOrder(query);
      return res;
    };

    fetchData()
      .then((res) => {
        if (res.status === 200) {
          setHasMore(res.data.totalResults >= 5);
          setLoading(false);
        }
      })
      .catch((e) => {
        setError(true);
        console.log(e);
      });
  }, [readyForSearch, coords, selectedDate, pageNumber]);

  useEffect(() => {
    if (!readyForSearch) return;
    setPageNumber(1);
  }, [selectedDate]);

  useEffect(() => {
    if (!readyForSearch) return;
    driverClearOrder();
  }, [selectedDate]);

  return { loading, error, hasMore };
};

export default useOrderSearch;
