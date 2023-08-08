// Joi Validator Class

export class Validator {
  constructor(schema) {
    this.schema = schema;
  }
  validate = (req, res, next) => {
    const validate = this.schema.validate(req.body);
    if (validate.error) {
      res.status(400).json({
        error: "Validation error",
        message: validate.error.details[0].message,
      });
    } else {
      next();
    }
  };
}
