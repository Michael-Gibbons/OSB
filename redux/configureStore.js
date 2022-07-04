import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import exampleReducer from "./ducks/exampleDuck";
import appReducer from "./ducks/app";
import settingsReducer from "./ducks/settings";

const reducer = combineReducers({
  example: exampleReducer,
  app: appReducer,
  settings: settingsReducer,
});

const middleware = [];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: "OSB SHOPIFY APPLICATION",
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

const store = createStore(reducer, enhancer);

export default store;
