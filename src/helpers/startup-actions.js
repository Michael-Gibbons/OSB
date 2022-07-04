import { getAppSettings } from "../../redux/ducks/settings";
import store from "../../redux/configureStore";

const getSettings = async () => {
  store.dispatch(getAppSettings());
};

const myStartupAction = () => {
  console.log("startup action!");
};

const handleStartupActions = () => {
  myStartupAction();
  getSettings();
};

export default handleStartupActions;
