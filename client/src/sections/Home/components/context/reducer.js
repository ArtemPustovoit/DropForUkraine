const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };
  }
};

export default reducer;
