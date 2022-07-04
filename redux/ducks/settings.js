export const GET_APP_SETTINGS = "GET_APP_SETTINGS";
export const SET_APP_SETTINGS = "SET_APP_SETTINGS";

export const getAppSettings = () => ({
  type: GET_APP_SETTINGS,
});

export const setAppSettings = (settings) => ({
  type: SET_APP_SETTINGS,
  settings,
});

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_SETTINGS:
      const { settings } = action;
      return { ...state, ...settings };
    default:
      return state;
  }
};
