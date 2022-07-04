import { useEffect, useState, useCallback } from "react";
import {
  Card,
  Page,
  Layout,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Button,
} from "@shopify/polaris";

import { gql, useLazyQuery } from "@apollo/client";

const PRODUCTS_QUERY = gql`
  {
    products(first: 100) {
      edges {
        cursor
        node {
          id
          title
          onlineStoreUrl
        }
      }
    }
  }
`;

export function RateLimitTest() {
  const [productQuery, { loading }] = useLazyQuery(PRODUCTS_QUERY);
  const [rateLimitMessage, setRateLimitMessage] = useState("");

  const beginRateLimit = useCallback(() => {
    for (let index = 0; index < 1500; index++) {
      setRateLimitMessage(`Query: ${index}`);
      productQuery({ variables: { time: Date.now().toString() } }); // adding date as unused var prevents request caching
    }
  }, []);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card title="Rate Limit" sectioned>
            <TextContainer spacing="loose">
              {rateLimitMessage ? <p>{rateLimitMessage}</p> : null}
              <Button loading={loading} onClick={beginRateLimit}>
                Begin Rate Limit Test
              </Button>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
