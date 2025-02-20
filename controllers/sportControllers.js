import { createSport, getSports, getSportById, updateSport, deleteSport } from '../db/services/sportServices.js';
import { sportSchema } from '../schemas/sportSchema.js';
import { sportUpdateSchema } from '../schemas/sportUpdateSchema.js';

export const createSportController = async (req, res, next) => {
    try {
        const validate = await sportSchema.validateAsync(req.body, {
            stripUnkmown: true,
        });

        const sport = await createSport(validate);

        res.status(201).json({
            message: 'Sport created successfully',
            sport,
        });
    } catch (error) {
        next(error);
    }
};

export const getSportsController = async (req, res, next) => {
    try {
        const { search } = req.query;
        const sports = await getSports(search);

        res.status(200).json({
            message: 'Sports found',
            sports,
        });
    } catch (error) {
        next(error);
    }
};

export const getSportByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const sport = await getSportById(id);

        res.status(200).json({
            message: 'Sport found',
            sport,
        });
    } catch (error) {
        next(error);
    }
};

export const updateSportController = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const validate = await sportUpdateSchema.validateAsync(req.body, {
            stripUnknown: true,
        });
        console.log(validate);

        const sport = await updateSport(id, validate);

        res.status(200).json({
            message: 'Sport updated successfully',
            sport,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSportController = async (req, res, next) => {
    try {
        const { id } = req.params;

        await deleteSport(id);

        res.status(200).json({
            message: 'Sport deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
