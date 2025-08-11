const Ajv = require("ajv").default;
const ajv = new Ajv();

const RegisterSchema = {
  type: "object",
  properties: {
    full_name: { type: "string" },
    email: { type: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
    password: {
      type: "string",
      minLength: 8,
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
    },
    phone_number: { type: "string" },
    type: { type: "string", enum: ["supplier", "client", "carrier", "admin"] },
    role_id: { type: "integer" },
    approval_code: { type: "string" },
    is_active: { type: "boolean" },
  },
  required: ["full_name", "email", "password", "type"],
  additionalProperties: false,
};
ajv.compile(RegisterSchema);
module.exports = RegisterSchema;
