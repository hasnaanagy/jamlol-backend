const Ajv = require("ajv");
const ajv = new Ajv();

const permissionSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    slug: { type: "string" },
    groupBy: { type: "integer" },
  },
  required: ["name"],
  additionalProperties: false,
};

ajv.compile(permissionSchema);
module.exports = permissionSchema;
