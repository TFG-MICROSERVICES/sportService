import { Sport } from '../../models/sport.js';
import { Op, where } from 'sequelize';
import { generateError } from '../../utils/generateError.js';

export const createSport = async (data) => {
    try {
        const sport = await Sport.create(data);

        if (!sport) generateError('Error creating user', 500);

        return sport;
    } catch (error) {
        console.log(error);
        generateError(error.message, error.status);
    }
};

export const getSports = async (search) => {
    try {
        const sports = await Sport.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: search
                ? {
                      [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
                  }
                : {},
        });

        if (!sports) generateError('Sports not found', 404);

        return sports;
    } catch (error) {
        console.log(error);
        generateError(error.message, error.status);
    }
};

export const getSportById = async (id) => {
    try {
        const sport = await Sport.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (!sport) generateError('Sport not found', 404);

        return sport;
    } catch (error) {
        console.log(error);
        generateError(error.message, error.status);
    }
};

export const updateSport = async (id, data) => {
    try {
        const [updateRows] = await Sport.update(data, {
            where: {
                id: id,
            },
        });

        console.log(updateRows);

        if (updateRows === 0) generateError('Sport not updated', 400);

        const newSport = getSportById(id);

        return newSport;
    } catch (error) {
        console.log(error);
        generateError(error.message, error.status);
    }
};

export const deleteSport = async (id) => {
    try {
        const sport = await Sport.destroy({
            where: {
                id: id,
            },
        });

        return sport;
    } catch (error) {
        console.log(error);
        generateError(error.message, error.status);
    }
};
