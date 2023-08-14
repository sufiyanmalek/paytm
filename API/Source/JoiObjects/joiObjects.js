import joi from "joi";

// Joi User Schema
export const userSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .required()
    .pattern(/^([^0-9]*)$/)
    .message("Name should not contain numbers")
    .messages({
      "string.empty": "Name should not be empty",
      "string.min": "Name must be at least 3 characters long",
      "number.base": `Name should be of type  'string'`,
    }),
  email: joi.string().email().required(),
  phone: joi
    .number()
    .required()
    .min(10 ** 9)
    .max(10 ** 10 - 1)
    .messages({
      "number.base": `Phone should be of type  'number'`,
      "number.empty": `Phone cannot be an empty field`,
      "number.min": `Phone can't be all zeros`,
      "number.max": `Phone should no be more than 10 digits`,
      "number.required": `Phone is a required field`,
    }),
  password: joi
    .string()
    .min(6)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!.%*?&])[A-Za-z\d@$!%*.?&]{8,}$/
    )
    .message(
      "password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  pin: joi
    .string()
    .length(4)
    .required()
    .messages({ "string.empty": "Payment pin is required" }),
  address: joi
    .string()
    .pattern(/(?!^\d+$)^.+$/)
    .message("Address can't be only numbers"),
});

// Contact Schema
export const contactSchema = joi.object({
  userId: joi.string().required(),
  name: joi.string().required().min(3),
  email: joi.string().email().required(),
  phone: joi.number().required().max(9999999999),
  profilePic: joi.string().required(),
});

// Add Money verfiy Object
export const verifyAmount = joi.object({
  amount: joi.number().required().max(10000).min(1).messages({
    "number.max": "Can't add more than 10000Rs at once",
  }),
  pin: joi.string().length(4).required(),
});
