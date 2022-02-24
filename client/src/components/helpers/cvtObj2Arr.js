const fn = (data) => {
  if (!data) return [];
  return Object.entries(data).map(([key, value]) => {
    const obj = {
      id: key,
      ...value,
    };
    return obj;
  });
};

export default fn;
