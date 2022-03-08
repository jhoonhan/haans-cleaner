import { useEffect, useState } from "react";
import { driverFetchOrder } from "../../actions";

export default function useOrderSearch(query, pageNumber) {
  useEffect(() => {
    driverFetchOrder();
  }, [query, pageNumber]);
  return null;
}
