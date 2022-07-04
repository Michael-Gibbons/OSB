import { ButtonGroup, Layout, Button, Card, Page } from "@shopify/polaris";
import { useSelector, useDispatch } from "react-redux";
import { setToast } from "../../../redux/ducks/app";

export function ToastTest() {
  const dispatch = useDispatch();

  const handleSuccessToast = () => {
    dispatch(
      setToast({
        active: true,
        content: "Toast Success",
      })
    );
  };

  const handleErrorToast = () => {
    dispatch(
      setToast({
        active: true,
        error: true,
        content: "Toast Error",
      })
    );
  };

  const handleCustomActionToast = () => {
    dispatch(
      setToast({
        active: true,
        content: "Toast Action",
        duration: 10000,
        action: {
          content: "action",
          onAction: () => alert("toast action"),
        },
      })
    );
  };

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned title="Toast Test">
            <ButtonGroup>
              <Button onClick={handleSuccessToast}>Success Toast</Button>
              <Button onClick={handleErrorToast}>Error Toast</Button>
              <Button onClick={handleCustomActionToast}>Action Toast</Button>
            </ButtonGroup>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
