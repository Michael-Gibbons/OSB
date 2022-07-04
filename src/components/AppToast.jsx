import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToast } from "../../redux/ducks/app";
import { Toast } from "@shopify/polaris";

export function AppToast() {
  const appToast = useSelector((state) => state.app.toast);
  const active = appToast.active;
  const dispatch = useDispatch();
  const setToastLocal = useCallback(
    (newToast) => {
      dispatch(setToast(newToast));
    },
    [appToast]
  );

  const toggleActive = useCallback(
    () => setToastLocal({ ...appToast, active: !appToast.active }),
    [appToast]
  );

  const dismiss = useCallback(() => {
    if (typeof appToast.onDismiss === "function") {
      appToast.onDismiss();
    }
    toggleActive();
  }, [appToast]);

  const toastMarkup = active ? (
    <Toast
      content={appToast.content}
      duration={appToast.duration}
      error={appToast.error} // Error toasts are discouraged, use banner if error is user user. use toast if server error
      action={{
        content: appToast.action.content,
        onAction: appToast.action.onAction,
      }}
      onDismiss={dismiss}
    />
  ) : null;

  return toastMarkup;
}
