import { Button } from '@shopify/polaris';
import { useErrorHandler } from "react-error-boundary";
import { useCallback } from 'react';

import { useLogger, usePreferences, useDebounce, useToast, useModal, useBanner, useLoading, useContextualSaveBar } from '../hooks/index.js';
import { useState } from 'react';

export default function Test() {
  const handleError = useErrorHandler();
  const logger = useLogger()
  const preferences = usePreferences()
  const PAGE_SIZE = preferences.get('PAGE_SIZE', 25)
  const [count, setCount] = useState(1)

  const [setToast] = useToast()
  const [setModal, toggleModal] = useModal()
  const [setBanner, toggleBanner] = useBanner()
  const [setLoading] = useLoading()
  const [setContextualSaveBar, setIsDirty] = useContextualSaveBar()

  useDebounce(() => { alert(count) }, 1000, [count])
  // console.log('preferences', 'PAGE_SIZE', preferences.delete('PAGE_SIZE')) // undefined
  // console.log('preferences', 'PAGE_SIZE', preferences.get('PAGE_SIZE', 25)) // 25
  // console.log('preferences', 'PAGE_SIZE', preferences.set('PAGE_SIZE', 50)) // 50
  // console.log('preferences', 'PAGE_SIZE', preferences.get()) // PAGE_SIZE: 50

  // logger.error("My super cool error")
  // logger.warn("My super cool warn")

  // syntax errors, component errors, import errors, throw new error,ie everything that happens on compile will be handled automatically by the Error Boundary component
  // but errors in response to events, like this button click, has to use the useErrorHandler function
  // this is an intentional design choice by react to not expand the error api.

  const handleInduceError = useCallback(() => {
    try {
      return IdontExist;
    } catch (error) {
      handleError(error);
    }
  }, [])

  const handleClick = () => {
    setToast({ content: 'Yo yo', error: true })
  }

  const handleClick2 = () => {
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
  }

  const handleClick3 = () => {
    setBanner({
      active: true,
      title: 'Super Cool Banner'
    })
  }

  const handleClick4 = () => {
    setLoading(true)
  }

  const handleClick5 = () => {
    setLoading(false)
  }

  const handleClick6 = () => {
    setContextualSaveBar({
      isDirty: true,
      message: "My Cool Message",
      saveAction: {
        content: "Save",
        onAction: () => console.log('stinky')
      },
      discardAction: {
        content: "Discard",
        onAction: () => { console.log('discard'); setIsDirty(false) },
      }
    })
  }

  return (
    <>
      <Button onClick={handleInduceError}>Induce Error</Button>
      <Button onClick={() => setCount(count + 1)}>Debounce Test: {count}</Button>
      <Button onClick={handleClick}>Set toast</Button>
      <Button onClick={handleClick2}>Open Modal</Button>
      <Button onClick={handleClick3}>Open Banner</Button>
      <Button onClick={handleClick4}>Toggle Loading On</Button>
      <Button onClick={handleClick5}>Toggle Loading Off</Button>
      <Button onClick={handleClick6}>Set is dirty</Button>
    </>
  )
}