import { Layout, Card, Select } from "@shopify/polaris";
import { useCallback } from "react";

export default function EnumSetting({title, description, selectLabel, options, value, setValue}){
  const handleSelectChange = useCallback((value) => setValue(value), [value]);

  return (
    <Layout.AnnotatedSection
      title={title}
      description={description}
    >
    <Card sectioned>
      <Select
        label={selectLabel}
        options={options}
        value={value}
        onChange={handleSelectChange}
      />
    </Card>
  </Layout.AnnotatedSection>
  )
}