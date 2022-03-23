const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.address) {
    errors.address = "Required";
  }
  if (!values.date) {
    errors.date = "Required";
  }
};

export default validate;
