const reducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ORDER":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reducer;
