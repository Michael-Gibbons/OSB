import { useParams } from 'react-router-dom';

import {
  Page,
  Layout,
  Card
} from '@shopify/polaris';

export default function resourceListItemExample(){
  const { id } = useParams();

  return (
  <Page>
    <Layout>
      <Layout.Section>
        <Card sectioned>
          This page is for the customer with the id of {id}!
        </Card>
      </Layout.Section>
    </Layout>
  </Page>
  )
}