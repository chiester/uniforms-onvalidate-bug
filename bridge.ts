import Ajv from "ajv";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import mySchema from "./schema.json";

const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(mySchema);

export const bridge = new JSONSchemaBridge(mySchema, schemaValidator);
