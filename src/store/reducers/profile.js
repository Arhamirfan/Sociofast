const initialState = {
  address: "",
  balance: ""
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PROFILE":
      return action.payload;
    default:
      return state;
  }
};

export default profile;
