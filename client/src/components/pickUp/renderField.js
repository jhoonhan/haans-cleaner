import React from "react";

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  const inputArea = <input {...input} placeholder={label} type={type} />;
  const textArea = <textarea {...input} placeholder={label} type={type} />;

  return (
    <div className="pickup__form__section">
      <label>{label[0].toUpperCase() + label.substring(1)}</label>
      <div>
        {label === "note" ? textArea : inputArea}
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default renderField;
