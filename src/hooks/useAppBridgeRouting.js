import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppBridge, useRoutePropagation } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { useDispatch } from "react-redux";
import { setNavigation } from "../../redux/ducks/app";

export function useAppBridgeRouting(routes) {
  const app = useAppBridge();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useRoutePropagation(location);

  useEffect(() => {
    app.subscribe(Redirect.Action.APP, ({ path }) => {
      navigate(path);
      dispatch(
        setNavigation({
          mobileNavigationActive: false,
        })
      );
    });
  }, []);
}
