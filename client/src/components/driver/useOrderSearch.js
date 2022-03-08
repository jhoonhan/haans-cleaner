import { useEffect, useState } from "react";

const useOrderSearch = (acceptId, type, date, pageNumber, driverFetchOrder) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchData = async () => {
      const res = await driverFetchOrder(acceptId, type, date);
      return res;
    };
    fetchData().then((res) => {
      setOrders(res.data.data);
    });
  }, [acceptId, date, pageNumber]);

  return { loading, error, orders, hasMore };
};

export default useOrderSearch;
