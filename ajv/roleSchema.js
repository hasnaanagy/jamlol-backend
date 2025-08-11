const Ajv = require("ajv").default;
const ajv = new Ajv();

const roleSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2 },
    Permissions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: { type: "boolean" },
      },
      minItems: 1,
    },
  },
  required: ["name", "Permissions"],
  additionalProperties: false,
};

module.exports = roleSchema;
