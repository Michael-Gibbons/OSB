export const SET_USERS = "SET_USERS";

export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      const { users } = action;
      return { ...state, users };
    default:
      return state;
  }
};
