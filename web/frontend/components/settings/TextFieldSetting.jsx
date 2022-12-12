import { Layout, Card, FormLayout, TextField } from "@shopify/polaris";

export default function TextFieldSetting({title, description, fieldLabel, value, setValue, error}){
  return (
    <Layout.AnnotatedSection
      title={title}
      description={description}
    >
    <Card sectioned>
      <FormLayout>
        <TextField
          type="email"
          label={fieldLabel}
          value={value}
          onChange={setValue}
          error={error}
        />
      </FormLayout>
    </Card>
  </Layout.AnnotatedSection>
  )
}