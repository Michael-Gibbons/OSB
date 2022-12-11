import { Banner } from "@shopify/polaris";

export default function AppBanner({ banner }){
  return banner.active ? (
    <div style={{ margin: "23px" }}>
      <Banner
        title={banner.title || ""}
        icon={banner.icon || null}
        status={banner.status || "info"}
        children={banner.children || null}
        action={banner.action || null}
        secondaryAction={banner.secondaryAction || null}
        onDismiss={banner.onDismiss || null}
        stopAnnouncements={banner.stopAnnouncements || false}
      />
    </div>
  ): null;
}