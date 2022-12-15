import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from "uuid";
import { ErrorBoundary } from "react-error-boundary";
import AppError  from './AppError.jsx';
import { useLogger } from '../../hooks/index';

export default function AppErrorBoundary({ children }){
  const [errorId, setErrorId] = useState("")
  const logger = useLogger()

  const handleError = useCallback((error, info) => {
    const newErrorId = uuidv4();
    setErrorId(newErrorId);
    logger.error("Frontend App Crash", {
      id: newErrorId,
      error: error.message,
      info,
    });
  }, []);

  return (
    <ErrorBoundary
      onError={(error, info) => handleError(error, info)}
      fallbackRender={({ error, resetErrorBoundary }) => {
        return <AppError errorId={errorId} resetErrorBoundary={resetErrorBoundary} />;
      }}
    >
      { children }
    </ErrorBoundary>
  )
}