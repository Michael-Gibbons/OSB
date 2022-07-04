import {
  Page,
  Layout,
  Card,
  ButtonGroup,
  Button,
  Stack,
  TextContainer,
  TextStyle,
  Heading,
} from "@shopify/polaris";

export function SettingsPage() {
  return (
    <Page title="Settings" divider>
      <Layout>
        <Layout.Section>
          <Card sectioned title="General Settings">
            <Card.Section>
              <Stack alignment="center">
                <Stack.Item fill>
                  <TextContainer>
                    <Heading element="h2">Setting Title</Heading>
                    <TextStyle variation="subdued">
                      This is some info explaining the setting
                    </TextStyle>
                  </TextContainer>
                </Stack.Item>
                <Stack.Item>
                  <ButtonGroup segmented>
                    <Button primary={true}>Enabled</Button>
                    <Button>Disabled</Button>
                  </ButtonGroup>
                </Stack.Item>
              </Stack>
            </Card.Section>
            <Card.Section>
              <Stack alignment="center">
                <Stack.Item fill>
                  <TextContainer>
                    <Heading element="h2">Setting Title</Heading>
                    <TextStyle variation="subdued">
                      This is some info explaining the setting
                    </TextStyle>
                  </TextContainer>
                </Stack.Item>
                <Stack.Item>
                  <ButtonGroup segmented>
                    <Button primary={true}>Enabled</Button>
                    <Button>Disabled</Button>
                  </ButtonGroup>
                </Stack.Item>
              </Stack>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
