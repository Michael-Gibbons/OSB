import buildAllSchemas from "./util/buildAllSchemas.js";
const schemas = buildAllSchemas()

const apiDoc = {
  openapi: '3.0.3',
  servers: [
    {
      url: '/api/v1'
    }
  ],
  info: {
    title: 'A getting started API.',
    version: '1.0.0'
  },
  components: {
    schemas
  },
  paths: {}
};

export default apiDoc;