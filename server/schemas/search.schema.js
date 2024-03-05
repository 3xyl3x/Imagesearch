const Joi = require("joi");

const searchSchema = Joi.object({
	search: Joi.string().min(1).required(),
});

module.exports = { searchSchema };
