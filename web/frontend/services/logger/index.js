// This logger is designed for use on the front facing part of the application
// When it's methods are called it makes a post request to the /log endpoint and sends the information to the server

import { createServerClient } from "../clients";

const handleLog = (type, message, meta) => {
  const options = {
    axios: {
      baseURL: "",
    },
  };

  const serverClient = createServerClient(options);
  serverClient.post("/api/log", { type, message, meta });
};

const createLogger = () => {
  return {
    silly: (message, meta) => handleLog("silly", message, meta),
    verbose: (message, meta) => handleLog("verbose", message, meta),
    debug: (message, meta) => handleLog("debug", message, meta),
    info: (message, meta) => handleLog("info", message, meta),
    warn: (message, meta) => handleLog("warn", message, meta),
    error: (message, meta) => handleLog("error", message, meta),
  };
};

const logger = createLogger();

export default logger;
