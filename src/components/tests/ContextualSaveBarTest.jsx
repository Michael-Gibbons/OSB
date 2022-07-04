import { useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { Card, FormLayout, Layout, Page, TextField } from "@shopify/polaris";
import { setContextualSaveBar } from "../../../redux/ducks/app";

export function ContextualSaveBarTest() {
  const dispatch = useDispatch();

  const defaultState = useRef({
    emailFieldValue: "dummyEmail@dumbdumb.com",
    nameFieldValue: "OSB INC",
  });

  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue
  );
  const [emailFieldValue, setEmailFieldValue] = useState(
    defaultState.current.emailFieldValue
  );

  const handleDiscard = useCallback(() => {
    setEmailFieldValue(defaultState.current.emailFieldValue);
    setNameFieldValue(defaultState.current.nameFieldValue);
    dispatch(setContextualSaveBar({ isDirty: false }));
  }, []);

  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue;
    defaultState.current.emailFieldValue = emailFieldValue;
    dispatch(setContextualSaveBar({ isDirty: false }));
  }, [emailFieldValue, nameFieldValue]);

  const handleNameFieldChange = useCallback((value) => {
    setNameFieldValue(value);
    dispatch(
      setContextualSaveBar({
        isDirty: true,
        saveAction: {
          onAction: handleSave,
        },
        discardAction: {
          onAction: handleDiscard,
        },
      })
    );
  }, []);

  const handleEmailFieldChange = useCallback((value) => {
    setEmailFieldValue(value);
    dispatch(
      setContextualSaveBar({
        isDirty: true,
        saveAction: {
          onAction: handleSave,
        },
        discardAction: {
          onAction: handleDiscard,
        },
      })
    );
  }, []);

  return (
    <Page title="Account">
      <Layout>
        <Layout.AnnotatedSection
          title="Account details"
          description="OSB Inc will use this as your account information."
        >
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Full name"
                value={nameFieldValue}
                onChange={handleNameFieldChange}
                autoComplete="name"
              />
              <TextField
                type="email"
                label="Email"
                value={emailFieldValue}
                onChange={handleEmailFieldChange}
                autoComplete="email"
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
