import { useToggle } from "../../hooks/index";
import { Toast } from "@shopify/polaris";
import { useEffect } from "react";

export default function AppToast({ toast }) {
  const [active, toggleActive] = useToggle(false);

  useEffect(() => {
    if (toast && toast.content) {
      toggleActive(true)
    }
  }, [toast])

  return active && toast ? (
    <Toast
      content={toast.content.toString()}
      error={toast.error || false}
      duraction={toast.duration || 4000}
      onDismiss={toggleActive}
      action={toast.action || null}
    />
  ) : null
}