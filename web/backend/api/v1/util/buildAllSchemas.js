import failureSchema from "../schemas/failureSchema.js";
import errorSchema from "../schemas/errorSchema.js";
import successSchema from "../schemas/successSchema.js";
import resourceSchema from "../schemas/resourceSchema.js";
import attributesSchema from "../schemas/attributesSchema.js";
import paginationSchema from "../schemas/paginationSchema.js";
import linkSchema from "../schemas/linkSchema.js";

// Takes all files in './schemas/resources' and adds them to the api doc
import buildSchemaDependencies from "./buildSchemaDependencies.js";
const schemaDependencies = await buildSchemaDependencies() // top level await supported since node v14

const buildAllSchemas = () => {
  return {
    success: successSchema,
    failure: failureSchema,
    error: errorSchema,
    resource: resourceSchema,
    attributes: attributesSchema,
    pagination: paginationSchema,
    link: linkSchema,
    ...schemaDependencies
  }
}

export default buildAllSchemas