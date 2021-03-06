import React, { useEffect, useState } from "react";
import cvtObj2Arr from "../helpers/cvtObj2Arr";

const useShrinkMapOnScroll = (
  fetched,
  driver,
  page,
  headerRef,
  mapClass,
  setMapClass,
  selectedDate
) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (!fetched) return;
    if (
      page === "search" &&
      cvtObj2Arr(driver.orders).filter((order) => order.status !== "completed")
        .length < 3
    ) {
      setScroll(false);
    } else {
      setScroll(true);
    }
    if (page === "accepted" && cvtObj2Arr(driver.acceptedOrders).length < 3) {
      setScroll(false);
    }
  }, [fetched, driver.orders, driver.acceptedOrders]);

  useEffect(() => {
    if (!fetched) return;

    if (scroll) {
      window.addEventListener("scroll", handleScroll);
    }
    if (!scroll) {
      window.removeEventListener("scroll", handleScroll);
      setMapClass("mapInitRatio");
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  const handleScroll = () => {
    if (!headerRef.current) return;
    if (page === "search" && cvtObj2Arr(driver.orders).length < 3) return;
    if (page === "accepted" && cvtObj2Arr(driver.acceptedOrders).length < 3)
      return;
    const rect = headerRef.current.getBoundingClientRect();
    if (rect.y !== 0 && mapClass === "mapInitRatio") {
      setMapClass("mapStickyRatio");
    } else if (rect.y === 0) {
      setMapClass("mapInitRatio");
    }
  };

  return { scroll, handleScroll };
};

export default useShrinkMapOnScroll;

/////
