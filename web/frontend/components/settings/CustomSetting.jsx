import { Layout, Card, TextField } from "@shopify/polaris";

export default function CustomSetting({title, description, value, setValue}){

  const handleField1Change = (newValue) => {
    setValue(value => {
      return {...value, field1: newValue}
    })
  }

  const handleField2Change = (newValue) => {
    setValue(value => {
      return {...value, field2: newValue}
    })
  }

  return (
    <Layout.AnnotatedSection
      title={title}
      description={description}
    >
      <Card sectioned>
        <TextField
          label="Field 1"
          value={value.field1}
          onChange={handleField1Change}
        />
        <TextField
          label="Field 2"
          value={value.field2}
          onChange={handleField2Change}
        />
      </Card>
    </Layout.AnnotatedSection>
  )
}