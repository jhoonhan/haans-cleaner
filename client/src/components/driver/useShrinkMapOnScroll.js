import React, { useEffect, useState } from "react";
import cvtObj2Arr from "../helpers/cvtObj2Arr";

const useShrinkMapOnScroll = (
  fetched,
  driver,
  page,
  scrollEvent,
  setScrollEvent,
  headerRef,
  mapClass,
  setMapClass,
  test
) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    console.log(`UE 1`);
    if (!fetched) return;
    if (
      page === "search" &&
      cvtObj2Arr(driver.orders).filter((order) => order.status !== "completed")
        .length < 3
    ) {
      console.log(`set event FALSE`);
      setScrollEvent(false);
    } else {
      console.log(`set event TRUE`);
      setScrollEvent(true);
    }
    if (page === "accepted" && cvtObj2Arr(driver.acceptedOrders).length < 3) {
      setScrollEvent(false);
    }
  }, [fetched, driver.orders, driver.acceptedOrders, test]);

  useEffect(() => {
    console.log(`UE 2`);
    if (!fetched) return;

    if (scrollEvent) {
      window.addEventListener("scroll", handleScroll);
    }
    if (!scrollEvent) {
      window.removeEventListener("scroll", handleScroll);
      setMapClass("mapInitRatio");
    }
    return () => {
      console.log(`unmounted`);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollEvent]);

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

  return { scrollEvent };
};

export default useShrinkMapOnScroll;
