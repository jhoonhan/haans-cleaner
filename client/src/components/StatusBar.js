import React, { useEffect, useRef } from "react";

const StatusBar = ({ order }) => {
  const progressBar = useRef(null);
  const valueContainer = useRef(null);
  let progressVal = 0;
  const speed = 7;

  const condtProgressVal = () => {
    if (!order) return 0;
    if (order.status === "submitted") return 15;
    if (order.status === "accepted") return 30;
    if (order.status === "pickedup") return 45;
    if (order.status === "processing") return 60;
    if (order.status === "delivery") return 75;
    if (order.status === "completed") return 80;
  };

  useEffect(() => {
    const progress = setInterval(() => {
      if (!order) return;
      progressVal++;
      progressBar.current.style.background = `conic-gradient(
          #4d5bf9 ${progressVal * 3.6}deg, 
          #cadcff ${progressVal * 3.6}deg)`;

      if (progressVal === condtProgressVal()) {
        clearInterval(progress);
      }
    }, speed);

    return clearInterval(progress);
  });

  const render = () => {
    if (order) {
      const date = new Date(order.date).toLocaleString("default", {
        month: "numeric",
        day: "numeric",
        weekday: "long",
      });
      return (
        <div ref={progressBar} className="circular-progess">
          <div ref={valueContainer} className="value-container">
            <h4 style={{ textTransform: "uppercase" }}>{order.status}</h4>
            <label>pickup date:</label>
            <p>{date}</p>
          </div>
        </div>
      );
    }
    if (!order) {
      return (
        <div ref={progressBar} className="circular-progess">
          <div ref={valueContainer} className="value-container">
            <label>welcome!</label>
            <p>First order is on us</p>
          </div>
        </div>
      );
    }
  };
  return render();
};

export default StatusBar;
