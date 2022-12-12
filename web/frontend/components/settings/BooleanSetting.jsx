import { Layout, SettingToggle } from "@shopify/polaris";

export default function BooleanSetting({title, description, value, setValue}){
  const contentStatus = value ? 'Deactivate' : 'Activate';
  const textStatus = value ? 'activated' : 'deactivated';

  return (
    <Layout.AnnotatedSection
      title={title}
      description={description}
    >
      <SettingToggle
        action={{
          content: contentStatus,
          onAction: () => setValue(value => !value),
        }}
        enabled={value}
      >
        This setting is{' '} <span style={{fontWeight: '700'}}>{textStatus}</span>
        .
      </SettingToggle>
  </Layout.AnnotatedSection>
  )
}