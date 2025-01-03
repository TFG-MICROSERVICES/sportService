import Joi from 'joi';

export const sportUpdateSchema = Joi.object({
    name: Joi.string().max(255).optional().messages({
        'string.base': 'name must be string',
        'string.max': 'name must be at most 255 characters',
    }),
    description: Joi.string().allow(null, "").optional().messages({
        'string.base': 'description must be string',
    }),
    status: Joi.boolean().optional().messages({
        'boolean.base': 'status must be boolean',
    }),
    image: Joi.string().allow(null, "").optional().messages({
        'string.base': 'image must be string',
    }),
    minimum_players: Joi.number().optional().messages({
        'number.base': 'minimum_players must be number',
    }),
});