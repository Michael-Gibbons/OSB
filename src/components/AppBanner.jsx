import { Banner, Page, Layout } from "@shopify/polaris";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBanner } from "../../redux/ducks/app";

// This is an APP LEVEL banner component, this should only be used for conveying app level information to the users.
// ie new update, need to perform an action which sets an app setting, payment required etc

export function AppBanner() {
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.app.banner);

  const handleDismiss = useCallback(() => {
    banner.onDismiss();
    dispatch(setBanner({ active: false }));
  }, [banner]);

  return banner.active ? (
    <div style={{ margin: "23px" }}>
      <Banner
        title={banner.title}
        action={banner.action}
        secondaryAction={banner.secondaryAction}
        status={banner.status || "info"}
        onDismiss={banner.dismissable ? handleDismiss : null}
        children={banner.children}
      />
    </div>
  ) : null;
}
