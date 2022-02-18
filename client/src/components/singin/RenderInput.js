import React from "react";

const RenderInput = ({ input, type }) => {
  return (
    <React.Fragment>
      <input onChange={input.onChange} value={input.value} type={type} />
    </React.Fragment>
  );
};

export default RenderInput;
