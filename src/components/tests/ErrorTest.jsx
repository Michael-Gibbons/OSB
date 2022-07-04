import { Page, Layout, Card, Button } from "@shopify/polaris";
import { useCallback } from "react";
import { useErrorHandler } from "react-error-boundary";

export function ErrorTest() {
  const handleError = useErrorHandler();

  // syntax errors, component errors, import errors, throw new error,ie everything that happens on compile will be handled automatically by the Error Boundary component
  // but errors in response to events, like this button click, has to use the useErrorHandler function
  // this is an intentional design choice by react to not expand the error api.

  const handleInduceError = useCallback(() => {
    try {
      return IdontExist;
    } catch (error) {
      handleError(error);
    }
  }, []);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card sectioned title="Error Handling Test">
            <Button onClick={handleInduceError}>Induce Error</Button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
