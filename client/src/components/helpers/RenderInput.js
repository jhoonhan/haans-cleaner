import React from "react";

const RenderInput = ({ input, type, placeholder, reference, meta }) => {
  return (
    <React.Fragment>
      <input
        onChange={input.onChange}
        value={input.value}
        type={type}
        placeholder={meta.touched ? meta.error : placeholder}
        ref={reference}
      />
    </React.Fragment>
  );
};

export default RenderInput;
