const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {handleMongooseError} = require("../helpers")

const contacts = new Schema(
    {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false},
);

contacts.post("save", handleMongooseError);

const postValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
      .required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing required name field" });
  };
  next()
};

const putValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
      .required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing fields" });
  };
  next();
};

const patchValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean()
      .required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing field favorite" });
  };
  next();
};

const schemas = {
  postValidation,
  putValidation,
  patchValidation,
};

const Contacts = model('contacts', contacts);

module.exports = {
  schemas,
  Contacts,
};

