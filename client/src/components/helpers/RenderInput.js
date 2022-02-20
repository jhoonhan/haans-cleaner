import React from "react";

const renderInput = ({ input, type, placeholder, reference }) => {
  return (
    <React.Fragment>
      <input
        onChange={input.onChange}
        value={input.value}
        type={type}
        placeholder={placeholder}
        ref={reference}
      />
    </React.Fragment>
  );
};

export default renderInput;
