import { Page, Layout } from "@shopify/polaris";
import TextFieldSetting from "../settings/TextFieldSetting";
import { useSettings, useStateWithValidation, useCreateSettings } from "../../hooks/index";
import BooleanSetting from "../settings/BooleanSetting";
import EnumSetting from "../settings/EnumSetting";
import { useState } from "react";
import CustomSetting from "../settings/CustomSetting";
import AppPageLoading from "../app/AppPageLoading";

export default function SettingsPage() {

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )?.length >= 1;
  };

  const [pageLoading, setPageLoading] = useState(true)
  const [email, setEmail, emailIsValid] = useStateWithValidation(validateEmail, '')
  const [coolBooleanSetting, setCoolBooleanSetting] = useState(false)
  const [coolEnumSetting, setCoolEnumSetting] = useState('')
  const [coolCustomSetting, setCoolCustomSetting] = useState({ field1: '', field2: '' })

  const [shopSettings] = useSettings({
    onSuccess: (data) => {
      setEmail(data.email)
      setCoolBooleanSetting(data.coolBooleanSetting)
      setCoolEnumSetting(data.coolEnumSetting)
      setCoolCustomSetting(data.coolCustomSetting)
      setPageLoading(false)
    }
  })

  const SETTINGS = [
    {
      name: "email",
      value: email,
      setter: setEmail,
      isValid: emailIsValid,
      default: shopSettings?.email
    },
    {
      name: "coolBooleanSetting",
      value: coolBooleanSetting,
      setter: setCoolBooleanSetting,
      isValid: true,
      default: shopSettings?.coolBooleanSetting
    },
    {
      name: "coolEnumSetting",
      value: coolEnumSetting,
      setter: setCoolEnumSetting,
      isValid: true,
      default: shopSettings?.coolEnumSetting
    },
    {
      name: "coolCustomSetting",
      value: coolCustomSetting,
      setter: setCoolCustomSetting,
      isValid: true,
      default: shopSettings?.coolCustomSetting
    }
  ]

  useCreateSettings(SETTINGS, pageLoading)

  if (pageLoading) { return <AppPageLoading /> }

  return (
    <Page
      title="Settings"
    >
      <Layout>
        <TextFieldSetting
          title="Cool setting, Text field edition"
          description="This is a short explanation of this rather super cool setting."
          fieldLabel="Super Cool Setting"
          value={email}
          setValue={setEmail}
          error={emailIsValid ? "" : "Invalid Email"}
        />

        <BooleanSetting
          title="Cool setting, Boolean Style"
          description="This is a short explanation of this rather super cool boolean setting."
          value={coolBooleanSetting}
          setValue={setCoolBooleanSetting}
        />

        <EnumSetting
          title="Cool setting, but Enums this time"
          description="This is a short explanation covering the different predefined options of this setting."
          selectLabel="My Options"
          options={[
            {
              label: "Option 1",
              value: "1"
            },
            {
              label: "Option 2",
              value: "2"
            },
            {
              label: "Option 3",
              value: "3"
            }
          ]}
          value={coolEnumSetting}
          setValue={setCoolEnumSetting}
        />

        <CustomSetting
          title="A Custom Setting? Wow!"
          description="The world is your oyster. This is a custom setting for the business logic of your application which can be represented by any JSON-stringify-able object. Useful if you have a setting that can't be defined by a single primative value."
          value={coolCustomSetting}
          setValue={setCoolCustomSetting}
        />
      </Layout>
    </Page>
  )
}