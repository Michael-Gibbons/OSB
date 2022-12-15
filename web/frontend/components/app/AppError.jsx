import {
  Page,
  Layout,
  TextStyle,
  Button,
  Banner,
} from "@shopify/polaris";

export default function AppError({ errorId, resetErrorBoundary }) {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <Banner title="Oh no! Something went wrong" status="critical" action={{content: 'Try Again', onAction: resetErrorBoundary}}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p>
                    Try refreshing the page or if the problem persists please{" "}
                    <Button plain> contact support </Button> with the code
                    below:
                  </p>
                </div>
                <div
                  style={{
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p>
                    <TextStyle variation="strong">{errorId}</TextStyle>
                  </p>
                </div>
                <img
                  style={{
                    display: "block",
                    margin: "20px auto",
                    width: "100%",
                  }}
                  src="https://static.wikia.nocookie.net/58d72b7b-e6f1-49d7-9277-ca6a0b0f5577"
                  alt=""
                />
              </div>
            </Banner>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}