const Joi = require("joi");

const saveImageSchema = Joi.object({
	userEmail: Joi.string().email().required(),
	imageUrl: Joi.string().uri().required(),
});

const removeImageSchema = Joi.object({
	userEmail: Joi.string().email().required(),
	imageUrl: Joi.string().uri().required(),
});

module.exports = { saveImageSchema, removeImageSchema };
