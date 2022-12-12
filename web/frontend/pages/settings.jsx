import { Page, Layout } from "@shopify/polaris";
import TextFieldSetting from "../components/settings/TextFieldSetting";
import useSettings from "../hooks/app/useSettings";
import useStateWithValidation from "../hooks/util/useStateWithValidation";
import useCreateSettings from "../hooks/app/util/useCreateSettings";

export default function SettingsPage(){
  const [ shopSettings ] = useSettings()

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )?.length >= 1;
  };

  const [email, setEmail, emailIsValid] = useStateWithValidation(validateEmail, shopSettings.email)

  const SETTINGS = [
    {
      name: "email",
      value: email,
      setter: setEmail,
      isValid: emailIsValid,
      default: shopSettings.email
    }
  ]

  useCreateSettings(SETTINGS)

  return (
    <Page
      title="Settings"
    >
      <Layout>
        <TextFieldSetting
          title="My Super Cool Setting"
          description="This is a short explaination of this rather super cool setting."
          fieldLabel="Super Cool Setting"
          value={email}
          setValue={setEmail}
          error={emailIsValid ? "": "Invalid Email"}
        />
      </Layout>
    </Page>
  )
}