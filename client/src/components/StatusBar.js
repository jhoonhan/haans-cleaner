import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const StatusBar = ({ order }) => {
  const progressBar = useRef(null);
  const valueContainer = useRef(null);
  let progressVal = 0;
  const speed = 20;

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
          #ffe7b6 ${progressVal * 3.6}deg, 
          #f0f2e9 ${progressVal * 3.6}deg)`;

      if (progressVal === condtProgressVal()) {
        clearInterval(progress);
      }
    }, speed);

    return () => {
      clearInterval(progress);
    };
  });

  const render = () => {
    if (order) {
      const date = new Date(order.date).toLocaleString("default", {
        month: "numeric",
        day: "numeric",
        weekday: "long",
      });
      return (
        <Link ref={progressBar} to="/order" className="circular-progess">
          <div ref={valueContainer} className="value-container">
            <h4 style={{ textTransform: "uppercase" }}>{order.status}</h4>
            <label>pickup date:</label>
            <p>{date}</p>
          </div>
        </Link>
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
