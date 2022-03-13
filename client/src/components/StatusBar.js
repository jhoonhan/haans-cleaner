import React from "react";

const statusBar = ({ progressBar, valueContainer, startVal, endVal }) => {
  let progressVal = startVal;
  let progressEnd = endVal;
  const speed = 10;
  const progress = setInterval(() => {
    progressVal++;
    progressBar.current.style.background = `conic-gradient(
        #4d5bf9 ${progressVal * 3.6}deg, 
        #cadcff ${progressVal * 3.6}deg)`;

    if (progressVal === progressEnd) {
      clearInterval(progress);
    }
  }, speed);

  return (
    <div ref={progressBar} className="circular-progess">
      <div ref={valueContainer} className="value-container">
        <h4 style={{ textTransform: "uppercase" }}>submitted</h4>
        <label>pickup date:</label>
        <p>Thursday, 3/22</p>
      </div>
    </div>
  );
};

export default statusBar;
