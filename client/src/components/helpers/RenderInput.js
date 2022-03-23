import React from "react";

const renderInput = ({ input, type, placeholder, reference, meta }) => {
  return (
    <React.Fragment>
      <input
        onChange={input.onChange}
        value={input.value}
        type={type}
        placeholder={meta.touched ? meta.error : ""}
        ref={reference}
      />
    </React.Fragment>
  );
};

export default renderInput;
