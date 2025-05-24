import Joi from 'joi';

export const sportSchema = Joi.object({
    name: Joi.string().max(255).required().messages({
        'any.required': 'el nombre es requerido',
        'string.base': 'el nombre debe ser una cadena de texto',
        'string.max': 'el nombre debe tener como máximo 255 caracteres',
    }),
    description: Joi.string().allow(null, '').messages({
        'any.required': 'la descripción es requerida',
        'string.base': 'la descripción debe ser una cadena de texto',
    }),
    status: Joi.boolean().default(false).required().messages({
        'any.required': 'el estado es requerido',
        'boolean.base': 'el estado debe ser booleano',
    }),
    image: Joi.string().allow(null, '').messages({
        'string.base': 'la imagen debe ser una cadena de texto',
    }),
    minimum_players: Joi.number().required().messages({
        'any.required': 'el número mínimo de jugadores es requerido',
        'number.base': 'el número mínimo de jugadores debe ser un número',
    }),
});
