import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";

import { useAppQuery, useExtractDataFromAppQuery, useLoading, useServerClient, useToast } from "../hooks/index";
import { useQueryClient } from "react-query";

export function ProductsCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [setLoading] = useLoading()
  const [setToast] = useToast();
  const serverClient = useServerClient()
  const queryClient = useQueryClient()

  const {
    data: productCountData,
    isLoading: isLoadingCount,
  } = useAppQuery('PRODUCTS_COUNT', () => serverClient.get('/products/count'), {
    onSuccess: () => {
      setLoading(false)
      setIsLoading(false);
    },
  })

  const {
    refetch: createProducts,
  } = useAppQuery('PRODUCTS_CREATE', () => serverClient.get('/products/create'), {
    onSuccess: () => {
      setLoading(false)
      setIsLoading(false)
      queryClient.invalidateQueries('PRODUCTS_COUNT')
      setToast({ content: "5 products created!" });
    },
    onError: () => {
      setLoading(false)
      setIsLoading(false);
      setToast({
        content: "There was an error creating products",
        error: true
      })
    },
    enabled: false
  })

  const [productData] = useExtractDataFromAppQuery(productCountData)

  const handlePopulate = async () => {
    setLoading(true)
    setIsLoading(true);
    createProducts()
  };

  return (
    <>
      <Card
        title="Product Counter"
        sectioned
        primaryFooterAction={{
          content: "Populate 5 products",
          onAction: handlePopulate,
          loading: isLoading,
        }}
      >
        <TextContainer spacing="loose">
          <p>
            Sample products are created with a default title and price. You can
            remove them at any time.
          </p>
          <Heading element="h4">
            TOTAL PRODUCTS
            <DisplayText size="medium">
              <TextStyle variation="strong">
                {isLoadingCount ? "-" : productData.count}
              </TextStyle>
            </DisplayText>
          </Heading>
        </TextContainer>
      </Card>
    </>
  );
}
