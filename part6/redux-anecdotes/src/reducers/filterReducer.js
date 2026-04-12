const filterReducer = (state = "ALL", action) => {
  switch (action.type) {
    case "SET_FILTER":
      console.log("ACTION: ", action);
      return action.payload;
    default:
      console.log("ACTION: ", action);
      return state;
  }
};

export const filterChange = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export default filterReducer;
