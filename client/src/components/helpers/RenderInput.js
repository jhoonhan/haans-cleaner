import React from "react";

const renderInput = ({ input, type, placeholder }) => {
  return (
    <React.Fragment>
      <input
        onChange={input.onChange}
        value={input.value}
        type={type}
        placeholder={placeholder}
      />
    </React.Fragment>
  );
};

export default renderInput;
