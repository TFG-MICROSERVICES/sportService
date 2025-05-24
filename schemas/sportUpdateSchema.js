import Joi from 'joi';

export const sportUpdateSchema = Joi.object({
    name: Joi.string().max(255).optional().messages({
        'string.base': 'el nombre debe ser una cadena de texto',
        'string.max': 'el nombre debe tener como máximo 255 caracteres',
    }),
    description: Joi.string().allow(null, '').optional().messages({
        'string.base': 'la descripción debe ser una cadena de texto',
    }),
    status: Joi.boolean().optional().messages({
        'boolean.base': 'el estado debe ser booleano',
    }),
    image: Joi.string().allow(null, '').optional().messages({
        'string.base': 'la imagen debe ser una cadena de texto',
    }),
    minimum_players: Joi.number().optional().messages({
        'number.base': 'el número mínimo de jugadores debe ser un número',
    }),
});
