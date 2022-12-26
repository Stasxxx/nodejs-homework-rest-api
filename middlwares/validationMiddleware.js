const Joi = require('joi');

module.exports = {
    postValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
            .min(3)
            .max(50)
            .required(),
            email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
            .required(),
            phone: Joi.string()
            .min(3)
            .max(30)
            .required(),
        });
        const validationResult = schema.validate(req.body);
        console.log(validationResult.error)
        if (validationResult.error) {
            return res.status(400).json({ message: "missing required name field" });
        };
        next()
    },
    putValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
            .min(3)
            .max(50)
            .required(),
            email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
            .required(),
            phone: Joi.string()
            .min(3)
            .max(30)
            .required(),
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: "missing fields" });
        };
        next();
    },
    patchValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            phone: Joi.string(),
            favorite: Joi.boolean()
            .required(),
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: "missing field favorite" });
        };
        next();
    },
};