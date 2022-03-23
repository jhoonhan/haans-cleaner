const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!/^(0|[1-9][0-9]{9})$/i.test(values.phone)) {
    errors.phone = "Invalid phone number";
  }
  if (!values.street) {
    errors.street = "Required";
  }
  if (!values.city) {
    errors.city = "Required";
  }
  if (isNaN(Number(values.zip))) {
    errors.zip = "Invalid zip code";
  }
  return errors;
};

export default validate;
