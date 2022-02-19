const fn = (data) => {
  return Object.entries(data).map(([key, value]) => {
    const obj = {};
    obj.type = key;
    obj.count = value;
    return obj;
  });
};

export default fn;
