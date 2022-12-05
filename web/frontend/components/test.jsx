import { Button } from '@shopify/polaris';
import { useErrorHandler } from "react-error-boundary";
import { useCallback } from 'react';

import { useServerClient } from '../hooks/util/useServerClient';
import { useLogger } from '../hooks/util/useLogger';
import usePreferences from '../hooks/util/usePreferences.js';
import useDebounce from '../hooks/util/useDebounce.js';
import { useState } from 'react';

export default function Test(){
  const handleError = useErrorHandler();
  const logger = useLogger()
  const preferences = usePreferences()
  const PAGE_SIZE = preferences.get('PAGE_SIZE', 25)
  const [count, setCount] = useState(1)

  useDebounce(() => {alert(count)}, 1000, [count])
  // console.log('preferences', 'PAGE_SIZE', preferences.delete('PAGE_SIZE')) // undefined
  // console.log('preferences', 'PAGE_SIZE', preferences.get('PAGE_SIZE', 25)) // 25
  // console.log('preferences', 'PAGE_SIZE', preferences.set('PAGE_SIZE', 50)) // 50
  // console.log('preferences', 'PAGE_SIZE', preferences.get()) // PAGE_SIZE: 50

  logger.error("My super cool error")
  logger.warn("My super cool warn")

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
  return (
    <>
      <Button onClick={handleInduceError}>Induce Error</Button>
      <Button onClick={() => setCount(count + 1)}>Increase Count: {count}</Button>
    </>
  )
}