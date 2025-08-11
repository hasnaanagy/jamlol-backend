const Ajv = require("ajv");
const ajv = new Ajv();

const appInfoSchema = {
  type: "object",
  properties: {
    app_name: { type: "string", minLength: 5, maxLength: 50 },
    app_email: { type: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
    app_phone: { type: "string" },
    app_address: { type: "string", nullable: true },
    app_description: { type: "string", nullable: true },
    app_logo: { type: "string", nullable: true },
    app_footer_text: { type: "string", nullable: true },
    app_primary_color: { type: "string", nullable: true },
    maintenance_mode: { type: "string", enum: ["enabled", "disabled"] },
    currency: { type: "string", nullable: true },
    app_website: { type: "string", nullable: true },
    app_facebook: { type: "string", nullable: true },
    app_twitter: { type: "string", nullable: true },
    app_instagram: { type: "string", nullable: true },
    app_snapchat: { type: "string", nullable: true },
    app_whatsapp: { type: "string", nullable: true },
  },
  required: ["app_name", "app_email", "app_phone"],
  additionalProperties: false,
};

const validate = ajv.compile(appInfoSchema);

module.exports = { validate, appInfoSchema };
