import { Button, Page, Layout, Card, ButtonGroup } from "@shopify/polaris";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setBanner } from "../../../redux/ducks/app";

export function BannerTest() {
  const dispatch = useDispatch();

  const handleInfoBanner = useCallback(() => {
    dispatch(
      setBanner({
        active: true,
        title: "Info Banner Title",
        onDismiss: () => console.log("dismissed"),
        action: {
          content: "Primary action",
          onAction: () => {
            alert("primary action");
          },
        },
        secondaryAction: {
          content: "Secondary action",
          onAction: () => {
            alert("secondary action");
          },
        },
        status: "info",
        children: <p> This is example banner markup</p>,
      })
    );
  }, []);

  const handleWarningBanner = useCallback(() => {
    dispatch(
      setBanner({
        active: true,
        title: "Warning Banner Title",
        onDismiss: () => console.log("dismissed"),
        action: {
          content: "Primary action",
          onAction: () => {
            alert("primary action");
          },
        },
        secondaryAction: {
          content: "Secondary action",
          onAction: () => {
            alert("secondary action");
          },
        },
        status: "warning",
        children: <p> This is example banner markup</p>,
      })
    );
  }, []);

  const handleCriticalBanner = useCallback(() => {
    dispatch(
      setBanner({
        active: true,
        dismissable: false,
        title: "Critical Banner Title",
        onDismiss: () => console.log("dismissed"),
        action: {
          content: "Primary action",
          onAction: () => {
            alert("primary action");
          },
        },
        secondaryAction: {
          content: "Secondary action",
          onAction: () => {
            alert("secondary action");
          },
        },
        status: "critical",
        children: <p> This is example banner markup</p>,
      })
    );
  }, []);

  const handleSuccessBanner = useCallback(() => {
    dispatch(
      setBanner({
        active: true,
        title: "Success Banner Title",
        onDismiss: () => console.log("dismissed"),
        action: {
          content: "Primary action",
          onAction: () => {
            alert("primary action");
          },
        },
        secondaryAction: {
          content: "Secondary action",
          onAction: () => {
            alert("secondary action");
          },
        },
        status: "success",
        children: <p> This is example banner markup</p>,
      })
    );
  }, []);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card sectioned title="Banner Test">
            <ButtonGroup>
              <Button onClick={handleInfoBanner}>Info Banner</Button>
              <Button onClick={handleWarningBanner}>Warning Banner</Button>
              <Button onClick={handleCriticalBanner}>Critical Banner</Button>
              <Button onClick={handleSuccessBanner}>Success Banner</Button>
            </ButtonGroup>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
