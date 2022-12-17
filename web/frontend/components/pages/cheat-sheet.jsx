import {Page, Layout, Card, Button, FooterHelp, Link} from '@shopify/polaris'
import { useBanner, useContextualSaveBar, useLoading, useModal, useToast, useSettings, usePreferences, useDebounce, useLogger } from '../../hooks'
import { useErrorHandler } from "react-error-boundary";
import { useState, useCallback } from 'react'

export default function CheatSheet(){
  const [setBanner] = useBanner()
  const [setContextualSaveBar, setIsDirty] = useContextualSaveBar()
  const [setLoading] = useLoading()
  const [setModal, toggleModal] = useModal()
  const [setToast] = useToast()
  const [shopSettings] = useSettings()
  const preferences = usePreferences()

  const [pageSize, setPageSize] = useState(preferences.get("PAGE_SIZE", 25))

  const [count, setCount] = useState(1)
  useDebounce(() => { alert(count) }, 1000, [count])

  const handlePageSizeChange = (newPageSize) => {
    preferences.set('PAGE_SIZE', newPageSize)
    setPageSize(newPageSize)
  }

  const handleError = useErrorHandler();

  const handleInduceError = useCallback(() => {
    try {
      return IdontExist;
    } catch (error) {
      handleError(error); // Only need to use the useErrorHandler hook when you want to trigger error on an action, otherwise it happens automatically
    }
  }, [])

  const logger = useLogger()

  return (
    <Page
      title="Cheat Sheet"
      titleMetadata={
        <div style={{marginLeft: '20px', marginTop:'3px'}}>
          Not finding what you're looking for? {' '}
          <Link url="https://michaelgibbons.info/OSB/#/">
            Check the docs!
          </Link>
        </div>
      }
    >
      <Layout>
        <Layout.AnnotatedSection
            title="useBanner"
            description="App Level Banner Component"
          >
          <Card sectioned>
            <Button onClick={() => {
              setBanner({
                active: true,
                title: 'Super Cool Banner'
              })
            }}> Open Info Banner </Button>

            <Button onClick={() => {
              setBanner({
                active: true,
                title: 'Super Cool Banner',
                status: 'success'
              })
            }}> Open Success Banner </Button>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
            title="useContextualSaveBar"
            description="App Level contextual save bar"
          >
          <Card sectioned>
            <Button onClick={() => {
              setContextualSaveBar({
                isDirty: true,
                message: "My Cool Message",
                saveAction: {
                  content: "Save",
                  onAction: () => console.log('save action')
                },
                discardAction: {
                  content: "Discard",
                  onAction: () => { console.log('discard action'); setIsDirty(false) },
                }
              })
            }}> Set contextual save bar  </Button>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="useLoading"
          description="App level loading indicator"
        >
          <Card sectioned>
            <Button
              onClick={() => {
                setLoading(true)
              }}
            >
              Set Loading On
            </Button>
            <Button
              onClick={() => {
                setLoading(false)
              }}
            >
              Set Loading Off
            </Button>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="useModal"
          description="App level modal"
        >
          <Card sectioned>
              <Button onClick={() => {
                setModal({
                  open: true,
                  title: "This is a super cool modal, isn't it?",
                  primaryAction: {
                    content: 'Proceed',
                    onAction: () => console.log('do super cool thing'),
                  },
                  secondaryActions: [
                    {
                      content: 'Cancel',
                      onAction: () => toggleModal(false),
                    },
                  ],
                  children: <div>My super cool modal</div>
                })
              }}> Open Modal </Button>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="useToast"
          description="App level toast"
        >
          <Card sectioned>
              <Button onClick={
                () => setToast({ content: 'Yummy Toast' })
              }> Set toast </Button>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="useSettings"
          description="Retrieve Settings from database"
        >
          <Card sectioned>
              <b>Current Settings:</b> {JSON.stringify(shopSettings)}
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="usePreferences"
          description="Retrieve user preferences from local storage"
        >
          <Card sectioned>
            <div>
              Current page size is: {pageSize} (refresh to verify this is saved)
            </div>
            <Button onClick={() => handlePageSizeChange(25)}> Set Page Size To 25</Button>
            <Button onClick={() => handlePageSizeChange(50)}> Set Page Size To 50</Button>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="useDebounce"
          description="Debounces an action until enough time has passed."
        >
          <Card sectioned>
            <Button onClick={() => setCount(count + 1)}>Current count: {count}</Button>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Error boundary"
          description="how the app responds when there is an error"
        >
          <Card sectioned>
            <Button onClick={handleInduceError}>Induce Error</Button>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="useLogger"
          description="A logger wrapper to send frontend logs to the server"
        >
          <Card sectioned>
              <div> Check your console to see the error, there will be 2 logs. One for the HTTP request, and one for the error</div>
              <Button onClick={() => {
                logger.error("Oh no this wasn't supposed to happen", {someErrorData: 'Hello World'})
              }}> Send Error Log </Button>
          </Card>
        </Layout.AnnotatedSection>
        <FooterHelp>
          Not finding what you're looking for? {' '}
          <Link url="https://michaelgibbons.info/OSB/#/">
            Check the docs!
          </Link>
        </FooterHelp>
      </Layout>
    </Page>
  )
}