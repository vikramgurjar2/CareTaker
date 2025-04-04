const z = require("zod");

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required",
  }),
});

module.exports = {
  formSchema,
};
