import { ButtonGroup, Layout, Button, Card, Page } from "@shopify/polaris";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../redux/ducks/app";

export function LoadingTest() {
  const dispatch = useDispatch();

  const handleLoading = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 5000);
  };

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section secondary>
          <Card sectioned title="Loading Test">
            <ButtonGroup>
              <Button onClick={handleLoading}>Set Loading (5 seconds)</Button>
            </ButtonGroup>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
